module.exports = {
    name: 'resume',
    description: 'resume a paused song',
    helpText: `Resume the paused music or video \n Use: **/resume**`,
    async execute(Discord, client, interaction) {
        const queue = await client.DisTube.getQueue(interaction);

        queue.resume(interaction);
        interaction.reply('Resuming!');
    }
}