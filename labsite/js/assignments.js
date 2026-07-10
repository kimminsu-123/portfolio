async function fetchAssignments(idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'listAssignments', idToken: idToken }),
  });
  return res.json();
}

async function fetchCreateAssignment(title, description, dueDate, idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'createAssignment', idToken: idToken, title: title, description: description, dueDate: dueDate }),
  });
  return res.json();
}

async function fetchDeleteAssignment(assignmentId, idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'deleteAssignment', idToken: idToken, assignmentId: assignmentId }),
  });
  return res.json();
}

async function fetchSubmitAssignment(assignmentId, fileName, mimeType, fileBase64, idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'submitAssignment',
      idToken: idToken,
      assignmentId: assignmentId,
      fileName: fileName,
      mimeType: mimeType,
      fileBase64: fileBase64,
    }),
  });
  return res.json();
}

function renderAssignmentList(assignments, options) {
  const showDeleteButton = !!(options && options.showDeleteButton);
  const container = document.getElementById('assignments-list');

  if (assignments.length === 0) {
    container.innerHTML = '<p class="lectures-empty">등록된 과제가 없습니다.</p>';
    return;
  }

  container.innerHTML = assignments.map(function (a) {
    const dueLabel = a.dueDate ? escapeHtml(a.dueDate) + '까지 제출 가능' : '';
    const deleteBtn = showDeleteButton
      ? '<button class="lecture-delete-btn" data-id="' + escapeHtml(a.id) + '">삭제</button>'
      : '';
    return (
      '<div class="lecture-card">' +
        '<div class="lecture-info">' +
          '<span class="lecture-title">' + escapeHtml(a.title) + '</span>' +
          '<span class="lecture-week">' + dueLabel + '</span>' +
        '</div>' +
        '<div class="lecture-actions">' +
          deleteBtn +
        '</div>' +
      '</div>'
    );
  }).join('');

  if (showDeleteButton) {
    container.querySelectorAll('.lecture-delete-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { handleDeleteAssignmentClick(btn.dataset.id, btn); });
    });
  }
}

function renderStudentAssignmentList(assignments) {
  const container = document.getElementById('assignments-list');

  if (assignments.length === 0) {
    container.innerHTML = '<p class="lectures-empty">등록된 과제가 없습니다.</p>';
    return;
  }

  container.innerHTML = assignments.map(function (a) {
    const dueLabel = a.dueDate ? escapeHtml(a.dueDate) + '까지 제출 가능' : '';
    const descBlock = a.description ? '<p class="assignment-description">' + escapeHtml(a.description) + '</p>' : '';
    const submission = a.mySubmission;

    let statusText = '미제출';
    if (submission) {
      statusText = '제출 완료: ' + escapeHtml(submission.fileName) + ' (' + escapeHtml(submission.lastUpdatedAt) + ')';
      if (submission.isLate) statusText += ' <span class="late-badge">지각 제출</span>';
    }
    const submitLabel = submission ? '다시 제출하기' : '제출하기';

    return (
      '<div class="lecture-card lecture-card-stacked">' +
        '<div class="lecture-info">' +
          '<span class="lecture-title">' + escapeHtml(a.title) + '</span>' +
          '<span class="lecture-week">' + dueLabel + '</span>' +
        '</div>' +
        descBlock +
        '<p class="submission-status">' + statusText + '</p>' +
        '<form class="submission-form" data-assignment-id="' + escapeHtml(a.id) + '">' +
          '<input type="file" required>' +
          '<button type="submit">' + submitLabel + '</button>' +
          '<span class="submission-form-status"></span>' +
        '</form>' +
      '</div>'
    );
  }).join('');

  container.querySelectorAll('.submission-form').forEach(function (form) {
    form.addEventListener('submit', function (e) { handleSubmitAssignmentForm(e, form.dataset.assignmentId, form); });
  });
}

async function loadAssignments(options) {
  const container = document.getElementById('assignments-list');
  const session = getSession();
  if (!session) return;

  try {
    const data = await fetchAssignments(session.idToken);
    if (!data.ok) {
      container.innerHTML = '<p class="lectures-empty">과제 목록을 불러오지 못했습니다.</p>';
      return;
    }
    if (options && options.showDeleteButton) {
      renderAssignmentList(data.assignments, options);
    } else {
      renderStudentAssignmentList(data.assignments);
    }
  } catch (err) {
    container.innerHTML = '<p class="lectures-empty">과제 목록을 불러오지 못했습니다.</p>';
  }
}

async function handleSubmitAssignmentForm(e, assignmentId, form) {
  e.preventDefault();

  const session = getSession();
  if (!session) return;

  const fileInput = form.querySelector('input[type="file"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const statusEl = form.querySelector('.submission-form-status');
  const file = fileInput.files[0];
  if (!file) return;

  submitBtn.disabled = true;
  statusEl.textContent = '제출 중...';

  try {
    const fileBase64 = await readFileAsBase64(file);
    const data = await fetchSubmitAssignment(assignmentId, file.name, file.type, fileBase64, session.idToken);
    if (!data.ok) {
      statusEl.textContent = '제출 실패: ' + data.error;
      submitBtn.disabled = false;
      return;
    }
    statusEl.textContent = '제출 완료';
    loadAssignments();
  } catch (err) {
    statusEl.textContent = '제출 요청 실패: ' + err;
    submitBtn.disabled = false;
  }
}

async function handleDeleteAssignmentClick(assignmentId, btn) {
  if (!confirm('정말 삭제하시겠습니까? 되돌릴 수 없습니다.')) return;

  const session = getSession();
  if (!session) return;

  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = '삭제 중...';

  const data = await fetchDeleteAssignment(assignmentId, session.idToken);
  if (!data.ok) {
    alert('삭제 실패: ' + data.error);
    btn.disabled = false;
    btn.textContent = originalText;
    return;
  }
  loadAssignments({ showDeleteButton: true });
}

async function handleAssignmentFormSubmit(e) {
  e.preventDefault();

  const session = getSession();
  if (!session || !session.isAdmin) return;

  const titleInput = document.getElementById('assignment-title');
  const descInput = document.getElementById('assignment-description');
  const dueInput = document.getElementById('assignment-due-date');
  const submitBtn = document.getElementById('assignment-submit-btn');
  const statusEl = document.getElementById('assignment-status');

  submitBtn.disabled = true;
  statusEl.textContent = '생성 중...';

  const data = await fetchCreateAssignment(titleInput.value, descInput.value, dueInput.value, session.idToken);
  if (!data.ok) {
    statusEl.textContent = '생성 실패: ' + data.error;
    submitBtn.disabled = false;
    return;
  }

  statusEl.textContent = '생성 완료';
  document.getElementById('assignment-form').reset();
  submitBtn.disabled = false;
  loadAssignments({ showDeleteButton: true });
}

window.addEventListener('load', function () {
  const form = document.getElementById('assignment-form');
  if (form) form.addEventListener('submit', handleAssignmentFormSubmit);
});
