const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "boop",
  description: "boop somepony!", 
  admin: false,
  run: async (client, message, command, args, prefix) => {

    if (args[0]==null || args[0]=="") return message.channel.send('uhhhhm. please sepecify an argument for booping'); 


   // author = message.member.nickname || message.member.user.username;

    var onSelf = false;
    var onFluttershy = false;

    if (message.mentions.members.first()) {
      if (message.mentions.members.first().user.id == message.author.id) onSelf = true;
      if (message.mentions.members.first().user.id == client.user.id) onChrysalis = true;
      if (message.mentions.members.first().nickname)
      targetUser = message.mentions.members.first().nickname
      else targetUser = message.mentions.members.first().user.username
    }
    else if (message.mentions.users.first()) targetUser = message.mentions.users.first().username;
    else if (args[0].startsWith("<@!")) {
      try {
        targetUser = await client.users.fetch(args[0].substring(3,args[0].length-1));
        if (targetUser.id == client.user.id) onChrysalis = true;
        targetUser = targetUser.username;
      } catch (e) {
        targetUser = args[0];
      }
    } else if (args[0].startsWith("<@")) {
      try {
        targetUser = await client.users.fetch(args[0].substring(2,args[0].length-1));
        if (targetUser.id == client.user.id) onChrysalis = true;
        targetUser = targetUser.username;
      } catch (e) {
        targetUser = args[0];
      }
    } else {
      try {
        targetUser = await client.users.fetch(args[0]);
        if (targetUser.id == client.user.id) onChrysalis = true;
        targetUser = targetUser.username;
      } catch (e) {
        targetUser = args.toString().split(',').join(' ');
      }
    }
    if (targetUser == '@everyone' || targetUser == '@here') targetUser = 'everypony';

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

    const embed = new MessageEmbed();

      if (onSelf)
      {  embed.setTitle('boop!')
          .setImage("https://cdn.discordapp.com/attachments/862296245922037800/862297045339602984/cd0.gif");
          
      }
    
      else if (onFluttershy)
      { embed.setTitle('boop!')
          .setImage("https://media.discordapp.net/attachments/862296245922037800/862297091980001301/boop.gif.065a0274d6c444d7496d388adbe7e58a.gif");
          
      }
      
    else embed.setTitle('boop!')
    .setImage(gifs[Math.floor(Math.random() * gifs.length)]);
        message.channel.send(embed);

      if (message.author == null)
      {  message.editReply({embed});
         message.channel.send(embed);
      }

  }

}
