function Vehicle() {

  this.position = createVector(width / 2, height / 2);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();
  this.r = 4;
  this.maxSpeed = 10;
  this.maxForce = 0.3;

  this.velocity.setMag(this.maxSpeed);

  this.seek = function(target) {
// with perception radius on, it's possible to just have the vehicle stop moving
    let perceptionRadius = 200;
    let desired = createVector();
    let d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
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
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0){
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
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
