function doGet(e) {
  return jsonResponse({ ok: true, message: 'LabSite backend alive' });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'invalid json body' });
  }

  switch (body.action) {
    case 'verifyLogin':
      return handleVerifyLogin(body.idToken);
    case 'listLectures':
      return handleListLectures(body.idToken);
    case 'getLecturePreview':
      return handleGetLecturePreview(body.lectureId, body.idToken);
    case 'uploadLecture':
      return handleUploadLecture(body);
    case 'deleteLecture':
      return handleDeleteLecture(body);
    case 'addStudent':
      return handleAddStudent(body);
    case 'removeStudent':
      return handleRemoveStudent(body);
    case 'listStudents':
      return handleListStudents(body);
    case 'createAssignment':
      return handleCreateAssignment(body);
    case 'deleteAssignment':
      return handleDeleteAssignment(body);
    case 'listAssignments':
      return handleListAssignments(body.idToken);
    case 'submitAssignment':
      return handleSubmitAssignment(body);
    default:
      return jsonResponse({ ok: false, error: 'unknown action' });
  }
}

function handleVerifyLogin(idToken) {
  const email = verifyGoogleIdToken(idToken);
  if (!email) {
    return jsonResponse({ ok: false, error: 'invalid token' });
  }

  const isAdmin = email === getConfig().adminEmail;
  const student = isAdmin ? null : findStudent(email);

  return jsonResponse({
    ok: true,
    email: email,
    isAdmin: isAdmin,
    isStudent: !!student,
    name: student ? student.name : null,
  });
}

function verifyGoogleIdToken(idToken) {
  const oauthClientId = getConfig().oauthClientId;
  const res = UrlFetchApp.fetch(
    'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken),
    { muteHttpExceptions: true }
  );
  if (res.getResponseCode() !== 200) return null;

  const payload = JSON.parse(res.getContentText());
  if (payload.aud !== oauthClientId) return null;
  if (payload.email_verified !== 'true' && payload.email_verified !== true) return null;

  return payload.email;
}

function requireAdmin(idToken) {
  const email = verifyGoogleIdToken(idToken);
  if (!email) return { ok: false, error: 'invalid token' };
  if (email !== getConfig().adminEmail) return { ok: false, error: 'forbidden: admin only' };
  return { ok: true, email: email };
}

function requireStudentOrAdmin(idToken) {
  const email = verifyGoogleIdToken(idToken);
  if (!email) return { ok: false, error: 'invalid token' };
  if (email === getConfig().adminEmail) return { ok: true, email: email, isAdmin: true };

  const student = findStudent(email);
  if (!student) return { ok: false, error: 'forbidden: registered students only' };
  return { ok: true, email: email, isAdmin: false, name: student.name };
}

function findStudent(email) {
  return readSheetRows('Students').filter(function (r) { return r.email === email; })[0] || null;
}

function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    adminEmail: props.getProperty('ADMIN_EMAIL'),
    lectureFolderId: props.getProperty('LECTURE_FOLDER_ID'),
    submissionRootFolderId: props.getProperty('SUBMISSION_ROOT_FOLDER_ID'),
    oauthClientId: props.getProperty('GOOGLE_OAUTH_CLIENT_ID'),
    spreadsheetId: props.getProperty('SPREADSHEET_ID'),
  };
}

function handleListLectures(idToken) {
  const auth = requireStudentOrAdmin(idToken);
  if (!auth.ok) return jsonResponse(auth);

  const rows = readSheetRows('Lectures');
  const list = rows.map(function (r) {
    return { id: r.id, title: r.title, week: r.week, fileType: r.fileType, uploadedAt: r.uploadedAt };
  });
  return jsonResponse({ ok: true, lectures: list });
}

