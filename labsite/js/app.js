function renderApp() {
  const session = getSession();

  const loginArea = document.getElementById('login-area');
  const userArea = document.getElementById('user-area');
  const loggedOutView = document.getElementById('logged-out-view');
  const loggedInView = document.getElementById('logged-in-view');

  if (session) {
    loginArea.style.display = 'none';
    userArea.style.display = 'flex';
    document.getElementById('user-email').textContent = session.email;
    document.getElementById('user-role').textContent = session.isAdmin ? '관리자' : '수강생';

    loggedOutView.style.display = 'none';
    loggedInView.style.display = 'block';
    document.getElementById('welcome-message').textContent = session.isAdmin
      ? '관리자로 로그인되었습니다.'
      : '수강생으로 로그인되었습니다.';
  } else {
    loginArea.style.display = 'block';
    userArea.style.display = 'none';
    loggedOutView.style.display = 'block';
    loggedInView.style.display = 'none';
  }
}

window.addEventListener('load', () => {
  initGoogleLogin();
  renderApp();
  document.getElementById('logout-btn').addEventListener('click', logout);
});
