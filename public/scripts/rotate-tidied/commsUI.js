$(document).ready(function(){
  var choosePaired = true;
  var loneMessages = [];

  loneMessages[0] = "Like a spider";
  loneMessages[1] = "such as a monk";
  loneMessages[2] = "much like the moon";
  loneMessages[3] = "deep";
  loneMessages[4] = "hope you're having a nice time";

  // Paring checkbox
  $(".checkboxHolder").click(function(){
    console.log("hi");
    $(".checkbox").toggleClass("checkboxUnchecked");
    choosePaired = !choosePaired;
  });

  // Start button
  $("#start").click(function(){
    $("#welcome").css("display", "none");
    $("#rotateMenu").css("display", "block");
    $("#connectionInfo").css("display", "table");

    if (choosePaired){
      console.log("pairing clicked");
      $("#searchingButtons").css("display", "block");
      $("#infoContent").html("Finding you a partner... <br> You can play solo in the meantime");
      $("#idleWarning").css("display", "none");

      ps.commsHandler.search("searching");
    }
    else{
      $("#choseSoloButtons").css("display", "block");
      for (let i = 0; i<loneMessages.length;i++){
        let randomNumber = ps.random(0,1);   // to pick a lone message
        if (randomNumber<=1/loneMessages.length*(i+1)){
          $("#infoContent").html("You're playing solo - " + loneMessages[i]);
          break;
        }
      }
      ps.commsHandler.search("solo");
    }
  });
});
