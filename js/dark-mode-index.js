function toggleDarkMode() {
  var placeholderTop = document.querySelector('.placeholder-top');

  placeholderTop.classList.toggle('dark-theme');

  if (placeholderTop.classList.contains('dark-theme')) {
    document.querySelector('.theme-toggle').innerText = 'Светлая тема';
    placeholderTop.style.background = "linear-gradient(180deg, rgba(135, 195, 255, 0.4), rgba(192, 230, 255, 0.25))";
  } else {
    document.querySelector('.theme-toggle').innerText = 'Темная тема';
    placeholderTop.style.background = "linear-gradient(180deg, rgba(255, 135, 135, 0.4), rgba(255, 192, 192, 0.25))";
  }
}
