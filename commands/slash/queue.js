
module.exports =
{   name: 'queue',
    description: 'display the queue of currently playing songs',
    async execute(Discord, client, interaction, debug)
    {

       
    const queue2 = await client.DisTube.getQueue(interaction);
    if(queue2.songs.length < 1) return interaction.reply(`There are no songs in queue 😔`);    


      const q = queue2.songs.map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n')

      interaction.reply(`**Queue**\n${q}`);
    }
}
	