
const pewpewSketch = ( p ) => {

  p.pews = [];

  p.setup = () => {

    p.noStroke();
    p.colorMode(p.HSB,255);


    if (p.int(p.windowWidth) > p.int(p.windowHeight){
      p.theWidth = p.int(p.windowWidth) - 55;
      p.theHeight = p.int(p.windowHeight);
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight);
    }
    else{
      p.theWidth = p.int(p.windowWidth);
      p.theHeight = p.int(p.windowHeight) - 50;
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight);
    }

    p.rippleCanvas.parent('theToyContainer');

    //p.x = i % p.cols;
    //p.y = p.int(i / p.cols);

  };

  p.draw = () => {
    p.background(0,0,255);

    p.fill(255,255,255);
    p.text(p.frameRate(), 10, 20);

    if (p.mouseIsPressed){
      p.pews.push(new Dot(p.mouseX, p.mouseY));
    }

    for (var i = 0; i < p.pews.length; i++){
      p.pews[i].update();
      p.pews[i].display();
    }

    if (p.pews.length > 60){
      p.pews.splice(0,1);
    }



  };


  class Dot{
  	constructor(i, j){
      this.x = p.mouseX;
      this.y = p.mouseY;
      this.xoff = p.random(0,1000);
      this.yoff = p.random(0,1000);
      this.speed = 0.1;
      this.diameter = p.random(5,30);
      this.hue = p.random(150,250);

  	}

  	update(){
      this.x += p.map(p.noise(this.xoff), 0, 1, -5, 5);
      this.y += p.map(p.noise(this.yoff), 0, 1, -5, 5);

      this.xoff += this.speed;
      this.yoff += this.speed;
  	}

  	display(){
      p.fill(this.hue,190,190,180);
  		p.ellipse(this.x, this.y, this.diameter, this.diameter);
  	}
  }

};



var ps = new p5(pewpewSketch);
