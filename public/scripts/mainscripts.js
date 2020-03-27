$(document).ready(function(){

  $( window ).resize(function() {
    if ($( window ).height() < $( window ).width()){
      $("#menu").css("width", "55px");
      $("#menu").css("height", "100%");
      $(".menuButtonClosed").css("display", "block");
      $(".menuButtonOpen").css("display", "none");
      $(".menuButtonClosedMobile").css("display", "none");
      $(".menuButtonOpenMobile").css("display", "none");
    }
    else{
      $("#menu").css("height", "55px");
      $("#menu").css("width", "100%");
      $(".menuButtonClosedMobile").css("display", "block");
      $(".menuButtonOpenMobile").css("display", "none");
      $(".menuButtonClosed").css("display", "none");
      $(".menuButtonOpen").css("display", "none");
    }
  });




  $(".menuButtonClosed").click(function(){
    $("#menu").animate({width: "80%"}, 400);
    $(".menuButtonClosed").css("display", "none");
    $(".menuButtonOpen").css("display", "block");
  });


  $(".menuButtonOpen").click(function(){
    $("#menu").animate({width: "55px"}, 400);
    $(".menuButtonClosed").css("display", "block");
    $(".menuButtonOpen").css("display", "none");
  });


  $(".menuButtonClosedMobile").click(function(){
    $("#menu").animate({height: "100%"}, 400);
    $(".menuButtonClosedMobile").css("display", "none");
    $(".menuButtonOpenMobile").css("display", "block");
  });

  $(".menuButtonOpenMobile").click(function(){
    $("#menu").animate({height: "55px"}, 400);
    $(".menuButtonClosedMobile").css("display", "block");
    $(".menuButtonOpenMobile").css("display", "none");
  });




  $(".star").each(function( index ) {
    $(this).css("left", Math.floor((Math.random() * 100) + 1)+"vw");
    $(this).css("top", Math.floor((Math.random() * 100) + 1)+"vh");
  });

  $(".shootingstar").css("left", "-150px").css("top", "40px").delay(20000);

  function doSomething() {}
    (function loop() {
      var rand = Math.round(Math.random() * (20000 - 5000)) + 20000;
      console.log(rand);
      //$(".shootingstar").animate({left: "4000px", top: "1500px", opacity: "0"}, 1500).animate({left: "-150px", top: "40px", opacity: "0.2"}, 1);;
      setTimeout(function() {
              doSomething();
              loop();
      }, rand);


  }());



  $(".shootingstar2").css("left", "-150px").css("top", "240px").delay(28000);

  function doSomething() {}
    (function loop() {
      var rand = Math.round(Math.random() * (20000 - 5000)) + 20000;
      console.log(rand);
      //$(".shootingstar2").animate({left: "4000px", top: "1700px", opacity: "0"}, 1500).animate({left: "-150px", top: "240px", opacity: "0.2"}, 1);;
      setTimeout(function() {
              doSomething();
              loop();
      }, rand);


  }());





});
