const texts = [
  "Fixing one bug, creating three...",
  "Why it works? Why it doesn't?",
  "It works on my machine...",
  "StackOverflow to the rescue...",
  "Renaming variables... again...",
  "Just five more minutes...",
  "Waiting for build to finish...",
  "Adding TODO for future me...",
  "Googling the same thing again...",
  "Dark theme = productivity."
];

const speedTyping = 60;
const speedDeleting = 50;
const delayBetweenTexts = 2000;

let textIndex = 0;
let charIndex = 0;

const typedTextSpan = document.getElementById("typed-text");
const cursor = document.getElementById("cursor");

// ✅ отключение мерцания + сброс анимации
function freezeCursor() {
  cursor.style.animation = "none";
  cursor.style.opacity = "1"; // принудительно видимый
}

function resumeCursorBlink() {
  cursor.style.animation = ""; // возвращаем CSS animation blink
}

function type() {
  freezeCursor();  // курсор не мигает во время печати

  if (charIndex < texts[textIndex].length) {
    typedTextSpan.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;

    // ✅ сбрасываем таймер мигания на каждую букву
    freezeCursor();

    setTimeout(type, speedTyping);
  } else {
    resumeCursorBlink(); // снова мигает когда печать закончилась
    setTimeout(deleteText, delayBetweenTexts);
  }
}

function deleteText() {
  freezeCursor(); // курсор не мигает во время удаления

  if (charIndex > 0) {
    typedTextSpan.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteText, speedDeleting);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, speedTyping);
  }
}

type();
