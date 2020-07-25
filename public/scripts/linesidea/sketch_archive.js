
var landscape;


  if ($( window ).height() < $( window ).width()){
    landscape = true;
    console.log("landscape");
  }
  else{
    landscape = false;
    console.log("portrait");
  }



const pewpewSketch = ( p ) => {

  p.pews = [];
  p.otherPews = [];
  p.spawnProbability= 0.5;
  p.duplicates= 3;

  if (landscape){
    p.maxSize = 26;
    p.minSize = 8;
  }
  else{
    p.maxSize = 15;
    p.minSize = 5;
  }

  p.previousMouseX = 0;
  p.previousMouseY = 0;

  p.spawnRandomness = 10;
  p.wiggleAmount = 5;

  p.huePicker = 0;
  p.colorCollections = [];
  p.colorChoice = 0;

  p.frameRateLerp = 60;

  p.maxCircles = 200;

  p.socket;

  p5.disableFriendlyErrors = true;
  p.debugMode = true;

  let myFont;

  //p.preload = () => {
  //  console.log("preload");
  //  myFont = p.loadFont('../../fonts/Moon Bold.otf');
  //}


  p.setup = () => {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      p.socket = io.connect('http://localhost:3000');
      console.log("local!");
    }
    else{
      p.socket = io.connect('https://desolate-dusk-28350.herokuapp.com/');
      console.log("not local!");
    }

    //p.noStroke();
    p.colorMode(p.HSB,360,100,100, 100);
    p.noStroke();
    //p.textFont(myFont, 20);


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

    p.colorCollections[0] = new ColorCollection( p.color('#e2d810'), p.color('#d9138a'), p.color('#12a4d9'), 0.33, 0.33, 0.33 );
    p.colorCollections[1] = new ColorCollection( p.color('#fff0e1'), p.color('#ff6e53'), p.color('#ffc13b'), 0.10, 0.45, 0.45 );
    p.colorCollections[2] = new ColorCollection( p.color('#4eff5d'), p.color('#d9f8b1'), p.color('#1b6535'), 0.45, 0.15, 0.40 );
    p.colorCollections[3] = new ColorCollection( p.color('#e75874,'), p.color('#be1558'), p.color('#fbcbc9'), 0.10, 0.80, 0.10 );
    p.colorCollections[4] = new ColorCollection( p.color('#8a307f'), p.color('#4493ff'), p.color('#ff48a7'), 0.15, 0.70, 0.15 );
    p.colorCollections[5] = new ColorCollection( p.color('#fbcbc9'), p.color('#ffea04'), p.color('#f33ca4'), 0.20, 0.35, 0.45 );
    p.colorCollections[6] = new ColorCollection( p.color('#ffb312'), p.color('#85cfb4'), p.color('#ed186b'), 0.33, 0.33, 0.33 );
    p.colorCollections[7] = new ColorCollection( p.color('#eecce7'), p.color('#33f2dc'), p.color('#55b7d2'), 0.20, 0.40, 0.40 );
    p.colorCollections[8] = new ColorCollection( p.color('#79cbb8'), p.color('#500472'), p.color('#ddcb1c'), 0.33, 0.33, 0.33 );

    p.colorCollections[9] = new ColorCollection( p.color('#1fbfb8'), p.color('#11587e'), p.color('#1978a5'), 0.33, 0.33, 0.33 );
    p.colorCollections[10] = new ColorCollection( p.color('#da000f'), p.color('#ff7e00'), p.color('#ffd800'), 0.33, 0.33, 0.33 );
    p.colorCollections[11] = new ColorCollection( p.color('#1b2d34'), p.color('#00ffda'), p.color('#ffca00'), 0.33, 0.33, 0.33 );


    p.socket.on('aNewDot', p.otherUserDraws);

  };

  p.otherUserDraws = (data) =>{
    //p.fill('#bb66bb');
    //p.ellipse(data.x,data.y,15,15);

    var newDot = new OtherDot(data.x, data.y, data.xoff, data.yoff, data.speed, data.directionx, data.directiony, data.diameter,
                              data.maxDiameter, data.hue, data.sat, data.bri);
    p.otherPews.push(newDot);
  }

  p.draw = () => {


    //p.textFont(myFont, 20);
    //p.clear();
    //p.blendMode(p.ADD);
    p.background(0,0,5,40);
    //p.blendMode(p.BLEND);


    if(p.debugMode){
      if (p.frameCount % 5 == 0){
        p.frameRateLerp = p.lerp(p.frameRateLerp, p.frameRate(), 1.0);
      }
      p.fill(0,0,0);
      p.rect(180,0,40,90);
      p.fill(0,0,100);
      p.text(p.int(p.frameRateLerp), 183, 20);
    }


    if (p.frameRate() < 5){
      p.maxCircles = 10;
    }
    if (p.frameRate() > 65){
      p.maxCircles = 200;
    }
    else{
      p.maxCircles = p.lerp(p.maxCircles, p.map(p.frameRate(), 5, 65, 30, 200), 0.2);
    }

    if(p.debugMode){
      p.text(p.int(p.maxCircles), 183, 40);
      p.text( p.pews.length, 183, 60);
    }
    //console.log("max circles worked out");



    p.mouseDirection = p.createVector(p.map(p.mouseX - p.previousMouseX, -300, 300, -50,50), p.map(p.mouseY - p.previousMouseY, -300, 300, -50, 50));
    //console.log("previousMouseX:" + p.previousMouseX + " mouseX: " + p.mouseX + " x direction: " + p.mouseDirection.x);
    //console.log("previousMouseY:" + p.previousMouseY + " mouseY: " + p.mouseY + " y direction: " + p.mouseDirection.y);

    if (p.mouseIsPressed && p.mouseX > 100){
      var data;
      //let start = p.millis();
      for (var i = 0; i < p.duplicates; i++){
        if (p.random(0,1)<= p.spawnProbability){
          var newDot = new Dot(p.random(p.mouseX - p.spawnRandomness, p.mouseX + p.spawnRandomness),
                              p.random(p.mouseY - p.spawnRandomness, p.mouseY + p.spawnRandomness),
                              p.mouseDirection.x, p.mouseDirection.y)
          p.pews.push(newDot);

          data = {
            x : newDot.position.x,
            y : newDot.position.y,
            xoff : newDot.xoff,
            yoff : newDot.yoff,
            speed : newDot.speed,
            directionx : newDot.direction.x,
            directiony : newDot.direction.y,
            diameter : newDot.diameter,
            maxDiameter : newDot.maxDiameter,
            hue : newDot.hue,
            sat : newDot.sat,
            bri : newDot.bri
          }

          p.socket.emit('aNewDot', data);
        }
      }

      //let end = p.millis();
      //let elapsed = p.nf(end - start, 2, 4);

      //console.log("Sending circles took: " + elapsed);

    }

    //if (p.pews.length > 0){
      //let start = p.millis();
      for (var i = 0; i < p.pews.length; i++){
        p.pews[i].update();
        p.pews[i].display();

      }

      //let elapsed = p.nf(p.millis() - start, 2, 4);
      //console.log("Drawing " + p.pews.length + " circles took: " + elapsed);
    //}

    for (var i = p.pews.length; i > 0; i--){
      if (p.pews[i-1].diameter < 0){
        p.pews.splice(i-1,1);
      }
      else if(p.pews[i-1].position.x < 0 || p.pews[i-1].position.x > p.theWidth || p.pews[i-1].position.y < 0 || p.pews[i-1].position.y > p.theHeight){
          p.pews.splice(i-1,1);
      }
    }

    //if (p.otherPews.length > 0){
      //let start = p.millis();
      for (var i = 0; i < p.otherPews.length; i++){
        p.otherPews[i].update();
        p.otherPews[i].display();
      }
      //let elapsed = p.nf(p.millis() - start, 2, 4);
      //console.log("Drawing " + p.otherPews.length + "other circles took: " + elapsed);
    //}

    //console.log(p.pews.length);
    // spliced = 0;
    while ((p.pews.length + p.otherPews.length) > p.maxCircles){
      if (p.pews.length > 0){
        p.pews.splice(0,1);
        //spliced++;
      }
      if (p.otherPews.length > 0){
        p.otherPews.splice(0,1);
        //spliced++;
      }
    }
    //console.log("sadly spliced: " + spliced);


    for (var i = p.otherPews.length; i > 0; i--){
      if (p.otherPews[i-1].diameter < 0){
        p.otherPews.splice(i-1,1);
      }
      else if(p.otherPews[i-1].position.x < 0 || p.otherPews[i-1].position.x > p.theWidth || p.otherPews[i-1].position.y < 0 || p.otherPews[i-1].position.y > p.theHeight){
          p.otherPews.splice(i-1,1);
      }
    }

    p.previousMouseX = p.mouseX;
    p.previousMouseY = p.mouseY;
    p.huePicker = (p.huePicker + 2) % 360;
  };



  class OtherDot{
    constructor(x, y, xoff, yoff, speed, dx, dy, diameter, maxDiameter, hue, sat, bri){
      this.position = p.createVector(x, y);
      this.xoff = xoff;
      this.yoff = yoff;
      this.speed = speed;
      this.direction = p.createVector(dx,dy);
      this.diameter = diameter;
      this.diameterGrowing = true;
      this.maxDiameter = maxDiameter;
      this.hue = hue;
      this.sat = sat;
      this.bri = bri;
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


  class Dot{
  	constructor(i, j, dx, dy){
      this.position = p.createVector(i, j);
      this.xoff = p.random(0,1000);
      this.yoff = p.random(0,1000);
      this.speed = 0.05;

      this.direction = p.createVector(dx,dy);
      this.diameter = 5;
      this.diameterGrowing = true;
      this.maxDiameter = p.random(p.minSize,p.maxSize);

      p.probability = p.random(0,1);

      if (p.probability<= p.colorCollections[p.colorChoice].pA){
        this.hue = p.random(p.hue(p.colorCollections[p.colorChoice].colorA)-10, p.hue(p.colorCollections[p.colorChoice].colorA)+10) %360;
        this.sat = p.saturation(p.colorCollections[p.colorChoice].colorA);
        this.bri = p.brightness(p.colorCollections[p.colorChoice].colorA);

      }
      else if (p.probability <= p.colorCollections[p.colorChoice].pB){
        this.hue = p.random(p.hue(p.colorCollections[p.colorChoice].colorB)-10, p.hue(p.colorCollections[p.colorChoice].colorB)+10) %360;
        this.sat = p.saturation(p.colorCollections[p.colorChoice].colorB);
        this.bri = p.brightness(p.colorCollections[p.colorChoice].colorB);
      }
      else{
        this.hue = p.random(p.hue(p.colorCollections[p.colorChoice].colorC)-10, p.hue(p.colorCollections[p.colorChoice].colorC)+10) %360;
        this.sat = p.saturation(p.colorCollections[p.colorChoice].colorC);
        this.bri = p.brightness(p.colorCollections[p.colorChoice].colorC);
      }


      //this.hue = p.map(this.position.x, 0, p.theWidth, 0, 360);
      this.age = 0;

  	}

  	update(){
      this.xoff += this.speed;
      this.yoff += this.speed;

      this.position.x += this.direction.x;
      this.position.y += this.direction.y;


      //console.log(p.map(p.noise(this.xoff), 0, 1, -5, 5));
      this.position.x += p.map(p.noise(this.xoff), 0, 1, 0 - p.wiggleAmount, p.wiggleAmount);
      this.position.y += p.map(p.noise(this.yoff), 0, 1, 0 - p.wiggleAmount, p.wiggleAmount);

      for (var i = 0; i<p.otherPews.length; i++){
        if (p.dist(this.position.x, this.position.y, p.otherPews[i].position.x, p.otherPews[i].position.x) < 100){
            this.direction.x +=  p.otherPews[i].direction.x/30;
            this.direction.y +=  p.otherPews[i].direction.y/30;
        }
      }


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
    constructor(a, b, c, pa, pb, pc){
      this.colorA = a;
      this.colorB = b;
      this.colorC = c;
      this.pA = pa;
      this.pB = pa+pb;
      this.pC = pa+pb+pc;
    }
  }


};



var ps = new p5(pewpewSketch);
