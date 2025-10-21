function parallaxScroll() {
  const body = document.querySelector('body'); 
  const scrolled = window.scrollY; 
  body.style.backgroundPositionY = -(scrolled * 0.3) + 'px'; 
}

window.addEventListener('scroll', parallaxScroll);
