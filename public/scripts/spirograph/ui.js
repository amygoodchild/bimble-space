$(document).ready(function(){
var index = 1;
var otherButtonsMobileHeight = 120;


  // util
  function round5(x)
  {
    return Math.ceil(x/5)*5;
  }

  if($('#otherButtons').height() == 120 ){
    $("#backgroundTitle").html("bg");
  }




  // Color Settings

  $("#color0").css("border", "3px solid #cccccc");
  $("#color1").css("border", "1px solid #cccccc");
  $("#bgcolor1").css("border", "3px solid #000000");

  $(".bgColorButton").click(function(){
    $("#theToyContainer").css("background", $(this).css('background'));
    $(".bgColorButton").css("border", "1px solid #ffffff");
    $("#bgcolor1").css("border", "1px solid #cccccc");
    $(this).css("border", "3px solid #000000");
  });

  $(".colorButton").click(function(){
    penColor = $(this).css('background-color');
    rainbow = false;
    blueRainbow = false;
    pinkRainbow = false;
    $(".colorButton").css("border", "1px solid #ffffff");
    $("#color1").css("border", "1px solid #cccccc");
    $(this).css("border", "3px solid #000000");
  });

  $("#color0").click(function(){
    $(this).css("border", "3px solid #cccccc");
  });

  $("#bgcolor0").click(function(){
    $(this).css("border", "3px solid #cccccc");
  });

  $("#color16").click(function(){
    penColor = $(this).css('background-color');
    rainbow = true;
    blueRainbow = false;
    pinkRainbow = false;
  });

  $("#color17").click(function(){
    penColor = $(this).css('background-color');
    rainbow = false;
    blueRainbow = true;
    pinkRainbow = false;
  });

  $("#color18").click(function(){
    penColor = $(this).css('background-color');
    rainbow = false;
    blueRainbow = false;
    pinkRainbow = true;
  });


  // Settings



  //Pen Size initialise
  $("#penSizeDisplay").val(penSize);
  $("#penSizeDisplayMobile").html(penSize);

    // Speed initialise
  if($('#otherButtons').height() == otherButtonsMobileHeight ){
    var printSpeed = parseInt(80);
  }
  else{
    var printSpeed = parseInt(10);
  }
  $("#speedDisplay").val(printSpeed);
  $("#speedDisplayMobile").html(printSpeed);

  // Outer circle init
  if ($("#theToyContainer").width() < $("#theToyContainer").height()){
    var printOuterSize = round5(parseInt($("#theToyContainer").width()-50));
  }
  else{
    var printOuterSize = round5(parseInt($("#theToyContainer").height()-100));
  }
  $("#outerCircleDisplay").val(printOuterSize);
  $("#outerCircleDisplayMobile").html(printOuterSize);

  // Inner circle init
  var printInnerSize = round5(parseInt(Math.random()*printOuterSize)+20);
  $("#innerCircleDisplay").val(printInnerSize);
  $("#innerCircleDisplayMobile").html(printInnerSize);


  // Pen size change
  $("#penSizeDisplay").change(function() {
    if ($("#penSizeDisplay").val() > 500){
      penSize = 500;
      $("#penSizeDisplay").val(500);
      $("#penSizeDisplayMobile").html(500);
    }
    else if ($("#penSizeDisplay").val() > 0){
      penSize = parseInt($("#penSizeDisplay").val());
      $("#penSizeDisplay").val(parseInt($("#penSizeDisplay").val()));
      $("#penSizeDisplayMobile").html(parseInt($("#penSizeDisplay").val()));
    }
    else{
      penSize = 1;
      $("#penSizeDisplay").val(1);
      $("#penSizeDisplayMobile").html(1);
    }
  });

  $("#penDown").click(function() {
    if (penSize > 1){
      penSize -= 1;
      $("#penSizeDisplay").val(penSize);
      $("#penSizeDisplayMobile").html(penSize);
    }
  });

  $("#penUp").click(function() {
    if (penSize < 500){
      penSize += 1;
      $("#penSizeDisplay").val(penSize);
      $("#penSizeDisplayMobile").html(penSize);
    }
  });

  // Speed change
  $("#speedDisplay").change(function() {
    if ($("#speedDisplay").val() > 300){
      stencil.speed = parseFloat(300/10000);
      $("#speedDisplay").val(300);
      $("#speedDisplayMobile").html(300);
    }
    else if ($("#speedDisplay").val() > 0){
      stencil.speed = parseFloat(($("#speedDisplay").val()/10000));
      $("#speedDisplay").val(parseInt($("#speedDisplay").val()));
      $("#speedDisplayMobile").html(parseInt($("#speedDisplay").val()));
    }
    else{
      stencil.speed = parseFloat(1/10000);
      $("#speedDisplay").val(1);
      $("#speedDisplayMobile").html(1);
    }
  });

  $("#speedDown").click(function() {
    if (stencil.speed*10000 > 1){
      stencil.speed -= 0.0001;
      $("#speedDisplay").val(parseInt(stencil.speed*10000));
      $("#speedDisplayMobile").html(parseInt(stencil.speed*10000));
    }
  });

  $("#speedUp").click(function() {
    if (stencil.speed*10000 < 300){
      stencil.speed += 0.0001;
      $("#speedDisplay").val(parseInt(stencil.speed*10000));
      $("#speedDisplayMobile").html(parseInt(stencil.speed*10000));
    }
  });


  // Outer circle change
  $("#outerCircleDisplay").change(function() {
    if ($("#outerCircleDisplay").val() > 900){
      stencil.diameter = parseInt(900);
      stencil.diameterTarget = stencil.diameter;
      $("#outerCircleDisplay").val(900);
      $("#outerCircleDisplayMobile").html(900);
    }
    else if ($("#outerCircleDisplay").val() > 0){
      stencil.diameter = parseInt($(this).val());
      stencil.diameterTarget = stencil.diameter;
      $("#outerCircleDisplay").val(stencil.diameter);
      $("#outerCircleDisplayMobile").html(stencil.diameter);
    }
    else{
      stencil.diameter = parseInt(1);
      stencil.diameterTarget = stencil.diameter;
      $("#outerCircleDisplay").val(1);
      $("#outerCircleDisplayMobile").html(1);
    }
  });

  $("#outerCircleDown").click(function() {
    if (stencil.diameterTarget > 5){
      stencil.diameterTarget -= 5;
      $("#outerCircleDisplay").val(parseInt(stencil.diameterTarget));
      $("#outerCircleDisplayMobile").html(parseInt(stencil.diameterTarget));
    }
  });

  $("#outerCircleUp").click(function() {
    if (stencil.diameterTarget < 1000){
      stencil.diameterTarget += 5;
      $("#outerCircleDisplay").val(parseInt(stencil.diameterTarget));
      $("#outerCircleDisplayMobile").html(parseInt(stencil.diameterTarget));
    }
  });



  // Inner circle change
  $("#innerCircleDisplay").change(function() {
    if ($("#innerCircleDisplay").val() > 900){
      mover.diameter = parseInt(900);
      mover.diameterTarget = mover.diameter;
      $("#innerCircleDisplay").val(900);
      $("#innerCircleDisplayMobile").html(900);
    }
    else if ($("#innerCircleDisplay").val() > 0){
      mover.diameter = parseInt(($(this).val()));
      mover.diameterTarget = mover.diameter;
      $("#innerCircleDisplay").val(mover.diameter);
      $("#innerCircleDisplayMobile").html(mover.diameter);
    }
    else{
      mover.diameter = parseInt(1);
      mover.diameterTarget = mover.diameter;
      $("#innerCircleDisplay").val(1);
      $("#innerCircleDisplayMobile").html(1);
    }
  });

  $("#innerCircleDown").click(function() {
    if (mover.diameterTarget > 5){
      mover.diameterTarget -= 5;
      $("#innerCircleDisplay").val(parseInt(mover.diameterTarget));
      $("#innerCircleDisplayMobile").html(parseInt(mover.diameterTarget));
    }
  });

  $("#innerCircleUp").click(function() {
    if (mover.diameterTarget < 1000){
      mover.diameterTarget += 5;
      $("#innerCircleDisplay").val(parseInt(mover.diameterTarget));
      $("#innerCircleDisplayMobile").html(parseInt(mover.diameterTarget));
    }
  });

  // Other buttons

  // Random button
  $("#randomizeButton").click(function() {
    // pen size
    var min = 1;
    var max = 10;
    penSize = Math.floor(Math.random() * (+max - +min)) + +min;
    $("#penSizeDisplay").val(penSize);
    $("#penSizeDisplayMobile").html(penSize);

    // outer circle
    min = 1;
    if($('#otherButtons').height() == 120 ){
      max = $("#theToyContainer").width()-20;
    }
    else {
      max = $("#theToyContainer").width()/1.5;
    }
    stencil.diameter = round5(Math.floor(Math.random() * (+max - +min)) + +min);
    stencil.diameterTarget = stencil.diameter;
    $("#outerCircleDisplay").val(stencil.diameter);
    $("#outerCircleDisplayMobile").html(stencil.diameter);

    // inner circle
    min = 1;
    max = stencil.diameter+100;
    mover.diameter = round5(Math.floor(Math.random() * (+max - +min)) + +min);
    mover.diameterTarget = mover.diameter;
    $("#innerCircleDisplay").val(mover.diameter);
    $("#innerCircleDisplayMobile").html(mover.diameter);

    // close mobile stuff

    if($('#otherButtons').height() == 120 ){
      $(".upDownButtonHolder").css("display", "none");
      penSizeDisplay = false;
      innerSizeDisplay = false;
      outerSizeDisplay = false;
      speedDisplay = false;
      $(".setting").removeClass("selected");
      $(".randomSetting").animate({"background-color": "#1e5d8e"}, 50);
      $(".randomSetting").animate({"background-color": "#3887c4"}, 200);
    }

  });

  // Clear button
  $("#clearButton").click(function() {
    clear();
    resizeCanvas(parseInt($("#theToyContainer").width()), parseInt($("#theToyContainer").height()));
  });

  // Pause button
  $("#playButton").click(function() {
    if(playing){
      playing = false;
      $("#playButton").html("Play");
      stencil.diameter = stencil.diameterTarget;
      mover.diameter = mover.diameterTarget;
    }
    else{
      playing = true;
      stencil.diameter = stencil.diameterTarget;
      mover.diameter = mover.diameterTarget;
      $("#playButton").html("Pause");
    }

  });



  // Closers

  $("#colorCloser").click(function() {
    var newToyWidth = $("#theToyContainer").width() + 80;
    //$("#colorButtons").css({ 'overflow': 'hidden' });
    $("#colorButtons").animate({width: "35px"}, 200);
    console.log("asalsdhals");
    $("#theToyContainer").animate({width: newToyWidth}, 220);
    $(this).css("display", "none");
    $("#colorOpener").css("display", "block");
    $("#colorOpener").animate({ 'background-color': 'rgba(45, 45, 45, 0.9)' },200);
  });

  $("#backgroundColorCloser").click(function() {
    var newToyWidth = $("#theToyContainer").width() + 80;

    //$("#backgroundColorButtons").css({ 'overflow': 'hidden' });
    $("#backgroundColorButtons").animate({width: "35px"}, 200);
    $("#theToyContainer").animate({width: newToyWidth}, 220);
    $(this).css("display", "none");
    $("#backgroundColorOpener").css("display", "block");
    $("#backgroundColorOpener").animate({ 'background-color': 'rgba(45, 45, 45, 0.9)' },200);
  });

  $("#otherButtonCloser").click(function() {
    var newToyWidth = $("#theToyContainer").width() + 125;
    //$("#otherButtons").css({ 'overflow': 'hidden' });
    $("#otherButtons").animate({width: "35px"}, 200);
    $("#theToyContainer").animate({width: newToyWidth}, 220);
    $("#otherButtonOpener").css("display", "block");
    $("#otherButtonOpener").animate({ 'background-color': 'rgba(45, 45, 45, 0.9)' },200);
  });


  // Openers

  $("#colorOpener").click(function() {
    var newToyWidth = $("#theToyContainer").width() - 80;
    //$("#colorButtons").css({ 'overflow-y': 'scroll' });
    $("#theToyContainer").animate({width: newToyWidth}, 200);
    $("#colorButtons").animate({width: "115px"}, 220);
    $(this).css("display", "none");
    $("#colorCloser").css("display", "block");
    $("#colorButtons").css("overflow-y", "scroll");
  });

  $("#backgroundColorOpener").click(function() {
    var newToyWidth = $("#theToyContainer").width() - 80;
    //$("#backgroundColorButtons").css({ 'overflow-y': 'scroll' });
    $("#theToyContainer").animate({width: newToyWidth}, 200);
    $("#backgroundColorButtons").animate({width: "115px"}, 220);
    $(this).css("display", "none");
    $("#backgroundColorCloser").css("display", "block");
  });

  $("#otherButtonOpener").click(function() {
    var newToyWidth = $("#theToyContainer").width() - 125;
    //$("#otherButtons").css({ 'overflow-y': 'scroll' });
    $("#theToyContainer").animate({width: newToyWidth}, 200);
    $("#otherButtons").animate({width: "160px"}, 220);
    $(this).css("display", "none");
    $("#otherButtonCloser").css("display", "block");
  });





var penSizeDisplay = false;
var innerSizeDisplay = false;
var outerSizeDisplay = false;
var speedDisplay = false;

// Mobile stuff


  $("#penSizeClick").click(function() {
    if (!penSizeDisplay){
      $(".upDownButtonHolder").css("display", "none");
      $("#penSizeUpDown").css("display", "block");
      penSizeDisplay = true;
      innerSizeDisplay = false;
      outerSizeDisplay = false;
      speedDisplay = false;
      $(".setting").removeClass("selected");
      $("#penSizeSetting").addClass("selected");
    }
    else{
      $("#penSizeUpDown").css("display", "none");
      $("#penSizeSetting").removeClass("selected");
      penSizeDisplay = false;
    }
  });


  $("#outerSizeClick").click(function() {
    if (!outerSizeDisplay){
      $(".upDownButtonHolder").css("display", "none");
      $("#outerCircleUpDown").css("display", "block");
      penSizeDisplay = false;
      innerSizeDisplay = false;
      outerSizeDisplay = true;
      speedDisplay = false;
      $(".setting").removeClass("selected");
      $("#outerSizeSetting").addClass("selected");
    }
    else{
      $("#outerCircleUpDown").css("display", "none");
      $("#outerSizeSetting").removeClass("selected");
      outerSizeDisplay = false;
    }
  });



  $("#innerSizeClick").click(function() {
    if (!innerSizeDisplay){
      $(".upDownButtonHolder").css("display", "none");
      $("#innerCircleUpDown").css("display", "block");
      penSizeDisplay = false;
      innerSizeDisplay = true;
      outerSizeDisplay = false;
      speedDisplay = false;
      $(".setting").removeClass("selected");
      $("#innerSizeSetting").addClass("selected");
    }
    else{
      $("#innerCircleUpDown").css("display", "none");
      $("#innerSizeSetting").removeClass("selected");
      innerSizeDisplay = false;
    }
  });



  $("#speedClick").click(function() {
    if (!speedDisplay){
      $(".upDownButtonHolder").css("display", "none");
      $("#speedUpDown").css("display", "block");
      penSizeDisplay = false;
      innerSizeDisplay = false;
      outerSizeDisplay = false;
      speedDisplay = true;
      $(".setting").removeClass("selected");
      $("#speedSetting").addClass("selected");
    }
    else{
      $("#speedUpDown").css("display", "none");
      $("#speedSetting").removeClass("selected");
      speedDisplay = false;
    }
  });

  $("#theToyContainer").click(function() {

    if($('#otherButtons').height() == 120 ){
      $(".upDownButtonHolder").css("display", "none");
      penSizeDisplay = false;
      innerSizeDisplay = false;
      outerSizeDisplay = false;
      speedDisplay = false;
      $(".setting").removeClass("selected");
    }
  });


  $(".upDownButtonHolder").click(function() {
    if($('#otherButtons').height() == 120 ){
      $(".upDownButtonHolder").css("display", "none");
      penSizeDisplay = false;
      innerSizeDisplay = false;
      outerSizeDisplay = false;
      speedDisplay = false;
      $(".setting").removeClass("selected");
    }
  });


  $('.upDownButton').click(function(e){
    e.stopPropagation();
  });


});


  function windowResized() {
    console.log("resize");
    sortOutWindowResize();
  }

  function sortOutWindowResize(){
    var newToyWidth;
    var newToyHeight;


    if($('#otherButtons').height() == 120 ){
      newToyWidth =  $(window).width();
      newToyHeight = $(window).height()

                      - $("#otherButtons").height()
                      - 50;
                      //- $("#colorButtons").height()
                      //- $("#backgroundColorButtons").height()
      $("#backgroundTitle").html("bg");
      $(".randomSetting").css({ "background": " rgba(56, 135, 196, 1)" });
      $(".upDownButtonHolder").css("display", "none");
    }
    else{

      $("#backgroundTitle").html("background");
      newToyWidth =  $(window).width()
                        - $("#colorButtons").width()
                        - $("#backgroundColorButtons").width()
                        - $("#otherButtons").width()
                        - 79;
      newToyHeight = $(window).height();
      $(".upDownButtonHolder").css("display", "inline-block");
      $(".setting").removeClass("selected");
      $(".randomSetting").css({ "background": "none" });
    }

    $("#theToyContainer").css({ 'width': newToyWidth });
    $("#theToyContainer").css({ 'height': newToyHeight });
  }
