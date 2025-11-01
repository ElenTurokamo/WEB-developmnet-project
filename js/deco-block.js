const container = document.querySelector('.placeholder-top');
const img = container.querySelector('.decorative-placeholder img');

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y / rect.height) - 0.5) * -25;
  const rotateY = ((x / rect.width) - 0.5) * 25;
  img.style.transform = `translateX(50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

container.addEventListener('mouseleave', () => {
  img.style.transform = 'translateX(50%) rotateX(0deg) rotateY(0deg) scale(1)';
});
