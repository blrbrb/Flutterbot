module.exports = {
    name: 'seek',
    description: 'jump to a specific time ',
    options: [
        {
            type: 10,
            name: "minute",
            description: "the minute to skip to",
            required: true
        },
        {
            type: 10,
            name: "second",
            description: "the second to skip to",
            required: true
        }
    ],
    async execute(Discord, client, interaction) {
        const queue = await client.DisTube.getQueue(interaction);
        const song_time = queue.songs[0].formattedDuration;
        var minutes = interaction.options.getNumber('minute');
        var seconds = interaction.options.getNumber('second');
        const total_seconds = minutes * 60 + seconds;

        let result = new Date(total_seconds * 1000).toISOString().slice(14, 19);

        if(!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);
        else client.DisTube.seek(interaction, total_seconds);
        
        const skip = `skipping ${queue.songs[0].name} to \`${result} / ${queue.songs[0].formattedDuration}\``;
        return interaction.reply(skip);
    }
}