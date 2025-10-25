/**
 * Portfolio Animation System
 * Handles complex animations for album art, vinyl record, and content transitions
 */

class PortfolioAnimationManager {
  constructor() {
    this.currentIndex = 0;
    this.isAnimating = false;
    this.currentRotation = 0;
    this.audioElement = null;
    
    // DOM Elements
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
    // Attach event listeners
    this.prevBtn.addEventListener('click', () => this.handlePrevious());
    this.nextBtn.addEventListener('click', () => this.handleNext());
    this.playBtn.addEventListener('click', () => this.handlePlayClick());
    
    // Initialize audio element
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    
    // Load initial project
    this.loadProject(this.currentIndex);
  }

  /**
   * Load project data and update DOM
   */
  loadProject(index) {
    if (index < 0 || index >= portfolioData.length) return;
    
    const project = portfolioData[index];
    
    // Update text content
    this.projectTitle.textContent = project.title;
    this.projectDescription.textContent = project.description;
    
    // Update album art
    this.albumArt.src = project.albumArt;
    
    // Update background
    this.updateBackground(project.backgroundImage);
    
    // Update audio
    this.audioElement.src = project.audioUrl;
  }

  /**
   * Update background image with smooth transition
   */
  updateBackground(imageUrl) {
    // Create a temporary image to preload
    const img = new Image();
    img.onload = () => {
      this.portfolioSection.style.backgroundImage = 
        `linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%), url('${imageUrl}')`;
    };
    img.src = imageUrl;
  }

  /**
   * Handle next button click
   */
  handleNext() {
    if (this.isAnimating) return;
    
    const nextIndex = (this.currentIndex + 1) % portfolioData.length;
    this.triggerTransition(nextIndex);
  }

  /**
   * Handle previous button click
   */
  handlePrevious() {
    if (this.isAnimating) return;
    
    const prevIndex = (this.currentIndex - 1 + portfolioData.length) % portfolioData.length;
    this.triggerTransition(prevIndex);
  }

  /**
   * Handle play button click - stops vinyl and triggers transition
   */
  handlePlayClick() {
    if (this.isAnimating) return;
    
    // Get current rotation angle from the vinyl record
    const computedStyle = window.getComputedStyle(this.vinylRecord);
    const transform = computedStyle.transform;
    this.currentRotation = this.getRotationFromTransform(transform);
    
    // Trigger the vinyl stop and album transition
    this.triggerVinylToAlbumAnimation();
  }

  /**
   * Extract rotation angle from transform matrix
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
   * Main transition sequence
   * 1. Vinyl stops and enters album
   * 2. Album exits to left
   * 3. New album enters from right
   * 4. Vinyl exits album and starts spinning
   */
  triggerTransition(nextIndex) {
    this.isAnimating = true;
    
    // Step 1: Stop vinyl and make it enter the album (0.6s)
    this.vinylRecord.classList.remove('spinning');
    this.vinylRecord.classList.add('stop-spin', 'enter-album');
    
    // Step 2: Album exits to left (starts immediately, 0.6s duration)
    this.albumArtContainer.classList.add('exit-to-left');
    
    // Step 3: After 0.6s, new album enters from right and vinyl exits
    setTimeout(() => {
      this.currentIndex = nextIndex;
      this.loadProject(this.currentIndex);
      
      // Reset album art classes and add entrance animation
      this.albumArtContainer.classList.remove('exit-to-left');
      this.albumArtContainer.classList.add('enter-from-right');
      
      // Reset vinyl classes and add exit animation
      this.vinylRecord.classList.remove('stop-spin', 'enter-album');
      this.vinylRecord.classList.add('exit-album');
      
      // Step 4: After 0.3s more (0.9s total), vinyl starts spinning again
      setTimeout(() => {
        this.albumArtContainer.classList.remove('enter-from-right');
        this.vinylRecord.classList.remove('exit-album');
        this.vinylRecord.classList.add('spinning');
        
        this.isAnimating = false;
      }, 300);
    }, 600);
  }

  /**
   * Vinyl to album animation (triggered by play button)
   * Similar to transition but stays on current project
   */
  triggerVinylToAlbumAnimation() {
    this.isAnimating = true;
    
    // Stop vinyl and make it enter the album
    this.vinylRecord.classList.remove('spinning');
    this.vinylRecord.classList.add('stop-spin', 'enter-album');
    
    // Album exits to left
    this.albumArtContainer.classList.add('exit-to-left');
    
    // After 0.6s, album comes back and vinyl exits
    setTimeout(() => {
      this.albumArtContainer.classList.remove('exit-to-left');
      this.albumArtContainer.classList.add('enter-from-right');
      
      this.vinylRecord.classList.remove('stop-spin', 'enter-album');
      this.vinylRecord.classList.add('exit-album');
      
      // After 0.3s more, vinyl starts spinning again
      setTimeout(() => {
        this.albumArtContainer.classList.remove('enter-from-right');
        this.vinylRecord.classList.remove('exit-album');
        this.vinylRecord.classList.add('spinning');
        
        this.isAnimating = false;
      }, 300);
    }, 600);
  }
}

// Initialize animation manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioAnimationManager();
});
