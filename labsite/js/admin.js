function renderApp() {
  hideLoadingView();
  const session = getSession();

  const loginArea = document.getElementById('login-area');
  const userArea = document.getElementById('user-area');
  const loggedOutView = document.getElementById('logged-out-view');
  const notAdminView = document.getElementById('not-admin-view');
  const adminContent = document.getElementById('admin-content');

  if (!session) {
    loginArea.style.display = 'block';
    userArea.style.display = 'none';
    loggedOutView.style.display = 'block';
    notAdminView.style.display = 'none';
    adminContent.style.display = 'none';
    return;
  }

  loginArea.style.display = 'none';
  userArea.style.display = 'flex';
  document.getElementById('user-email').textContent = session.email;
  document.getElementById('user-role').textContent = session.isAdmin ? '관리자' : (session.isStudent ? '수강생' : '미등록');

  loggedOutView.style.display = 'none';
  notAdminView.style.display = session.isAdmin ? 'none' : 'block';
  adminContent.style.display = session.isAdmin ? 'block' : 'none';

  if (session.isAdmin) {
    loadLectures({ showDeleteButton: true });
    loadStudents();
    loadAdminAssignments();
  }
}

function initAdminTabs() {
  const tabs = document.querySelectorAll('.admin-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
      document.querySelectorAll('.admin-tab-panel').forEach(function (panel) {
        panel.style.display = panel.id === tab.dataset.tab ? 'block' : 'none';
      });
    });
  });
}

window.addEventListener('load', async () => {
  initGoogleLogin();
  initAdminTabs();
  await refreshSession();
  renderApp();
  document.getElementById('logout-btn').addEventListener('click', logout);
});
