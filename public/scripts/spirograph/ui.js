$(document).ready(function(){

  // util
  function round5(x)
  {
    return Math.ceil(x/5)*5;
  }


  // Color Settings

  $("#color0").css("border", "3px solid #ffffff");
  $("#bgcolor1").css("border", "3px solid #000000");

  $(".bgColorButton").click(function(){
    $("#theToyContainer").css("background", $(this).css('background'));
    $(".bgColorButton").css("border", "1px solid #000000");
    $(this).css("border", "3px solid #000000");
  });

  $(".colorButton").click(function(){
    penColor = $(this).css('background-color');
    rainbow = false;
    $(".colorButton").css("border", "1px solid #000000");
    $(this).css("border", "3px solid #000000");
  });

  $("#color16").click(function(){
    penColor = $(this).css('background-color');
    rainbow = true;
  });


  // Settings



  //Pen Size initialise
  $("#penSizeDisplay").val(penSize);

  // Speed initialise
  var printSpeed = parseInt(10);
  $("#speedDisplay").val(printSpeed);

  // Outer circle init
  if ($("#theToyContainer").width() < $("#theToyContainer").height()){
    var printOuterSize = round5(parseInt($("#theToyContainer").width()-50));
  }
  else{
    var printOuterSize = round5(parseInt($("#theToyContainer").height()-100));
  }
  $("#outerCircleDisplay").val(printOuterSize);

  // Inner circle init
  var printInnerSize = round5(parseInt(Math.random()*printOuterSize)+20);
  $("#innerCircleDisplay").val(printInnerSize);


  // Pen size change
  $("#penSizeDisplay").change(function() {
    if ($("#penSizeDisplay").val() > 500){
      penSize = 500;
      $("#penSizeDisplay").val(500);
    }
    else if ($("#penSizeDisplay").val() > 0){
      penSize = parseInt($("#penSizeDisplay").val());
      $("#penSizeDisplay").val(parseInt($("#penSizeDisplay").val()));
    }
    else{
      penSize = 1;
      $("#penSizeDisplay").val(1);
    }
  });

  $("#penDown").click(function() {
    if (penSize > 1){
      penSize -= 1;
      $("#penSizeDisplay").val(penSize);
    }
  });

  $("#penUp").click(function() {
    if (penSize < 500){
      penSize += 1;
      $("#penSizeDisplay").val(penSize);
    }
  });

  // Speed change
  $("#speedDisplay").change(function() {
    if ($("#speedDisplay").val() > 300){
      stencil.speed = parseFloat(300/10000);
      $("#speedDisplay").val(300);
    }
    else if ($("#speedDisplay").val() > 0){
      stencil.speed = parseFloat(($("#speedDisplay").val()/10000));
      $("#speedDisplay").val(parseInt($("#speedDisplay").val()));
    }
    else{
      stencil.speed = parseFloat(1/10000);
      $("#speedDisplay").val(1);
    }
  });

  $("#speedDown").click(function() {
    if (stencil.speed*10000 > 1){
      stencil.speed -= 0.0001;
      $("#speedDisplay").val(parseInt(stencil.speed*10000));
    }
  });

  $("#speedUp").click(function() {
    if (stencil.speed*10000 < 300){
      stencil.speed += 0.0001;
      $("#speedDisplay").val(parseInt(stencil.speed*10000));
    }
  });


  // Outer circle change
  $("#outerCircleDisplay").change(function() {
    stencil.diameterTarget = parseInt(($(this).val()));
  });

  $("#outerCircleDown").click(function() {
    if (stencil.diameterTarget > 5){
      stencil.diameterTarget -= 5;
      $("#outerCircleDisplay").val(parseInt(stencil.diameterTarget));
    }
  });

  $("#outerCircleUp").click(function() {
    if (stencil.diameterTarget < 1000){
      stencil.diameterTarget += 5;
      $("#outerCircleDisplay").val(parseInt(stencil.diameterTarget));
    }
  });



  // Inner circle change
  $("#innerCircleDisplay").change(function() {
    mover.diameterTarget = parseInt(($(this).val()));
  });

  $("#innerCircleDown").click(function() {
    if (mover.diameterTarget > 5){
      mover.diameterTarget -= 5;
      $("#innerCircleDisplay").val(parseInt(mover.diameterTarget));
    }
  });

  $("#innerCircleUp").click(function() {
    if (mover.diameterTarget < 1000){
      mover.diameterTarget += 5;
      $("#innerCircleDisplay").val(parseInt(mover.diameterTarget));
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

    // outer circle
    min = 1;
    max = $("#theToyContainer").width()/1.5;
    stencil.diameter = round5(Math.floor(Math.random() * (+max - +min)) + +min);
    stencil.diameterTarget = stencil.diameter;
    $("#outerCircleDisplay").val(stencil.diameter);

    // outer circle
    min = 1;
    max = $("#theToyContainer").width()/1.5;
    mover.diameter = round5(Math.floor(Math.random() * (+max - +min)) + +min);
    mover.diameterTarget = mover.diameter;
    $("#innerCircleDisplay").val(mover.diameter);

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
      $("#playButton").html("Pause");
    }

  });








});
