module.exports = {
    name: 'resume',
    description: 'resume a paused song',
    helpText: `Resume the paused music or video \n Use: **/resume**`,
    async execute(Discord, client, interaction) {
        const queue = await client.DisTube.getQueue(interaction);
        if(!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);
        
        queue.resume(interaction);
        interaction.reply('Resuming!');
    }
}