function handleGetLecturePreview(lectureId, idToken) {
  const auth = requireStudentOrAdmin(idToken);
  if (!auth.ok) return jsonResponse(auth);

  if (!lectureId) return jsonResponse({ ok: false, error: 'lectureId required' });

  const rows = readSheetRows('Lectures');
  const lecture = rows.filter(function (r) { return String(r.id) === String(lectureId); })[0];
  if (!lecture) return jsonResponse({ ok: false, error: 'lecture not found' });

  if (lecture.fileType === 'ppt') {
    let fileIds = [];
    try {
      fileIds = lecture.slideImageFileIds ? JSON.parse(lecture.slideImageFileIds) : [];
    } catch (err) {
      fileIds = [];
    }

    // 저장된 건 Drive 파일 ID들 — getThumbnail()의 contentUrl은 30분 만료라 캐싱 불가하므로
    // 매 조회마다 Drive에 저장해둔 PNG를 읽어 base64로 즉석 인코딩한다.
    const slideImageUrls = fileIds
      .map(function (fileId) {
        try {
          const blob = DriveApp.getFileById(fileId).getBlob();
          return 'data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes());
        } catch (err) {
          return null;
        }
      })
      .filter(function (url) { return url !== null; });

    return jsonResponse({ ok: true, fileType: 'ppt', title: lecture.title, slideImageUrls: slideImageUrls });
  }

  if (lecture.fileType === 'html') {
    const html = DriveApp.getFileById(lecture.sourceFileId).getBlob().getDataAsString();
    return jsonResponse({ ok: true, fileType: 'html', title: lecture.title, html: html });
  }

  return jsonResponse({ ok: false, error: 'unsupported fileType' });
}

function handleUploadLecture(body) {
  const auth = requireAdmin(body.idToken);
  if (!auth.ok) return jsonResponse(auth);

  if (!body.title || !body.fileName || !body.fileBase64) {
    return jsonResponse({ ok: false, error: 'title, fileName, fileBase64 required' });
  }

  const fileType = detectFileType(body.fileName);
  if (!fileType) return jsonResponse({ ok: false, error: 'unsupported file extension' });

  const folderId = getConfig().lectureFolderId;
  if (!folderId) return jsonResponse({ ok: false, error: 'LECTURE_FOLDER_ID not configured' });
  const folder = DriveApp.getFolderById(folderId);

  const id = Utilities.getUuid();
  const uploadedAt = new Date().toISOString();
  const bytes = Utilities.base64Decode(body.fileBase64);
  const mimeType = fileType === 'ppt'
    ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    : MimeType.HTML;
  const blob = Utilities.newBlob(bytes, mimeType, body.fileName);

  let sourceFileId = '';
  let slidesFileId = '';
  let slideImageFileIds = [];

  try {
    sourceFileId = folder.createFile(blob).getId();

    if (fileType === 'ppt') {
      slidesFileId = convertPptxToSlides(blob, body.title, folderId);
      slideImageFileIds = cacheSlideThumbnails(slidesFileId, id, folder);
    }
  } catch (err) {
    trashFileIfExists(sourceFileId);
    trashFileIfExists(slidesFileId);
    slideImageFileIds.forEach(trashFileIfExists);
    return jsonResponse({ ok: false, error: '업로드 처리 실패: ' + err });
  }

  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Lectures');
  sheet.appendRow([
    id, body.title, body.week || '', fileType,
    sourceFileId, slidesFileId,
    slideImageFileIds.length ? JSON.stringify(slideImageFileIds) : '',
    uploadedAt,
  ]);

  return jsonResponse({
    ok: true,
    lecture: { id: id, title: body.title, week: body.week || '', fileType: fileType, uploadedAt: uploadedAt },
  });
}

function handleDeleteLecture(body) {
  const auth = requireAdmin(body.idToken);
  if (!auth.ok) return jsonResponse(auth);

  if (!body.lectureId) return jsonResponse({ ok: false, error: 'lectureId required' });

  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Lectures');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idColIdx = headers.indexOf('id');

  let rowIndex = -1;
  let rowData = null;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idColIdx]) === String(body.lectureId)) {
      rowIndex = i + 1;
      rowData = values[i];
      break;
    }
  }
  if (rowIndex === -1) return jsonResponse({ ok: false, error: 'lecture not found' });

  const lecture = {};
  headers.forEach(function (h, i) { lecture[h] = rowData[i]; });

  trashFileIfExists(lecture.sourceFileId);
  trashFileIfExists(lecture.slidesFileId);
  if (lecture.slideImageFileIds) {
    let ids = [];
    try { ids = JSON.parse(lecture.slideImageFileIds); } catch (err) { ids = []; }
    ids.forEach(trashFileIfExists);
  }

  sheet.deleteRow(rowIndex);
  return jsonResponse({ ok: true, deletedId: body.lectureId });
}

