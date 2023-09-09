const { EmbedBuilder,  ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'jump to a specific time',
    options: [
        {
            type: ApplicationCommandOptionType.Integer,
            name: "minute",
            description: "the minute to skip to",
            required: true
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: "second",
            description: "the second to skip to",
            required: true
        }
    ],
    async execute(interaction, Flutterbot) {
        const queue = await Flutterbot.DisTube.getQueue(interaction);
        if(!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);

        const song_time = queue.songs[0].formattedDuration;
        var minutes = interaction.options.getNumber('minute');
        var seconds = interaction.options.getNumber('second');
        const total_seconds = minutes * 60 + seconds;

        let result = new Date(total_seconds * 1000).toISOString().slice(14, 19);

        
        Flutterbot.DisTube.seek(interaction, total_seconds);
        
        const skip = `skipping ${queue.songs[0].name} to \`${result} / ${queue.songs[0].formattedDuration}\``;
        return interaction.reply(skip);
    }
}