const { EmbedBuilder } = require('discord.js');
const {removeEveryoneMentions,format, langRand } = require('../../utils.js');
const {commandResponses} = require('../../lang/en.js')

module.exports = {
    name: 'scp-1576',
    description: 'send a message from beyond the afterlife',
    options: [  
    {
        type: 3,
        description: "your message...",
        name: "message",
        required: true
    }
    ],
   async execute(interaction, Flutterbot)
   {
        const target_channel = Flutterbot.client.channels.cache.get('1032402464940511343');
        const message_str = removeEveryoneMentions((langRand(commandResponses.scpMessage))); 
        const sacrificed_role = '1109587525720342548'; 
        


        //first of all, check if the user is alive. 
       
       // if(!interaction.member.roles.cache.has(sacrificed_role)) 
        //{

         //  return interaction.reply('but you are still alive... check #survivor');
       // }
       // else{
         
        const Embed = new EmbedBuilder().setTitle(`Message from afterlife entity`)
        .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
        .setDescription(`\`${interaction.options.getString('message')}\``)
        .setThumbnail('https://cdn.discordapp.com/attachments/368957683187056676/1135734604356128818/Screenshot_2023-07-31_030258.png'); 
        
         
        //send dialog before embed idk, it'd be funny
        await target_channel.send(message_str);
        await target_channel.send({embeds:[Embed]})
        //const send = await target_channel.send(message_str);
        

        return interaction.reply('your message has been passed on to the living'); 
        
       // }
   }
}