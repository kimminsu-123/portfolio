async function fetchStudents(idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'listStudents', idToken: idToken }),
  });
  return res.json();
}

async function fetchAddStudent(email, name, idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'addStudent', idToken: idToken, email: email, name: name }),
  });
  return res.json();
}

async function fetchRemoveStudent(email, idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'removeStudent', idToken: idToken, email: email }),
  });
  return res.json();
}

function renderStudentList(students) {
  const container = document.getElementById('students-list');

  if (students.length === 0) {
    container.innerHTML = '<p class="lectures-empty">등록된 수강생이 없습니다.</p>';
    return;
  }

  container.innerHTML = students.map(function (s) {
    return (
      '<div class="lecture-card">' +
        '<div class="lecture-info">' +
          '<span class="lecture-title">' + escapeHtml(s.name) + '</span>' +
          '<span class="lecture-week">' + escapeHtml(s.email) + '</span>' +
        '</div>' +
        '<div class="lecture-actions">' +
          '<button class="lecture-delete-btn" data-email="' + escapeHtml(s.email) + '">삭제</button>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  container.querySelectorAll('.lecture-delete-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { handleRemoveStudentClick(btn.dataset.email, btn); });
  });
}

async function loadStudents() {
  const container = document.getElementById('students-list');
  const session = getSession();
  if (!session) return;

  try {
    const data = await fetchStudents(session.idToken);
    if (!data.ok) {
      container.innerHTML = '<p class="lectures-empty">수강생 목록을 불러오지 못했습니다.</p>';
      return;
    }
    renderStudentList(data.students);
  } catch (err) {
    container.innerHTML = '<p class="lectures-empty">수강생 목록을 불러오지 못했습니다.</p>';
  }
}

async function handleRemoveStudentClick(email, btn) {
  if (!confirm('정말 삭제하시겠습니까?')) return;

  const session = getSession();
  if (!session) return;

  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = '삭제 중...';

  const data = await fetchRemoveStudent(email, session.idToken);
  if (!data.ok) {
    alert('삭제 실패: ' + data.error);
    btn.disabled = false;
    btn.textContent = originalText;
    return;
  }
  loadStudents();
}

async function handleStudentFormSubmit(e) {
  e.preventDefault();

  const session = getSession();
  if (!session || !session.isAdmin) return;

  const emailInput = document.getElementById('student-email');
  const nameInput = document.getElementById('student-name');
  const submitBtn = document.getElementById('student-submit-btn');
  const statusEl = document.getElementById('student-status');

  submitBtn.disabled = true;
  statusEl.textContent = '등록 중...';

  const data = await fetchAddStudent(emailInput.value, nameInput.value, session.idToken);
  if (!data.ok) {
    statusEl.textContent = '등록 실패: ' + data.error;
    submitBtn.disabled = false;
    return;
  }

  statusEl.textContent = '등록 완료';
  document.getElementById('student-form').reset();
  submitBtn.disabled = false;
  loadStudents();
}

window.addEventListener('load', function () {
  document.getElementById('student-form').addEventListener('submit', handleStudentFormSubmit);
});
