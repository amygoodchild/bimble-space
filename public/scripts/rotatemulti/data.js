function setupMessages(){
  // hee hee.
  ps.loneMessages[0] = "Like a spider";
  ps.loneMessages[1] = "such as a monk";
  ps.loneMessages[2] = "much like the moon";
  ps.loneMessages[3] = "deep";
  ps.loneMessages[4] = "hope you're having a nice time";
}

function setupColors(){
  ps.gradients[0] = new PenGradient(115, 191, 229, 229, 115, 229);
  ps.gradients[1] = new PenGradient(254, 31, 234,255, 206, 25);
  ps.gradients[2] = new PenGradient(196, 233, 0, 25, 255, 245);
  ps.gradients[3] = new PenGradient(233, 0, 0, 44, 25, 255);
  ps.gradients[4] = new PenGradient(160, 0, 233, 255, 25, 149);

  ps.backgrounds[0] = ps.color(15,15,15);
  ps.backgrounds[1] = ps.color(255,255,255);
  ps.backgrounds[2] = ps.color('#f9ccff');
  ps.backgrounds[3] = ps.color('#ccedff');
  ps.backgrounds[4] = ps.color('#fdffcc');

  ps.backgroundOpacitys = [100, 100, 70, 30, 14, 6, 0];

  ps.background(ps.backgrounds[0]);
}

function setupPens(){
  if (landscape){
    ps.penSizes = [0, 8, 10, 15, 30, 60, 100];
    ps.speeds = [0, 0.2, 0.55, 0.7, 1.5, 2.0];
  }
  else {
    ps.penLerp = 0.35;
    ps.penSizes = [0, 3, 5, 8, 10, 30, 60];
    ps.speeds = [0, 0.2, 0.55, 0.7, 1.5, 2.0];
    //p.speeds = [0, 0.4, 0.8, 1.5, 1.9, 2.6];
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
