const {commandResponses, errorMessage} = require('../../lang/en.js'); 
const { formatTime } = require('../../utils/utilities.js');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'pause',
    description: 'pause the currently playing song',
    helpText: `Pause the currently playing music or video \n Use: **/pause**`,
    async execute(interaction, Flutterbot) {
        const queue = await Flutterbot.DisTube.getQueue(interaction);
        const embed = new EmbedBuilder(); 
        embed.setAuthor({name:'Flutterbot.music',iconURL: Flutterbot.user.displayAvatarURL()})

        if(!queue) return interaction.reply(errorMessage.Distube.QueueEmpty());
        
        if(queue.paused)
        {
            return interaction.reply(errorMessage.Distube.AlreadyPaused())
        } 
      
        queue.pause(interaction); 
        embed.setDescription(commandResponses.pause(queue).content)
        
        return interaction.reply({embeds:[embed], ephemeral:true});
    }
}