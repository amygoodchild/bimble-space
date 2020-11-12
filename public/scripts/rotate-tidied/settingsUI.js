$(document).ready(function(){

var penSizes = [];
var speeds = [];

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

  ps.angleA = ps.radians(speeds[theId]);

  let value = $(this).attr('id').charAt(theId.length-1);
  ps.commsHandler.sendSettingChange("rotate speed", value, $(this).attr('id'));
});

// Change background opacity / trail length
$(".trailLengthButton").click(function(){
  $(".trailLengthButton").removeClass("sliderButtonSelected");
  $(this).addClass("sliderButtonSelected");

  ps.backgroundOpacity = backgroundOpacitys[theId];

  let value = $(this).attr('id').charAt(theId.length-1);
  ps.commsHandler.sendSettingChange("background opacity", value, $(this).attr('id'));
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

  let value = $(this).attr('id').charAt(theId.length-1);
  //console.log(data);
  ps.commsHandler.sendSettingChange("background opacity", value, $(this).attr('id'));

  ps.chosenBackground = theId;
  if (ps.backgroundOpacity == 0){
    ps.backgroundFade = true;
    ps.backgroundFadeCount = ps.frameCount;
  }
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
    ps.commsHandler.sendSettingChange("clear", "0", "0");
});

// Save canvas
$("#saveButton").click(function(){
    name = "bimblespace_blend_" + ps.int(ps.random(0,500000));
    ps.saveCanvas(name, 'png');
});


});
