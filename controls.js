
var mic = require('mic');

var googleTTS = require('google-tts-api');
var cleverbot = require("cleverbot-api");

var audio = new Audio();
var bot = new cleverbot('CC8j35eaCxm72sQhMjHfmgOWLZg');



var fs = require('fs');
var time = require('date-and-time');

var deepspeech = require('deepspeech');

// deepspeech stuff
const Sox = require('sox-stream');
const MemoryStream = require('memory-stream');





// Beam width used in the CTC decoder when building candidate transcriptions
const BEAM_WIDTH = 500;

// The alpha hyperparameter of the CTC decoder. Language Model weight
const LM_WEIGHT = 1.75;

// The beta hyperparameter of the CTC decoder. Word insertion weight (penalty)
const WORD_COUNT_WEIGHT = 2.00;

// Valid word insertion weight. This is used to lessen the word insertion penalty
// when the inserted word is part of the vocabulary
const VALID_WORD_COUNT_WEIGHT = 1.00;


// These constants are tied to the shape of the graph used (changing them changes
// the geometry of the first layer), so make sure you use the same constants that
// were used during training

// Number of MFCC features to use
const N_FEATURES = 26;

// Size of the context window used for producing timesteps in the input vector
const N_CONTEXT = 9;




console.info('Loading model from file');
var model = new deepspeech.Model("models/output_graph.pb", N_FEATURES, N_CONTEXT, "models/alphabet.txt", BEAM_WIDTH);

model.enableDecoderWithLM("models/alphabet.txt", "models/lm.binary", "models/trie",
LM_WEIGHT, WORD_COUNT_WEIGHT, VALID_WORD_COUNT_WEIGHT);


// end deepspeech stuff





var micInstance;

var micInputStream;

var outputFileStream = null;

var filename = "";



function setup_mic() {

    micInstance = new mic({
        rate: '16000',
        channels: '1',
        fileType: "wav",
        debug: false,
        exitOnSilence: 0
    });

    var micInputStream = micInstance.getAudioStream();

    //console.log("Setting up microphone...")
    micInstance.start();

    // Get string of current date time
    var date = new Date();
    var current_time = time.format(date, 'DDHHmmss');
    filename = './output/' + current_time + '.wav';

    // Open output file as wav
    outputFileStream = fs.WriteStream( filename );
    //var outputFileStream = fs.WriteStream('test.wav');
     
    // Directs mic to be saved into our new file
    //micInputStream.pipe(outputFileStream);

    var audioStream = new MemoryStream();

    micInputStream.pipe(audioStream);



    audioStream.on('finish', () => {
        audioBuffer = audioStream.toBuffer();

        //console.info('Running inference.');

        // We take half of the buffer_size because buffer is a char* while
        // LocalDsSTT() expected a short*
        //console.log(model.stt(audioBuffer, 16000));
        var text = model.stt(audioBuffer.slice(0, audioBuffer.length / 2), 16000);

        console.log("You: " + text);
        reply(text);

    });



      
} 

function reply( replying_to ) {

      bot.getReply({ input: replying_to}, function (err, response) {
    //console.log("Response from bot - "); // Will likely be: "Living in a lonely world"
    console.info("Robot: " + response.output);
     
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


}

function save_file() {
    //outputFileStream.end();
        outputFileStream.end();
    //micInstance.stop();

    //console.log(filename);

    micInstance.stop();

}


function start() {


    setup_mic();
    
}

function pause() {
    micInstance.pause();
    
}

function resume() {
    micInstance.resume();
    
}

function finish() {

    save_file();




//model.enableDecoderWithLM("models/alphabet.txt", "models/lm.binary", "models/trie",LM_WEIGHT, WORD_COUNT_WEIGHT, VALID_WORD_COUNT_WEIGHT);
    // 
    //model.stt("output/test.wav", 16000);
}






// Set event handlers for clicking on buttons
document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('resume').addEventListener('click', resume);
document.getElementById('finish').addEventListener('click', finish);


