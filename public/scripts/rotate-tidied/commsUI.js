
class CommsUI{
  constructor(){
    this.choosePaired = true;
    this.loneMessages = [];
    this.loneMessages[0] = "Like a spider";
    this.loneMessages[1] = "such as a monk";
    this.loneMessages[2] = "much like the moon";
    this.loneMessages[3] = "deep";
    this.loneMessages[4] = "hope you're having a nice time";
  }

  searching(){
    $("#idleWarning").css("display", "none");
    $(".pairingDrawer").css("display", "none");
    $("#searchingButtons").css("display", "block");
    $("#infoContent").html("Finding you a partner... <br> You can play solo in the meantime");
  }

  solo(){
    $("#idleWarning").css("display", "none");
    $(".pairingDrawer").css("display", "none");
    $("#choseSoloButtons").css("display", "block");
    for (let i = 0; i<ps.commsUI.loneMessages.length;i++){
      let randomNumber = ps.random(0,1);   // to pick a lone message
      if (randomNumber<=1/ps.commsUI.loneMessages.length*(i+1)){
        $("#infoContent").html("You're playing solo - " + ps.commsUI.loneMessages[i]);
        break;
      }
    }
  }


}



$(document).ready(function(){
  // Paring checkbox
  $(".checkboxHolder").click(function(){
    $(".checkbox").toggleClass("checkboxUnchecked");
    ps.commsUI.choosePaired = !ps.commsUI.choosePaired;
  });
  // Start button
  $("#start").click(function(){
    $("#welcome").css("display", "none");
    $("#credit").css("display", "none");
    $("#rotateMenu").css("display", "block");
    $("#connectionInfo").css("display", "table");

    if (ps.commsUI.choosePaired){
      ps.commsHandler.search();
      ps.commsUI.searching();
    }
    else{
      ps.commsUI.solo();
      ps.commsHandler.solo();
    }
  });
});


// later
$(document).ready(function(){
  $(".pairMe").click(function(){
    ps.commsHandler.search();
    ps.commsUI.searching();
  });

  // Leave me alone
  $(".playSolo").click(function(){
    ps.pointsHandler.partnerUnmatched();
    ps.commsUI.solo();
    ps.commsHandler.goSolo();
  });

  // Closes the menu when an option is clicked
  $(".pairingButtons").click(function(){
    $("#pairing").css("display", "none");
    $("#pairingSelector").css("display", "none");
  });


});
