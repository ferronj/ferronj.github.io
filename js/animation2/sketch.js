// draw random chords of a circle
var r; //square side
var w; //grid width
var h; //grid height
var rate; //maybe -- control square color change speed

function setup() {

  createCanvas(windowWidth, windowHeight);
  w = .5 * width;
  h = .5 * height
  background(255,255,255);
  stroke(0,0,0);

}

function draw() {

  // find a random point on a circle
  var angle1 = random(0,2*PI);
  var xpos1 = width/2 + radius*cos(angle1);
  var ypos1 = height/2 + radius*sin(angle1);

  // find another random point on the circle
  var angle2 = random(0,2*PI);
  var xpos2 = width/2 + radius*cos(angle2);
  var ypos2 = height/2 + radius*sin(angle2);

  // draw a line between them
  line(xpos1, ypos1, xpos2, ypos2);

}

function windowResized(){

  resizeCanvas(windowWidth, windowHeight);
  radius = 0.9*min(width, height)/2;
  background(255,255,255);

}
