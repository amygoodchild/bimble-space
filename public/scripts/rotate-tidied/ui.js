var landscape;

if ($( window ).height() < $( window ).width()){
  landscape = true;
  console.log("landscape");
}
else{
  landscape = false;
  console.log("portrait");
}

$(window).blur(function () {
    //do something
    //console.log("You left this tab");
});

$(window).focus(function () {
      //do something
    //console.log("You are in this tab");
});

$( window ).resize(function() {
  if (ps.windowHeight < ps.windowWidth){
    landscape = true;
    $("#menu").css("width", "55px");
    $("#menu").css("height", "100%");
    $(".menuButtonClosed").css("display", "inline-block");
    $(".menuButtonOpen").css("display", "none");
    $(".menuButtonClosedMobile").css("display", "none");
    $(".menuButtonOpenMobile").css("display", "none")

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
  ps.resizeCanvas(parseInt($("#theToyContainer").width()), parseInt($("#theToyContainer").height()));

  data = {
    newWidth : newToyWidth,
    newHeight : newToyHeight,
    otherUser : ps.otherUser
  }

  ps.socket.emit('iResized', data);


});


function sortOutWindowResize(){

}


$(document).ready(function(){

/*
$(".colorButton").click(function(){
  $(".colorButton").removeClass('colorButtonOn');
  $(this).addClass('colorButtonOn');
});
*/


// Changing connection options later

// Pair me up!
$(".pairMe").click(function(){
  ps.matchState = "searching";
  $(".pairingDrawer").css("display", "none");
  $("#searchingButtons").css("display", "block");
  sendData = {
    room : "rotate",
    width : ps.width,
    height : ps.height,
    pair: true
  }

  ps.socket.emit('matchMe', sendData);
  $("#infoContent").html("Finding you a partner... <br> You can play solo in the meantime");

  //gtag('event', "ChangeChoice", {
  //  'event_category': "Rotate",
  //  'event_label': "Pair Me"
  //});

  $("#idleWarning").css("display", "none");
});

// Leave me alone
$(".playSolo").click(function(){
  if(ps.otherLocations.length > 0){
    ps.otherLocations.splice(0,ps.otherLocations.length);
  }

  $(".pairingDrawer").css("display", "none");
  $("#choseSoloButtons").css("display", "block");
  //gtag('event', "ChangeChoice", {
  //  'event_category': "Rotate",
  //  'event_label': "Don't Pair Me"
  //});

  for (let i = 0; i<ps.loneMessages.length;i++){
    let randomNumber = ps.random(0,1);   // to pick a lone message
    if (randomNumber<=1/ps.loneMessages.length*(i+1)){
      $("#infoContent").html("You're playing solo - " + ps.loneMessages[i]);
      break;
    }
  }

  sendData = {
    state : ps.matchState,
    choice: "chose solo"
  }
  ps.socket.emit('playSolo', sendData);

  ps.matchState = "choseSolo";
  $("#idleWarning").css("display", "none");
});

// Closes the menu when an option is clicked
$(".pairingButtons").click(function(){
  ps.drawOpen = false;
  $("#pairing").css("display", "none");
  $("#pairingSelector").css("display", "none");
});

$(document).on('mousedown', function (e) {
    if ($(e.target).closest("#options").length === 0) {
      if($(e.target).closest("#optionsMenu").length ===0){
        $("#options").hide();
        $("#optionSelector").hide();
      }
    }
    if ($(e.target).closest("#pairing").length === 0) {
      if($(e.target).closest("#pairingMenu").length ===0){
        $("#pairing").hide();
        $("#pairingSelector").hide();
      }
    }
});
});


function moveNotificationsUp(){
  $('#notification').children().each(function () {
    let newBottom = $(this).css("bottom");
    newBottom = parseInt(newBottom.substring(0,newBottom.length -2));
    newBottom += 2;
    $(this).css("bottom", newBottom + "px");

    let newOpacity = $(this).css("opacity");
    newOpacity = parseFloat(newOpacity);
    newOpacity -= 0.01;
    $(this).css("opacity", newOpacity);

    if (newBottom > 300){
      $(this).remove();
    }
  });
}
