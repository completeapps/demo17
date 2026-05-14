document.addEventListener('DOMContentLoaded', () => {
  // Parallax orbs
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');

  window.addEventListener('mousemove', (e) => {
    if (!orb1 || !orb2 || !orb3) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
    orb2.style.transform = `translate(${x * -0.4}px, ${y * -0.4}px)`;
    orb3.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  // View switching (tabs + buttons)
  const views = document.querySelectorAll('.view');
  const tabButtons = document.querySelectorAll('.nav-tab');
  const actionButtons = document.querySelectorAll('[data-view]');

  function showView(id) {
    views.forEach(v => {
      v.classList.toggle('view--active', v.dataset.viewId === id);
    });
    tabButtons.forEach(btn => {
      btn.classList.toggle('nav-tab--active', btn.dataset.view === id);
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  actionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.view;
      if (target) showView(target);
    });
  });

  // Volume panel interactions (centered panel)
  const panelTrack = document.querySelector('.volume-panel-track');
  const panelFill = document.querySelector('.volume-panel-fill');
  const panelThumb = document.querySelector('.volume-panel-thumb');
  const levelText = document.querySelector('.volume-level-text');

  if (panelTrack && panelFill && panelThumb && levelText) {
    let level = 0.7; // 0–1

    const applyLevel = () => {
      const pct = Math.round(level * 100);
      panelFill.style.width = pct + '%';
      panelThumb.style.left = pct + '%';
      levelText.textContent = pct + '%';
    };

    applyLevel();

    function setLevelFromClientX(clientX) {
      const rect = panelTrack.getBoundingClientRect();
      let ratio = (clientX - rect.left) / rect.width;
      ratio = Math.min(1, Math.max(0, ratio));
      level = ratio;
      applyLevel();
    }

    panelTrack.addEventListener('click', (e) => {
      setLevelFromClientX(e.clientX);
    });

    let dragging = false;

    panelThumb.addEventListener('mousedown', (e) => {
      dragging = true;
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      setLevelFromClientX(e.clientX);
    });
    document.addEventListener('mouseup', () => {
      dragging = false;
    });

    // Touch support
    panelThumb.addEventListener('touchstart', (e) => {
      dragging = true;
      e.preventDefault();
    }, { passive: false });
    document.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      const touch = e.touches[0];
      setLevelFromClientX(touch.clientX);
    }, { passive: false });
    document.addEventListener('touchend', () => {
      dragging = false;
    });
  }

  // AI search demo interactions
  const aiButton = document.querySelector('.aisearch-button');
  const scanHighlight = document.querySelector('.aisearch-scan-highlight');
  const resultTitle = document.querySelector('.aisearch-result-title');
  const resultBody = document.querySelector('.aisearch-result-body');

  if (aiButton && scanHighlight && resultTitle && resultBody) {
    aiButton.addEventListener('click', () => {
      // Trigger highlight animation
      scanHighlight.style.transition = 'none';
      scanHighlight.style.opacity = '1';
      scanHighlight.style.transform = 'translateX(-120%)';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scanHighlight.style.transition = 'transform 1.4s ease-out, opacity 1.4s ease-out';
          scanHighlight.style.transform = 'translateX(160%)';
          scanHighlight.style.opacity = '0';
        });
      });

      // Fake AI response text
      resultTitle.textContent = 'AI summary';
      resultBody.textContent = 'This screen shows a blur-heavy, glass UI inspired by Android 17, '
        + 'with a centered volume HUD and an AI search overlay demo.';
    });
  }
});
