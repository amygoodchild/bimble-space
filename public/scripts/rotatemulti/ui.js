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
    console.log("You left this tab");
});

$(window).focus(function () {
      //do something
    console.log("You are in this tab");
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




var choosePaired = true;



var penSizes;
var speeds;
// Option set ups
if (landscape){
  penSizes = [0, 8, 10, 15, 30, 60, 100];
}
else{
  penSizes = [0, 3, 5, 8, 10, 30, 60];
}
ps.penSize = penSizes[3];
$("#penSize3").addClass("sliderButtonSelected");


if (landscape){
  speeds = [0, 0.2, 0.55, 0.7, 1.5, 2.0];
}
else{
  speeds = [0, 0.2, 0.55, 0.7, 1.5, 2.0];
  //speeds = [0, 0.4, 0.8, 1.5, 1.9, 2.6];
}

ps.angleA = ps.radians(speeds[3]);
$("#speed3").addClass("sliderButtonSelected");

var backgroundOpacitys = [100, 100, 70, 30, 14, 6, 0];
ps.backgroundOpacity = backgroundOpacitys[3]
$("#trailLength3").addClass("sliderButtonSelected");

// Change pen size
$(".penSizeButton").click(function(){
  $(".penSizeButton").removeClass("sliderButtonSelected");
  $(this).addClass("sliderButtonSelected");
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.penSize = penSizes[theId];
});

// Change rotate speed
$(".speedButton").click(function(){
  $(".speedButton").removeClass("sliderButtonSelected");
  $(this).addClass("sliderButtonSelected");
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.angleA = ps.radians(speeds[theId]);

  var data = {
    variable : "rotate speed",
    value: theId,
    id: $(this).attr('id'),
    otherUser: ps.otherUser
  }
  //console.log(data);
  ps.socket.emit('iSettingRotate', data);
});

// Change background opacity / trail length
$(".trailLengthButton").click(function(){
  $(".trailLengthButton").removeClass("sliderButtonSelected");
  $(this).addClass("sliderButtonSelected");
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.backgroundOpacity = backgroundOpacitys[theId];

  var data = {
    variable : "background opacity",
    value: theId,
    id: $(this).attr('id'),
    otherUser: ps.otherUser
  }
  ps.socket.emit('iSettingRotate', data);
});

// Change spin direction of pen
$("#spinClockWise").click(function(){
  ps.spinClockwise = true;
  $(this).addClass("buttonSelected");
  $("#spinAntiClockWise").removeClass("buttonSelected");
});

$("#spinAntiClockWise").click(function(){
  ps.spinClockwise = false;
  $(this).addClass("buttonSelected");
  $("#spinClockWise").removeClass("buttonSelected");
});

// Change pen colour
$(".penColorButton").click(function(){
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.chosenGradient = theId;
  $("#penColors").hide();
  let theClass;
  for (let i=0; i<5;i++){
    theClass = "penColor" + i;
    $("#penColorsMenu").children(".menuIcon").removeClass(theClass);
  }
  theClass = "penColor" + theId;
  $("#penColorsMenu").children(".menuIcon").addClass(theClass);
  ps.drawOpen = false;
});

// Change canvas colour
$(".bgColorButton").click(function(){
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.chosenBackground = theId;
  if (ps.backgroundOpacity == 0){
    ps.backgroundFade = true;
    ps.backgroundFadeCount = ps.frameCount;
  }

  $("#bgColors").hide();
  let theClass;
  for (let i=0; i<5;i++){
    theClass = "bgColor" + i;
    $("#bgColorsMenu").children(".menuIcon").removeClass(theClass);
  }
  theClass = "bgColor" + theId;
  $("#bgColorsMenu").children(".menuIcon").addClass(theClass);

  if (theId == 0){
    $(".menuText").removeClass("blackText");
    $("#bgColorsMenu").children(".menuIcon").removeClass("blackBorder");
    $("#penColorsMenu").children(".menuIcon").removeClass("blackBorder");
    $(".penColorButton").removeClass("blackBorder");
    $(".bgColorButton").removeClass("blackBorder");
  }
  else{
    $(".menuText").addClass("blackText");
    $("#bgColorsMenu").children(".menuIcon").addClass("blackBorder");
    $("#penColorsMenu").children(".menuIcon").addClass("blackBorder");
    $(".penColorButton").addClass("blackBorder");
    $(".bgColorButton").addClass("blackBorder");
  }
  ps.drawOpen = false;

  var data = {
    variable : "background color",
    value: theId,
    otherUser: ps.otherUser,
    id: $(this).attr('id')
  }
  //console.log(data);
  ps.socket.emit('iSettingRotate', data);
});

// Click through menu options
$(".menuOption").click(function(){
    let theId = $(this).attr('id');
    theId = theId.substring(0,theId.length -4);

    if ($('#' + theId).is(":hidden")){
      $(".menuDrawer").hide();
      $('#' + theId).show();
      ps.drawOpen = true;
    }
    else{
      $('#' + theId).hide();
      ps.drawOpen = false;
    }

    // Extra arrowy thingy
    if ($('#options').is(":hidden")){
      $("#optionSelector").hide();
    }
    else{
      $("#optionSelector").show();
    }
    if ($('#pairing').is(":hidden")){
      $("#pairingSelector").hide();
    }
    else{
      $("#pairingSelector").show();
    }
});

// Clear canvas
$("#clearAllButton").click(function(){
    clearPoints();

    var data = {
      variable : "clear",
      value: "0",
      otherUser: ps.otherUser,
      id: "0"
    }
    //console.log(data);
    ps.socket.emit('iSettingRotate', data);

});

// Save canvas
$("#saveButton").click(function(){
    name = "bimblespace_blend_" + ps.int(ps.random(0,500000));
    ps.saveCanvas(name, 'png');
});


// Welcome stuff

// Checkbox
$(".checkboxHolder").click(function(){
  $("#checkbox").toggleClass("checkboxUnchecked");
  choosePaired = !choosePaired;
});

// Start button
$("#start").click(function(){
  $("#welcome").css("display", "none");
  $("#rotateMenu").css("display", "block");
  $("#connectionInfo").css("display", "table");

  if (choosePaired){
      console.log("pairing clicked");
      ps.matchState = "searching";

      $("#searchingButtons").css("display", "block");
      sendData = {
        room : "rotate",
        width : ps.width,
        height : ps.height,
        pair: true
      }

      ps.socket.emit('matchMe', sendData);
      $("#infoContent").html("Finding you a partner... <br> You can play solo in the meantime");

      //gtag('event', "JoinChoice", {
      //  'event_category': "Rotate",
      //  'event_label': "Pair Me"
      //});

      $("#idleWarning").css("display", "none");
  }

  else{
    ps.matchState = "choseSolo";
    $("#choseSoloButtons").css("display", "block");
    //gtag('event', "JoinChoice", {
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
  }
});


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
