var landscape;
  if ($( window ).height() < $( window ).width()){
    landscape = true;
    console.log("landscape");
  }
  else{
    landscape = false;
    console.log("portrait");
  }
/*
  $( window ).resize(function() {
    if ($( window ).height() < $( window ).width()){
      landscape = true;
      $("#menu").css("width", "55px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "inline-block");
      $(".menuButtonOpen").css("display", "none");
      $(".menuButtonClosedMobile").css("display", "none");
      $(".menuButtonOpenMobile").css("display", "none")

      newToyWidth =  $(window).width() - 55;
      newToyHeight = $(window).height()
    }
    else{
      landscape = false;

      $("#menu").css("height", "50px");
      $("#menu").css("width", "100%");
      $(".menuButtonClosedMobile").css("display", "inline-block");
      $(".menuButtonOpenMobile").css("display", "none");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");

      newToyWidth =  $(window).width();
      newToyHeight = $(window).height() - 50;

    }

    $("#theToyContainer").css({ 'width': newToyWidth });
    $("#theToyContainer").css({ 'height': newToyHeight });
    ps.resizeCanvas(parseInt($("#theToyContainer").width()), parseInt($("#theToyContainer").height()));
    ps.background(100,100,100);

    data = {
      newWidth : newToyWidth,
      newHeight : newToyHeight,
      otherUser : ps.otherUser
    }

  });*/


//function sortOutWindowResize(){

//}

