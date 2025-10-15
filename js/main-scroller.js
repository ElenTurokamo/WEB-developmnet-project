// Скрипт, отвечающий за визуализацию галереи-скроллера
// на главной странице сайта.

const imageFolder = "../img/gallery";
const imageFiles = ["1.png", "2.png", "3.png"];
const gallery = document.getElementById("gallery");

const repeat = 6;

for (let i = 0; i < repeat; i++) {
  imageFiles.forEach(file => {
    let img = document.createElement("img");
    img.src = `${imageFolder}/${file}`;
    gallery.appendChild(img);
  });
}

function updateSpeed() {
  const totalWidth = gallery.scrollWidth;          
  const distance = totalWidth / 2;                    
  const viewportWidth = window.innerWidth;           
  const baseSpeed = 100;           
  
  const pxPerSec = baseSpeed * (viewportWidth / 1000);
  const duration = distance / pxPerSec;         

  gallery.style.animationDuration = `${duration}s`;
}

window.addEventListener("load", updateSpeed);
window.addEventListener("resize", updateSpeed);
