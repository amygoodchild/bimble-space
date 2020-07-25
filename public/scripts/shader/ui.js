$(document).ready(function(){


  // On Load
  //ps.theNoiseSeed = ps.random(0,500);
  $("#randomizeNoiseSeed").val(ps.theNoiseSeed);

  //ps.seeder = ps.random(0,100);
  $("#randomizeSeedStart").val(ps.seeder);

  $("#seedStartStep").val(ps.seedDistance);
  $("#numLines").val(ps.numLines);
  $("#thickness").val(ps.thickness);
  $("#yResolution").val(ps.yResolution);
  $("#noiseChange").val(ps.noiseChange);
  $("#wiggleLeft").val(ps.wiggleLeft);
  $("#wiggleRight").val(ps.wiggleRight);
  $("#lerp").val(ps.lerpAmount);

  $("#hueFrom1").val(ps.minHue1);
  $("#hueTo1").val(ps.maxHue1);
  $("#sat1").val(ps.sat1);
  $("#bri1").val(ps.bri1);
  $("#opa1").val(ps.opa1);
  $("#hueFrom2").val(ps.minHue2);
  $("#hueTo2").val(ps.maxHue2);
  $("#sat2").val(ps.sat2);
  $("#bri2").val(ps.bri2);
  $("#opa2").val(ps.opa2);


  $("#hueFrom1").change(function() {
    ps.minHue1 = parseFloat($("#hueFrom1").val());
  });
  $("#hueTo1").change(function() {
    ps.maxHue1 = parseFloat($("#hueTo1").val());
  });
  $("#sat1").change(function() {
    ps.sat1 = parseFloat($("#sat1").val());
  });
  $("#bri1").change(function() {
    ps.bri1 = parseFloat($("#bri1").val());
  });
  $("#opa1").change(function() {
    ps.opa1 = parseFloat($("#opa1").val());
  });



  $("#hueFrom2").change(function() {
    ps.minHue2 = parseFloat($("#hueFrom2").val());
  });
  $("#hueTo2").change(function() {
    ps.maxHue2 = parseFloat($("#hueTo2").val());
  });
  $("#sat2").change(function() {
    ps.sat2 = parseFloat($("#sat2").val());
  });
  $("#bri2").change(function() {
    ps.bri2 = parseFloat($("#bri2").val());
  });
  $("#opa2").change(function() {
    ps.opa2 = parseFloat($("#opa2").val());
  });



  $("#randomizeNoiseSeedButton").click(function(){
    ps.theNoiseSeed = ps.random(0,500);
    $("#randomizeNoiseSeed").val(ps.theNoiseSeed);

    if(ps.autoLayer){ ps.newLayer(); }
    if(ps.autoNew){ ps.totallyNew(); }
  });

  $("#randomizeSeedStartButton").click(function(){
    ps.seeder = ps.random(0,100);
    $("#randomizeSeedStart").val(ps.seeder);

    if(ps.autoLayer){ ps.newLayer(); }
    if(ps.autoNew){ ps.totallyNew(); }
  });

  $("#seedStartStep").change(function() {
    ps.maxSeedStep = parseFloat($("#seedStartStep").val());
  });

  $("#numLines").change(function() {
    ps.numLines = parseFloat($("#numLines").val());
  });

  $("#thickness").change(function() {
    ps.thickness = parseFloat($("#thickness").val());
  });

  $("#yResolution").change(function() {
    ps.yResolution = parseFloat($("#yResolution").val());
  });

  $("#noiseChange").change(function() {
    ps.noiseChange = parseFloat($("#noiseChange").val());
  });

  $("#wiggleLeft").change(function() {
    ps.wiggleLeft = parseFloat($("#wiggleLeft").val());
  });

  $("#wiggleRight").change(function() {
    ps.wiggleRight = parseFloat($("#wiggleRight").val());
  });

  $("#lerp").change(function() {
    ps.lerpAmount = parseFloat($("#lerp").val());
  });


  $("#alternateButton").click(function(){
    ps.alternate = true;
    $("#alternateButton").addClass('optionSelected');
    $("#splitButton").removeClass('optionSelected');

    if(ps.autoLayer){ ps.newLayer(); }
    if(ps.autoNew){ ps.totallyNew(); }
  });

  $("#splitButton").click(function(){
    ps.alternate = false;
    $("#alternateButton").removeClass('optionSelected');
    $("#splitButton").addClass('optionSelected');

    if(ps.autoLayer){ ps.newLayer(); }
    if(ps.autoNew){ ps.totallyNew(); }
  });

  $("input").change(function() {
    if(ps.autoLayer){ ps.newLayer(); }
    if(ps.autoNew){ ps.totallyNew(); }
  });


  $("#autoLayerButton").click(function(){
      ps.autoLayer = true;
      ps.autoNew = false;
    $("#autoLayerButton").addClass('optionSelected');
    $("#autoNewButton").removeClass('optionSelected');
    $("#noAutoButton").removeClass('optionSelected');
  });

  $("#autoNewButton").click(function(){
      ps.autoLayer = false;
      ps.autoNew = true;
    $("#autoLayerButton").removeClass('optionSelected');
    $("#autoNewButton").addClass('optionSelected');
    $("#noAutoButton").removeClass('optionSelected');
  });

  $("#noAutoButton").click(function(){
      ps.autoLayer = false;
      ps.autoNew = false;
    $("#autoLayerButton").removeClass('optionSelected');
    $("#autoNewButton").removeClass('optionSelected');
    $("#noAutoButton").addClass('optionSelected');
  });


  $("#generateLayerButton").click(function(){
    ps.newLayer();
  });

  $("#generateNewButton").click(function(){
    ps.totallyNew();
  });
});
