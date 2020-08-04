$(document).ready(function(){


  /*
  $(".colorButton").click(function(){
    $(".colorButton").removeClass('colorButtonOn');
    $(this).addClass('colorButtonOn');
  });
  */



$(".allUI").mouseenter(function(){
    if (landscape){
      ps.noDraw = true;
    }
});


$(".allUI").mouseout(function(){
   if (landscape){
     ps.noDraw = false;
   }
});


var penSizes = [0, 8, 10, 15, 30, 60, 100];
ps.penSize = penSizes[3];
$("#penSize3").addClass("sliderButtonSelected");

$(".penSizeButton").click(function(){
  $(".penSizeButton").removeClass("sliderButtonSelected");
  $(this).addClass("sliderButtonSelected");
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.penSize = penSizes[theId];
});

var backgroundOpacitys = [100, 100, 70, 30, 14, 6, 0];
ps.backgroundOpacity = backgroundOpacitys[2]
$("#trailLength2").addClass("sliderButtonSelected");

$(".trailLengthButton").click(function(){
  $(".trailLengthButton").removeClass("sliderButtonSelected");
  $(this).addClass("sliderButtonSelected");
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.backgroundOpacity = backgroundOpacitys[theId];
});

var speeds = [0, 0.2, 0.55, 0.7, 0.8, 1.0, 5.0];
ps.angleA = ps.radians(speeds[2]);
$("#speed2").addClass("sliderButtonSelected");

$(".speedButton").click(function(){
  $(".speedButton").removeClass("sliderButtonSelected");
  $(this).addClass("sliderButtonSelected");
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.angleA = ps.radians(speeds[theId]);
});


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

$(".bgColorButton").click(function(){
  let theId = $(this).attr('id');
  theId = theId.charAt(theId.length-1);
  ps.chosenBackground = theId;
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
});




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

    if ($('#options').is(":hidden")){
      $("#optionSelector").hide();
    }
    else{
      $("#optionSelector").show();
    }

});


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

$("#clearButton").click(function(){
      ps.backgroundFade = true;
      ps.backgroundFadeCount = ps.frameCount;
});

$("#clearAllButton").click(function(){
      ps.clearLines = true;
});









});
