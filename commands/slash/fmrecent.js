const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');


module.exports = {
    name: "fmrecent",
    description: "get your last played track",
    options: [
      {
          type: ApplicationCommandOptionType.String,
          name: "username",
          description: "your last.fm username",
          required: true
      }
  ],
    async execute(interaction, Flutterbot) {
    try { 
      const username = interaction.options.getString('username'); 
      const response = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${process.env.FM_KEY}&format=json&limit=3`
      );
      
      if (response.data.recenttracks.track.length === 0) {
        return interaction.reply('No recent scrobbles found for the specified user.');
      }
      const mostRecent = response.data.recenttracks.track[0];
      const tracks = response.data.recenttracks.track; 
      
      //fetch the guild's default embed color, if the guild has one defined 
      let color = Flutterbot.DB.getGuildConfig(interaction, 'embed_color');

      const embed = new EmbedBuilder()
      .setTitle(`${mostRecent.name}`) 
      .setAuthor({'name':`${username}'s most recent scrobbles`})
      .setURL(mostRecent.url)

      if(!mostRecent.image[2]['#text'] == '')
      {
        
        embed.setThumbnail(mostRecent.image[2]['#text']) 
      }
      if(mostRecent.hasOwnProperty('date'))
      {
        embed.setTimestamp(parseInt(mostRecent.date.utsc));
      }
      if(color)
      {
        embed.setColor(color); 
      }

      embed.setDescription(`**${mostRecent.artist['#text']}** - *${mostRecent.name}* \n other recently played tracks include...`)
    
    var index = 1; 
    //slice to make sure the the most recent track at [0] isn't shown twice
    tracks.slice(1).forEach(track => {
      
      //we don't want to show the album title if the song title is the album title. 
      //if the album data is empty, say "None"
      let album = `**Album**: ${track.album['#text'] !== '' && track.name !== track.album['#text'] ?  track.album['#text'] : 'None'}` 
    
      embed.addFields({'name': `\`${index++}. ${track.artist['#text']}\``, 'value': `*${track.name}* \n ${album}`, 'inline': false})


     });

      interaction.reply(
        {embeds:[embed]}
      );
    } catch (error) {
    
      await interaction.reply(error.response.data.message);
    
    }
  }
}