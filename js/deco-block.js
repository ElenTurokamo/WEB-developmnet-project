const container = document.querySelector('.placeholder-top');
const img = container.querySelector('.decorative-placeholder img');

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const rotateX = ((y / rect.height) - 0.5) * -25;
  const rotateY = ((x / rect.width) - 0.5) * 25;

  // просто меняем значения CSS-переменных
  img.style.setProperty('--rotateX', `${rotateX}deg`);
  img.style.setProperty('--rotateY', `${rotateY}deg`);
  img.style.setProperty('--scale', `1.05`);
});

container.addEventListener('mouseleave', () => {
  img.style.setProperty('--rotateX', `0deg`);
  img.style.setProperty('--rotateY', `0deg`);
  img.style.setProperty('--scale', `1`);
});
