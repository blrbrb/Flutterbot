module.exports = {
    name: 'pause',
    description: 'pause the currently playing song',
    helpText: `Pause the currently playing music or video \n Use: **/pause**`,
    async execute(client, interaction) {
        const queue = await client.DisTube.getQueue(interaction);

        if(!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);

        queue.pause(interaction);
        return interaction.reply('Paused!');
    }
}