

var googleTTS = require('google-tts-api');

var $ = require('jquery');


var audio = new Audio();

 
$('#speak').click(function(){
  console.log("speaking");

     
    googleTTS("Hello World, I'm a computer speaking to you live", 'en', 1)   // speed normal = 1 (default), slow = 0.24
    .then(function (url) {
      console.log(url); // https://translate.google.com/translate_tts?...
      audio.src=url;
      audio.play();
    })
    .catch(function (err) {
      console.error(err.stack);
    });




});