const linesIdeaSketch = ( p ) => {

  // Seed the start of perlin noise with this
  p.theNoiseSeed = 893;

  p.autoLayer = false;
  p.autoNew = false;

  p.wigglers = [];
  p.numLines = 70;      // how many linws
  p.yResolution = 40;  // how far we go down the y axis each step
  p.thickness = 4;            // how thick the line is


  p.seeder = 0.9;           // gives each wiggler a place to start generating perlin noise from
                            // doesn't really matter what this is, it just kind of decides where we start from
                            // as in, different numbers will give different but similar results

  p.maxSeedStepTarget = 0.005;
  p.numLinesTarget = 70;
  p.yResolutionTarget = 40;
  p.noiseChangeTarget = 0.05;
  p.wiggleLeftTarget = -100;
  p.wiggleRightTarget = 100;
  p.lerpAmountTarget = 0.8;
  p.noiseSeedDistanceTarget = 0.005;
  p.seedDistanceSeedChangeTarget = 0.0005

  p.targetLerp = 0.01;

  p.seedDistance = 0.005;    // each wiggler's seed start place is this far apart.
                            // lower numbers give more cohesion


  p.noiseChange = 0.05;   // how much each wiggler's seed changes every step
                            // lower numbers give smoother wider curves
                            // higher numbers give more frenetic results

  p.wiggleLeft = -100;        // how wide the wiggles go
  p.wiggleRight = 100;

  p.lerpAmount = 0.8;       // how much to keep the line inline with its original xposition
                            // when using shapeBetween mode
                            // higher numbers cause the line to tend in a direction
                            // 1.0 is makes shapeBetween the same as shape
                            // 0.0 makes shapeBetween the same as shapeControlled


  p.yPosSeed = 2.6;
  p.yPosDist = 0.5;

  p.heightSeed = 42.1;
  p.heightDist = 0.5;
  p.wiggleRightrHeight = 800;


  // Animation
  p.noiseSeedDistance = 0.005; // How much p.seeder changes per frame

  p.animationSeed = 0.1;
  p.animationSeedChange = 0.005;

  p.seedDistanceSeed = 0.1;
  p.seedDistanceSeedChange = 0.0005;

  p.maxSeedStep = 0.08;


  // Colour Choices
  p.minHue1 = 200;
  p.maxHue1 = 270;

  p.minHue2 = 190;
  p.maxHue2 = 300;

  p.sat1 = 90;
  p.bri1 = 70;
  p.opa1 = 60;

  p.sat2 = 90;
  p.bri2 = 70;
  p.opa2 = 60;

  p.bgHue = p.minHue2;
  p.bgSat = 100;
  p.bgBri = 10;
  p.bgOpa = 10;

  p.alternate = false;
  p.colourEquality = 2; // Higher number gives more of colour 1

  p.newBackground = false;

  p.setup = () => {
    // Basics
    p.colorMode(p.HSB,360,100,100, 100);
    p.noiseSeed(p.theNoiseSeed);

    // Creates the canvas
    if (p.int(p.windowWidth) > p.int(p.windowHeight)){    // landscape (desktop)
      //p.theWidth = p.int(p.windowWidth) - 55;
      p.theHeight = p.int(p.windowHeight);
      p.theWidth = p.int(p.windowWidth);

      //p.theWidth = 16385;
      //p.theHeight = 16385;
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight);

    }
    else{                                               // portrait (mobile)
      p.theWidth = p.int(p.windowWidth);
      //p.theHeight = p.int(p.windowHeight) - 50;
      p.theHeight = p.int(p.windowHeight);
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight);
    }

    p.rippleCanvas.parent('theToyContainer');


    p.createWigglers();

    // Basics
    p.strokeWeight(p.thickness);
    p.noFill();

    p.colorMode(p.HSB,360,100,100, 100);
    p.background(p.bgHue, p.bgSat, p.bgBri);

  };


  p.draw = () => {
    p.background(p.bgHue, p.bgSat, p.bgBri, p.bgOpa);

    for (let i = 0; i < p.wigglers.length; i++) {
      //p.wigglers[i].shape();
      p.wigglers[i].shapeBetween();
      //p.wigglers[i].shapeSwap();
      //p.wigglers[i].shortShapes();
    }

    p.changeValues();
    //p.seeder += p.noiseSeedDistance;

    p.animationSeed += p.animationSeedChange;
    p.seedDistanceSeed += p.seedDistanceSeedChange;
    //p.seeder += p.map(p.noise(p.animationSeed), 0,1, 0, p.noiseSeedDistance);
    p.seeder += p.noiseSeedDistance;
    //p.seedDistance = p.map(p.noise(p.seedDistanceSeed), 0, 1, 0, p.maxSeedStep);
    p.createWigglers();

    //console.log(p.frameRate());
    /*p.fill(0,0,0);
    p.rect(0,0,400,30);
    p.fill(0,0,100);
    p.text(p.frameRate(), 270,10);*/

  };

  p.changeValues = () => {
      p.maxSeedStep = p.lerp(p.maxSeedStep, p.maxSeedStepTarget, p.targetLerp);
      p.numLines = p.lerp(p.numLines, p.numLinesTarget, p.targetLerp);
      p.yResolution = p.lerp(p.yResolution, p.yResolutionTarget, p.targetLerp);
      p.noiseChange = p.lerp(p.noiseChange, p.noiseChangeTarget, p.targetLerp);
      p.wiggleLeft = p.lerp(p.wiggleLeft, p.wiggleLeftTarget, p.targetLerp);
      p.wiggleRight = p.lerp(p.wiggleRight, p.wiggleRightTarget, p.targetLerp);
      p.lerpAmount= p.lerp(p.lerpAmount, p.lerpAmountTarget, p.targetLerp);
      p.noiseSeedDistance = p.lerp(p.noiseSeedDistance, p.noiseSeedDistanceTarget, p.targetLerp);
      p.seedDistanceSeedChange = p.lerp(p.seedDistanceSeedChange, p.seedDistanceSeedChangeTarget, p.targetLerp);
  }

  p.createWigglers = () => {
    p.noiseSeed(p.theNoiseSeed);
    // create the wigglers
    let seedWas = p.seeder;
    let yPosSeedWas = p.yPosSeed;
    let heightSeedWas = p.heightSeed;

    for (let i = 0; i < p.numLines; i++) {
      let x = (p.theWidth / p.numLines) * i;
      let hue;
      let sat;
      let bri;
      let opa;

      let checker = true;

      if (p.alternate){// colours alternate 1212 across the canvas
        if (i%2 != 0){
          hue = p.map(i, 0, p.numLines, p.minHue1, p.maxHue1);
          sat = p.sat1;
          bri = p.bri1;
          opa = p.opa1;
        }
        else{
          hue = p.map(i, 0, p.numLines, p.minHue2, p.maxHue2);
          sat = p.sat2;
          bri = p.bri2;
          opa = p.opa2;
        }
      }
      else{// colours are split left/right of canvas
        if (p.numLines / 2 > i){
          hue = p.map(i, 0, p.numLines/2, p.minHue1, p.maxHue1);
          sat = p.sat1;
          bri = p.bri1;
          opa = p.opa1;

        }
        else{
          hue = p.map(i, p.numLines/2, p.numLines, p.minHue2, p.maxHue2);
          sat = p.sat2;
          bri = p.bri2;
          opa = p.opa2;
        }
      }


      //let startY = p.map(p.noise(p.yPosSeed), 0, 1, 0, p.windowHeight);
      //let height = p.map(p.noise(p.heightSeed), 0, 1, 0, p.wiggleRightrHeight);

      let startY = 0;
      let height = p.theHeight;


      //console.log("startY: " + startY);

      p.yPosSeed += p.yPosDist;
      p.heightSeed += p.heightDist;


      p.wigglers[i] = new Wiggler(x, p.seeder, hue, sat, bri, opa, startY, height);
      p.seeder += p.seedDistance;
    }

    p.seeder = seedWas;

  }

  p.newLayer = () => {
    p.strokeWeight(p.thickness);
    p.wigglers = [];
    p.createWigglers();
  }

  p.totallyNew = () => {
    p.background(0,0,0);
    p.strokeWeight(p.thickness);
    p.wigglers = [];
    p.createWigglers();
  }

  p.totallyNewColor = () => {
    p.background(p.bgHue, p.bgSat, p.bgBri,100);
    p.strokeWeight(p.thickness);
    p.wigglers = [];
    p.createWigglers();
  }

  class Wiggler{
    constructor(x, seed, hue, sat, bri, opa, startY, height){
      //this.position = p.createVector(x,y);
      this.x = x;
      this.seed = seed;
      this.y = 1 - (p.yResolution);
      this.id = this.x;

      this.prevX = x;
      this.prevY = 0;

      this.hue = hue;
      this.sat = sat;
      this.bri = bri;
      this.opa = opa;

      this.startY = startY;
      this.height = height;

      this.direction = true;
  	}

    update(){

      this.prevX = this.x;
      this.prevY = this.y +1;
      let noise = p.noise(this.seed);
      let wiggle = p.map(noise, 0, 1, p.wiggleLeft, p.wiggleRight);

      if (this.direction){
        this.x += wiggle;
      }
      else{
        this.x -= wiggle;
      }

      this.seed += p.noiseChange;
      this.y += p.yResolution;

      //if(this.id == 0){
      //  console.log("x: " + this.x + " noise:" + noise + " wiggle: " + wiggle);
      //}
      //this.sat = p.map(noise, 0, 1, 80, 100);
    }

    shape(){
      p.stroke(this.hue, this.sat, this.bri, this.opa);
      p.beginShape();
        while(this.y < p.theHeight){
          this.prevX = this.x;
          this.prevY = this.y +1;
          let noise = p.noise(this.seed);
          let wiggle = p.map(noise, 0, 1, p.wiggleLeft, p.wiggleRight);

          if (this.direction){
            this.x += wiggle;
          }
          else{
            this.x -= wiggle;
          }

          this.seed += p.noiseChange;
          this.y += p.yResolution;
          p.vertex(this.x, this.y);



        }
      p.endShape();
    }

    shapeSwap(){
      p.stroke(this.hue, this.sat, this.bri, this.opa);
      //console.log("opacity: " + this.opa);
      //p.stroke(0,0,100,50);
      p.beginShape();
        while(this.y < p.theHeight){
          this.prevX = this.x;
          this.prevY = this.y +1;
          let noise = p.noise(this.seed);
          let wiggle = p.map(noise, 0, 1, p.wiggleLeft, p.wiggleRight);

          /*if (this.direction){
            this.seed += p.noiseChange;
          }
          else{
            this.seed -= p.noiseChange;
          }*/

          if (this.y < p.height/2){
            this.seed += p.noiseChange;
            console.log("asd");
          }
          else{
            this.seed -= p.noiseChange;
          }

          let theX = this.x + wiggle;
          this.x = p.lerp(this.x, theX, p.lerpAmount);

          this.y += p.yResolution;
          p.vertex(theX, this.y);

          let chance = p.random(1);

          if (chance > 0.99){
            this.direction = false;
            //console.log("hi");
          }
          else{
            this.direction = true;
          }
        }
      p.endShape();
    }


    shapeControlled(){
      p.stroke(this.hue, this.sat, this.bri, this.opa);
      p.beginShape();
        while(this.y < p.theHeight){
          this.prevX = this.x;
          this.prevY = this.y +1;
          let noise = p.noise(this.seed);
          let wiggle = p.map(noise, 0, 1, p.wiggleLeft, p.wiggleRight);
          let theX = this.x + wiggle;
          this.seed += p.noiseChange;
          this.y += p.yResolution;
          p.vertex(theX, this.y);
        }
      p.endShape();
    }

    shapeBetween(){
      p.stroke(this.hue, this.sat, this.bri, this.opa);
      //console.log("opacity: " + this.opa);
      //p.stroke(0,0,100,50);
      p.beginShape();
        while(this.y < p.theHeight){
          this.prevX = this.x;
          this.prevY = this.y +1;
          let noise = p.noise(this.seed);
          let wiggle = p.map(noise, 0, 1, p.wiggleLeft, p.wiggleRight);
          let theX = this.x + wiggle;
          this.x = p.lerp(this.x, theX, p.lerpAmount);
          this.seed += p.noiseChange;
          this.y += p.yResolution;
          p.vertex(theX, this.y);
        }
      p.endShape();
    }

    shortShapes(){
      p.stroke(this.hue, this.sat, this.bri, this.opa);
      //console.log("opacity: " + this.opa);
      //p.stroke(0,0,100,50);
      this.y = this.startY;
      p.beginShape();
        while(this.y < this.startY + this.height){
          this.prevX = this.x;
          this.prevY = this.y +1;
          let noise = p.noise(this.seed);
          let wiggle = p.map(noise, 0, 1, p.wiggleLeft, p.wiggleRight);
          let theX = this.x + wiggle;
          this.x = p.lerp(this.x, theX, p.lerpAmount);
          this.seed += p.noiseChange;
          this.y += p.yResolution;
          p.vertex(theX, this.y);
        }
      p.endShape();
    }

  	display(){
      //p.ellipse(this.x, this.y, p.thickness, p.thickness);

      //p.stroke(0, 100, 80, 10);
      p.line(this.x, this.y, this.prevX, this.prevY);
  	}
  }


}



var ps = new p5(linesIdeaSketch);
