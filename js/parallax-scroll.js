function parallaxScroll() { // Функция для создания эффекта параллакса при прокрутке страницы.
    const header = document.querySelector('body'); // Получаем элемент <header>
    const scrolled = window.pageYOffset; // Определяем, сколько пикселей пользователь прокрутил страницу по вертикали
    header.style.backgroundPositionY = -(scrolled * 0.3) + 'px'; // Изменяем вертикальную позицию фона хедера для создания эффекта параллакса
}

window.addEventListener('scroll', parallaxScroll); // Добавляем событие прокрутки, которое вызывает функцию parallaxScroll при скроллинге страницы
