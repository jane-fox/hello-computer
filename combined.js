

var googleTTS = require('google-tts-api');
var cleverbot = require("cleverbot.io");
var $ = require('jquery');


var audio = new Audio();
var bot = new cleverbot('6oTPsqLvCY2O8hoz','TNK8aFpA8uo59xUhG8xGHIMlRNBD1bPu');








 
$('#speak').click(function(){
  //console.log("Speaking...");

  bot.ask("Just a small town girl", function (err, response) {
    console.log("Response from bot - " + response); // Will likely be: "Living in a lonely world"
  
     
    googleTTS(response, 'en', 1)   // speed normal = 1 (default), slow = 0.24
    .then(function (url) {
      console.log(url); // https://translate.google.com/translate_tts?...
      audio.src=url;
      audio.play();
    })
    .catch(function (err) {
      console.error(err.stack);
    });


  }); // ask bot


});

