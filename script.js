document.addEventListener('DOMContentLoaded', () => {
  // Parallax orbs
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    if (!orb1 || !orb2 || !orb3) return;

    orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
    orb2.style.transform = `translate(${x * -0.4}px, ${y * -0.4}px)`;
    orb3.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  // Demo card interactions
  const switchEl = document.querySelector('.switch');
  const accentSlider = document.querySelector('.accent-slider');
  const blurSlider = document.querySelector('.blur-slider');
  const demoCard = document.querySelector('.demo-card');

  // Toggle ambient state
  if (switchEl && demoCard) {
    switchEl.addEventListener('click', () => {
      const isOn = switchEl.classList.toggle('switch-on');

      // Slight scale / glow when "on"
      demoCard.style.transform = isOn ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)';
      demoCard.style.boxShadow = isOn
        ? '0 26px 90px rgba(0,0,0,.8)'
        : '0 24px 80px rgba(0,0,0,.6)';
    });
  }

  // Accent hue slider -> update CSS variable
  if (accentSlider) {
    accentSlider.addEventListener('input', (e) => {
      const hue = e.target.value;
      document.documentElement.style.setProperty('--accent-hue', hue);
    });
  }

  // Blur slider -> adjust backdrop blur & cloud blur
  if (blurSlider && demoCard) {
    blurSlider.addEventListener('input', (e) => {
      const blur = e.target.value;
      demoCard.style.backdropFilter = `blur(${blur}px)`;
      // So the background responds too
      document.querySelectorAll('.cloud').forEach((cloud) => {
        cloud.style.filter = `blur(${blur}px)`;
      });
    });
  }
});
