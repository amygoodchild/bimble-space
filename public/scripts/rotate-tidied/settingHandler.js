class SettingHandler{
  constructor(){
    this.gradients = [];
    this.pensizes = [];
    this.speeds = [];
    this.backgrounds = [];
    this.maxPoints;

    this.gradients[0] = new PenGradient(115, 191, 229,  229, 115, 229);
    this.gradients[1] = new PenGradient(254,  31, 234,  255, 206,  25);
    this.gradients[2] = new PenGradient(142, 233, 189,   40, 171, 255);
    this.gradients[3] = new PenGradient(255, 113, 175,   83,   0, 209);
    this.gradients[4] = new PenGradient(252, 147,   0,  255,   0, 100);
    this.gradients[5] = new PenGradient(255,   0, 130,  203,  75, 228);

    if (ps.canvasHandler.landscape){
      this.penSizes = [0, 8, 10, 15, 30, 60, 100];
      this.speeds = [0.004, 0.005, 0.006, 0.010];
      //this.speeds = [0.016, 0.015, 0.018, 0.030];
      this.backgroundOpacitys = [100, 30, 10, 0];
      let resolution = ps.width * ps.height;
      this.maxPoints = resolution / 3200;
    }
    else {
      this.penSizes = [0, 4, 6, 12, 15, 30, 60];
      this.speeds = [0.004, 0.005, 0.006, 0.010];
      //this.speeds = [0.016, 0.015, 0.018, 0.030];
      this.backgroundOpacitys = [100, 60, 40, 0];
      let resolution = ps.width * ps.height;
      this.maxPoints = resolution / 1500;
    }

    console.log(this.maxPoints);
    this.backgrounds[0] = ps.color(15,15,15);
    this.backgrounds[1] = ps.color(255,255,255);
    this.backgrounds[2] = ps.color('#f9ccff');
    this.backgrounds[3] = ps.color('#ccedff');
    this.backgrounds[4] = ps.color('#fdffcc');

    this.currentPen = new CurrentPen();
    this.currentCanvas = new CurrentCanvas();

    ps.background(0,0,0,100);

  }
}

class CurrentPen{
  constructor(){
    this.size = 3;
    this.gradient = ps.int(ps.random(5));
    let penCSS = "penColor" + this.gradient;


  }

  getSize(){
    return this.size;
  }

  getGradient(){
    return this.gradient;
  }

  setGradient(id){
    let penColorID = id;
    penColorID = penColorID.charAt(penColorID.length-1);
    this.gradient = penColorID;
  }

  setSize(id){
    let sizeID = id;
    sizeID = sizeID.charAt(sizeID.length-1);
    this.size = sizeID;
  }
}

class CurrentCanvas{
  constructor(){
    this.bgColor = 0;
    this.bgOpacity = 2;
    this.clockwise = true;
    this.speed = 2;
  }

  setupBackgroundColor(){
    let opacityToUse = ps.settingHandler.backgroundOpacitys[this.bgOpacity];
    if (this.bgColor == 0){
      switch(this.bgOpacity){
        case 0:
          ps.blendMode(ps.BLEND);
          break;
        case 1:
          ps.blendMode(ps.DIFFERENCE);
          break;
        case 2:
          ps.blendMode(ps.DIFFERENCE);
          break;
        case 3:
          ps.blendMode(ps.DIFFERENCE);
          break;
      }
    }
    else{
      opacityToUse = ps.settingHandler.backgroundOpacitys[this.bgOpacity]/10;
    }
    ps.fill(ps.red(ps.settingHandler.backgrounds[this.bgColor]),
            ps.green(ps.settingHandler.backgrounds[this.bgColor]),
            ps.blue(ps.settingHandler.backgrounds[this.bgColor]),
            opacityToUse);
  }

  setClockwise(which){
    this.clockwise = which;
  }

  setSpeed(id){
    let speedID = id;
    speedID = speedID.charAt(speedID.length-1);
    this.speed = speedID;
  }

  setBgColor(id){
    let colorID = id;
    colorID = colorID.charAt(colorID.length-1);
    this.bgColor = parseInt(colorID);
    ps.canvasHandler.backgroundFade = true;
    ps.canvasHandler.backgroundFadeCount = ps.frameCount;
  }

  setBgOpacity(id){
    let opacityID = id;
    opacityID = opacityID.charAt(opacityID.length-1);
    this.bgOpacity = parseInt(opacityID);
  }

  getBgOpacity(){
    return this.bgOpacity;
  }

  getBgColor(){
    return this.bgColor;
  }

  getClockwise(){
    return this.clockwise;
  }

  getSpeed(){
    return this.speed;
  }
}

class PenGradient{
  constructor(hue1, sat1, bri1, hue2, sat2, bri2){
    this.hue1 = hue1;
    this.sat1 = sat1;
    this.bri1 = bri1;
    this.hue2 = hue2;
    this.sat2 = sat2;
    this.bri2 = bri2;
  }
}
