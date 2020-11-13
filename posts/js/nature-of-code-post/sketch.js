// seeker sketch

const s = (p) => {

  let vehicle;
  let target;
  let canvas;

  p.setup = () => {
    p.createCanvas(0.3 * p.windowWidth, 0.3 * p.windowHeight);
    target = new Target();
    vehicle = new Vehicle();
  }

  p.draw = () => {
    p.background(51);
    // vehicle
    vehicle.edges();
    vehicle.behavior(p.target);
    vehicle.update();
    vehicle.show();
    // target
    target.update();
    target.show();
  }

// vehicle function -- I think it will work if it's all in the same file...
  function Vehicle() {

    this.position = p.createVector(p.width / 2, p.height / 2);
    this.velocity = p5.Vector.random2D();
    this.acceleration = p.createVector();
    this.r = 4;
    this.maxSpeed = 10;
    this.maxForce = 0.3;

    this.velocity.setMag(this.maxSpeed);

    this.seek = function(target) {
  // with perception radius on, it's possible to just have the vehicle stop moving
      let perceptionRadius = 200;
      let desired = p.createVector();
      let d = p.dist(this.position.x, this.position.y, target.position.x, target.position.y);
      if (d < perceptionRadius) {
        desired = p5.Vector.sub(target.position, this.position);
      }
      desired.setMag(this.maxSpeed);
      let steering = p5.Vector.sub(desired, this.velocity);
      steering.limit(this.maxForce);

      return steering;
    }

    this.behavior = function(target) {
      let seek = this.seek(target);
      this.acceleration.add(seek);
    }

    this.update = function() {
      // do the actual physics here
      this.velocity.add(this.acceleration);

      if (mag(this.velocity.x, this.velocity.y) == 0) {
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(this.maxSpeed);
      } else {
      this.position.add(this.velocity);
      }
      // don't accumulate acceleration
      this.acceleration.mult(0);
    }

    // wrapping
    this.edges = function() {
      if (this.position.x > p.width) {
        this.position.x = 0;
      } else if (this.position.x < 0){
        this.position.x = p.width;
      }
      if (this.position.y > p.height) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = p.height;
      }
    }

    this.show = function(){
      // adjust reference points
      push();
      let angle = this.velocity.heading() + PI / 2;
      translate(this.position.x, this.position.y); // this is where the thing is actually drawn!
      rotate(angle);
      // could add in some other debuging shapes for different parameters and vectors here
      //
      //
      // set coloring
      strokeWeight(7);
      stroke(33, 194, 215);
      noFill();

      // draw the vehicle
      triangle(0, -this.r, this.r / 4, 0, -this.r / 4, 0);
      pop();

    }

  }
  // END vehicle function

  function Target() {
    this.position = p.createVector(p.random(p.width), p.random(p.height));
    this.r = 50;

    this.update = function() {
      this.position = p.createVector(mouseX, mouseY);
    }

    this.show = function(){
      p.push();
      p.noFill();
      p.strokeWeight(5);
      p.stroke(255, 0, 0, 100);
      p.ellipse(this.position.x, this.position.y, this.r, this.r);
      p.pop();
    }
  }

  p.windowResized = () => {

    p.resizeCanvas(0.3 * p.windowWidth, 0.3 * p.windowHeight);

  }
}
// end

//call seeker sketch
let myp5 = new p5(s, 'seeker-div');


// flocking sketch
const t = (p) => {
// https://www.youtube.com/watch?v=mhjuuHl6qHM&t=279s

  let flock = [];
  let obstacles = [];

  let alignSlider, cohesionSlider, separationSlider;
  let maxForceSlider, maxSpeedSlider;
  let perceptionRadiusSlider;
  let alignLabel, cohesionLabel, separationLabel;
  let forceLabel, speedLabel;

  p.setup = () => {
    p.createCanvas(0.3 * p.windowWidth, 0.3 * p.windowHeight);

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

  p.mouseClicked = () => {
      obstacles.push(new Obstacle(mouseX, mouseY));
  }

  p.draw = () => {
    p.background(51);
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

  p.windowResized = () => {

    p.resizeCanvas(0.3 * windowWidth, 0.3 * windowHeight);

  }
}

//end of flocking sketch

// call flocking sketch

myp5 = new p5(t, 'flocking-div');
