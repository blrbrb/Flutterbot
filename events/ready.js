const { Events } = require('discord.js');
const {format} = require('../utils/utilities.js');
const {commandResponses, errorMessage} = require('../lang/en.js');
const { de } = require('chrono-node');
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(Flutterbot) {
        Flutterbot.log('green',`Fluttershy is awake! \n`);

        const repeater = 60* 60 * 1000; //hourly update
      setInterval(async() =>{await Flutterbot.updateSurvivors()}, repeater);
       
		//console.log('Fluttershy is Awake Yay! :3');
		//Distube listeners need to be initalized here, according to the documentation on DisTube.js 
    // discord bot "ready" event is only called once, but the listeners will still be activated.

    //this was litterally doing nothing lol, it has to be set to client ONCE. not client ON.
    Flutterbot.DisTube.on("playSong", (queue, song) => {
        console.log(song.name);
        queue.textChannel.send(commandResponses.Distube.onPlaying(queue, Flutterbot));
    });

    Flutterbot.DisTube.on("error", (channel, e) => {
        console.log(Object.getOwnPropertyNames(e));
        console.log(Object.keys(e));
        console.log(e.message);
        console.log(e.name);
        channel.send(`I'm sorry, My songbirds are having trouble playing this song because...\n\`${e.message}\``);
    });

    Flutterbot.DisTube.on("empty", (queue) => { queue.textChannel.send(commandResponses.Distube.onQueueFinish())});
	
    Flutterbot.DisTube.on("addSong", (queue, song) => {
        
        queue.textChannel.send({embeds:[commandResponses.Distube.onAddSong(queue, Flutterbot)]});
    });

        // DisTubeOptions.searchSongs > 0
   
    
}

    
};
