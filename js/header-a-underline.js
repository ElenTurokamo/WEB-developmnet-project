document.querySelectorAll('.nav-list a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});