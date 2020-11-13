class Obstacle {

  constructor(x, y) {
      this.position = createVector(x, y);
    }

  show() {
    strokeWeight(20);
    stroke(255);
    point(this.position.x, this.position.y);
  }


}
