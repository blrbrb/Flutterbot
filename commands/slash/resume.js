const {commandResponses, errorMessage} = require('../../lang/en.js'); 
const {EmbedBuilder} = require('discord.js'); 
module.exports = {
    name: 'resume',
    description: 'resume a paused song',
    helpText: `Resume the paused music or video \n Use: **/resume**`,
    async execute(interaction, Flutterbot) {
        const queue = await Flutterbot.DisTube.getQueue(interaction);
        const embed = new EmbedBuilder(); 
       
        if(!queue) return interaction.reply(errorMessage.Distube.QueueEmpty());

        if(!queue.paused) return interaction.reply("the queue isn't paused!"); 
       
        embed.setAuthor({name:'Flutterbot.music',iconURL: Flutterbot.user.displayAvatarURL()})
        embed.setDescription(commandResponses.Distube.resume(queue).content) 
        queue.resume();
        return interaction.reply({embeds:[embed]});
    }
}