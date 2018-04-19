
You'll need the models from deepspeech.

make sure you have ALSA for linux or sox for mac/win


npm install
to install

npm start
to start





talk to your computer

so I had this idea for a project that I've been working on, I'm going to write my thoughts down about it.


What it is:
You talk out loud, your computer listens, and responds with its own voice.



Concept:
I want to build this writing as little code as possible. Hopefully, it will all be getting the correct technologies wired up together.

It will consist of 3 main parts - speech recognition, a chatbot, and text to speech.

So I can port it to any platform, I'm choosing electron js to build it in. Ideally I would like installers for windows, mac, and linux that have no dependencies. Just install and go. All software meant for users should be like that I think.




While speech synthesis web api has been around for awhile, mozilla recently released their neural network deepspeech that has as low as a 6% error rate - extremely good! 

Staying with that theme, I wanted to use something based on a neural network for the chatbot portion as well, as that would likely provide the most interesting responses. After a little research, cleverbot seems to fit the bill perfectly. I remember it being released years ago, hopefully it's gotten some nice improvements since then. Also, lucky me, there is a package on npm that lets you interface with it easily over the net, no heavy software required.

Text to speech is a little more tricky. While the quality for the web api is OK, it turns out it's disabled for the chromium with electron. I wanted something better anyway.
The quality of Bluemix by IBM is wonderful. I looked into using that but found the documentation to be lacking, furthermore there was a monthly character limit on the service, and since this is for fun I don't want to pay extra for any users I have.
As it turns out, you can use the google translate API to generate speech for you, and it sounds pretty good. You can only do up to 200 characters per time, but the cleverbot responses all seem to be well under that, so we should be good on that front.
I'm disapointed there's no open source neural networks for this out already! Hopefully one comes soon enough.
For a fallback option, whether el goog doesn't work out, or I get a message over 200 characters, the next best solution in javascript seems to be node-speak
node-speak is very interesting! Most of the TTS libraries in NPM seem to require something to be installed on your computer, which could be different for each platform.
espeak is a C++ library for generating voices
node-speak is espeak compiled into javascript using emscripten, that's why it's -so cool-
That's pretty much why I think javascript is the future. 
It doesn't sound beautiful, but it will be a solid option that won't give us any install dependancies. 


Finding these techs took a bit of digging, but where both fairly easy to set up.
Deepspeech however, we're running into a slight issue. 
I installed it and ran it just fine on another computer using the python method, since I found it pretty fascinating
but the npm version is giving me difficulties - something about being compiled by the wrong node version or something?

so I've got two option I'm considering now
1
package python inside the electron app and run deepspeech like that, using a socket or lightweight http server to communicate with node
2
rebuild the package from source using my version of node


I have no experience with 2 really, but I dread 1 can come with latency and unforeseen issues....



