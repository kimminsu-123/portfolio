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

async function handleCredentialResponse(response) {
  const idToken = response.credential;

  let data;
  try {
    const res = await fetch(CONFIG.EXEC_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'verifyLogin', idToken: idToken }),
    });
    data = await res.json();
  } catch (err) {
    alert('백엔드 요청에 실패했습니다: ' + err);
    return;
  }

  if (!data.ok) {
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