function handleAddStudent(body) {
  const auth = requireAdmin(body.idToken);
  if (!auth.ok) return jsonResponse(auth);

  if (!body.email || !body.name) return jsonResponse({ ok: false, error: 'email, name required' });

  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Students');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const emailColIdx = headers.indexOf('email');
  const nameColIdx = headers.indexOf('name');

  for (let i = 1; i < values.length; i++) {
    if (values[i][emailColIdx] === body.email) {
      sheet.getRange(i + 1, nameColIdx + 1).setValue(body.name);
      return jsonResponse({ ok: true, student: { email: body.email, name: body.name } });
    }
  }

  sheet.appendRow([body.email, body.name, new Date().toISOString()]);
  return jsonResponse({ ok: true, student: { email: body.email, name: body.name } });
}

function handleRemoveStudent(body) {
  const auth = requireAdmin(body.idToken);
  if (!auth.ok) return jsonResponse(auth);

  if (!body.email) return jsonResponse({ ok: false, error: 'email required' });

  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Students');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const emailColIdx = headers.indexOf('email');

  for (let i = 1; i < values.length; i++) {
    if (values[i][emailColIdx] === body.email) {
      sheet.deleteRow(i + 1);
      return jsonResponse({ ok: true, deletedEmail: body.email });
    }
  }

  return jsonResponse({ ok: false, error: 'student not found' });
}

function handleListStudents(body) {
  const auth = requireAdmin(body.idToken);
  if (!auth.ok) return jsonResponse(auth);

  const rows = readSheetRows('Students');
  return jsonResponse({ ok: true, students: rows });
}

function handleCreateAssignment(body) {
  const auth = requireAdmin(body.idToken);
  if (!auth.ok) return jsonResponse(auth);

  if (!body.title) return jsonResponse({ ok: false, error: 'title required' });

  const rootFolderId = getConfig().submissionRootFolderId;
  if (!rootFolderId) return jsonResponse({ ok: false, error: 'SUBMISSION_ROOT_FOLDER_ID not configured' });

  const id = Utilities.getUuid();
  const createdAt = new Date().toISOString();
  const folder = DriveApp.getFolderById(rootFolderId).createFolder(body.title + ' - ' + id);

  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Assignments');
  sheet.appendRow([id, body.title, body.description || '', body.dueDate || '', folder.getId(), createdAt]);

  return jsonResponse({
    ok: true,
    assignment: { id: id, title: body.title, description: body.description || '', dueDate: body.dueDate || '', createdAt: createdAt },
  });
}

function handleDeleteAssignment(body) {
  const auth = requireAdmin(body.idToken);
  if (!auth.ok) return jsonResponse(auth);

  if (!body.assignmentId) return jsonResponse({ ok: false, error: 'assignmentId required' });

  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Assignments');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idColIdx = headers.indexOf('id');

  let rowIndex = -1;
  let rowData = null;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idColIdx]) === String(body.assignmentId)) {
      rowIndex = i + 1;
      rowData = values[i];
      break;
    }
  }
  if (rowIndex === -1) return jsonResponse({ ok: false, error: 'assignment not found' });

  const assignment = {};
  headers.forEach(function (h, i) { assignment[h] = rowData[i]; });

  trashFolderIfExists(assignment.folderId);
  sheet.deleteRow(rowIndex);
  return jsonResponse({ ok: true, deletedId: body.assignmentId });
}

