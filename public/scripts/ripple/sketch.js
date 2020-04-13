



const rippleSketch = ( r ) => {

  r.dots = [];
  r.cols = 35;
  r.rows = 20;
  r.rowGap;
  r.colGap;
  r.numDots;

  r.setup = () => {

    r.noStroke();
    r.colorMode(r.HSB,255);

    r.theWidth = r.int(r.windowWidth) - 55;
    r.theHeight = r.int(r.windowHeight);

    if (r.theWidth > r.theHeight){
      r.rippleCanvas = r.createCanvas(r.theWidth, r.theHeight);
    }
    else{
      r.rippleCanvas = r.createCanvas(r.theWidth, r.theHeight-50);
    }

    r.numDots = r.cols * r.rows;

    r.colGap = r.theWidth / (r.cols + 1);
    r.rowGap = r.theHeight / (r.rows + 1);

    console.log("width: " + r.theWidth + " height: " + r.theHeight + "colgap: " + r.colGap + " rowGap: " + r.rowGap)

    r.rippleCanvas.parent('theToyContainer');

    for (let i = 0; i < r.rows; i++) {
      for (let j = 0; j < r.cols; j++) {
        index = i * r.cols + j;
        r.dots[index] = new Dot(i, j);
      }
    }


    //r.x = i % r.cols;
    //r.y = r.int(i / r.cols);

  };

  r.draw = () => {
    r.background(0,0,255);

    for (let i = 0; i < r.numDots; i++) {
      r.dots[i].move();
      r.dots[i].display();
    }

    r.fill(255,255,255);
    r.text(r.frameRate(), 10, 200);

  };


  class Dot{
  	constructor(i, j){
      this.col = j;
      this.row = i;
      this.x = this.col * r.colGap + r.colGap;
      this.y = this.row * r.rowGap + r.rowGap;
      this.diameter = 20;

      console.log("x: " + this.x + " y: " + this.y);
  	}

  	move(){
      this.x += r.random(-1,1);
      this.y += r.random(-1,1);
  	}



  	display(){
      r.fill(0,0,0);
  		r.ellipse(this.x, this.y, this.diameter, this.diameter);
  	}
  }

};



var rs = new p5(rippleSketch);
