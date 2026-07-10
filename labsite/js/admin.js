function renderApp() {
  const session = getSession();

  const loginArea = document.getElementById('login-area');
  const userArea = document.getElementById('user-area');
  const loggedOutView = document.getElementById('logged-out-view');
  const notAdminView = document.getElementById('not-admin-view');
  const adminPanel = document.getElementById('admin-panel');

  if (!session) {
    loginArea.style.display = 'block';
    userArea.style.display = 'none';
    loggedOutView.style.display = 'block';
    notAdminView.style.display = 'none';
    adminPanel.style.display = 'none';
    loadLectures();
    return;
  }

  loginArea.style.display = 'none';
  userArea.style.display = 'flex';
  document.getElementById('user-email').textContent = session.email;
  document.getElementById('user-role').textContent = session.isAdmin ? '관리자' : '수강생';

  loggedOutView.style.display = 'none';
  notAdminView.style.display = session.isAdmin ? 'none' : 'block';
  adminPanel.style.display = session.isAdmin ? 'block' : 'none';

  loadLectures({ showDeleteButton: session.isAdmin });
}

window.addEventListener('load', () => {
  initGoogleLogin();
  renderApp();
  document.getElementById('logout-btn').addEventListener('click', logout);
});
