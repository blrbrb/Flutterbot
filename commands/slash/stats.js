const { formatTime } = require('../../utils/utilities.js')
const { EmbedBuilder } = require('discord.js');  
const {errorMessage, commandResponses} = require('../../lang/en.js');
const { error } = require('console');



module.exports = {
    name: 'stats',
    description: 'this is just for fun.',
    async execute(interaction, Flutterbot)
    {
        let stats = Flutterbot.db.getValue(`${interaction.user.id}`); 
        let color = Flutterbot.db.getGuildConfig(interaction, 'embed_color');

        if(!stats)
        {
            return interaction.reply({content:"it looks like you haven't earned any exp in this server yet, check back later.",ephemeral:true})
        }

        console.log(stats); 

        const embed = new EmbedBuilder().setAuthor({name:`Stats for ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
        .addFields({name: 'messages', value: `${stats.msg}`})
        .setDescription(`you are currently level **${stats.level}**, with ** \ ${stats.exp}/${stats.required} \ ** exp to reach the next level \n All-Time Stats:`)

        if(stats.hasOwnProperty('reacts'))
        {
            embed.addFields({name:'reactions', value:`${stats.reacts}`});
        }
        embed.addFields({name: 'note from Flutterbot:', value: `Your score, or level will never affect your access to basic features of discord.
        Remember that your worth is incalculable (obviously) because you are a beautiful living human being. Regardless of how many, or how few digital fun points a robot says you have.`});
        if(color)
        {
         embed.setColor(color); 
        }
        
        interaction.reply({embeds:[embed], ephemeral:true})
              
    }
}