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
    renderAssignmentList(data.assignments, options);
  } catch (err) {
    container.innerHTML = '<p class="lectures-empty">과제 목록을 불러오지 못했습니다.</p>';
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
