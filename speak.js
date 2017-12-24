
var speak = require("node-speak");
var $ = require('jquery');


var audio = new Audio();

 
$('#speak').click(function(){
  console.log("speaking");

  speak("hello world, I'm a computer talking to you live!", {
    voice: "fr",
    callback: function (src) {
      // do whatever you want with the returned data: "src" 

      audio.src=src;
      audio.play();
    }
  });


});
