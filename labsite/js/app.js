function renderApp() {
  hideLoadingView();
  const session = getSession();

  const loginArea = document.getElementById('login-area');
  const userArea = document.getElementById('user-area');
  const loggedOutView = document.getElementById('logged-out-view');
  const notRegisteredView = document.getElementById('not-registered-view');
  const memberLayout = document.getElementById('member-layout');

  if (!session) {
    loginArea.style.display = 'block';
    userArea.style.display = 'none';
    loggedOutView.style.display = 'block';
    notRegisteredView.style.display = 'none';
    memberLayout.style.display = 'none';
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
  memberLayout.style.display = canViewContent ? 'flex' : 'none';

  if (canViewContent) {
    loadLectures();
    loadAssignments();
  }
}

function initSideNav() {
  const items = document.querySelectorAll('.side-nav-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      items.forEach(function (i) { i.classList.toggle('active', i === item); });
      document.querySelectorAll('.member-content .lectures-section').forEach(function (section) {
        section.style.display = section.id === item.dataset.target ? 'block' : 'none';
      });
    });
  });
}

window.addEventListener('load', async () => {
  initGoogleLogin();
  initSideNav();
  await refreshSession();
  renderApp();
  document.getElementById('logout-btn').addEventListener('click', logout);
  document.getElementById('admin-page-btn').addEventListener('click', () => {
    window.open('./admin.html', 'labsite-admin', 'width=1000,height=800,resizable=yes,scrollbars=yes');
  });
});
