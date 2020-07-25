var landscape;
  if ($( window ).height() < $( window ).width()){
    landscape = true;
  }
  else{
    landscape = false;
  }

const linesIdeaSketch = ( p ) => {

  p.theShader;
  p.cam;

  p.preload = () => {
    p.theShader = p.loadShader('scripts/shader/test.vert', 'scripts/shader/test.frag');
  }


  p.setup = () => {
    // Basics
    p.colorMode(p.HSB,360,100,100, 100);

    // Creates the canvas
    if (p.int(p.windowWidth) > p.int(p.windowHeight)){    // landscape (desktop)
      //p.theWidth = p.int(p.windowWidth) - 55;
      p.theHeight = p.int(p.windowHeight);
      p.theWidth = p.int(p.windowWidth);

      //p.theWidth = 16385;
      //p.theHeight = 16385;
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight, p.WEBGL);

    }
    else{                                               // portrait (mobile)
      p.theWidth = p.int(p.windowWidth);
      //p.theHeight = p.int(p.windowHeight) - 50;
      p.theHeight = p.int(p.windowHeight);
      p.rippleCanvas = p.createCanvas(p.theWidth, p.theHeight, p.WEBGL);
    }

    p.rippleCanvas.parent('theToyContainer');

    p.cam = p.createCapture(p.VIDEO);
    p.cam.size(p.windowWidth, p.windowHeight);

    p.cam.hide();

    // Basics
    p.strokeWeight(p.thickness);

    p.colorMode(p.HSB,360,100,100, 100);
    p.background(p.bgHue, p.bgSat, p.bgBri);

  };


  p.draw = () => {
    p.shader(p.theShader);

    // passing cam as a texture
    p.theShader.setUniform('tex0', p.cam);
    p.theShader.setUniform('u_time', p.millis()*0.0005);
    p.theShader.setUniform('u_mouseX', p.mouseX);
    p.theShader.setUniform('u_mouseY', p.mouseY);
    p.rect(0,0,p.width,p.height);
  };



  class Empty{
    constructor(){

  	}

    update(){

    }

  }


}



var ps = new p5(linesIdeaSketch);
