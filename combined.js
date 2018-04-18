

var googleTTS = require('google-tts-api');
var cleverbot = require("cleverbot-api");
var $ = require('jquery');


var audio = new Audio();
var bot = new cleverbot('CC8j35eaCxm72sQhMjHfmgOWLZg');


 
$('#speak').click(function(){
  //console.log("Speaking...");

  bot.getReply({ input: "What is your favorite programming language?"}, function (err, response) {
    //console.log("Response from bot - "); // Will likely be: "Living in a lonely world"
    //console.log(response);
     
    googleTTS(response.output, 'en', 1)   // speed normal = 1 (default), slow = 0.24
    .then(function (url) {
      //console.log(url); // https://translate.google.com/translate_tts?...
      audio.src=url;
      audio.play();
    })
    .catch(function (err) {
      console.error(err);
    });


  }); // ask bot


});

