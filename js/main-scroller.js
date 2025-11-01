// Скрипт, отвечающий за визуализацию галереи-скроллера
// на главной странице сайта.

const imageFolder = "../img/gallery";
const imageFiles = [
  "1.png", "2.png", "3.png", "4.png",
   "5.png", "6.png", 
  //  "7.png", "8.png",
  // "9.png", "10.png", "11.png", "12.png",
  // "13.png", "14.png", "15.png", "16.png",
  // "17.png", "18.png", "19.png", "20.png",
  // "21.png", "22.png", "23.png", "24.png"
];

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
