const { formatTime } = require('../../utils/utilities.js')
const { EmbedBuilder } = require('discord.js');  
const {errorMessage, commandResponses} = require('../../lang/en.js');
const { error } = require('console');



module.exports = {
    name: 'stats',
    description: 'this is just for fun.',
    async execute(interaction, Flutterbot)
    {
        let stats = await Flutterbot.db.query(`SELECT * FROM PONY_EXP WHERE id=${interaction.user.id}`);
       // let color = await Flutterbot.db.query(`SELECT embed_color FROM GUILDS WHERE guild_id=${interaction.guild.id}`);
       // if(!color) 
            color = `ffffff`;

        if(!stats[0])
        {
            return interaction.reply({content:"it looks like you haven't earned any exp in this server yet, check back later.",ephemeral:true})
        }



        const embed = new EmbedBuilder().setAuthor({name:`Stats for ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
        .addFields({name: 'messages', value: `${stats[0].msg}`})
        .setDescription(`you are currently level **${stats[0].level}**, with ** \ ${stats[0].experience}/${stats[0].required} \ ** exp to reach the next level \n All-Time Stats:`)
        
        if(stats[0].hasOwnProperty('reacts'))
        {
            embed.addFields({name:'*reactions*', value:`Given: ${stats[0].reacts.given} Received: ${stats[0].reacts.received}`});
        }
        
        if(stats[0].hasOwnProperty('cmds'))
        {
            embed.addFields({name: `*commands*`, value:`${stats[0].cmds}`})
        }
        embed.addFields({name: 'note from Flutterbot:', value: `Your score, or level will never affect your access to basic features of discord.
        Remember that your worth is incalculable (obviously) because you are a beautiful living human being. Regardless of how many, or how few digital fun points a robot says you have. (numbers are updated every thirty seconds, to save computing power)`});
        if(color)
        {
         embed.setColor(color); 
        }
        
        interaction.reply({embeds:[embed], ephemeral:true})
              
    }
}