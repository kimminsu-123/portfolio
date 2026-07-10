function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

async function fetchLectures() {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'listLectures' }),
  });
  return res.json();
}

async function fetchLecturePreview(lectureId) {
  const res = await fetch(CONFIG.EXEC_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'getLecturePreview', lectureId: lectureId }),
  });
  return res.json();
}

function renderLectureList(lectures) {
  const container = document.getElementById('lectures-list');

  if (lectures.length === 0) {
    container.innerHTML = '<p class="lectures-empty">등록된 강의자료가 없습니다.</p>';
    return;
  }

  container.innerHTML = lectures.map(function (lecture) {
    const typeLabel = lecture.fileType === 'ppt' ? 'PPT' : 'HTML';
    const weekLabel = lecture.week ? 'Week ' + escapeHtml(lecture.week) : '';
    return (
      '<div class="lecture-card">' +
        '<div class="lecture-info">' +
          '<span class="lecture-week">' + weekLabel + '</span>' +
          '<span class="lecture-title">' + escapeHtml(lecture.title) + '</span>' +
          '<span class="lecture-type-badge lecture-type-' + escapeHtml(lecture.fileType) + '">' + typeLabel + '</span>' +
        '</div>' +
        '<button class="lecture-preview-btn" data-id="' + escapeHtml(lecture.id) + '">미리보기</button>' +
      '</div>'
    );
  }).join('');

  container.querySelectorAll('.lecture-preview-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { openPreview(btn.dataset.id); });
  });
}

async function loadLectures() {
  const container = document.getElementById('lectures-list');
  try {
    const data = await fetchLectures();
    if (!data.ok) {
      container.innerHTML = '<p class="lectures-empty">강의자료를 불러오지 못했습니다.</p>';
      return;
    }
    renderLectureList(data.lectures);
  } catch (err) {
    container.innerHTML = '<p class="lectures-empty">강의자료를 불러오지 못했습니다.</p>';
  }
}

let currentSlides = [];
let currentSlideIndex = 0;

function showSlide(index) {
  currentSlideIndex = index;
  document.getElementById('slide-image').src = currentSlides[index];
  document.getElementById('slide-counter').textContent = (index + 1) + ' / ' + currentSlides.length;
}

function renderPptPreview(slideImageUrls) {
  const body = document.getElementById('preview-body');
  currentSlides = slideImageUrls;
  currentSlideIndex = 0;

  if (currentSlides.length === 0) {
    body.innerHTML = '<p class="lectures-empty">슬라이드 이미지가 없습니다.</p>';
    return;
  }

  body.innerHTML =
    '<div class="slide-viewer">' +
      '<img id="slide-image" src="">' +
      '<div class="slide-controls">' +
        '<button id="slide-prev">‹</button>' +
        '<span id="slide-counter"></span>' +
        '<button id="slide-next">›</button>' +
      '</div>' +
    '</div>';

  document.getElementById('slide-prev').addEventListener('click', function () {
    if (currentSlideIndex > 0) showSlide(currentSlideIndex - 1);
  });
  document.getElementById('slide-next').addEventListener('click', function () {
    if (currentSlideIndex < currentSlides.length - 1) showSlide(currentSlideIndex + 1);
  });
  showSlide(0);
}

function renderHtmlPreview(html) {
  const body = document.getElementById('preview-body');
  body.innerHTML = '<iframe id="html-preview-frame" sandbox="allow-scripts"></iframe>';
  document.getElementById('html-preview-frame').srcdoc = html;
}

async function openPreview(lectureId) {
  const overlay = document.getElementById('preview-overlay');
  const body = document.getElementById('preview-body');
  const title = document.getElementById('preview-title');

  overlay.style.display = 'flex';
  body.innerHTML = '<p class="lectures-empty">불러오는 중...</p>';
  title.textContent = '';

  let data;
  try {
    data = await fetchLecturePreview(lectureId);
  } catch (err) {
    body.innerHTML = '<p class="lectures-empty">미리보기를 불러오지 못했습니다.</p>';
    return;
  }

  if (!data.ok) {
    body.innerHTML = '<p class="lectures-empty">미리보기를 불러오지 못했습니다.</p>';
    return;
  }

  title.textContent = data.title;

  if (data.fileType === 'ppt') {
    renderPptPreview(data.slideImageUrls);
  } else if (data.fileType === 'html') {
    renderHtmlPreview(data.html);
  }
}

function closePreview() {
  document.getElementById('preview-overlay').style.display = 'none';
  document.getElementById('preview-body').innerHTML = '';
}

window.addEventListener('load', function () {
  loadLectures();
  document.getElementById('preview-close-btn').addEventListener('click', closePreview);
  document.getElementById('preview-overlay').addEventListener('click', function (e) {
    if (e.target.id === 'preview-overlay') closePreview();
  });
});
