//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls;
///////////////////////////////////////////////
function setup() {
  createCanvas(900, 600);
  background(0);
  balls = [];
  for (var i = 0; i < 100; i++) {
    balls.push(new Ball());
  }
}
////////////////////////////////////////////////
function draw() {
  if (mouseX > 0 || mouseY > 0) {
    for (var i = 0; i < balls.length; i++) {
      balls[i].run();
    }
  }
}
///////////////////////////////////////////////
class Ball {

  constructor() {
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = random(4, 6);

    var randomX = mouseX + random(-80, 80);
    var randomY = mouseY + random(-80, 80);
    this.location = new createVector(randomX, randomY);
    this.prevLocation = new createVector(randomX, randomY);

    this.randomFactor = random(0.3, 0.4);
    this.randomColor = new createVector(random(255), random(255), random(255));
  }

  run() {
    this.draw();
    this.move();
  }

  draw() {
    stroke(this.randomColor.x, this.randomColor.y, this.randomColor.z);
    strokeWeight(.2);
    line(this.prevLocation.x, this.prevLocation.y, this.location.x, this.location.y);
    this.prevLocation = this.location.copy();
  }

  move() {
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(this.randomFactor);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }
}