function handleListAssignments(idToken) {
  const auth = requireStudentOrAdmin(idToken);
  if (!auth.ok) return jsonResponse(auth);

  const rows = readSheetRows('Assignments');
  const mySubmissions = auth.isAdmin
    ? []
    : readSheetRows('Submissions').filter(function (s) { return s.studentEmail === auth.email; });

  const list = rows.map(function (r) {
    const dueDate = formatDateOnly(r.dueDate);
    const submission = mySubmissions.filter(function (s) { return String(s.assignmentId) === String(r.id); })[0] || null;
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      dueDate: dueDate,
      createdAt: r.createdAt,
      mySubmission: submission ? {
        fileName: submission.fileName,
        lastUpdatedAt: formatDateTimeKST(submission.lastUpdatedAt),
        isLate: isSubmissionLate(dueDate, submission.lastUpdatedAt),
      } : null,
    };
  });
  return jsonResponse({ ok: true, assignments: list });
}

function handleSubmitAssignment(body) {
  const auth = requireStudentOrAdmin(body.idToken);
  if (!auth.ok) return jsonResponse(auth);

  if (!body.assignmentId || !body.fileName || !body.fileBase64) {
    return jsonResponse({ ok: false, error: 'assignmentId, fileName, fileBase64 required' });
  }

  const assignment = readSheetRows('Assignments').filter(function (a) { return String(a.id) === String(body.assignmentId); })[0];
  if (!assignment) return jsonResponse({ ok: false, error: 'assignment not found' });

  const bytes = Utilities.base64Decode(body.fileBase64);
  const blob = Utilities.newBlob(bytes, body.mimeType || 'application/octet-stream', body.fileName);

  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Submissions');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const assignmentIdColIdx = headers.indexOf('assignmentId');
  const emailColIdx = headers.indexOf('studentEmail');
  const fileIdColIdx = headers.indexOf('fileId');
  const fileNameColIdx = headers.indexOf('fileName');
  const lastUpdatedColIdx = headers.indexOf('lastUpdatedAt');
  const now = new Date().toISOString();

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][assignmentIdColIdx]) === String(body.assignmentId) && values[i][emailColIdx] === auth.email) {
      Drive.Files.update({}, values[i][fileIdColIdx], blob);
      sheet.getRange(i + 1, fileNameColIdx + 1).setValue(body.fileName);
      sheet.getRange(i + 1, lastUpdatedColIdx + 1).setValue(now);
      return jsonResponse({ ok: true, resubmitted: true });
    }
  }

  const file = DriveApp.getFolderById(assignment.folderId).createFile(blob);
  sheet.appendRow([Utilities.getUuid(), body.assignmentId, auth.email, auth.name || auth.email, file.getId(), body.fileName, now, now]);
  return jsonResponse({ ok: true, resubmitted: false });
}

// Sheets가 "yyyy-mm-dd" 형태의 문자열을 셀에 쓰는 시점에 Date로 자동 인식해버려서,
// 읽어올 때 Date 객체로 반환되고 JSON.stringify가 UTC ISO 문자열로 직렬화하는 문제 방지
function formatDateOnly(value) {
  if (!value) return '';
  if (value instanceof Date) return Utilities.formatDate(value, 'Asia/Seoul', 'yyyy-MM-dd');
  return String(value);
}

