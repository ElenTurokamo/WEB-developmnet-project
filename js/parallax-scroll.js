function parallaxScroll() {
  const body = document.querySelector('body'); // Получаем элемент body
  const scrolled = window.scrollY; // сколько пикселей прокрутили
  body.style.backgroundPositionY = -(scrolled * 0.3) + 'px'; // создаём смещение
}

window.addEventListener('scroll', parallaxScroll);
