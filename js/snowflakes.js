const canvas = document.getElementById('snowfall');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const snowflakes = [];
const numberOfSnowflakes = 250;

function generateSnowflakes() {
  for (let i = 0; i < numberOfSnowflakes; i++) {
    snowflakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() + 0.5
    });
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#CDA4DE'
  ctx.beginPath();

  for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = snowflakes[i];
    ctx.moveTo(snowflake.x, snowflake.y);
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  }

  ctx.fill();
  moveSnowflakes();
}

function moveSnowflakes() {
  for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = snowflakes[i];
    snowflake.y += snowflake.speed;

    snowflake.x += Math.sin(snowflake.y / 50) * 0.5;

    if (snowflake.y > height) {
      snowflake.y = -5;
      snowflake.x = Math.random() * width;
    }
  }
}

function animateSnowflakes() {
  drawSnowflakes();
  requestAnimationFrame(animateSnowflakes);
}

generateSnowflakes();
animateSnowflakes();

window.addEventListener('resize', function() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  snowflakes.length = 0;
  generateSnowflakes();
});


    (function(){
      const header = document.querySelector('header');
      let latestKnownScrollY = 0;
      let ticking = false;

      function onScroll() {
        latestKnownScrollY = window.scrollY;
        requestTick();
      }

      function requestTick() {
        if(!ticking) {
          requestAnimationFrame(update);
        }
        ticking = true;
      }

      function update() {
        const scrolled = latestKnownScrollY;
        header.style.backgroundPosition = 'center ' + (-scrolled * 0.3) + 'px';
        ticking = false;
      }

      window.addEventListener('scroll', onScroll);
    })();