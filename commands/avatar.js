
const { MessageEmbed } = require('discord.js');
const mention2id = require('../utils/mention2id.js');

module.exports = {
  name: 'avatar',
  alias: ['pfp'],
  run: async (client, message, command, args, lang) => {

    let taggedUser =  message.mentions.members.first(); 
     // taggedUser = await message.guild.members.fetch(taggedUser)
   // } catch (e) {
     // try {
       // taggedUser =  client.users.fetch(taggedUser);
     // } catch (e) {
       // if (message.author) return message.reply('couldn_t_find_that_user');
       // else return message.editReply({content:lang.couldn_t_find_that_user})
      //}
    //}
    
    console.log(taggedUser); 


    // If tagged user is Fluttershy, send profile picture artwork source
    const artwork = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/509981b1-f225-448b-8302-430a4b7a2fa5/d9n5zw7-39db36b5-fccd-47c7-85a7-9eb0ec79f9c4.png/v1/fill/w_1192,h_670,q_70,strp/fluttershy_sways_her_head_to_music_animated_vector_by_kot8nik_d9n5zw7-pre.jpg"
    if (taggedUser.id == client.user.id)
    if (message.author) return message.channel.send(artwork);
    else return message.editReply(artwork);

    let avatarembed = new MessageEmbed()
    .setTitle(taggedUser.user.displayName || taggedUser.user.username)
    .setImage(taggedUser.user.displayAvatarURL({format: 'png'}))
    .setColor((taggedUser.user.displayHexColor && taggedUser.user.displayHexColor != '#000000'))
    if (message.author) return message.channel.send(avatarembed);
    else return message.editReply({embeds:[avatarembed]});

  }
}
