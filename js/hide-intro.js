window.addEventListener("load", () => {
  const intro = document.getElementById("intro-screen");

  // 🚫 Сначала блокируем прокрутку
  document.body.style.overflow = "hidden";

  let introHidden = false;

  // ⚙️ Отслеживаем попытку скролла (колёсико, трекпад, свайп и т.д.)
  window.addEventListener(
    "wheel",
    (e) => {
      // === Если интро активно и пользователь пытается скроллить вниз ===
      if (!introHidden && e.deltaY > 0) {
        e.preventDefault(); // блокируем первый скролл
        intro.classList.add("hidden");
        intro.classList.remove("active");
        document.body.style.overflow = "auto"; // ✅ разрешаем скролл после скрытия интро
        introHidden = true;
      }
      // === Если пользователь снова скроллит вверх к самому верху страницы ===
      else if (introHidden && window.scrollY <= 0 && e.deltaY < 0) {
        intro.classList.remove("hidden");
        intro.classList.add("active");
        document.body.style.overflow = "hidden"; // 🚫 снова блокируем скролл
        introHidden = false;
      }
    },
    { passive: false } // нужно, чтобы preventDefault работал
  );
});
