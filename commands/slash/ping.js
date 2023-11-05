//use interaction.channel.send to send a message to a text channel without replying to an interaction. 
const {Flutterbot} = require('../../client/Flutterbot');
const {Interaction, CommandInteraction} = require('discord.js');
module.exports = {
    name: 'ping',
    description: "testbed",
    helpText: `Ping me to see wether or not I am working at the moment~! \n Use: **/ping**`,
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction, Flutterbot) {
        const greeting = 'Hi! Im Fluttershy :sparkling_heart: ';
        if(interaction instanceof CommandInteraction)
            return interaction.reply({ content: greeting });
        else 
            return interaction.message.reply({ content: greeting });
    }
}