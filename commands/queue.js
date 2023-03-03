module.exports = {
    name: 'queue',
    description: 'display the queue of currently playing songs',
    helpText: `View all of the currently queued songs and videos \n Use: **/queue**`,
    async execute(Discord, client, interaction) {
        let queue2 = await client.DisTube.getQueue(interaction);
        if (!queue2 || queue2.songs.length < 1) return interaction.reply(`There are no songs in queue 😔`);

        let q = queue2.songs.map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n');

        interaction.reply(`**Queue**\n${q}`);
    }
}