$(document).ready(function(){

  $("#saveButton").click(function(){

    $("#img-out").html("");

    html2canvas(document.querySelector("#theToyContainer")).then(canvasa => {

      document.getElementById('img-out').appendChild(canvasa);

      $(canvasa).attr('id', 'savedCanvas');
      var filename = "bimblespace" + parseInt(Math.random()*100) + parseInt(millis());
      var theCanvas = document.getElementById('savedCanvas');
      saveAs(theCanvas.toDataURL(), filename);
    });


  });



});

function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}
