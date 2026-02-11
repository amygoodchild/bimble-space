$(document).ready(function(){

  var actionMenuOpen = false;
  var choosePaired = true;


  $("#color0").click(function(){ ps.colorChoice = 0; });
  $("#color1").click(function(){ ps.colorChoice = 1; });
  $("#color2").click(function(){ ps.colorChoice = 2; });
  $("#color3").click(function(){ ps.colorChoice = 3; });
  $("#color4").click(function(){ ps.colorChoice = 4; });
  $("#color5").click(function(){ ps.colorChoice = 5; });
  $("#color6").click(function(){ ps.colorChoice = 6; });
  $("#color7").click(function(){ ps.colorChoice = 7; });
  $("#color8").click(function(){ ps.colorChoice = 8; });
  $("#color9").click(function(){ ps.colorChoice = 9; });
  $("#color10").click(function(){ ps.colorChoice = 10; });
  $("#color11").click(function(){ ps.colorChoice = 11; });


  $(".colorButton").click(function(){
    $(".colorButton").removeClass('colorButtonOn');
    $(this).addClass('colorButtonOn');
  });

  // Function to select a random color
  window.selectRandomColor = function(){
    var randomColor = Math.floor(Math.random() * 12);
    ps.colorChoice = randomColor;
    $(".colorButton").removeClass('colorButtonOn');
    $("#color" + randomColor).addClass('colorButtonOn');
  };

  // Auto-select random color on page load
  selectRandomColor();

  /*$("#welcome").click(function(){
    $("#welcome").css("display", "none");
    gtag('event', "Close welcome", {
      'event_category': "Flock",
      'event_label': ps.frameCount
    });


  });*/


  $(".checkboxHolder").click(function(){
    $("#checkbox").toggleClass("checkboxUnchecked");
    choosePaired = !choosePaired;
  });

  // Extracted start function so it can be called programmatically
  window.startGame = function(){



    if (choosePaired){
      $("#welcome").css("display", "none");
      $("#options").css("display", "block");
      $("#info").css("display", "table");
      $("#actions").css("display", "block");
      ps.matchState = "searching";


      sendData = {
        room : "swoosh",
        width : ps.width,
        height : ps.height,
        pair: true
      }

      if (ps.socket) ps.socket.emit('matchMe', sendData);

      gtag('event', "JoinChoice", {
        'event_category': "Flock",
        'event_label': "Pair Me"
      });
    }

    else{
      $("#welcome").css("display", "none");
      $("#options").css("display", "block");
      $("#info").css("display", "table");
      $("#actions").css("display", "block");

      ps.matchState = "choseSolo";

      gtag('event', "JoinChoice", {
        'event_category': "Flock",
        'event_label': "Don't Pair Me"
      });

      for (let i = 0; i<ps.loneMessages.length;i++){
        let randomNumber = ps.random(0,1);   // to pick a lone message
        if (randomNumber<=1/ps.loneMessages.length*(i+1)){
          $("#infoContent").html("You're playing solo - " + ps.loneMessages[i]);
          break;
        }
      }
    }
  };

  $("#start").click(function(){
    window.startGame();
  });



  $("#actions").click(function(){
    if (!actionMenuOpen){
      if (ps.matchState == "choseSolo"){
        $("#choseSoloActions").css("display", "block");
      }
      if (ps.matchState == "searching"){
        $("#searchingActions").css("display", "block");
      }
      if (ps.matchState == "paired"){
        $("#pairedActions").css("display", "block");
      }
      if (ps.matchState == "idle"){
        $("#idleActions").css("display", "block");
      }

      $("#actions").addClass("actionsSelected");
      actionMenuOpen = true;
    }
    else{
      $("#actions").removeClass("actionsSelected");
      $("#choseSoloActions").css("display", "none");
      $("#searchingActions").css("display", "none");
      $("#pairedActions").css("display", "none");
      $("#idleActions").css("display", "none");
      actionMenuOpen = false;
    }
  });

  $(".actionItem").click(function(){
    $("#actions").removeClass("actionsSelected");
    $("#choseSoloActions").css("display", "none");
    $("#searchingActions").css("display", "none");
    $("#pairedActions").css("display", "none");
    $("#idleActions").css("display", "none");
    actionMenuOpen = false;
  });



  $("#theToyContainer").click(function(){
    if (actionMenuOpen){
      $("#actions").removeClass("actionsSelected");
      $("#choseSoloActions").css("display", "none");
      $("#searchingActions").css("display", "none");
      $("#pairedActions").css("display", "none");
      $("#idleActions").css("display", "none");
      actionMenuOpen = false;
    }
  });


  $(".playSolo").click(function(){
    sendData = {
      state : ps.matchState,
      choice: "chose solo"
    }
    ps.socket.emit('playSolo', sendData);

    ps.matchState = "choseSolo";

    gtag('event', "ChangeChoice", {
      'event_category': "Flock",
      'event_label': "Don't Pair Me"
    });

    for (let i = 0; i<ps.loneMessages.length;i++){
      let randomNumber = ps.random(0,1);   // to pick a lone message
      if (randomNumber<=1/ps.loneMessages.length*(i+1)){
        $("#infoContent").html("You're playing solo - " + ps.loneMessages[i]);
        break;
      }
    }
    $("#idleWarning").css("display", "none");
  });



  $(".sendGoodbye").click(function(){
    console.log("sending goodbye");
    sendData = {
      otherUser : ps.otherUser,
    }
    ps.socket.emit('sendGoodbye', sendData);

    gtag('event', "Send message", {
      'event_category': "Flock",
      'event_label': "Goodbye"
    });

    ps.drawMyGoodbye = true;


  });


  $(".findPartner").click(function(){
    ps.matchState = "searching";

    sendData = {
      room : "swoosh",
      width : ps.width,
      height : ps.height,
      pair: true
    }

    ps.socket.emit('matchMe', sendData);
    $("#infoContent").html("Finding you a partner... <br> You can play solo in the meantime");


    gtag('event', "ChangeChoice", {
      'event_category': "Flock",
      'event_label': "Pair Me"
    });

    $("#idleWarning").css("display", "none");
  });


  if($(window).width() < $(window).height()){
    $("#mobileColor").click(function(){
      $(this).css("display", "none");
      $('.colorButton').css("display", "block");

    });

    $(".colorButton").click(function(){
      $(".colorButton").css("display", "none");
      $('#mobileColor').css("display", "block");
      $('#mobileColor').css("background", $(this).css('background'));
    });

  }
});


// Auto-start in solo mode for development
// setTimeout(() => {
//   startGame();
// }, 100);