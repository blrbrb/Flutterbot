const { Events } = require('discord.js');
const {format} = require('../utils/utilities.js');
const {commandResponses, errorMessage} = require('../lang/en.js');
const { de } = require('chrono-node');
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(Flutterbot) {
        Flutterbot.log('green',`Fluttershy is awake! \n`);

   
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
    
}

    
};
