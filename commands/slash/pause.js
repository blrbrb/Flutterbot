const {commandResponses, errorMessage} = require('../../lang/en.js'); 

const {EmbedBuilder, Interaction} = require('discord.js');
const {Flutterbot} = require('../../client/Flutterbot');
module.exports = {
    name: 'pause',
    description: 'pause the currently playing song',
    helpText: `Pause the currently playing music or video \n Use: **/pause**`,
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
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