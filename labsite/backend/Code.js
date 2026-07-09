function doGet(e) {
  return jsonResponse({ ok: true, message: 'LabSite backend alive' });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'invalid json body' });
  }

  switch (body.action) {
    case 'verifyLogin':
      return handleVerifyLogin(body.idToken);
    default:
      return jsonResponse({ ok: false, error: 'unknown action' });
  }
}

function handleVerifyLogin(idToken) {
  const email = verifyGoogleIdToken(idToken);
  if (!email) {
    return jsonResponse({ ok: false, error: 'invalid token' });
  }

  const adminEmail = getConfig().adminEmail;
  return jsonResponse({ ok: true, email: email, isAdmin: email === adminEmail });
}

function verifyGoogleIdToken(idToken) {
  const oauthClientId = getConfig().oauthClientId;
  const res = UrlFetchApp.fetch(
    'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken),
    { muteHttpExceptions: true }
  );
  if (res.getResponseCode() !== 200) return null;

  const payload = JSON.parse(res.getContentText());
  if (payload.aud !== oauthClientId) return null;
  if (payload.email_verified !== 'true' && payload.email_verified !== true) return null;

  return payload.email;
}

function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    adminEmail: props.getProperty('ADMIN_EMAIL'),
    lectureFolderId: props.getProperty('LECTURE_FOLDER_ID'),
    submissionRootFolderId: props.getProperty('SUBMISSION_ROOT_FOLDER_ID'),
    oauthClientId: props.getProperty('GOOGLE_OAUTH_CLIENT_ID'),
  };
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function myFunction() {
  Logger.log(getConfig());
}
