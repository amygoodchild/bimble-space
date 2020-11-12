class CanvasHandler(){
  constructor(){
    if ($(window).width() > $(window).height()){  // landscape
      this.width = toInt($(window).width()) - 55;
      this.height = toInt($(window).height());
    }
    else{                                         // portrait
      this.width = toInt($(window).width());
      this.height = toInt($(window).height()) - 50;
    }

    ps.createCanvas(this.width, this.height);

  }


}

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
