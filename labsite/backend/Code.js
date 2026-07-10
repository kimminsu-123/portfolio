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
      return handleListLectures();
    case 'getLecturePreview':
      return handleGetLecturePreview(body.lectureId);
    default:
      return jsonResponse({ ok: false, error: 'unknown action' });
  }
}

function handleVerifyLogin(idToken) {
  const email = verifyGoogleIdToken(idToken);
  if (!email) {
    return jsonResponse({ ok: false, error: 'invalid token' });
  }

  const adminEmail = getConfig().adminEmail;
  return jsonResponse({ ok: true, email: email, isAdmin: email === adminEmail });
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

function handleListLectures() {
  const rows = readLecturesSheet();
  const list = rows.map(function (r) {
    return { id: r.id, title: r.title, week: r.week, fileType: r.fileType, uploadedAt: r.uploadedAt };
  });
  return jsonResponse({ ok: true, lectures: list });
}

function handleGetLecturePreview(lectureId) {
  if (!lectureId) return jsonResponse({ ok: false, error: 'lectureId required' });

  const rows = readLecturesSheet();
  const lecture = rows.filter(function (r) { return String(r.id) === String(lectureId); })[0];
  if (!lecture) return jsonResponse({ ok: false, error: 'lecture not found' });

  if (lecture.fileType === 'ppt') {
    let slideImageUrls = [];
    try {
      slideImageUrls = lecture.slideImageUrls ? JSON.parse(lecture.slideImageUrls) : [];
    } catch (err) {
      slideImageUrls = [];
    }
    return jsonResponse({ ok: true, fileType: 'ppt', title: lecture.title, slideImageUrls: slideImageUrls });
  }

  if (lecture.fileType === 'html') {
    const html = DriveApp.getFileById(lecture.sourceFileId).getBlob().getDataAsString();
    return jsonResponse({ ok: true, fileType: 'html', title: lecture.title, html: html });
  }

  return jsonResponse({ ok: false, error: 'unsupported fileType' });
}

function readLecturesSheet() {
  const spreadsheetId = getConfig().spreadsheetId;
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Lectures');
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
    ['id', 'title', 'week', 'fileType', 'sourceFileId', 'slidesFileId', 'slideImageUrls', 'uploadedAt'],
  ]);

  props.setProperty('SPREADSHEET_ID', ss.getId());

  Logger.log('스프레드시트 생성 완료: ' + ss.getId());
  Logger.log('URL: ' + ss.getUrl());
}

// doGet/doPost에서는 호출하지 않음 — 읽기 전용 목록/미리보기 기능 검증용 임시 테스트 데이터 삽입, 업로드 기능(§10-5) 완성되면 삭제
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
