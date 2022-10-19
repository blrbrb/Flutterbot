

module.exports =
{   name: 'skip',
    description: 'skip the currently playing song',
    async execute(Discord, client, interaction, debug)
    {
                                    
        const queue = await client.DisTube.getQueue(interaction);
        const q = queue.songs.map((song, i) => `skipping ${song.name} - \`${song.formattedDuration}\``).join('\n');
 
        if (queue.songs.length >= 1) {
            
            skipped_song = queue.songs.song;
            interaction.reply(`${q}`);
            await client.DisTube.stop(interaction);
        }
        else
        {
            interaction.reply(`${q}`);
           await client.DisTube.skip(interaction);
        }

      
      

    }
}