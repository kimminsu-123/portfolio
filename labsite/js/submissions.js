async function fetchSubmissions(idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'listSubmissions', idToken: idToken }),
  });
  return res.json();
}

function renderSubmissionList(submissions) {
  const container = document.getElementById('submissions-list');

  if (submissions.length === 0) {
    container.innerHTML = '<p class="lectures-empty">제출된 과제가 없습니다.</p>';
    return;
  }

  container.innerHTML = submissions.map(function (s) {
    return (
      '<div class="lecture-card lecture-card-stacked">' +
        '<div class="lecture-info">' +
          '<span class="lecture-title">' + escapeHtml(s.studentName) + '</span>' +
          '<span class="lecture-week">' + escapeHtml(s.assignmentTitle) + '</span>' +
        '</div>' +
        '<div class="submission-status">파일: ' + escapeHtml(s.fileName) +
          ' · 최초 제출: ' + escapeHtml(s.firstSubmittedAt) +
          ' · 최종 수정: ' + escapeHtml(s.lastUpdatedAt) +
        '</div>' +
      '</div>'
    );
  }).join('');
}

async function loadSubmissions() {
  const container = document.getElementById('submissions-list');
  const session = getSession();
  if (!session) return;

  try {
    const data = await fetchSubmissions(session.idToken);
    if (!data.ok) {
      container.innerHTML = '<p class="lectures-empty">제출 현황을 불러오지 못했습니다.</p>';
      return;
    }
    renderSubmissionList(data.submissions);
  } catch (err) {
    container.innerHTML = '<p class="lectures-empty">제출 현황을 불러오지 못했습니다.</p>';
  }
}
