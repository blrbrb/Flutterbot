const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "rip",
    description: "RIP",
    options: [
        {
            name: "user",
            description: "who got sunsetted ",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    async execute(interaction, client) {
        const Member = interaction.options.getUser('user');

        const Embed = new EmbedBuilder()
            .setColor(0xfbfb2b)
            .setTitle("Rest In Peace")
            .setImage(encodeURI
                (`https://api.devs-hub.xyz/rip?image=${Member.displayAvatarURL({ format: "png" })}`))
            .setTimestamp();

        return await interaction.reply({ embeds: [Embed] });
    }
};