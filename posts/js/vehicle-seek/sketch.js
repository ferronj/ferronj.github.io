let vehicle;
let target;
let canvas;

function setup() {
  canvas = createCanvas(0.3 * windowWidth, 0.3 * windowHeight);
  canvas.parent('seeker-div');
  target = new Target();
  vehicle = new Vehicle();
}

function draw (){
  background(51);
  // vehicle
  vehicle.edges();
  vehicle.behavior(target);
  vehicle.update();
  vehicle.show();
  // target
  target.update();
  target.show();
}

function Target() {
  this.position = createVector(random(width), random(height));
  this.r = 50;

  this.update = function() {
    this.position = createVector(mouseX, mouseY);
  }

  this.show = function(){
    push();
    noFill();
    strokeWeight(5);
    stroke(255, 0, 0, 100);
    ellipse(this.position.x, this.position.y, this.r, this.r);
    pop();
  }
}

function windowResized(){

  resizeCanvas(0.3 * windowWidth, 0.3 * windowHeight);

}
