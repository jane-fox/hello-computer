
var mic = require('mic');
var fs = require('fs');
var time = require('date-and-time');

var deepspeech = require('deepspeech');


var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    exitOnSilence: 6
});

var micInputStream = micInstance.getAudioStream();
var outputFileStream = null;

var filename = "";


function setup_mic() {

    //console.log("Setting up microphone...")
    micInstance.start();

    // Get string of current date time
    var date = new Date();
    var current_time = time.format(date, 'DD HH:mm:ss');
    filename = './output/' + current_time + '.raw';

    // Open output file as wav
    outputFileStream = fs.WriteStream( filename );
    //var outputFileStream = fs.WriteStream('test.wav');
     
    // Directs mic to be saved into our new file
    //micInputStream.pipe(outputFileStream);


      
}

function save_file() {
    //outputFileStream.end();
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
    micInstance.stop();


    
    /*
    deepspeech.Model({
        model: "models/output_graph.pb", 
        alphabet: "models/alphabet.txt", 
        lm: "models/lm.binary", 
        trie: "models/trie", 
        audio: filename
    });
    */

    console.log(deepspeech);
    deepspeech.audioToInputVector("models/output_graph.pb", "output/test.wav", "models/alphabet.txt", "models/lm.binary", "models/trie");
    

}


// Set event handlers for clicking on buttons
document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('resume').addEventListener('click', resume);
document.getElementById('finish').addEventListener('click', finish);


