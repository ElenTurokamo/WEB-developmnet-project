/**
 * Система анимации портфолио
 * Обрабатывает сложные анимации для обложки альбома, виниловой пластинки и переходов контента
 */

// Внешняя библиотека для извлечения основного цвета с изображения (предполагаем, что она доступна)
// Для работы этого кода потребуется библиотека, такая как 'color-thief' или аналогичная,
// которую нужно будет подключить в HTML: <script src="path/to/color-thief.min.js"></script>
// В рамках этой задачи я буду использовать упрощенный подход, предполагая, что основной цвет
// можно извлечь или что он будет указан в данных проекта (portfolioData).

class PortfolioAnimationManager {
  constructor() {
    this.currentIndex = 0;
    this.isAnimating = false;
    this.currentRotation = 0;
    this.audioElement = null;
    
    // Элементы DOM
    this.portfolioSection = document.getElementById('portfolioSection');
    this.albumArtContainer = document.querySelector('.album-art-container');
    this.albumArt = document.querySelector('.album-art');
    this.vinylRecord = document.getElementById('vinylRecord');
    this.projectTitle = document.getElementById('projectTitle');
    this.projectDescription = document.getElementById('projectDescription');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.playBtn = document.getElementById('playBtn');
    this.albumArtGlow = document.querySelector('.album-art-glow'); 
    
    this.init();
  }

  init() {
    // Привязка слушателей событий
    this.prevBtn.addEventListener('click', () => this.handlePrevious());
    this.nextBtn.addEventListener('click', () => this.handleNext());
    this.playBtn.addEventListener('click', () => this.handlePlayClick());
    
    // Инициализация аудиоэлемента
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    
    // Загрузка начального проекта
    this.loadProject(this.currentIndex);
  }

  /**
   * Загружает данные проекта и обновляет DOM
   */
  loadProject(index) {
    if (index < 0 || index >= portfolioData.length) return;
    
    const project = portfolioData[index];
    
    // Обновление текстового контента
    this.projectTitle.textContent = project.title;
    this.projectDescription.textContent = project.description;
    
    // Обновление обложки альбома
    this.albumArt.src = project.albumArt;
    
    // Обновление фона
    this.updateBackground(project.backgroundImage);

    // Извлечение цвета и обновление свечения
    // ПРИМЕЧАНИЕ: Для реального извлечения цвета потребуется библиотека.
    // Здесь мы предполагаем, что цвет либо задан в данных, либо используем заглушку.
    // Для демонстрации используем заглушку, но в реальном проекте нужно использовать ColorThief.
    const glowColor = project.glowColor || 'rgba(0, 191, 255, 0.8)'; 
    this.updateGlowColor(glowColor);
    
    // Обновление аудио
    this.audioElement.src = project.audioUrl;
  }

  /**
   * Обновляет цвет свечения на основе основного цвета обложки
   */
  updateGlowColor(color) {
    if (this.albumArtGlow) {
      // Предполагаем, что цвет передается в формате RGBA или HEX
      // Обновляем box-shadow для .album-art-glow
      this.albumArtGlow.style.boxShadow = `
        0 0 15px 5px ${color},
        0 0 30px 10px ${color.replace('0.8', '0.4') || color}
      `;
    }
  }

  /**
   * Обновляет фоновое изображение с плавным переходом
   */
  updateBackground(imageUrl) {
    // Создание временного изображения для предварительной загрузки
    const img = new Image();
    img.onload = () => {
      this.portfolioSection.style.backgroundImage = 
        `url('${imageUrl}')`;
    };
    img.src = imageUrl;
  }


  // ================================
  //         КНОПКИ ДЕЙСТВИЙ
  // ================================

// Далее
  handleNext() {
    if (this.isAnimating) return;
    
    const nextIndex = (this.currentIndex + 1) % portfolioData.length;
    this.triggerTransition(nextIndex);
  }

// Назад
  handlePrevious() {
    if (this.isAnimating) return;
    
    const prevIndex = (this.currentIndex - 1 + portfolioData.length) % portfolioData.length;
    this.triggerTransition(prevIndex);
  }

// Воспроизвести
handlePlayClick() {
  const record = this.vinylRecord;
  if (!record) return;

  // Если сейчас крутится — плавно останавливаем
  if (this.isAnimating) {
    this.playBtn.querySelector('span').textContent = '▶';
    const computedStyle = window.getComputedStyle(record);
    const transform = computedStyle.transform;
    const currentRotation = this.getRotationFromTransform(transform);
    const remainingRotation = 360 - (currentRotation % 360);

    // Отключаем бесконечное вращение
    record.style.animation = 'none';
    record.style.setProperty('--current-rotation', `${currentRotation}deg`);
    record.style.transform = `rotate(${currentRotation}deg)`;

    // Плавно докручиваем остаток
    record.style.transition = 'transform 0.4s ease-out';
    record.offsetHeight; // форсируем перерисовку
    record.style.transform = `rotate(${currentRotation + remainingRotation}deg)`;

    setTimeout(() => {
      record.style.transition = 'none';
      record.classList.remove('spinning');
      record.classList.add('stop-spin');
      this.isAnimating = false;
    }, 400);
  }

  // Если не крутится — запускаем вращение
  else {
    this.playBtn.querySelector('span').textContent = '❚❚'; // Иконка паузы
    record.classList.remove('stop-spin');
    record.classList.add('spinning');
    record.style.animation = 'spin 20s linear infinite';
    record.style.transition = 'none';
    this.isAnimating = true;
  }
}



