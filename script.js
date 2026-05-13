const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
const orb3 = document.querySelector('.orb-3');

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  orb2.style.transform = `translate(${x * -0.4}px, ${y * -0.4}px)`;
  orb3.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});