function formatDateTimeKST(isoString) {
  if (!isoString) return '';
  return Utilities.formatDate(new Date(isoString), 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
}

function isSubmissionLate(dueDate, submittedAtIso) {
  if (!dueDate || !submittedAtIso) return false;
  return Utilities.formatDate(new Date(submittedAtIso), 'Asia/Seoul', 'yyyy-MM-dd') > dueDate;
}

function detectFileType(fileName) {
  const lower = String(fileName).toLowerCase();
  if (lower.endsWith('.ppt') || lower.endsWith('.pptx')) return 'ppt';
  if (lower.endsWith('.html') || lower.endsWith('.htm')) return 'html';
  return null;
}

function convertPptxToSlides(blob, title, folderId) {
  const resource = { name: title, mimeType: MimeType.GOOGLE_SLIDES, parents: [folderId] };
  const converted = Drive.Files.create(resource, blob);
  return converted.id;
}

function cacheSlideThumbnails(slidesFileId, lectureId, folder) {
  const presentation = Slides.Presentations.get(slidesFileId);
  const slides = presentation.slides || [];

  return slides.map(function (slide, idx) {
    const thumbnail = Slides.Presentations.Pages.getThumbnail(slidesFileId, slide.objectId, {
      'thumbnailProperties.thumbnailSize': 'LARGE',
    });
    // contentUrl은 서명된 임시 URL(수명 30분) — 만료 전에 바로 소비해 Drive PNG로 영구 저장한다.
    const imgBlob = UrlFetchApp.fetch(thumbnail.contentUrl).getBlob()
      .setName(lectureId + '-slide-' + (idx + 1) + '.png');
    const fileId = folder.createFile(imgBlob).getId();
    Utilities.sleep(300); // getThumbnail은 expensive read 쿼터 — 슬라이드 많을 때 과다호출 방지
    return fileId;
  });
}

function trashFileIfExists(fileId) {
  if (!fileId) return;
  try {
    DriveApp.getFileById(fileId).setTrashed(true);
  } catch (err) {
    // 이미 없거나 접근 불가 — 무시
  }
}

function trashFolderIfExists(folderId) {
  if (!folderId) return;
  try {
    DriveApp.getFolderById(folderId).setTrashed(true);
  } catch (err) {
    // 이미 없거나 접근 불가 — 무시
  }
}

function readSheetRows(sheetName) {
  const spreadsheetId = getConfig().spreadsheetId;
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0];
  return values.slice(1)
    .filter(function (row) { return row[0] !== ''; })
    .map(function (row) {
      const obj = {};
      headers.forEach(function (h, i) { obj[h] = row[i]; });
      return obj;
    });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function myFunction() {
  Logger.log(getConfig());
}

// doGet/doPost에서는 호출하지 않음 — Apps Script 에디터에서 수동으로 한 번만 실행
function setupDatabase() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('SPREADSHEET_ID');
  if (existingId) {
    Logger.log('SPREADSHEET_ID가 이미 설정되어 있습니다: ' + existingId);
    return;
  }

  const ss = SpreadsheetApp.create('LabSite DB');
  const lecturesSheet = ss.getSheets()[0];
  lecturesSheet.setName('Lectures');
  lecturesSheet.getRange(1, 1, 1, 8).setValues([
    ['id', 'title', 'week', 'fileType', 'sourceFileId', 'slidesFileId', 'slideImageFileIds', 'uploadedAt'],
  ]);

  props.setProperty('SPREADSHEET_ID', ss.getId());

  Logger.log('스프레드시트 생성 완료: ' + ss.getId());
  Logger.log('URL: ' + ss.getUrl());
}

// doGet/doPost에서는 호출하지 않음 — Apps Script 에디터에서 수동으로 한 번만 실행
function setupLectureFolder() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('LECTURE_FOLDER_ID');
  if (existingId) {
    Logger.log('LECTURE_FOLDER_ID가 이미 설정되어 있습니다: ' + existingId);
    return;
  }

  const folder = DriveApp.createFolder('LabSite Lectures');
  props.setProperty('LECTURE_FOLDER_ID', folder.getId());

  Logger.log('강의자료 폴더 생성 완료: ' + folder.getId());
  Logger.log('URL: ' + folder.getUrl());
}

// doGet/doPost에서는 호출하지 않음 — Apps Script 에디터에서 수동으로 한 번만 실행
function setupStudentsSheet() {
  const ss = SpreadsheetApp.openById(getConfig().spreadsheetId);
  if (ss.getSheetByName('Students')) {
    Logger.log('Students 탭이 이미 있습니다.');
    return;
  }

  const sheet = ss.insertSheet('Students');
  sheet.getRange(1, 1, 1, 3).setValues([['email', 'name', 'registeredAt']]);

  Logger.log('Students 탭 생성 완료');
}

