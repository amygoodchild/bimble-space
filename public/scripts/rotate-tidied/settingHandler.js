class SettingHandler{
  constructor(){
    this.gradients = [];
    this.pensizes = [];
    this.speeds = [];
    this.backgrounds = [];

    this.gradients[0] = new PenGradient(115, 191, 229, 229, 115, 229);
    this.gradients[1] = new PenGradient(254, 31, 234,255, 206, 25);
    this.gradients[2] = new PenGradient(196, 233, 0, 25, 255, 245);
    this.gradients[3] = new PenGradient(233, 0, 0, 44, 25, 255);
    this.gradients[4] = new PenGradient(160, 0, 233, 255, 25, 149);

    if (landscape){
      this.penSizes = [0, 8, 10, 15, 30, 60, 100];
      this.speeds = [0, 0.2, 0.55, 0.7, 1.5, 2.0];
    }
    else {
      this.penLerp = 0.35;
      this.penSizes = [0, 3, 5, 8, 10, 30, 60];
      this.speeds = [0, 0.2, 0.55, 0.7, 1.5, 2.0];
    }

    this.backgrounds[0] = ps.color(15,15,15);
    this.backgrounds[1] = ps.color(255,255,255);
    this.backgrounds[2] = ps.color('#f9ccff');
    this.backgrounds[3] = ps.color('#ccedff');
    this.backgrounds[4] = ps.color('#fdffcc');

    this.backgroundOpacitys = [100, 100, 50, 10, 4, 2, 0];

    ps.background(this.backgrounds[0]);

    this.gradientChoice = 0;
    this.penChoice = 3;
    this.speedChoice = 3;
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
