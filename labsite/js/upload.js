async function handleUploadSubmit(e) {
  e.preventDefault();

  const session = getSession();
  if (!session || !session.isAdmin) {
    alert('관리자만 업로드할 수 있습니다.');
    return;
  }

  const titleInput = document.getElementById('upload-title');
  const weekInput = document.getElementById('upload-week');
  const fileInput = document.getElementById('upload-file');
  const submitBtn = document.getElementById('upload-submit-btn');
  const statusEl = document.getElementById('upload-status');

  const file = fileInput.files[0];
  if (!file) return;

  submitBtn.disabled = true;
  statusEl.textContent = '업로드 중... (PPT는 슬라이드 변환 때문에 시간이 걸릴 수 있습니다)';

  try {
    const fileBase64 = await readFileAsBase64(file);
    const res = await fetch(CONFIG.EXEC_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'uploadLecture',
        idToken: session.idToken,
        title: titleInput.value,
        week: weekInput.value,
        fileName: file.name,
        fileBase64: fileBase64,
      }),
    });
    const data = await res.json();

    if (!data.ok) {
      statusEl.textContent = '업로드 실패: ' + data.error;
      return;
    }

    statusEl.textContent = '업로드 완료';
    document.getElementById('upload-form').reset();
    loadLectures({ showDeleteButton: true });
  } catch (err) {
    statusEl.textContent = '업로드 요청 실패: ' + err;
  } finally {
    submitBtn.disabled = false;
  }
}

window.addEventListener('load', function () {
  document.getElementById('upload-form').addEventListener('submit', handleUploadSubmit);
});
