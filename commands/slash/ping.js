module.exports = {
    name: 'ping',
    description: "testbed",
    helpText: `Ping me to see wether or not I am working at the moment~! \n Use: **/ping**`,
    async execute(interaction, client) {
        const greeting = 'Hi! Im Fluttershy :sparkling_heart: ';
        return interaction.reply({ content: greeting });
    }
}