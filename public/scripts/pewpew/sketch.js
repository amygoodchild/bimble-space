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
      $("#menu").css("width", "55px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "inline-block");
      $(".menuButtonOpen").css("display", "none");
      $(".menuButtonClosedMobile").css("display", "none");
      $(".menuButtonOpenMobile").css("display", "none");
    }
    else{
      landscape = false;
      $("#menu").css("height", "50px");
      $("#menu").css("width", "100%");
      $(".menuButtonClosedMobile").css("display", "inline-block");
      $(".menuButtonOpenMobile").css("display", "none");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");
    }
  });

function registerOwnID(data){
  console.log(data);
}

const pewpewSketch = ( p ) => {

  p.boids = [];

  // Spawning variables
  p.duplicates= 1;      // how many spawn per frame (looks cool if loads shoot out at once, but hits max boids quicker)
  p.initialSpeed = 80;  // how much the mouse direction affects initial velocity
  p.minInitialSpeed = -80;
  p.spawnRandomness = 10; // gives a bit of randomness to the position of spawning
  p.id = 0;

  p.maxSize = 32;
  p.minSize = 20;

  p.previousMouseX = 0;
  p.previousMouseY = 0;


  p.wiggleAmount = 5;

  p.huePicker = 0;
  p.colorCollections = [];
  p.colorChoice = 0;


  p.pairMessages = [];
  p.loneMessages = [];
  p.otherWidth;
  p.otherHeight;
  p.wrapWidth;
  p.wrapHeight;

  p.frameRateLerp = 60;

  p.maxBoids = 200;

  p.socket;

  p.disableFriendlyErrors = true;
  p.debugMode = false;
  p.start = 0;
  p.elapsed = 0;

  p.pusher;
  p.pushing = false;
  p.choosePush = false;

  p.desiredSeparation = 15;
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
    //p.frameRate(1);
    p.pusher = new Pusher(0,0,0,0);
    p.noiseSeed(100);

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

    p.wrapWidth = p.width;
    p.wrapHeight = p.height;

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


    p.loneMessages[0] = "Like a spider";
    p.loneMessages[1] = "such as a monk";
    p.loneMessages[2] = "much like the moon";
    p.loneMessages[3] = "deep";
    p.loneMessages[4] = "maybe you'll make a friend soon";


    p.socket.on('aNewBoid', p.otherUserDraws);
  //  p.socket.on('updateUsers', p.updateUsers);
    p.socket.on('whatsyourinfo', p.whatsyourinfo);
    p.socket.on('test', p.test);
    p.socket.on('matched', p.matched);
    p.socket.on('unmatched', p.unmatched);

  };

  p.unmatched = (data) =>{
     //console.log("Unmatched :(");
    let randomNumber = p.random(0,1);
    for (let i = 0; i<p.loneMessages.length;i++){
      if (randomNumber<=1/p.loneMessages.length*(i+1)){
        $("#info").html("You're playing solo - " + p.loneMessages[i]);
        break;
      }
    }

    p.wrapWidth = p.width;
    p.wrapHeight = p.height;
  }

  p.matched = (data) =>{
     //console.log("I am: " + data.whoami);
     //console.log("My id is: " + data.myid);
     //console.log("Matched with: " + data.otherUser);
     $("#info").html("You're paired up - " + data.message);
     p.otherWidth = data.otherWidth;
     p.otherHeight = data.otherHeight;
     if (p.otherWidth > p.width){  p.wrapWidth = p.otherWidth; }
     if (p.otherHeight > p.height){ p.wrapHeight = p.otherHeight; }


  }

  p.test = (data) =>{
     console.log(data.test);
  }

  p.whatsyourinfo = (data) =>{
    data = {
      room : "swoosh",
      width : p.width,
      height : p.height
    }
    p.socket.emit('myinfo', data);
  }



  p.updateUsers = (data) =>{
    $("#info").html(data.numUsers + " users connected");
  }


  p.otherUserDraws = (data) =>{

    //p.fill('#bb66bb');
    //p.ellipse(data.x,data.y,15,15);
    if ( p.boids.length < p.maxBoids){
      let xposition = p.map(data.x, 0, p.otherWidth, 0, p.width);
      let yposition = p.map(data.y, 0, p.otherHeight, 0, p.height);

      //let xposition = data.x;
      //let yposition = data.y;

      var newBoid = new Boid(xposition, yposition, data.xoff, data.yoff, data.speed, data.directionx, data.directiony, data.diameter,
                                data.maxDiameter, data.hue, data.sat, data.bri);
      p.boids.push(newBoid);
      //console.log("recc pos x: " + newBoid.position.x + " recc pos y: " + newBoid.position.y);
      p.id++;
    }


  }

  p.keyPressed = () => {
    if (p.key === 'p') {
      p.choosePush = !p.choosePush;
      console.log(p.choosePush);

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
      p.maxBoids = 10;
    }
    else if (p.frameRate() > 65){
      p.maxBoids = 100;
    }
    else{
      p.maxBoids = p.map(p.frameRate(), 20, 65, 10, 100);
    }

    p.elapsed = p.nf(p.millis() - p.start, 1, 4);
    //console.log("Adjusting max circles: " + p.elapsed);

    if(p.debugMode){
      p.text( p.int(p.maxBoids), 183, 40);
      p.text( p.boids.length, 183, 60);
    }
    //console.log("max circles worked out");

    if (p.mouseIsPressed){
      if(p.boids.length < p.maxBoids && p.choosePush == false){

        p.mouseDirection = p.createVector(p.map(p.mouseX - p.previousMouseX, -100, 100, p.minInitialSpeed, p.initialSpeed), p.map(p.mouseY - p.previousMouseY, -100, 100, p.minInitialSpeed, p.initialSpeed));
        var data;
        for (var i = 0; i < p.duplicates; i++){
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

            var newBoid = new Boid(p.random(p.mouseX - p.spawnRandomness, p.mouseX + p.spawnRandomness),   // pos x
                                p.random(p.mouseY - p.spawnRandomness, p.mouseY + p.spawnRandomness),    // pos y
                                p.random(0,1000), p.random(0,1000), 0.05,                                // xoff yoff noiseSpeed
                                p.mouseDirection.x, p.mouseDirection.y,                                  // velocity
                                5, p.random(p.minSize,p.maxSize),                                        // diameter maxdiameter
                                tempHue, tempSat, tempBri);                                              // hue sat bri
            p.id++;

            //console.log("sent pos x: " + newBoid.position.x + " sent pos y: " + newBoid.position.y);
            p.boids.push(newBoid);

            data = {
              x : newBoid.position.x,
              y : newBoid.position.y,
              xoff : newBoid.xoff,
              yoff : newBoid.yoff,
              speed : newBoid.speed,
              directionx : newBoid.velocity.x,
              directiony : newBoid.velocity.y,
              diameter : newBoid.diameter,
              maxDiameter : newBoid.maxDiameter,
              hue : newBoid.hue,
              sat : newBoid.sat,
              bri : newBoid.bri
            }

            p.socket.emit('aNewBoid', data);

        }
        pushing = false;
      }

      else{
        p.mouseDirection = p.createVector(p.map(p.mouseX - p.previousMouseX, -300, 300, -50, 50), p.map(p.mouseY - p.previousMouseY, -300, 300, -50, 50));
        p.pusher.position.x = p.mouseX;
        p.pusher.position.y = p.mouseY;
        p.pusher.velocity.x = p.mouseDirection.x;
        p.pusher.velocity.y = p.mouseDirection.y;
        //console.log(p.pusher.velocity);
        p.pushing = true;
      }
    }

    p.start = p.millis();

    for (var i = p.boids.length; i > 0; i--){
      if (p.boids[i-1].diameter < 8 && p.boids[i-1].diameterGrowing == false){
        p.boids.splice(i-1,1);
      }
      else if(p.boids[i-1].position.x < 0 || p.boids[i-1].position.x > p.theWidth || p.boids[i-1].position.y < 0 || p.boids[i-1].position.y > p.theHeight){
        p.boids.splice(i-1,1);
      }
    }


    for (var i = 0; i < p.boids.length; i++){
      if (i == -10){
        //console.log("age: " + p.boids[i].age);
        console.log("before compare");
        console.log("x position: " + p.boids[i].position.x);
        //console.log("xoff: " + p.boids[i].xoff);
        //console.log("noise: " + p.noise(p.boids[i].xoff));
      }
      p.boids[i].compare();
      if (i == -10){
        console.log("before update");
        console.log("x position: " + p.boids[i].position.x);
        //console.log("xoff: " + p.boids[i].xoff);
        //console.log("noise: " + p.noise(p.boids[i].xoff));
      }

      p.boids[i].update();

      if (i == -10){
        console.log("after update");
        console.log("x position: " + p.boids[i].position.x);
        //console.log("xoff: " + p.boids[i].xoff);
        //console.log("noise: " + p.noise(p.boids[i].xoff));
      }
    }

    for (var i = 0; i < p.boids.length; i++){
      p.boids[i].display();
    }

    p.previousMouseX = p.mouseX;
    p.previousMouseY = p.mouseY;
    p.huePicker = (p.huePicker + 2) % 360;
  };


  class Pusher{
    constructor(x, y, dx, dy){
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(dx,dy);
    }
  }


  class Boid{
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
      this.wiggle = 3;
      this.wiggleFactor = 20;

      this.r = 2.0;
      this.maxSpeed = 5;
      this.maxForce = 0.1;
      this.id = p.id;
  	}

    applyForce(force){
      this.acceleration.add(force);
    }

    compare(){


    }


    update(){
      //old();
      //move

      let xforce = p.map(p.noise(this.xoff), 0, 1, 0-this.wiggle, this.wiggle);
      let yforce = p.map(p.noise(this.yoff), 0, 1, 0-this.wiggle, this.wiggle);
      let wiggleForce = p.createVector(xforce,yforce);
      //this.position.add(wiggleForce);


      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);


      // Wiggle
      this.xoff += this.speed;
      this.yoff += this.speed;


      // Wrap around
  /*  if (this.position.x > (p.wrapWidth + 10)){ this.position.x = -10; }
      else if (this.position.x < -10){ this.position.x = p.wrapWidth+10; }
      if (this.position.y > (p.wrapHeight+ 10)){ this.position.y = -10; }
      else if (this.position.y < -10){ this.position.y = p.wrapHeight+10; }*/


      //change size
      if (this.diameterGrowing){
        this.diameter += 2;
      }
      else{
        this.diameter -= 0.1;
      }

      if (this.diameter > this.maxDiameter){
        this.diameterGrowing = false;
      }

      if (this.wiggle > 5){
        this.wiggle -=0.8;
        this.maxSpeed -=0.1;
      }

      this.age++;

  	}

  	display(){
      p.fill(this.hue, this.sat, this.bri, 60);
      //p.stroke(this.hue,70,90,50);
  		p.rect(this.position.x, this.position.y, this.diameter, this.diameter);

      //console.log("pos x: " + this.position.x + " pos y: " + this.position.y);
      //console.log("vel x: " + this.velocity.x + " vel y: " + this.velocity.y);
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
