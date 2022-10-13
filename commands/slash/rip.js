const Color = "RANDOM";
const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "rip",
  description: "RIP",
  options: [
        {
            type: 6,
            name: "user",
            description: "who got sunsetted ",
            required: true
        }
    ],
  async execute(Discord, client, interaction, debug) {

      const Member = interaction.options.getUser('user');

      const Embed = new EmbedBuilder()
     .setColor(0xfbfb2b)
    .setTitle("Rest In Peace")
    .setImage(encodeURI
    (`https://api.devs-hub.xyz/rip?image=${Member.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();

      return interaction.reply({ embeds: [Embed] });
  }
};
