// // js
// js
// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const speed = 0.1;
const totalBalls = 20;
const radiusInches = 3;
const PX_PER_INCH = 96; // CSS standard
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// 5 in * 96 px/in = 480 px, capped so a ball always fits in the window
const ballRadius = Math.min(radiusInches * PX_PER_INCH, width / 2, height / 2);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  // return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 70; // 70% - 100%
  const lightness = Math.floor(Math.random() * 10) + 80;  // 80% - 90%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.digit = random(0, 9);     
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // drawNumber() {
  //   ctx.fillStyle = "black";
  //   ctx.font = `${this.size}px Lato, sans-serif`;
  //   ctx.textAlign = "center";
  //   ctx.textBaseline = "middle";
  //   ctx.fillText(1, this.x, this.y);
  //   ctx.fillText(2, this.x, this.y);
  //   ctx.fillText(3, this.x, this.y);
  //   ctx.fillText(4, this.x, this.y);
  //   ctx.fillText(5, this.x, this.y);
  //   ctx.fillText(6, this.x, this.y);
  //   ctx.fillText(7, this.x, this.y);
  //   ctx.fillText(8, this.x, this.y);
  //   ctx.fillText(9, this.x, this.y);
  //   ctx.fillText(0, this.x, this.y);
    
  // }
  drawNumber() {
    ctx.fillStyle = "black";
    ctx.font = `${this.size}px Lato, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.digit, this.x, this.y);
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // collisionDetect() {
  //   for (const ball of balls) {
  //     if (this !== ball) {
  //       const dx = this.x - ball.x;
  //       const dy = this.y - ball.y;
  //       const distance = Math.sqrt(dx * dx + dy * dy);

  //       if (distance < this.size + ball.size) {
  //         ball.color = this.color = randomRGB();
  //       }
  //     }
  //   }
  // }
}

const balls = [];

while (balls.length < totalBalls) {
  const size = ballRadius;
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7) * speed,
    random(-7, 7) * speed,
    randomRGB(),
    size,
    balls.length % 10
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  // pass 1: all circles
  for (const ball of balls) {
    ball.draw();
  }

  // pass 2: numbers on top, then move and check collisions
  for (const ball of balls) {
    ball.drawNumber(); // FIX: was never called
    ball.update();
    // ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();