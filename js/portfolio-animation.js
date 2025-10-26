/**
 * Система анимации портфолио
 * Обрабатывает сложные анимации для обложки альбома, виниловой пластинки и переходов контента
 */

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
    
    // Обновление аудио
    this.audioElement.src = project.audioUrl;
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

  /**
   * Обработка нажатия кнопки "Далее"
   */
  handleNext() {
    if (this.isAnimating) return;
    
    const nextIndex = (this.currentIndex + 1) % portfolioData.length;
    this.triggerTransition(nextIndex);
  }

  /**
   * Обработка нажатия кнопки "Назад"
   */
  handlePrevious() {
    if (this.isAnimating) return;
    
    const prevIndex = (this.currentIndex - 1 + portfolioData.length) % portfolioData.length;
    this.triggerTransition(prevIndex);
  }

  /**
   * Обработка нажатия кнопки "Воспроизвести" - останавливает пластинку и запускает переход
   */
  handlePlayClick() {
    if (this.isAnimating) return;
    
    // Получение текущего угла поворота с виниловой пластинки
    const computedStyle = window.getComputedStyle(this.vinylRecord);
    const transform = computedStyle.transform;
    this.currentRotation = this.getRotationFromTransform(transform);
    
    // Запуск остановки пластинки и перехода альбома
    this.triggerVinylToAlbumAnimation();
  }

  /**
   * Извлечение угла поворота из матрицы преобразования
   */
  getRotationFromTransform(transform) {
    if (transform === 'none') return 0;
    
    const values = transform.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  }

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
    
    // Шаг 2: Альбом уходит влево (начинается немедленно, длительность 0.6с)
    this.albumArtContainer.classList.add('exit-to-left');
    
    // Шаг 3: Через 0.6с новый альбом входит справа, а пластинка выходит
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.loadProject(this.currentIndex);
      
      // Сброс классов обложки альбома и добавление анимации входа
      this.albumArtContainer.classList.remove('exit-to-left');
      this.albumArtContainer.classList.add('enter-from-right');
      
      // Сброс классов пластинки и добавление анимации выхода
      this.vinylRecord.classList.remove('stop-spin', 'enter-album');
      this.vinylRecord.classList.add('exit-album');
      
      // Шаг 4: Еще через 0.3с (всего 0.9с) пластинка снова начинает вращаться
      setTimeout(() => {
        this.albumArtContainer.classList.remove('enter-from-right');
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
    
    // Альбом уходит влево
    this.albumArtContainer.classList.add('exit-to-left');
    
    // Через 0.6с альбом возвращается, а пластинка выходит
    setTimeout(() => {
      this.albumArtContainer.classList.remove('exit-to-left');
      this.albumArtContainer.classList.add('enter-from-right');
      
      this.vinylRecord.classList.remove('stop-spin', 'enter-album');
      this.vinylRecord.classList.add('exit-album');
      
      // Еще через 0.3с пластинка снова начинает вращаться
      setTimeout(() => {
        this.albumArtContainer.classList.remove('enter-from-right');
        this.vinylRecord.classList.remove('exit-album');
        this.vinylRecord.classList.add('spinning');
        
        this.isAnimating = false;
      }, 300);
    }, 600);
  }
}

// Инициализация менеджера анимации, когда DOM готов
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioAnimationManager();
});
