const texts = [
"Привет! 👋",
"Я печатаю текст автоматически.",
"И могу выводить разные фразы!",
"Красиво, правда? 😎"
];

const speedTyping = 90;   // скорость печати
const speedDeleting = 50; // скорость удаления
const delayBetweenTexts = 1500; // пауза между текстами

let textIndex = 0;
let charIndex = 0;

const typedTextSpan = document.getElementById("typed-text");

function type() {
if (charIndex < texts[textIndex].length) {
    typedTextSpan.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, speedTyping);
} else {
    setTimeout(deleteText, delayBetweenTexts);
}
}

function deleteText() {
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