  // /**
  //  * Извлечение угла поворота из матрицы преобразования
  //  */
  getRotationFromTransform(transform) {
    if (transform === 'none') return 0;
    
    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  }

// stopVinylAnimation() {
//   const record = this.vinylRecord;
//   if (!record) return;

//   // Получаем текущий угол
//   const computedStyle = window.getComputedStyle(record);
//   const transform = computedStyle.transform;
//   const currentRotation = this.getRotationFromTransform(transform);

//   // Сколько осталось до конца круга
//   const remainingRotation = 360 - (currentRotation % 360);

//   // Отключаем текущую бесконечную анимацию
//   record.style.animation = 'none';

//   // Устанавливаем текущий угол как старт
//   record.style.transform = `rotate(${currentRotation}deg)`;

//   // Добавляем плавную докрутку
//   record.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//   record.offsetHeight; // форсируем перерисовку

//   // Запускаем плавный остаток
//   record.style.transform = `rotate(${currentRotation + remainingRotation}deg)`;

//   // После завершения останавливаем всё окончательно
//   setTimeout(() => {
//     record.style.transition = 'none';
//     record.style.animation = 'none';
//   }, 500);
// }







  /**
   * Основная последовательность перехода
   * 1. Пластинка останавливается и входит в альбом
   * 2. Альбом уходит влево
   * 3. Новый альбом входит справа
   * 4. Пластинка выходит из альбома и начинает вращаться
   */
  triggerTransition(nextIndex) {
    this.isAnimating = true;
    
    // Шаг 1: Остановка пластинки и ее вход в альбом (0.6с)
    this.vinylRecord.classList.remove('spinning');
    this.vinylRecord.classList.add('stop-spin', 'enter-album');
    
    // Анимация свечения: уходит вместе с обложкой
    this.albumArtGlow.classList.add('exit-to-left');
    
    // Шаг 2: Альбом уходит влево (начинается немедленно, длительность 0.6с)
    this.albumArtContainer.classList.add('exit-to-left');
    
    // Шаг 3: Через 0.6с новый альбом входит справа, а пластинка выходит
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.loadProject(this.currentIndex);
      
      // Сброс классов обложки альбома и добавление анимации входа
      this.albumArtContainer.classList.remove('exit-to-left');
      this.albumArtContainer.classList.add('enter-from-right');
      
      // Анимация свечения: входит вместе с обложкой
      this.albumArtGlow.classList.remove('exit-to-left');
      this.albumArtGlow.classList.add('enter-from-right');

      // Сброс классов пластинки и добавление анимации выхода
      this.vinylRecord.classList.remove('stop-spin', 'enter-album');
      this.vinylRecord.classList.add('exit-album');
      
      // Шаг 4: Еще через 0.3с (всего 0.9с) пластинка снова начинает вращаться
      setTimeout(() => {
        this.albumArtContainer.classList.remove('enter-from-right');
        this.albumArtGlow.classList.remove('enter-from-right'); // Сброс класса свечения
        this.vinylRecord.classList.remove('exit-album');
        this.vinylRecord.classList.add('spinning');
        
        this.isAnimating = false;
      }, 300);
    }, 600);
  }

  /**
   * Анимация "Пластинка в альбом" (запускается кнопкой воспроизведения)
   * Аналогична переходу, но остается на текущем проекте
   */
  triggerVinylToAlbumAnimation() {
    this.isAnimating = true;
    
    // Остановка пластинки и ее вход в альбом
    this.vinylRecord.classList.remove('spinning');
    this.vinylRecord.classList.add('stop-spin', 'enter-album');

    // Анимация свечения: уходит вместе с обложкой
    this.albumArtGlow.classList.add('exit-to-left');
    
    // Альбом уходит влево
    this.albumArtContainer.classList.add('exit-to-left');
    
    // Через 0.6с альбом возвращается, а пластинка выходит
    setTimeout(() => {
      this.albumArtContainer.classList.remove('exit-to-left');
      this.albumArtContainer.classList.add('enter-from-right');

      // Анимация свечения: входит вместе с обложкой
      this.albumArtGlow.classList.remove('exit-to-left');
      this.albumArtGlow.classList.add('enter-from-right');
      
      this.vinylRecord.classList.remove('stop-spin', 'enter-album');
      this.vinylRecord.classList.add('exit-album');
      
      // Еще через 0.3с пластинка снова начинает вращаться
      setTimeout(() => {
        this.albumArtContainer.classList.remove('enter-from-right');
        this.albumArtGlow.classList.remove('enter-from-right'); // Сброс класса свечения
        this.vinylRecord.classList.remove('exit-album');
        this.vinylRecord.classList.add('spinning');
        
        this.isAnimating = false;
      }, 300);
    }, 600);
  }
}

// Инициализация менеджера анимации, когда DOM готов
document.addEventListener('DOMContentLoaded', () => {
  // Добавляем заглушку для цвета в данные проекта, чтобы продемонстрировать смену цвета
  // В реальном проекте здесь нужно будет использовать библиотеку для извлечения цвета.
  portfolioData[0].glowColor = 'rgba(247, 253, 255, 0.1)'; // Синий
  portfolioData[1].glowColor = 'rgba(255, 0, 0, 0.8)';   // Красный
  portfolioData[2].glowColor = 'rgba(0, 255, 0, 0.8)';   // Зеленый

  new PortfolioAnimationManager();
});
