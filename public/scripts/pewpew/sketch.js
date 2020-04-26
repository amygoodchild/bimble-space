var landscape;
  if ($( window ).height() < $( window ).width()){
    landscape = true;
    console.log("landscape");
  }
  else{
    landscape = false;
    console.log("portrait");
  }

  $( window ).resize(function() {
    if ($( window ).height() < $( window ).width()){
      landscape = true;
      ps.maxSize = 20;
      ps.minSize = 8;
      $("#menu").css("width", "55px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "inline-block");
      $(".menuButtonOpen").css("display", "none");
      $(".menuButtonClosedMobile").css("display", "none");
      $(".menuButtonOpenMobile").css("display", "none");
    }
    else{
      landscape = false;
      ps.maxSize = 15;
      ps.minSize = 5;
      $("#menu").css("height", "50px");
      $("#menu").css("width", "100%");
      $(".menuButtonClosedMobile").css("display", "inline-block");
      $(".menuButtonOpenMobile").css("display", "none");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");

    }
  });

const pewpewSketch = ( p ) => {

  p.pews = [];
  p.otherPews = [];
  p.spawnProbability= 0.25;
  p.duplicates= 4;

  if (landscape){
    p.maxSize = 26;
    p.minSize = 8;
  }
  else{
    p.maxSize = 26;
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

  p.disableFriendlyErrors = true;
  p.debugMode = true;
  p.start = 0;
  p.elapsed = 0;


  p.desiredSeparation = 25;
  p.neighborDist = 50;

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
    if ( p.pews.length < p.maxCircles){
      var newDot = new Dot(data.x, data.y, data.xoff, data.yoff, data.speed, data.directionx, data.directiony, data.diameter,
                                data.maxDiameter, data.hue, data.sat, data.bri);
      p.pews.push(newDot);
    }
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

    p.start = p.millis();

    if (p.frameRate() < 20){
      p.maxCircles = 10;
    }
    else if (p.frameRate() > 65){
      p.maxCircles = 150;
    }
    else{
      p.maxCircles = p.map(p.frameRate(), 20, 65, 10, 150);
    }

    p.elapsed = p.nf(p.millis() - p.start, 1, 4);
    //console.log("Adjusting max circles: " + p.elapsed);

    if(p.debugMode){
      p.text(p.int(p.maxCircles), 183, 40);
      p.text( p.pews.length, 183, 60);
    }
    //console.log("max circles worked out");

    if (p.mouseIsPressed && p.mouseX > 100 && p.pews.length < p.maxCircles){


      p.start = p.millis();

      p.mouseDirection = p.createVector(p.map(p.mouseX - p.previousMouseX, -300, 300, -50,50), p.map(p.mouseY - p.previousMouseY, -300, 300, -50, 50));

      p.elapsed = p.nf(p.millis() - p.start, 1, 4);
      //console.log("Calc mouse direction: " + p.elapsed);

      var data;
      //let start = p.millis();
      p.start = p.millis();

      for (var i = 0; i < p.duplicates; i++){
        if (p.random(0,1)<= p.spawnProbability){

          p.probability = p.random(0,1);
          let tempHue;
          let tempSat;
          let tempBri;

          if (p.probability<= p.colorCollections[p.colorChoice].pA){
            tempHue = p.random(p.hue(p.colorCollections[p.colorChoice].colorA)-10, p.hue(p.colorCollections[p.colorChoice].colorA)+10) %360;
            tempSat = p.saturation(p.colorCollections[p.colorChoice].colorA);
            tempBri = p.brightness(p.colorCollections[p.colorChoice].colorA);

          }
          else if (p.probability <= p.colorCollections[p.colorChoice].pB){
            tempHue = p.random(p.hue(p.colorCollections[p.colorChoice].colorB)-10, p.hue(p.colorCollections[p.colorChoice].colorB)+10) %360;
            tempSat = p.saturation(p.colorCollections[p.colorChoice].colorB);
            tempBri = p.brightness(p.colorCollections[p.colorChoice].colorB);
          }
          else{
            tempHue = p.random(p.hue(p.colorCollections[p.colorChoice].colorC)-10, p.hue(p.colorCollections[p.colorChoice].colorC)+10) %360;
            tempSat = p.saturation(p.colorCollections[p.colorChoice].colorC);
            tempBri = p.brightness(p.colorCollections[p.colorChoice].colorC);
          }

          var newDot = new Dot(p.random(p.mouseX - p.spawnRandomness, p.mouseX + p.spawnRandomness),
                              p.random(p.mouseY - p.spawnRandomness, p.mouseY + p.spawnRandomness),
                              p.random(0,1000), p.random(0,1000), 0.05,
                              p.mouseDirection.x, p.mouseDirection.y,
                              5, p.random(p.minSize,p.maxSize),
                              tempHue, tempSat, tempBri);

          p.pews.push(newDot);

          data = {
            x : newDot.position.x,
            y : newDot.position.y,
            xoff : newDot.xoff,
            yoff : newDot.yoff,
            speed : newDot.speed,
            directionx : newDot.velocity.x,
            directiony : newDot.velocity.y,
            diameter : newDot.diameter,
            maxDiameter : newDot.maxDiameter,
            hue : newDot.hue,
            sat : newDot.sat,
            bri : newDot.bri
          }

          p.socket.emit('aNewDot', data);
        }
      }

      p.elapsed = p.nf(p.millis() - p.start, 1, 4);
      //console.log("Creating and sending circs: " + p.elapsed);


    }

    p.start = p.millis();

    for (var i = p.pews.length; i > 0; i--){
      if (p.pews[i-1].diameter < 0){
        p.pews.splice(i-1,1);
      }
      else if(p.pews[i-1].position.x < 0 || p.pews[i-1].position.x > p.theWidth || p.pews[i-1].position.y < 0 || p.pews[i-1].position.y > p.theHeight){
          p.pews.splice(i-1,1);
      }
    }

    p.elapsed = p.nf(p.millis() - p.start, 1, 4);
    //console.log("Splicing circls took: " + p.elapsed);

    p.start = p.millis();
    for (var i = 0; i < p.pews.length; i++){
      let steer = p.createVector(0,0,0);
      let steerCount = 0;
      let align = p.createVector(0,0,0);
      let sum = p.createVector(0,0);
      let alignCount = 0;

      let cohSum = p.createVector(0,0);
      let cohSteer = p.createVector(0,0);

      for (var j = 0; j < p.pews.length; j++){
        if (i!=j){

          let d = p.dist(p.pews[i].position.x, p.pews[i].position.y, p.pews[j].position.x, p.pews[j].position.y);

          // steer
          if ((d > 0) && (d < p.desiredSeparation)){
            let diff = p5.Vector.sub(p.pews[i].position, p.pews[j].position);
            diff.normalize();
            diff.div(d);
            steer.add(diff);
            steerCount++;
          }

          // alignment
          if ((d > 0) && (d < p.neighborDist)){
            sum.add(p.pews[j].velocity);
            cohSum.add(p.pews[j].position);

            //sum.x *= p.pews[j].diameter;
            //sum.y *= p.pews[j].diameter;
            //cohSum.x *= p.pews[j].diameter;
            //cohSum.y *= p.pews[j].diameter;

            alignCount++;
          }
        }

        if (steerCount > 0){
          steer.div(steerCount);
        }

        if (steer.mag() > 0){
          steer.setMag(p.pews[i].maxSpeed);
          steer.sub(p.pews[i].velocity);
          steer.limit(p.pews[i].maxForce);
        }


        if (alignCount > 0){
          sum.setMag(p.pews[i].maxSpeed);
          align = p5.Vector.sub(sum, p.pews[i].velocity);
          align.limit(p.pews[i].maxForce);

          cohSum.div(alignCount);

          let desired = p5.Vector.sub(cohSum, p.pews[i].position);
          desired.setMag(p.pews[i].maxSpeed);
          cohSteer = p5.Vector.sub(desired, p.pews[i].velocity);
          cohSteer.limit(p.pews[i].maxForce);
        }

      }

      steer.mult(0.5);
      align.mult(3.0);
      cohSteer.mult(0.5);

      p.pews[i].applyForce(steer);
      p.pews[i].applyForce(align);
      p.pews[i].applyForce(cohSteer);
    }

    p.elapsed = p.nf(p.millis() - p.start, 1, 4);
    //console.log("Swarming circs took: " + p.elapsed);

    p.start = p.millis();


    for (var i = 0; i < p.pews.length; i++){
      p.pews[i].update();
    }



    p.elapsed = p.nf(p.millis() - p.start, 1, 4);
    //console.log("Updating circs took: " + p.elapsed);

    p.start = p.millis();

    for (var i = 0; i < p.pews.length; i++){
      p.pews[i].display();
    }

    p.elapsed = p.nf(p.millis() - p.start, 1, 4);
    //console.log("Drawing circles took: " + p.elapsed);


    //console.log(p.pews.length);
    // spliced = 0;
    /*while (p.pews.length > p.maxCircles){
      if (p.pews.length > 0){
        p.pews.splice(0,1);
        //spliced++;
      }
    }*/
    //console.log("sadly spliced: " + spliced);

    p.previousMouseX = p.mouseX;
    p.previousMouseY = p.mouseY;
    p.huePicker = (p.huePicker + 2) % 360;
  };



  class Dot{
    constructor(x, y, xoff, yoff, speed, dx, dy, diameter, maxDiameter, hue, sat, bri){
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(dx,dy);
      this.acceleration = p.createVector(0,0);
      this.xoff = xoff;
      this.yoff = yoff;
      this.speed = speed;
      this.diameter = diameter;
      this.diameterGrowing = true;
      this.maxDiameter = maxDiameter;
      this.hue = hue;
      this.sat = sat;
      this.bri = bri;
      this.age = 0;

      this.r = 2.0;
      this.maxSpeed = 4;
      this.maxForce = 0.08;
  	}

    applyForce(force){
      this.acceleration.add(force);
    }


    update(){
      //old();
      //move
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);

      // Wiggle
      this.xoff += this.speed;
      this.yoff += this.speed;
      this.position.x += p.map(p.noise(this.xoff), 0, 1, -3, 3);
      this.position.y += p.map(p.noise(this.yoff), 0, 1, -3, 3);

      // Wrap around

      if (this.position.x > p.width){ this.position.x = 0; }
      if (this.position.x < 0){ this.position.x = p.width; }
      if (this.position.y > p.height){ this.position.y = 0; }
      if (this.position.y < 0){ this.position.y = p.height; }


      //change size
      if (this.diameterGrowing){
        this.diameter += 5;
      }
      else{
        this.diameter -= 0.13;
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
