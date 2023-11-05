const {commandResponses, errorMessage} = require('../../lang/en.js'); 

const {EmbedBuilder, Interaction, CommandInteraction} = require('discord.js');
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
        let GuildIDResolvable;
        if(interaction instanceof CommandInteraction)
           GuildIDResolvable = interaction; 
        else 
            GuildIDResolvable = interaction.message; 

        const queue = await Flutterbot.DisTube.getQueue(GuildIDResolvable);
        const embed = new EmbedBuilder(); 
        embed.setAuthor({name:'Flutterbot.music',iconURL: Flutterbot.user.displayAvatarURL()})

        if(!queue) return GuildIDResolvable.reply(errorMessage.Distube.QueueEmpty());
        
        if(queue.paused)
        {
            return GuildIDResolvable.reply(errorMessage.Distube.AlreadyPaused())
        } 
      
        queue.pause(GuildIDResolvable); 
        embed.setDescription(commandResponses.pause(queue).content)
        
        return GuildIDResolvable.reply({embeds:[embed], ephemeral:true});
    }
}