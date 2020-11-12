function initiateCanvas(){
  // Creates the canvas
  if (ps.int(ps.windowWidth) > ps.int(ps.windowHeight)){    // landscape
    ps.theWidth = ps.int(ps.windowWidth) - 55;
    ps.theHeight = ps.int(ps.windowHeight);
    ps.rippleCanvas = ps.createCanvas(ps.theWidth, ps.theHeight);

  }
  else{                                               // portrait
    ps.theWidth = ps.int(ps.windowWidth);
    ps.theHeight = ps.int(ps.windowHeight) - 50;
    ps.rippleCanvas = ps.createCanvas(ps.theWidth, ps.theHeight);
  }
  ps.rippleCanvas.parent('theToyContainer');

  // Set up some options
  ps.colorMode(ps.RGB,255,255,255,100);
  ps.noStroke();
  ps.angleMode(ps.DEGREES);
  ps.lerpMouseX = ps.width/2;
  ps.lerpMouseY = ps.height/2;
}

function drawBackground(){
  // Drawing background

  ps.blendMode(ps.DIFFERENCE);
  ps.fill(15,15,15,5);
  ps.noStroke();
  ps.rect(0,0,ps.width,ps.height);
  ps.blendMode(ps.BLEND);

  if (ps.backgroundFade){
    ps.background(ps.red(ps.backgrounds[ps.chosenBackground]),ps.green(ps.backgrounds[ps.chosenBackground]),ps.blue(ps.backgrounds[ps.chosenBackground]),30);
  }
  if (ps.frameCount > ps.backgroundFadeCount +60){
    ps.backgroundFade = false;
  }
}

function debugMode(){
  if (ps.frameCount % 5 == 0){
    ps.frameRateLerp = ps.lerp(ps.frameRateLerp, ps.frameRate(), 1.0);
  }
  //p.fill(0,0,0);
  //p.rect(80,0,40,90);
  ps.fill(0,0,100);
  ps.textSize(50);
  ps.text(ps.int(ps.frameRateLerp), 230, 200);
  ps.textSize(20);
  ps.text("framerate:", 85, 200);
}
