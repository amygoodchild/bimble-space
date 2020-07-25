$(document).ready(function(){


  /*
  $(".colorButton").click(function(){
    $(".colorButton").removeClass('colorButtonOn');
    $(this).addClass('colorButtonOn');
  });
  */

var optionsOpen = false;

optionsOpen = true;
$("#optionDrawerTitle").addClass("drawerOpen");
$("#optionDrawer").css("display", "block");

var trailLengthSlider = document.getElementById("trailLength");
var trailLengthOutput = document.getElementById("trailLengthDisplay");
trailLengthOutput.innerHTML = trailLengthSlider.value; // Display the default slider value
ps.backgroundOpacity = 4;

var penSlider = document.getElementById("penSize");
var penOutput = document.getElementById("penSizeDisplay");
penOutput.innerHTML = penSlider.value; // Display the default slider value
ps.penSize = penSlider.value;

/*var penLerpSlider = document.getElementById("penLerp");
var penLerpOutput = document.getElementById("penLerpDisplay");
penLerpOutput.innerHTML = penLerpSlider.value; // Display the default slider value*/
ps.penLerp = 0.08;

var spinSpeedSlider = document.getElementById("spinSpeed");
var spinSpeedOutput = document.getElementById("spinSpeedDisplay");
spinSpeedOutput.innerHTML = spinSpeed.value; // Display the default slider value
ps.angleA = ps.radians(0.55);

// Update the current slider value (each time you drag the slider handle)
/*penLerpSlider.oninput = function() {
  penLerpOutput.innerHTML = this.value;
  if (this.value == 0){ ps.penLerp = 1.0; }
  if (this.value == 1){ ps.penLerp = 0.5; }
  if (this.value == 2){ ps.penLerp = 0.3; }
  if (this.value == 3){ ps.penLerp = 0.15; }
  if (this.value == 4){ ps.penLerp = 0.09; }
  if (this.value == 5){ ps.penLerp = 0.02; }
}*/


spinSpeedSlider.oninput = function() {
  spinSpeedOutput.innerHTML = this.value;
  if (this.value == 1){ ps.angleA = ps.radians(0.1); }
  if (this.value == 2){ ps.angleA = ps.radians(0.4); }
  if (this.value == 3){ ps.angleA = ps.radians(0.55); }
  if (this.value == 4){ ps.angleA = ps.radians(0.9); }
  if (this.value == 5){ ps.angleA = ps.radians(1.2); }
}

// Update the current slider value (each time you drag the slider handle)
penSlider.oninput = function() {
  penOutput.innerHTML = this.value;
  ps.penSize = this.value;
}

trailLengthSlider.oninput = function() {
  trailLengthOutput.innerHTML = this.value;

  if (this.value == 0){ ps.backgroundOpacity = 100; }
  if (this.value == 1){ ps.backgroundOpacity = 40; }
  if (this.value == 2){ ps.backgroundOpacity = 20; }
  if (this.value == 3){ ps.backgroundOpacity = 10; }
  if (this.value == 4){ ps.backgroundOpacity = 5; }
  if (this.value == 5){ ps.backgroundOpacity = 4; }
  if (this.value == 6){ ps.backgroundOpacity = 3; }
  if (this.value == 7){ ps.backgroundOpacity = 2; }
  if (this.value == 8){ ps.backgroundOpacity = 1; }
  if (this.value == 9){ ps.backgroundOpacity = 0.5; }
  if (this.value == 10){ ps.backgroundOpacity = 0; }
}


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


$("#optionDrawerTitle").click(function(){
  if (optionsOpen){
    optionsOpen = false;
    $("#optionDrawerTitle").removeClass("drawerOpen");
    $("#optionDrawer").css("display", "none");
  }
  else{
    optionsOpen = true;
    $("#optionDrawerTitle").addClass("drawerOpen");
    $("#optionDrawer").css("display", "block");

  }
});

$("#penColor0").click(function(){ ps.chosenGradient = 0; });
$("#penColor1").click(function(){ ps.chosenGradient = 1; });
$("#penColor2").click(function(){ ps.chosenGradient = 2; });
$("#penColor3").click(function(){ ps.chosenGradient = 3; });
$("#penColor4").click(function(){ ps.chosenGradient = 4; });

$("#bgColor0").click(function(){
  ps.chosenBackground = 0;
  if (ps.backgroundOpacity == 0){
    ps.backgroundFade = true;
    ps.backgroundFadeCount = ps.frameCount;
  }
});

$("#bgColor1").click(function(){
  ps.chosenBackground = 1;
  if (ps.backgroundOpacity == 0){
    ps.backgroundFade = true;
    ps.backgroundFadeCount = ps.frameCount;
  }
});

$("#bgColor2").click(function(){
  ps.chosenBackground = 2;
  ps.changedBg = ps.millis();
  if (ps.backgroundOpacity == 0){
    ps.backgroundFade = true;
    ps.backgroundFadeCount = ps.frameCount;
  }
});

$("#bgColor3").click(function(){
  ps.chosenBackground = 3;
  ps.changedBg = ps.millis();
  if (ps.backgroundOpacity == 0){
    ps.backgroundFade = true;
    ps.backgroundFadeCount = ps.frameCount;
  }
});

$("#bgColor4").click(function(){
  ps.chosenBackground = 4;
  ps.changedBg = ps.millis();
  if (ps.backgroundOpacity == 0){
    ps.backgroundFade = true;
    ps.backgroundFadeCount = ps.frameCount;
  }
});

});
