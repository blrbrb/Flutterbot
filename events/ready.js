const { Events } = require('discord.js');
const {removeEveryoneMentions,format, langRand, Log } = require('../utils.js');
const {defaultValues} = require('../lang/en.js');
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(Flutterbot) {
        console.log(`Fluttershy is awake!`);
       
		//console.log('Fluttershy is Awake Yay! :3');
		//Distube listeners need to be initalized here, according to the documentation on DisTube.js 
    // discord bot "ready" event is only called once, but the listeners will still be activated.

    //this was litterally doing nothing lol, it has to be set to client ONCE. not client ON.
    Flutterbot.DisTube.on("playSong", (queue, song) => {
        console.log(song.name);
        queue.textChannel.send(removeEveryoneMentions(format(langRand(defaultValues.nowPlaying), {song_name: song.name, song_duration:song.formattedDuration, song_user: song.user })));
    });

    Flutterbot.DisTube.on("error", (channel, e) => {
        console.log(Object.getOwnPropertyNames(e));
        console.log(Object.keys(e));
        console.log(e.message);
        console.log(e.name);
        channel.send(`I'm sorry, My songbirds are having trouble playing this song because...\n\`${e.message}\``);
    });

    Flutterbot.DisTube.on("empty", (queue) => { queue.textChannel.send("Oh has everyone gone home? I'll stop playing the music"); queue});
	

    Flutterbot.DisTube.on("addSong", (queue, song) => {
        
        queue.textChannel.send(removeEveryoneMentions(format(langRand(defaultValues.addSong), {song_name: song.name})));
    });

}

    
};
