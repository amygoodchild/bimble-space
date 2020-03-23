$(document).ready(function(){

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

  $(".star").each(function( index ) {
    $(this).css("left", Math.floor((Math.random() * 100) + 1)+"vw");
    $(this).css("top", Math.floor((Math.random() * 100) + 1)+"vh");
  });

  $(".shootingstar").css("left", "-150px").css("top", "40px").delay(20000);

  function doSomething() {}
    (function loop() {
      var rand = Math.round(Math.random() * (20000 - 5000)) + 20000;
      console.log(rand);
      $(".shootingstar").animate({left: "4000px", top: "1500px", opacity: "0"}, 1000).animate({left: "-150px", top: "40px", opacity: "0.2"}, 1);;
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
      $(".shootingstar2").animate({left: "4000px", top: "1700px", opacity: "0"}, 1000).animate({left: "-150px", top: "240px", opacity: "0.2"}, 1);;
      setTimeout(function() {
              doSomething();
              loop();
      }, rand);


  }());





});
