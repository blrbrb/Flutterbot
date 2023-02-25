module.exports = {
    name: 'pause',
    description: 'pause the currently playing song',
    async execute(Discord, client, interaction, debug) {
        const queue = await client.DisTube.getQueue(interaction);

        queue.pause(interaction);
        interaction.reply('Paused!');
    }
}