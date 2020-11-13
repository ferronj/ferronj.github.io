class Boid {

constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(1.5, 3));
    this.acceleration = createVector();
    // this.maxForce = 0.2;
    this.maxForce = 0.4;
    // this.maxSpeed = 3;
    this.maxSpeed = 3;
    this.perceptionRadius = 50;
    //colorMode(HSL);
    this.c = color(36, 201, 38); // 120 - 10
  }

// wrapping
edges() {
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

align(boids) {
  let perceptionRadius = this.perceptionRadius;
  let steering = createVector();
  let total = 0;
  for (let other of boids) {
    let d = dist(
      this.position.x,
      this.position.y,
      other.position.x,
      other.position.y);
    if (other != this && d < perceptionRadius) {
      steering.add(other.velocity);
      total++;
    }
  }
  if (total > 0) {
    steering.div(total);
    steering.setMag(this.maxSpeed);
    steering.sub(this.velocity);
    steering.limit(this.maxForce);

  }
  return steering;
}

separation(boids) {
  let perceptionRadius = this.perceptionRadius;
  let steering = createVector();
  let total = 0;
  for (let other of boids) {
    let d = dist(
      this.position.x,
      this.position.y,
      other.position.x,
      other.position.y);
    if (other != this && d < perceptionRadius) {
      let diff = p5.Vector.sub(this.position, other.position);
      diff.div(d);
      steering.add(diff);
      total++;
    }
  }
  if (total > 0) {
    steering.div(total);
    steering.setMag(this.maxSpeed);
    steering.sub(this.velocity);
    steering.limit(this.maxForce);
  }
  return steering;
}

cohesion(boids) {
  let perceptionRadius = this.perceptionRadius;
  let steering = createVector();
  let total = 0;
  for (let other of boids) {
    let d = dist(
      this.position.x,
      this.position.y,
      other.position.x,
      other.position.y);
    if (other != this && d < perceptionRadius) {
      steering.add(other.position);
      total++;
    }
  }
  if (total > 0) {
    steering.div(total);
    steering.sub(this.position);
    steering.setMag(this.maxSpeed);
    steering.sub(this.velocity);
    steering.limit(this.maxForce);
  }
  return steering;
}

// dodging obstacles
dodge(obstacles) {
  let perceptionRadius = this.perceptionRadius;
  let steering = createVector();
  let total = 0;
  for (let obstacle of obstacles) {
    let d = dist(
      this.position.x,
      this.position.y,
      obstacle.position.x,
      obstacle.position.y);
    if (d < perceptionRadius) {
      let diff = p5.Vector.sub(this.position, obstacle.position);
      diff.div(d);
      steering.add(diff);
      total++;
    }
  }
  if (total > 0) {
    steering.div(total);
    steering.setMag(this.maxSpeed);
    steering.sub(this.velocity);
    steering.limit(this.maxForce);
  }
  return steering;
}

flock(boids, obstacles) {
  let alignment = this.align(boids);
  let cohesion = this.cohesion(boids);
  let separation = this.separation(boids);
  // dodging obstacles
  let dodge = this.dodge(obstacles);

  //removing sliders until I learn how to position them
  //separation.mult(separationSlider.value());
  //cohesion.mult(cohesionSlider.value());
  //alignment.mult(alignSlider.value());

  this.acceleration.add(separation);
  this.acceleration.add(alignment);
  this.acceleration.add(cohesion);
  this.acceleration.add(dodge);
}

update() {
  // just using te sliders
  //this.maxSpeed = maxSpeedSlider.value();
  //this.maxForce = maxForceSlider.value();
  //this.perceptionRadius = perceptionRadiusSlider.value();
  // velocity heat map - change color based on steering force
  var from = color(36, 201, 38);
  var to = color(217, 31, 31);
  this.c = lerpColor(from, to, mag(this.acceleration.x, this.acceleration.y) / this.maxForce);

  // here's the actual steering
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
}

  show() {
    strokeWeight(1);
    stroke(this.c);
    noFill();
    let w = 6;
    let len = 9;
    //
    // // find location of tip of boid triangle
    let r = createVector(this.velocity.x, this.velocity.y);  // set r to length of boid
    r.setMag(len);
    let a = p5.Vector.add(this.position, r);   // set boid tip at end of r
    //
    // find location of base ends of boid triangle
    let w1 = createVector(-this.velocity.y, this.velocity.x);
    let w2 = createVector(this.velocity.y, -this.velocity.x);
    w1.setMag(w / 2);
    w2.setMag(w / 2);
    let b1 = p5.Vector.add(this.position, w1)
    let b2 = p5.Vector.add(this.position, w2);
    triangle(a.x, a.y, b1.x, b1.y, b2.x, b2.y);
    //point(this.position.x, this.position.y);
  }
}
