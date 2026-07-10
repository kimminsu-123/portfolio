const SESSION_KEY = 'labsite_session';

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function showLoadingView() {
  const el = document.getElementById('loading-view');
  if (el) el.style.display = 'flex';
}

function hideLoadingView() {
  const el = document.getElementById('loading-view');
  if (el) el.style.display = 'none';
}

async function verifyLoginWithBackend(idToken) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'verifyLogin', idToken: idToken }),
  });
  return res.json();
}

async function handleCredentialResponse(response) {
  const idToken = response.credential;
  showLoadingView();

  let data;
  try {
    data = await verifyLoginWithBackend(idToken);
  } catch (err) {
    hideLoadingView();
    alert('백엔드 요청에 실패했습니다: ' + err);
    return;
  }

  if (!data.ok) {
    hideLoadingView();
    alert('로그인 확인에 실패했습니다: ' + data.error);
    return;
  }

  setSession({
    email: data.email,
    isAdmin: data.isAdmin,
    isStudent: data.isStudent,
    name: data.name,
    idToken: idToken,
  });
  renderApp();
}

// 새로고침 시 캐시된 세션을 그대로 믿지 않고 서버 기준(수강생 명부 등록 여부, 토큰 만료)으로 재검증
async function refreshSession() {
  const session = getSession();
  if (!session) return;

  let data;
  try {
    data = await verifyLoginWithBackend(session.idToken);
  } catch (err) {
    return;
  }

  if (!data.ok) {
    clearSession();
    return;
  }

  setSession({
    email: data.email,
    isAdmin: data.isAdmin,
    isStudent: data.isStudent,
    name: data.name,
    idToken: session.idToken,
  });
}

function initGoogleLogin() {
  google.accounts.id.initialize({
    client_id: CONFIG.GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById('google-signin-button'),
    { theme: 'outline', size: 'large', text: 'signin_with' }
  );
}

function logout() {
  clearSession();
  renderApp();
}
