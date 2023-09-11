const {commandResponses, errorMessage} = require('../../lang/en.js'); 

module.exports = {
    name: 'resume',
    description: 'resume a paused song',
    helpText: `Resume the paused music or video \n Use: **/resume**`,
    async execute(interaction, Flutterbot) {
        const queue = await Flutterbot.DisTube.getQueue(interaction);
        const song = queue.songs[0]; 
        if(!queue) return interaction.reply({content:errorMessage.Distube.noQueue(), ephemeral: true});
        if(!queue.paused) return interaction.reply("the queue isn't paused!"); 
        interaction.reply({content: commandResponses.resume(queue)});
        queue.resume();
    }
}