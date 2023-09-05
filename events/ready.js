const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log('Fluttershy is Awake Yay! :3');
		//Distube listeners need to be initalized here, according to the documentation on DisTube.js 
    // discord bot "ready" event is only called once, but the listeners will still be activated.

    //this was litterally doing nothing lol, it has to be set to client ONCE. not client ON.
    client.DisTube.on("playSong", (queue, song) => {
        queue.textChannel.send(removeEveryoneMentions(`🎶 Now playing **${song.name}** / ${song.formattedDuration} / requested by ${song.user}`));


        client.DisTube.on("error", (channel, e) => {
            console.log(Object.getOwnPropertyNames(e));
            console.log(Object.keys(e));
            console.log(e.message);
            console.log(e.name);
            client.DisTube.deleteQueue();
            channel.send(`I'm sorry, My songbirds are having trouble playing this song because...\n\`${e.message}\``);
        });


        client.DisTube.on("empty", (queue) => { queue.textChannel.send("Oh has everyone gone home? I'll stop playing the music"); queue});

    });
	}
};
