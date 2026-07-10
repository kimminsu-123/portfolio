function renderApp() {
  const session = getSession();

  const loginArea = document.getElementById('login-area');
  const userArea = document.getElementById('user-area');
  const loggedOutView = document.getElementById('logged-out-view');
  const notRegisteredView = document.getElementById('not-registered-view');
  const loggedInView = document.getElementById('logged-in-view');
  const lecturesSection = document.getElementById('lectures-section');

  if (!session) {
    loginArea.style.display = 'block';
    userArea.style.display = 'none';
    loggedOutView.style.display = 'block';
    notRegisteredView.style.display = 'none';
    loggedInView.style.display = 'none';
    lecturesSection.style.display = 'none';
    return;
  }

  const canViewContent = session.isAdmin || session.isStudent;

  loginArea.style.display = 'none';
  userArea.style.display = 'flex';
  document.getElementById('user-email').textContent = session.isAdmin ? session.email : (session.name || session.email);
  document.getElementById('user-role').textContent = session.isAdmin ? '관리자' : (session.isStudent ? '수강생' : '미등록');
  document.getElementById('admin-page-btn').style.display = session.isAdmin ? 'inline-block' : 'none';

  loggedOutView.style.display = 'none';
  notRegisteredView.style.display = canViewContent ? 'none' : 'block';
  loggedInView.style.display = canViewContent ? 'block' : 'none';
  lecturesSection.style.display = canViewContent ? 'block' : 'none';

  if (canViewContent) {
    document.getElementById('welcome-message').textContent = session.isAdmin
      ? '관리자로 로그인되었습니다.'
      : '수강생으로 로그인되었습니다.';
    loadLectures();
  }
}

window.addEventListener('load', () => {
  initGoogleLogin();
  renderApp();
  document.getElementById('logout-btn').addEventListener('click', logout);
  document.getElementById('admin-page-btn').addEventListener('click', () => {
    window.open('./admin.html', 'labsite-admin', 'width=1000,height=800,resizable=yes,scrollbars=yes');
  });
});
