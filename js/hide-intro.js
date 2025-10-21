window.addEventListener("load", () => {
  const intro = document.getElementById("intro-screen");

  document.body.style.overflow = "hidden";

  let introHidden = false;

  window.addEventListener(
    "wheel",
    (e) => {
      if (!introHidden && e.deltaY > 0) {
        e.preventDefault(); 
        intro.classList.add("hidden");
        intro.classList.remove("active");
        document.body.style.overflow = "auto"; 
        introHidden = true;
      }
      else if (introHidden && window.scrollY <= 0 && e.deltaY < 0) {
        intro.classList.remove("hidden");
        intro.classList.add("active");
        document.body.style.overflow = "hidden";
        introHidden = false;
      }
    },
    { passive: false }
  );
});
