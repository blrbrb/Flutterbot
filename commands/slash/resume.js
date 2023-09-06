module.exports = {
    name: 'resume',
    description: 'resume a paused song',
    helpText: `Resume the paused music or video \n Use: **/resume**`,
    async execute(interaction, Flutterbot) {
        const queue = await Flutterbot.DisTube.getQueue(interaction);
        if(!queue) return interaction.reply({content:`But there is no queue! Use /play to search for songs`,   ephemeral: true});
        
        queue.resume(interaction);
        interaction.reply('Resuming!');
    }
}