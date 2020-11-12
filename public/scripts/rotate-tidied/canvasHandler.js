class CanvasHandler{
  constructor(){
    if ($(window).width() > $(window).height()){  // landscape
      this.width = Math.floor( $(window).width() ) - 55;
      this.height = Math.floor( $(window).height() );
    }
    else{                                         // portrait
      this.width = Math.floor( $(window).width() );
      this.height = Math.floor( $(window).height() ) - 50;
    }

    this.canvas = ps.createCanvas(this.width, this.height);
    this.canvas.parent('theToyContainer');

    // Set up some options
    ps.colorMode(ps.RGB,255,255,255,100);
    ps.noStroke();
    ps.angleMode(ps.DEGREES);
  }
}
