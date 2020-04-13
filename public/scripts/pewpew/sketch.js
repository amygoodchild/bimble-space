
const pewpewSketch = ( p ) => {

  p.pews = [];
  p.spawnProbability= 1.0;
  p.previousMouseX = 0;
  p.previousMouseY = 0;

  p.setup = () => {

    //p.noStroke();
    p.colorMode(p.HSB,360,100,100, 100);
    p.noStroke();

    if (p.int(p.windowWidth) > p.int(p.windowHeight)){
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
    p.background(0,0,20);


  };

  p.draw = () => {
    //p.clear();
    p.background(0,0,10,20);

    p.fill(255,255,255);
    p.text(p.frameRate(), 10, 20);

    p.mouseDirection = p.createVector(p.map(p.mouseX - p.previousMouseX, -300, 300, -50,50), p.map(p.mouseY - p.previousMouseY, -300, 300, -50, 50));
    //console.log("previousMouseX:" + p.previousMouseX + " mouseX: " + p.mouseX + " x direction: " + p.mouseDirection.x);
    //console.log("previousMouseY:" + p.previousMouseY + " mouseY: " + p.mouseY + " y direction: " + p.mouseDirection.y);

    if (p.mouseIsPressed){
      if (p.random(0,1)<= p.spawnProbability){
        p.pews.push(new Dot(p.mouseX, p.mouseY, p.mouseDirection.x, p.mouseDirection.y));
      }
    }

    for (var i = 0; i < p.pews.length; i++){
      p.pews[i].update();
      p.pews[i].display();
    }

    //while (p.pews.length > 600){
    //  p.pews.splice(0,1);
    //}

    for (var i = p.pews.length; i > 0; i--){

      if (p.pews[i-1].diameter < 0){
        p.pews.splice(i-1,1);
      }
    }

    p.previousMouseX = p.mouseX;
    p.previousMouseY = p.mouseY;


  };


  class Dot{
  	constructor(i, j, dx, dy){
      this.position = p.createVector(i, j);
      this.xoff = p.random(0,1000);
      this.yoff = p.random(0,1000);
      this.speed = 0.1;

      this.direction = p.createVector(dx,dy);
      this.diameter = 5;
      this.diameterGrowing = true;
      this.maxDiameter = p.random(10,40);
      this.hue = p.random(230,350);
      this.age = 0;

  	}

  	update(){
      //this.direction.x += p.map(p.noise(this.xoff), 0, 1, -1, 1);
      //this.direction.y += p.map(p.noise(this.yoff), 0, 1, -1, 1);

      this.xoff += this.speed;
      this.yoff += this.speed;

      this.position.x += this.direction.x;
      this.position.y += this.direction.y;


      //console.log(p.map(p.noise(this.xoff), 0, 1, -5, 5));
      this.position.x += p.map(p.noise(this.xoff), 0, 1, -5, 5);
      this.position.y += p.map(p.noise(this.yoff), 0, 1, -5, 5);



      this.age++;

      if (this.diameterGrowing){
        this.diameter += 2;
      }
      else{
        this.diameter -= 0.3;
      }

      if (this.diameter > this.maxDiameter){
        this.diameterGrowing = false;
      }
  	}

  	display(){
      p.fill(this.hue,70,80,50);
      //p.stroke(this.hue,70,90,50);
  		p.ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  	}
  }

};



var ps = new p5(pewpewSketch);
