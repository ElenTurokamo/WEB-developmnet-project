function toggleDarkMode() {
  const body = document.body;
  const placeholderImage = document.querySelector('.decorative-placeholder img');

  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    placeholderImage.src = "/img/misc/Deco-block-dark-theme.png";
  } else {
    placeholderImage.src = "/img/misc/Deco-block.png";
  }
}
