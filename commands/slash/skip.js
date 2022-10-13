

module.exports =
{
    name: 'skip',
    description: 'skip the currently playing song',
    async execute(Discord, client, interaction, debug)
    {
        var skipped_song = " "; 
      //  console.log(interaction);
        const queue = await client.DisTube.getQueue(interaction.member);
        const q = queue.songs.map((song, i) => `skipping ${song.name} - \`${song.formattedDuration}\``).join('\n');
 // interaction.reply('skipping the currently queued song!'); 
        if (queue.songs.length >= 1) {
            
            skipped_song = queue.songs.song;
            interaction.reply(`${q}`);
            await client.DisTube.stop(interaction.member);
        }
        else
        {
            interaction.reply(`${q}`);
           await client.DisTube.skip(interaction.member);
        }

      
      

    }
}