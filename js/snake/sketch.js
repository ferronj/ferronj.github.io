var snake;
var scl = 20;
var food;

function setup() {
  createCanvas(0.9*windowWidth,0.9*windowHeight);
  frameRate(10);
  snake = new Snake();
  createFood();
}

function createFood() {
  var cols = width / scl;
  var rows = height / scl;
  food = createVector(floor(random(cols))*scl, floor(random(rows))*scl);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    if (snake.vel.x / scl != -1) {  // can't go left if already going right
      snake.vel = createVector(1,0);
    }
  } else if (keyCode === LEFT_ARROW) {
      if (snake.vel.x / scl != 1){  // can't go right ... etc
        snake.vel = createVector(-1,0);
      }
  } else if (keyCode === UP_ARROW) {
      if (snake.vel.y / scl != 1) {
        snake.vel = createVector(0,-1);
      }
  } else if (keyCode === DOWN_ARROW){
      if (snake.vel.y / scl != -1){
        snake.vel = createVector(0,1);
      }
  }
}

function draw() {
  background(51);
  fill(255);
  rect(food.x, food.y, scl, scl);
  snake.lose();
  snake.update();
  snake.eat();
  snake.show();
}

function windowResized(){

  resizeCanvas(windowWidth, windowHeight);
  frameRate(10);
  snake = new Snake();
  createFood();

}
