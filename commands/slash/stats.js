const { formatTime } = require('../../utils/utilities.js')
const { EmbedBuilder } = require('discord.js');  
const {errorMessage, commandResponses} = require('../../lang/en.js');
const { error } = require('console');



module.exports = {
    name: 'stats',
    description: 'this is just for fun.',
    async execute(interaction, Flutterbot)
    {
        stats = Flutterbot.db.getValue(`${interaction.user.id}`); 
        let color = Flutterbot.db.getGuildConfig(interaction, 'embed_color');
        console.log(stats); 

        const embed = new EmbedBuilder().setAuthor({name:`Stats for ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
        .addFields({name: 'all-time message count', value: `${stats.msg}`},
        {name: 'more stuff', value: `coming soon as long as it's not intrusvie or creepy. also im hungry and tired`}).setDescription(`you are currently level **${stats.level}**, with ** \ ${stats.exp}/${stats.required} \ ** exp to reach the next level`)

        if(color)
        {
         embed.setColor(color); 
        }
        
        interaction.reply({embeds:[embed], ephemeral:true})
              
    }
}