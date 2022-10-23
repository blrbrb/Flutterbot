//const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: "boop",
    description: "boop somepony!",
    options: [
    {
            name: "pony",
            description: "Somepony to boop",
            required: true,
            type: 6,

        }

    ],
    async execute(Discord, client, interaction, debug) {

     
        //if (args[0]==null || args[0]=="") return message.channel.send('uhhhhm. please sepecify an argument for booping'); 

        //var args = "shit"; 
        // author = interaction.member.nickname || interaction.member.user.username;

        var onSelf = false;
        var onFluttershy = false;
        console.log(interaction.options.pony); 
        var target_user = interaction.options.getUser('pony');
       
        const reply_string = `${interaction.user} booped ${target_user}`; 
        const gifs = [
            "https://cdn.discordapp.com/attachments/862296245922037800/862297017576718356/2bf.gif",
            "https://cdn.discordapp.com/attachments/862296245922037800/862297031712440320/8f6720fb8b277f120658fbceef9303b0.gif",
            "https://cdn.discordapp.com/attachments/862296245922037800/862297055162793995/AgileRectangularArizonaalligatorlizard-size_restricted.gif",
            "https://cdn.discordapp.com/attachments/862296245922037800/862297054977196052/2d4.gif",
            "https://cdn.discordapp.com/attachments/862296245922037800/862297060099620894/medium.gif",
            "https://cdn.discordapp.com/attachments/862296245922037800/862297077941665812/1537606__safe_screencap_bonbon_daisy_flowerwishes_lily_lilyvalley_rarity_roseluck_sweetiedrops_itisn.gif",
            "https://cdn.discordapp.com/attachments/862296245922037800/862297091980001301/boop.gif.065a0274d6c444d7496d388adbe7e58a.gif",
            "https://cdn.discordapp.com/attachments/862296245922037800/862297095889092608/boop.gif",
            "https://cdn.discordapp.com/attachments/862296245922037800/862297089329070080/uwuwuwu.gif"
        ];

  

        if (onSelf) {
           
            interaction.reply({ content: "https://cdn.discordapp.com/attachments/862296245922037800/862297045339602984/cd0.gif" });

        }

        else if (onFluttershy) {
            interaction.reply({ content: "https://media.discordapp.net/attachments/862296245922037800/862297091980001301/boop.gif.065a0274d6c444d7496d388adbe7e58a.gif" });

        }

        else
           
           await interaction.reply(`${interaction.user} booped ${target_user} \n ${gifs[Math.floor(Math.random() * gifs.length)]}`);
       
   
     

    }

}
