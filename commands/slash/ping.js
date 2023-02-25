//use interaction.channel.send to send a message to a text channel without replying to an interaction. 

module.exports = {
    name: 'ping',
    description: "testbed",
    async execute(Discord, client, interaction, debug) {
        const greeting = 'Hi! Im Fluttershy :sparkling_heart: ';
        interaction.reply({ content: greeting });
    }
}