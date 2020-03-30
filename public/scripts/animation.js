
$(document).ready(function(){

  $(".star").each(function( index ) {
    $(this).css("left", Math.floor((Math.random() * 100) + 1)+"vw");
    $(this).css("top", Math.floor((Math.random() * 100) + 1)+"vh");
  });

  $(".shootingstar").css("left", "-250px").css("top", "40px").delay(20000);

  function doSomething() {}
    (function loop() {
      var rand = Math.round(Math.random() * (20000 - 5000)) + 20000;
      console.log(rand);
      $(".shootingstar").animate({left: "3900px", top: "1500px", opacity: "0"}, 1500).animate({left: "-250px", top: "40px", opacity: "0.2"}, 1);;
      setTimeout(function() {
              doSomething();
              loop();
      }, rand);


  }());



  $(".shootingstar2").css("left", "-250px").css("top", "240px").delay(28000);

  function doSomething() {}
    (function loop() {
      var rand = Math.round(Math.random() * (20000 - 5000)) + 20000;
      console.log(rand);
      $(".shootingstar2").animate({left: "3900px", top: "1700px", opacity: "0"}, 1500).animate({left: "-250px", top: "240px", opacity: "0.2"}, 1);;
      setTimeout(function() {
              doSomething();
              loop();
      }, rand);


  }());

});
