class CanvasHandler{
  constructor(){
    this.landscape;

    if ($(window).width() > $(window).height()){  // landscape
      this.width = Math.floor( $(window).width() ) - 55;
      this.height = Math.floor( $(window).height() );
      this.landscape = true;
    }
    else{                                         // portrait
      this.width = Math.floor( $(window).width() );
      this.height = Math.floor( $(window).height() ) - 50;
      this.landscape = false;
    }

    this.canvas = ps.createCanvas(this.width, this.height);
    this.canvas.parent('theToyContainer');

    // Set up some options
    ps.colorMode(ps.RGB,255,255,255,100);
    ps.noStroke();
    ps.angleMode(ps.DEGREES);

    this.backgroundFade = false;
    this.backgroundFaceCount = 0;
  }


  drawBackground(){
    ps.settingHandler.currentCanvas.setupBackgroundColor();
    ps.noStroke();
    ps.rect(0,0,ps.width,ps.height);
    ps.blendMode(ps.BLEND);

    if (this.backgroundFade){
      ps.settingHandler.backgrounds[ps.settingHandler.currentCanvas.getBgColor()]

      ps.blendMode(ps.BLEND);
      ps.background(ps.red(ps.settingHandler.backgrounds[ps.settingHandler.currentCanvas.getBgColor()]),
                    ps.green(ps.settingHandler.backgrounds[ps.settingHandler.currentCanvas.getBgColor()]),
                    ps.blue(ps.settingHandler.backgrounds[ps.settingHandler.currentCanvas.getBgColor()]),
                    60);
    }
    if (ps.frameCount > this.backgroundFadeCount + 20){
      this.backgroundFade = false;
    }
  }

  debugMode(){
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
}


$( window ).resize(function() {
  console.log("resize");
  if (ps.windowHeight < ps.windowWidth){
    landscape = true;
    $("#menu").css("width", "55px");
    $("#menu").css("height", "100%");
    $(".menuButtonClosed").css("display", "inline-block");
    $(".menuButtonOpen").css("display", "none");
    $(".menuButtonClosedMobile").css("display", "none");
    $(".menuButtonOpenMobile").css("display", "none");
    newToyWidth =  ps.windowWidth - 55;
    newToyHeight = ps.windowHeight;
  }
  else{
    landscape = false;
    $("#menu").css("height", "50px");
    $("#menu").css("width", "100%");
    $(".menuButtonClosedMobile").css("display", "inline-block");
    $(".menuButtonOpenMobile").css("display", "none");
    $(".menuButtonClosed").css("display", "none");
    $(".menuButtonOpen").css("display", "none");
    newToyWidth =  ps.windowWidth;
    newToyHeight = ps.windowHeight - 50;
  }

  $("#theToyContainer").css({ 'width': newToyWidth });
  $("#theToyContainer").css({ 'height': newToyHeight });
  //ps.resizeCanvas(parseInt($("#theToyContainer").width()), parseInt($("#theToyContainer").height()));
  this.width = newToyWidth;
  this.height = newToyHeight;
  ps.canvasHandler = new CanvasHandler();
  ps.commsHandler.sendResize();
});

function sortOutWindowResize(){
  // this function left intentionally blank due to poor planning.
}
