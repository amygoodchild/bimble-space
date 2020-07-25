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

  });


//function sortOutWindowResize(){

//}

const linesIdeaSketch = ( p ) => {

  // Seed the start of perlin noise with this
  p.theNoiseSeed = 893;

  p.autoLayer = false;
  p.autoNew = false;

  p.wigglers = [];
  p.numWigglers = 70;      // how many linws
  p.wiggleResolution = 40;  // how far we go down the y axis each step
  p.dotSize = 4;            // how thick the line is


  p.seeder = 0.9;           // gives each wiggler a place to start generating perlin noise from
                            // doesn't really matter what this is, it just kind of decides where we start from
                            // as in, different numbers will give different but similar results

  p.seedDistance = 0.005;    // each wiggler's seed start place is this far apart.
                            // lower numbers give more cohesion

  p.wiggleDistance = 0.05;   // how much each wiggler's seed changes every step
                            // lower numbers give smoother wider curves
                            // higher numbers give more frenetic results

  p.minWiggle = -100;        // how wide the wiggles go
  p.maxWiggle = 100;

  p.lerpAmount = 0.8;       // how much to keep the line inline with its original xposition
                            // when using shapeBetween mode
                            // higher numbers cause the line to tend in a direction
                            // 1.0 is makes shapeBetween the same as shape
                            // 0.0 makes shapeBetween the same as shapeControlled


  p.yPosSeed = 2.6;
  p.yPosDist = 0.5;

  p.heightSeed = 42.1;
  p.heightDist = 0.5;
  p.maxWigglerHeight = 800;


  // Animation
  p.noiseSeedDistance = 0.005; // How much p.seeder changes per frame

  p.animationSeed = 0.1;
  p.animationSeedChange = 0.005;

  p.seedDistanceSeed = 0.1;
  p.seedDistanceSeedChange = 0.0005;
  p.maxSeedDistance = 0.08;


  // Colour Choices
  p.minHue1 = 200;
  p.maxHue1 = 270;

  p.minHue2 = 190;
  p.maxHue2 = 300;

  p.sat1 = 90;
  p.bri1 = 70;
  p.opa1 = 15;

  p.sat2 = 90;
  p.bri2 = 70;
  p.opa2 = 15;

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
    p.strokeWeight(p.dotSize);
    p.noFill();
    p.background(0,0,100);
        p.background(p.minHue1,p.sat1,p.bri1-50);
    p.colorMode(p.HSB,360,100,100, 100);
  };


  p.draw = () => {
    p.background(p.minHue2,p.sat1,p.bri1-50,0.3);

    for (let i = 0; i < p.wigglers.length; i++) {
      //p.wigglers[i].shape();
      p.wigglers[i].shapeBetween();
      //p.wigglers[i].shapeSwap();
      //p.wigglers[i].shortShapes();
    }


    //p.seeder += p.noiseSeedDistance;



    p.animationSeed += p.animationSeedChange;
    p.seedDistanceSeed += p.seedDistanceSeedChange;
    p.seeder += p.map(p.noise(p.animationSeed), 0,1, 0, p.noiseSeedDistance);
    p.seedDistance = p.map(p.noise(p.seedDistanceSeed), 0, 1, 0, p.maxSeedDistance);
    p.createWigglers();

  };

  p.createWigglers = () => {
    p.noiseSeed(p.theNoiseSeed);
    // create the wigglers
    let seedWas = p.seeder;
    let yPosSeedWas = p.yPosSeed;
    let heightSeedWas = p.heightSeed;

    for (let i = 0; i < p.numWigglers; i++) {
      let x = (p.theWidth / p.numWigglers) * i;
      let hue;
      let sat;
      let bri;
      let opa;

      let checker = true;

      if (p.alternate){// colours alternate 1212 across the canvas
        if (i%2 != 0){
          hue = p.map(i, 0, p.numWigglers, p.minHue1, p.maxHue1);
          sat = p.sat1;
          bri = p.bri1;
          opa = p.opa1;
        }
        else{
          hue = p.map(i, 0, p.numWigglers, p.minHue2, p.maxHue2);
          sat = p.sat2;
          bri = p.bri2;
          opa = p.opa2;
        }
      }
      else{// colours are split left/right of canvas
        if (p.numWigglers / 2 > i){
          hue = p.map(i, 0, p.numWigglers/2, p.minHue1, p.maxHue1);
          sat = p.sat1;
          bri = p.bri1;
          opa = p.opa1;

        }
        else{
          hue = p.map(i, p.numWigglers/2, p.numWigglers, p.minHue2, p.maxHue2);
          sat = p.sat2;
          bri = p.bri2;
          opa = p.opa2;
        }
      }


      //let startY = p.map(p.noise(p.yPosSeed), 0, 1, 0, p.windowHeight);
      //let height = p.map(p.noise(p.heightSeed), 0, 1, 0, p.maxWigglerHeight);

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
    p.strokeWeight(p.dotSize);
    p.wigglers = [];
    p.createWigglers();
  }

  p.totallyNew = () => {
    p.background(0,0,0);
    p.strokeWeight(p.dotSize);
    p.wigglers = [];
    p.createWigglers();
  }

  class Wiggler{
    constructor(x, seed, hue, sat, bri, opa, startY, height){
      //this.position = p.createVector(x,y);
      this.x = x;
      this.seed = seed;
      this.y = 1 - (p.wiggleResolution);
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
      let wiggle = p.map(noise, 0, 1, p.minWiggle, p.maxWiggle);

      if (this.direction){
        this.x += wiggle;
      }
      else{
        this.x -= wiggle;
      }

      this.seed += p.wiggleDistance;
      this.y += p.wiggleResolution;

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
          let wiggle = p.map(noise, 0, 1, p.minWiggle, p.maxWiggle);

          if (this.direction){
            this.x += wiggle;
          }
          else{
            this.x -= wiggle;
          }

          this.seed += p.wiggleDistance;
          this.y += p.wiggleResolution;
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
          let wiggle = p.map(noise, 0, 1, p.minWiggle, p.maxWiggle);

          /*if (this.direction){
            this.seed += p.wiggleDistance;
          }
          else{
            this.seed -= p.wiggleDistance;
          }*/

          if (this.y < p.height/2){
            this.seed += p.wiggleDistance;
            console.log("asd");
          }
          else{
            this.seed -= p.wiggleDistance;
          }

          let theX = this.x + wiggle;
          this.x = p.lerp(this.x, theX, p.lerpAmount);

          this.y += p.wiggleResolution;
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
          let wiggle = p.map(noise, 0, 1, p.minWiggle, p.maxWiggle);
          let theX = this.x + wiggle;
          this.seed += p.wiggleDistance;
          this.y += p.wiggleResolution;
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
          let wiggle = p.map(noise, 0, 1, p.minWiggle, p.maxWiggle);
          let theX = this.x + wiggle;
          this.x = p.lerp(this.x, theX, p.lerpAmount);
          this.seed += p.wiggleDistance;
          this.y += p.wiggleResolution;
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
          let wiggle = p.map(noise, 0, 1, p.minWiggle, p.maxWiggle);
          let theX = this.x + wiggle;
          this.x = p.lerp(this.x, theX, p.lerpAmount);
          this.seed += p.wiggleDistance;
          this.y += p.wiggleResolution;
          p.vertex(theX, this.y);
        }
      p.endShape();
    }

  	display(){
      //p.ellipse(this.x, this.y, p.dotSize, p.dotSize);

      //p.stroke(0, 100, 80, 10);
      p.line(this.x, this.y, this.prevX, this.prevY);
  	}
  }


}



var ps = new p5(linesIdeaSketch);
