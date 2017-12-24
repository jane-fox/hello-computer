
var mic = require('mic');
var fs = require('fs');
var time = require('date-and-time');

var deepspeech = require('./node_modules/deepspeech/lib/binding/v0.1.0/linux-x64/node-v48/deepspeech.node');


var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    exitOnSilence: 6
});

var micInputStream = micInstance.getAudioStream();

var current_time = null;


function setup_mic() {

    // Get string of current date time
    var date = new Date();
    current_time = time.format(date, 'YYYY-MM-DD HH:mm:ss');

    // Open output file as wav
    var outputFileStream = fs.WriteStream( './output/' + current_time + '.wav');
    //var outputFileStream = fs.WriteStream('test.wav');
     
    // Directs mic to be saved into our new file
    micInputStream.pipe(outputFileStream);
      
}

function save_file() {

}


function start() {

    micInstance.start();

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
    
}


// Set event handlers for clicking on buttons
document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('resume').addEventListener('click', resume);
document.getElementById('finish').addEventListener('click', finish);


