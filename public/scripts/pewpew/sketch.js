
const pewpewSketch = ( p ) => {

  p.pews = [];
  p.spawnProbability= 0.5;
  p.duplicates= 10;

  p.maxSize = 20;
  p.minSize = 8;

  p.previousMouseX = 0;
  p.previousMouseY = 0;

  p.spawnRandomness = 20;

  p.huePicker = 0;
  p.colorCollections = [];
  p.colorChoice = 0;

  p.socket;

  p.setup = () => {

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      console.log("local!");
      socket = io.connect('http://localhost:3000');
    }
    else{
      console.log("not local!");
      socket = io.connect('https://desolate-dusk-28350.herokuapp.com/');
    }

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

    p.colorCollections[0] = new ColorCollection( p.color('#f3553C'), p.color('#ffB53C'), p.color('#eeb313') );

    p.colorCollections[1] = new ColorCollection( p.color('#50a0c3'), p.color('#d74126'), p.color('#ffd84f') );
    p.colorCollections[2] = new ColorCollection( p.color('#01acbd'), p.color('#aee0dd'), p.color('#e6aecf') );
    p.colorCollections[3] = new ColorCollection( p.color('#37419a'), p.color('#84c0e9'), p.color('#ebd6e8') );
    p.colorCollections[4] = new ColorCollection( p.color('#a299ca'), p.color('#7ccaae'), p.color('#ecec84') );
    p.colorCollections[5] = new ColorCollection( p.color('#715ca8'), p.color('#416eb6'), p.color('#efc638') );
    p.colorCollections[6] = new ColorCollection( p.color('#ffb312'), p.color('#85cfb4'), p.color('#ed186b') );
    p.colorCollections[7] = new ColorCollection( p.color('#ffd0d6'), p.color('#b7dde0'), p.color('#fee19f') );


  };

  p.draw = () => {
    //p.clear();
    //p.blendMode(p.ADD);
    p.background(0,0,5,30);
    //p.blendMode(p.BLEND);

    //p.fill(255,255,255);
    //p.text(p.frameRate(), 10, 20);

    p.mouseDirection = p.createVector(p.map(p.mouseX - p.previousMouseX, -300, 300, -50,50), p.map(p.mouseY - p.previousMouseY, -300, 300, -50, 50));
    //console.log("previousMouseX:" + p.previousMouseX + " mouseX: " + p.mouseX + " x direction: " + p.mouseDirection.x);
    //console.log("previousMouseY:" + p.previousMouseY + " mouseY: " + p.mouseY + " y direction: " + p.mouseDirection.y);

    if (p.mouseIsPressed && p.mouseX > 100){
      for (var i = 0; i < p.duplicates; i++){
        if (p.random(0,1)<= p.spawnProbability){
          p.pews.push(new Dot(p.random(p.mouseX - p.spawnRandomness, p.mouseX + p.spawnRandomness),
                              p.random(p.mouseY - p.spawnRandomness, p.mouseY + p.spawnRandomness),
                              p.mouseDirection.x, p.mouseDirection.y));
        }
      }
    }

    for (var i = 0; i < p.pews.length; i++){
      p.pews[i].update();
      p.pews[i].display();
    }

    while (p.pews.length > 1000){
      p.pews.splice(0,1);
    }

    for (var i = p.pews.length; i > 0; i--){
      if (p.pews[i-1].diameter < 0){
        p.pews.splice(i-1,1);
      }
      else if(p.pews[i-1].position.x < 0 || p.pews[i-1].position.x > p.theWidth || p.pews[i-1].position.y < 0 || p.pews[i-1].position.y > p.theHeight){
          p.pews.splice(i-1,1);
      }
    }

    p.previousMouseX = p.mouseX;
    p.previousMouseY = p.mouseY;
    p.huePicker = (p.huePicker + 2) % 360;
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
      this.maxDiameter = p.random(p.minSize,p.maxSize);


      p.probability = p.random(0,1);


      if (p.probability<= 0.9){
        this.hue = p.random(p.hue(p.colorCollections[p.colorChoice].colorA), p.hue(p.colorCollections[p.colorChoice].colorA)+40) %360;
        this.sat = p.saturation(p.colorCollections[p.colorChoice].colorA);
        this.bri = p.brightness(p.colorCollections[p.colorChoice].colorA);

      }
      else if (p.probability <= 0.95){
        this.hue = p.random(p.hue(p.colorCollections[p.colorChoice].colorB), p.hue(p.colorCollections[p.colorChoice].colorB)+40) %360;
        this.sat = p.saturation(p.colorCollections[p.colorChoice].colorB);
        this.bri = p.brightness(p.colorCollections[p.colorChoice].colorB);
      }
      else{
        this.hue = p.random(p.hue(p.colorCollections[p.colorChoice].colorC), p.hue(p.colorCollections[p.colorChoice].colorC)+40) %360;
        this.sat = p.saturation(p.colorCollections[p.colorChoice].colorC);
        this.bri = p.brightness(p.colorCollections[p.colorChoice].colorC);
      }


      //this.hue = p.map(this.position.x, 0, p.theWidth, 0, 360);
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
        this.diameter -= 0.2;
      }

      if (this.diameter > this.maxDiameter){
        this.diameterGrowing = false;
      }
  	}

  	display(){
      p.fill(this.hue, this.sat, this.bri, 60);
      //p.stroke(this.hue,70,90,50);
  		p.ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  	}
  }



  class ColorCollection{
    constructor(a, b, c){
      this.colorA = a;
      this.colorB = b;
      this.colorC = c;
    }
  }


};



var ps = new p5(pewpewSketch);
