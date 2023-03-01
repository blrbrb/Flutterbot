module.exports = {
    name: 'pause',
    description: 'pause the currently playing song',
    helpText: `Pause the currently playing music or video \n Use: **/pause**`,
    async execute(Discord, client, interaction) {
        const queue = await client.DisTube.getQueue(interaction);

        queue.pause(interaction);
        interaction.reply('Paused!');
    }
}