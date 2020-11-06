function Snake(){
  this.pos = createVector(0,0);
  this.vel = createVector(1,0);
  this.r = scl;
  this.c = color(25, 224, 25);
  this.s = 0;
  this.tail = [];

  this.update = function() {
    if (this.s === this.tail.length){
      for (var i = 0; i < this.tail.length; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.s - 1] = createVector(this.pos.x, this.pos.y);

    this.vel.setMag(scl);
    this.pos.x = constrain((this.pos.x + this.vel.x), 0, width-scl);
    this.pos.y = constrain((this.pos.y + this.vel.y), 0, height-scl);

  }

  this.lose = function() {
      for (var i = 0; i < this.tail.length; i++) {
        var pos = this.tail[i];
        var d = dist(this.pos.x, this.pos.y, pos.x, pos.y);
        if (d < 1) {
          console.log('oh no! starting over...')
          this.s = 0;
          this.tail = [];
        }
      }
  }

  this.eat = function() {
    if (dist(this.pos.x, this.pos.y, food.x, food.y) < 2) {
      createFood();
      this.s++;
      return true;
    } else{
      return false;
    }
  }

  this.show = function() {
    fill(this.c);
    for (i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.pos.x, this.pos.y, scl, scl);
  }

}
