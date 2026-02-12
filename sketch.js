/*
SSE 2208 – Multimedia Systems CAT 1
Advanced Interactive Multimedia Project

Includes:
✔ Music with full controls
✔ Video with built-in controls
✔ Advanced particle system
✔ Rotating sound visualizer
✔ Bouncing ball with physics
✔ Mouse interaction
*/

let song;
let amplitude;

let ball;
let particles = [];
let rotationAngle = 0;

// -------------------------
// PARTICLE CLASS
// -------------------------
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 15);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.alpha = 255;
  }

  update(level) {
    this.x += this.speedX * (1 + level * 10);
    this.y += this.speedY * (1 + level * 10);
    this.alpha -= 4;
  }

  display() {
    noStroke();
    fill(random(100,255), random(100,255), random(100,255), this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

// -------------------------
// BOUNCING BALL CLASS
// -------------------------
class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 40;
    this.speedX = 4;
    this.speedY = 3;
    this.color = color(255, 0, 0);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width - this.size/2 || this.x < this.size/2) {
      this.speedX *= -1;
    }

    if (this.y > height - this.size/2 || this.y < this.size/2) {
      this.speedY *= -1;
    }
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
}

// -------------------------
// LOAD MUSIC
// -------------------------
function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("canvasContainer");

  amplitude = new p5.Amplitude();
  ball = new Ball();
}

function draw() {
  background(10, 20);

  let level = amplitude.getLevel();

  // -------------------------
  // ROTATING SOUND VISUALIZER
  // -------------------------
  push();
  translate(width / 2, height / 2);
  rotate(rotationAngle);
  stroke(0, 255, 255);
  noFill();
  let radius = map(level, 0, 0.5, 100, 200);
  ellipse(0, 0, radius);
  rotationAngle += 0.02;
  pop();

  // -------------------------
  // PARTICLE GENERATION
  // -------------------------
  if (song.isPlaying()) {
    particles.push(new Particle(width / 2, height / 2));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(level);
    particles[i].display();

    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  // -------------------------
  // BOUNCING BALL
  // -------------------------
  ball.update();
  ball.display();
}

// ======================
// MUSIC CONTROLS
// ======================

function playMusic() {
  if (!song.isPlaying()) {
    song.play();
  }
}

function pauseMusic() {
  if (song.isPlaying()) {
    song.pause();
  }
}

function stopMusic() {
  song.stop();
}

function changeVolume(val) {
  song.setVolume(val);
}

// ======================
// MOUSE INTERACTION
// ======================

function mousePressed() {
  ball.changeColor();
}
