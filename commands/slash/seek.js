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
        const song = queue.songs[0];
        const song_time = queue.songs[0].formattedDuration;
        var minutes = interaction.options.getInteger('minute');
        var seconds = interaction.options.getInteger('second');
        const total_seconds = minutes * 60 + seconds;

        let result = new Date(total_seconds * 1000).toISOString().slice(14, 19);
        const embed = new EmbedBuilder();
        let color = Flutterbot.DB.getGuildConfig(interaction.guild,"embed_color");
        if(color)
        {
            embed.setColor(color);
        }
       
        embed.setAuthor({name:'Flutterbot.music | **Seekting To...**',iconURL: Flutterbot.user.displayAvatarURL()})
        .setDescription(`*__[${song.name}](${song.url})__* \`${result} / ${song.formattedDuration}\``)
        Flutterbot.DisTube.seek(interaction, total_seconds);
        
        //const skip = `**Starting playback of** *__${queue.songs[0].name}__* **at** \`${result} / ${queue.songs[0].formattedDuration}\``;
        return interaction.reply({embeds:[embed]});
    }
}