const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'serverquote',
    description: "Forever enshrine somepony's words in the hall of fame",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            description: "something said",
            name: "quote",
            required: true
        },
        {
            type: ApplicationCommandOptionType.User, 
            description: "who said it", 
            name: "~", 
            required: true
        }
    ],
    async execute(interaction, client)
    {
        let quoted_text = interaction.options.get('quote');
        // "-" to appear like a "quote"
        let speaker = interaction.options.get('~').user

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');

        let data = {"name": speaker.username, "date":`${year}\`${month}\`${day}`, "quote": quoted_text}

        client.db.addEntry(`${interaction.guild.id}.server_quotes`,data)
        client.db.
        let embed = new EmbedBuilder()
            .setTitle(`${speaker.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(`*${quoted_text}*`);

        interaction.reply({ embeds: [embed] });
    },

}