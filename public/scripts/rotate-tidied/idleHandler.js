
$(document).ready(function(){

  var idleWarningAt = 40000;
  var idleAt = 60000;

  // Will execute myCallback every 0.5 seconds
  var idleCheckInterval = window.setInterval(checkIdleness, 3000);

  function checkIdleness() {
    if(ps.commsHandler.getMatchState() || ps.commsHandler.matchState == "searching"){
      if (ps.idleHandler.getIdleTime() > idleAt){
        ps.commsHandler.goIdle();
        ps.commsUI.solo();
        $("#idleWarning").css("display", "none");
        $("#idleNotification").css("display", "block");
      }
      else if (ps.idleHandler.getIdleTime() > idleWarningAt){
        $("#idleWarning").css("display", "block");
        ps.idleHandler.idleWarningOn = true;
      }
      else{
        console.log("not idle");
      }
    }
  }
});

class IdleHandler{
  constructor(){
    this.idleTime = 0;
    this.lastActivity = ps.millis();
    this.idleWarningOn = false;
  }

  setActivity(){
    this.lastActivity = ps.millis();
  }

  getIdleTime(){
    let idleTime = ps.millis() - this.lastActivity;
    return idleTime;
  }
}