// doGet/doPost에서는 호출하지 않음 — Apps Script 에디터에서 수동으로 한 번만 실행
function setupAssignmentsSheet() {
  const ss = SpreadsheetApp.openById(getConfig().spreadsheetId);
  if (ss.getSheetByName('Assignments')) {
    Logger.log('Assignments 탭이 이미 있습니다.');
    return;
  }

  const sheet = ss.insertSheet('Assignments');
  sheet.getRange(1, 1, 1, 6).setValues([['id', 'title', 'description', 'dueDate', 'folderId', 'createdAt']]);

  Logger.log('Assignments 탭 생성 완료');
}

// doGet/doPost에서는 호출하지 않음 — Apps Script 에디터에서 수동으로 한 번만 실행
function setupSubmissionRootFolder() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('SUBMISSION_ROOT_FOLDER_ID');
  if (existingId) {
    Logger.log('SUBMISSION_ROOT_FOLDER_ID가 이미 설정되어 있습니다: ' + existingId);
    return;
  }

  const folder = DriveApp.createFolder('LabSite Submissions');
  props.setProperty('SUBMISSION_ROOT_FOLDER_ID', folder.getId());

  Logger.log('과제 제출 루트 폴더 생성 완료: ' + folder.getId());
  Logger.log('URL: ' + folder.getUrl());
}

// doGet/doPost에서는 호출하지 않음 — Apps Script 에디터에서 수동으로 한 번만 실행
function setupSubmissionsSheet() {
  const ss = SpreadsheetApp.openById(getConfig().spreadsheetId);
  if (ss.getSheetByName('Submissions')) {
    Logger.log('Submissions 탭이 이미 있습니다.');
    return;
  }

  const sheet = ss.insertSheet('Submissions');
  sheet.getRange(1, 1, 1, 8).setValues([
    ['id', 'assignmentId', 'studentEmail', 'studentName', 'fileId', 'fileName', 'firstSubmittedAt', 'lastUpdatedAt'],
  ]);

  Logger.log('Submissions 탭 생성 완료');
}

// doGet/doPost에서는 호출하지 않음 — seedTestLectures()가 남긴 테스트 데이터(test-html-1, test-ppt-1 행 +
// test-lecture.html Drive 파일) 정리용 1회성 함수. slideImageUrls -> slideImageFileIds 컬럼명 변경 후 실행할 것.
function cleanupTestLectures() {
  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Lectures');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idColIdx = headers.indexOf('id');
  const sourceColIdx = headers.indexOf('sourceFileId');
  const targetIds = ['test-html-1', 'test-ppt-1'];

  for (let i = values.length - 1; i >= 1; i--) {
    if (targetIds.indexOf(String(values[i][idColIdx])) !== -1) {
      const sourceFileId = values[i][sourceColIdx];
      trashFileIfExists(sourceFileId);
      sheet.deleteRow(i + 1);
    }
  }

  Logger.log('테스트 데이터 정리 완료');
}

// doGet/doPost에서는 호출하지 않음 — 읽기 전용 목록/미리보기 기능 검증용 임시 테스트 데이터 삽입, 업로드 기능(§10-5) 완성되어 cleanupTestLectures() 실행 후 삭제 예정
function seedTestLectures() {
  const sheet = SpreadsheetApp.openById(getConfig().spreadsheetId).getSheetByName('Lectures');
  const now = new Date().toISOString();

  const htmlFile = DriveApp.createFile(
    'test-lecture.html',
    '<h1>테스트 HTML 강의자료</h1><p>미리보기 기능 검증용 더미 데이터입니다.</p>',
    MimeType.HTML
  );
  sheet.appendRow(['test-html-1', '테스트 HTML 강의', '1', 'html', htmlFile.getId(), '', '', now]);

  const slideImageUrls = [1, 2, 3].map(function (n) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
      '<rect width="100%" height="100%" fill="#334"/>' +
      '<text x="50%" y="50%" fill="white" font-size="40" text-anchor="middle">Slide ' + n + '</text></svg>';
    return 'data:image/svg+xml;base64,' + Utilities.base64Encode(svg);
  });
  sheet.appendRow(['test-ppt-1', '테스트 PPT 강의', '1', 'ppt', '', '', JSON.stringify(slideImageUrls), now]);

  Logger.log('테스트 데이터 2건 삽입 완료');
}
