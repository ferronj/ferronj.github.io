// https://www.youtube.com/watch?v=mhjuuHl6qHM&t=279s

const flock = [];
const obstacles = [];

let alignSlider, cohesionSlider, separationSlider;
let maxForceSlider, maxSpeedSlider;
let perceptionRadiusSlider;
let alignLabel, cohesionLabel, separationLabel;
let forceLabel, speedLabel;

function setup() {
  canvas = createCanvas(0.3 * windowWidth, 0.3 * windowHeight);
  canvas.parent('flock-div');

  var a = 6;  // number of sliders
  //alignSlider = createSlider(0, 5, 1, 0.1);
  //alignSlider.position(width + 20, 1 * floor(height / a));
  //cohesionSlider = createSlider(0, 5, 1, 0.1);
  //cohesionSlider.position(width + 20, 2 * floor(height / a));
  //separationSlider = createSlider(0, 5, 1, 0.1);
  //separationSlider.position(width + 20, 3 * floor(height / a));
  //maxForceSlider = createSlider(0, 1, 0.2, 0.01);
  //maxForceSlider.position(width + 20, 4 * floor(height / a));
  //maxSpeedSlider = createSlider(0, 5, 3, 0.1);
  //maxSpeedSlider.position(width + 20, 5 * floor(height / a));
  //perceptionRadiusSlider = createSlider(0, 150, 50, 1);
  //perceptionRadiusSlider.position(width + 20, 6 * floor(height / a));

  // alignLabel = createP("Align");

  for (let i = 0; i < 100; i++) {
      flock.push(new Boid());
  }
}

function mouseClicked() {
    obstacles.push(new Obstacle(mouseX, mouseY));
}

function draw() {
  background(51);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock, obstacles);
    boid.update();
    boid.show();
  }
  for (let obstacle of obstacles){
    obstacle.show();
  }
}

function windowResized(){

  resizeCanvas(0.3 * windowWidth, 0.3 * windowHeight);

}
