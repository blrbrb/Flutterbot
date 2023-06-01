//use interaction.channel.send to send a message to a text channel without replying to an interaction. 

module.exports = {
    name: 'ping',
    description: "testbed",
    helpText: `Ping me to see wether or not I am working at the moment~! \n Use: **/ping**`,
    async execute(Discord, client, interaction) {
        const greeting = 'Hi! Im Fluttershy :sparkling_heart: ';
        return interaction.reply({ content: greeting });
    }
}