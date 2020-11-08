// draw random chords of a circle
var scl = 50; //square side
var w; //grid width
var h; //grid height
var cols = 12;
var rows = 4;
var rate = 0.001; //maybe -- control square color change speed
var states;

function make2Darray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0;i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function State(x, y, w) {
  this.name;
  this.pos = createVector(x,y);
  this.w = w;
  this.color = random(0,1);

  this.show = function() {
    if (random(0,1) < rate) {
      this.color = random(0,1)
    }
    rd = color(230, 23, 23);
    bl = color(25, 66, 230);
    c = lerpColor(rd, bl, this.color);
    stroke(c);
    fill(c);
    rect(this.pos.x, this.pos.y, this.w, this.w);
  }
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  w = .5 * width;
  h = .5 * height
  background(51);
  // stroke(0,0,0);

  // create the states
  states = make2Darray(cols, rows);
  console.log(states);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      states[i][j] = new State(i * scl, j * scl, scl);
    }
  }
  }


function draw() {
  push();
  translate(w - (cols / 2 * scl) , h - (rows / 2 * scl));
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      states[i][j].show();
    }
  }
  pop();


}

function windowResized(){

  resizeCanvas(windowWidth, windowHeight);
  radius = 0.9*min(width, height)/2;
  background(255,255,255);

}
