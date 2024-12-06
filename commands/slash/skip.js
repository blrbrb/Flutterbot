module.exports = {
    name: 'skip',
    description: 'skip the currently playing song',
    options: [
        {
            type: 10,
            name: 'song',
            description: "Queued song to skip e.g '2' will skip the second song in queue"
        }
    ],
    async execute(interaction, Flutterbot) {
        const queue = await Flutterbot.DisTube.getQueue(interaction);
        if(!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);
        const q = queue.songs.map((song, i) => `skipping ${song.name} - \`${song.formattedDuration}\``).join('\n');
       
        
                try
                {
                    //if the queue only has one song, this will throw an err. That's what we want baby
                    await Flutterbot.DisTube.skip(interaction)
                    return interaction.reply(`skipping! ${queue.songs[0].name}`);
                }
                catch(err)
                {
                Flutterbot.log('yellow underscore', 'Warn: skip.js() 25')
                Flutterbot.log(`${err}`);
                interaction.reply(`skipping! ${queue.songs[0].name}`);//since it's the last song in the queue, not really important. Can just recreate a new queue when called. Illusion of good design.
               return Flutterbot.DisTube.stop(interaction); 
                //give the user the same message on the front, while behind the scenes the "There is no up next song" error emitted by distube is handled by simply destroying the stream
              
                }

    }
}
