class CommsHandler{
  constructor(){
    // Connects to server for comms
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      this.socket = io.connect('http://localhost:3000');
    }
    else if (location.hostname === "192.168.0.57"){
      this.socket = io.connect('192.168.0.57:3000');
    }
    else{                                                   // CAUTION!!!!!!
      this.socket = io.connect('https://desolate-dusk-28350.herokuapp.com/');
    }
    this.socket.on('matched', this.matched);
    this.socket.on('passNewPoint', this.partnerNewPoint);
    this.socket.on('passSetting', this.partnerNewSetting);
    this.socket.on('passResize', this.partnerResized);
    this.socket.on('unMatched', this.unmatched);

    this.partner = new Partner(0, 0, 0);
    this.matchState = "solo";

    this.numPairings = 0;

  }

  search(){
    this.matchState = "searching";
    let sendData = {
      room : "rotate",
      width : ps.canvasHandler.width,
      height : ps.canvasHandler.height,
      pair: true
    }
    this.socket.emit('matchMe', sendData);
  }

  solo(){
    this.matchState = "solo";
  }

  goSolo(){
    let data = {
      state : this.matchState,
      choice: "--"
    }
    this.socket.emit('goSolo', data);
    this.matchState = "solo";
  }

  goIdle(){
    let data = {
      state : this.matchState,
      choice: "--"
    }
    this.socket.emit('goSolo', data);
    this.matchState = "idle";
  }

  getMatchState(){
    if (this.matchState == "paired"){
      return true;
    }
    else{
      return false;
    }
  }

  sendNewPoint(x, y, draw, size, colorChoice, clockwise){
    if (this.getMatchState()){
      let data = {
        partnerID : this.partner.getId(),
        x : x,
        y : y,
        draw : draw,
        size: size,
        colorChoice : colorChoice,
        clockwise : clockwise
     }
     this.socket.emit('sendNewPoint', data);
    }
  }

  sendNewSetting(setting, cssID){
    let value = cssID;
    value = value.charAt(value.length-1);
    var data = {
      setting : setting,
      value: value,
      cssID: cssID,
      partnerID : this.partner.getId()
    }
    this.socket.emit('sendNewSetting', data);
  }

  sendResize(){
    let data = {
      newWidth : ps.canvasHandler.width,
      newHeight : ps.canvasHandler.height,
      partnerID : this.partner.getId()
    }
    this.socket.emit('sendNewSize', data);
  }

  partnerNewPoint(data){
    let xposition = data.x/ps.commsHandler.partner.getWidth() * ps.width;
    let yposition = data.y/ps.commsHandler.partner.getHeight() * ps.height;
    ps.pointsHandler.newPartnerPoint(xposition, yposition, data.draw, data.size, data.colorChoice, data.clockwise);
  }

  matched(data){
    $(".pairingDrawer").css("display", "none");
    $("#pairedButtons").css("display", "block");

    $("#infoContent").html("You're paired up - " + data.message);
    ps.commsHandler.partner = new Partner(data.partnerID, data.partnerWidth, data.partnerHeight);
    ps.commsHandler.matchState = "paired";

    console.log("I am: " + data.whoami);
    console.log("My id is: " + data.myid);
    console.log("Matched with: " + ps.commsHandler.partner.getId());
    console.log(ps.commsHandler.partner);
    ps.commsHandler.numPairings++;

    gtag('event', "Found a partner", {
      'event_category': "Blend",
      'event_label': ps.commsHandler.numPairings
    });
  }



  unmatched(data){
    console.log("Unmatched :(");

     $(".pairingDrawer").css("display", "none");
     $("#searchingButtons").css("display", "block");

    let randomNumber = ps.random(0,1);   // to pick a lone message
    for (let i = 0; i<=ps.commsUI.loneMessages.length;i++){
      if (randomNumber<=1/ps.commsUI.loneMessages.length*(i+1)){
        $("#infoContent").html("Partner left.<br>Finding you a new friend...");
        break;
      }
    }
    ps.wrapWidth = ps.width; // set the wrap with back to our own
    ps.wrapHeight = ps.height;
    ps.commsHandler.matchState = "searching";

    ps.pointsHandler.partnerUnmatched();

    gtag('event', "Unmatched from partner", {
      'event_category': "Blend",
      'event_label': ""
    });
  }

  partnerNewSetting(data){
    if (data.setting == "background color"){
      ps.settingHandler.currentCanvas.setBgColor(data.cssID);
      ps.settingUI.backgroundColorChange(data.cssID);

      let message = "Background color changed"
      ps.settingUI.addNotification(message);
    }
    if (data.setting == "background opacity"){
      ps.settingHandler.currentCanvas.setBgOpacity(data.cssID);
      ps.settingUI.bgOpacityChange(data.cssID);

      let message = "Trail length changed to " + data.value;
      ps.settingUI.addNotification(message);
    }
    if (data.setting == "rotate speed"){
      ps.settingHandler.currentCanvas.setSpeed(data.cssID);
      ps.settingUI.speedChange(data.cssID);

      let message = "Speed changed to " + data.value;
      ps.settingUI.addNotification(message);
    }
    if (data.setting == "clear"){
      ps.pointsHandler.deleteAllPoints();
      ps.canvasHandler.backgroundFade = true;
      ps.canvasHandler.backgroundFadeCount = ps.frameCount;
      let message = "Canvas cleared";
      ps.settingUI.addNotification(message);
    }
    if (data.setting == "clockwise"){
      ps.settingHandler.currentCanvas.setClockwise(true);
      ps.settingUI.setClockwise();
      let message = "Rotation direction changed";
      ps.settingUI.addNotification(message);
    }
    if (data.setting == "anti clockwise"){
      ps.settingHandler.currentCanvas.setClockwise(false);
      ps.settingUI.setAntiClockwise();
      let message = "Rotation direction changed";
      ps.settingUI.addNotification(message);
    }

  }

  partnerResized(data){
    ps.commsHandler.partner.setWidth(data.newWidth);    // map up the screen widths
    ps.commsHandler.partner.setHeight(data.newHeight);
  }
}

class Partner{
  constructor(id, width, height){
    this.id = id;
    this.width = width;
    this.height = height;
  }

  getId(){
    return this.id;
  }

  getWidth(){
    return this.width;
  }

  getHeight(){
    return this.height;
  }

  setId(id){
    this.id = id;
  }

  setWidth(newWidth){
    this.width = newWidth;
  }

  setHeight(newHeight){
    this.height = newHeight;
  }

}
