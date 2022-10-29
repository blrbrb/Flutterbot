

module.exports =
{   name: 'skip',
    description: 'skip the currently playing song',
    options: [
        {
            type: 10,
            name: 'song',
            description: "Queued song to skip e.g '2' will skip the second song in queue"
        }

    ],
    async execute(Discord, client, interaction, debug)
    {
                                    
        const queue = await client.DisTube.getQueue(interaction);
        const q = queue.songs.map((song, i) => `skipping ${song.name} - \`${song.formattedDuration}\``).join('\n');

        let selection;


        if (!queue.autoplay && queue.songs.length <= 1) {
            
            skipped_song = queue.songs.song;
            interaction.reply(`There aren't any more songs in the queue! I'll tell my birdies to stop singing`);
            interaction.reply(`stopping`);
           client.DisTube.stop(interaction);
        }
        else
        {
           
}
            interaction.reply('skipping!'); 
            if (interaction.options.getNumber('song'))
            {
                selection = interaction.options.getNumber('song');
                queue.songs.splice(selection, 1); 
            }
            else 

           client.DisTube.skip(interaction);
        }

      
      

  }
