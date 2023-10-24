const { EmbedBuilder, ApplicationCommandOptionType, Interaction} = require('discord.js');
const {Flutterbot} = require('../../client/Flutterbot');
const axios = require('axios');
const {createCanvas, loadImage} = require('canvas');
const { fsClientError } = require("../../utils/types");

async function fetchRecentAlbums(username) {
  

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${process.env.FM_KEY}&format=json&limit=9`;

  try {
    const response = await axios.get(url);
    const albums = response.data.topalbums.album.slice(0,9);

    return albums;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
    name: "fm",
    description: "get your last played track",
    options: [
      {
        type:ApplicationCommandOptionType.Subcommand, 
        name:"albums",
        description: "get a mosaic of your top albums",
        required: false,
        options:[
          {
            type: ApplicationCommandOptionType.String,
            name: "username",
            description: "your last.fm username",
            required: true
        }]
      },
      {
        type:ApplicationCommandOptionType.Subcommand, 
        name:"overview",
        description: "get an overview of your most recently scrobbled tracks and albums",
        required: false,
        options:[
          {
            type: ApplicationCommandOptionType.String,
            name: "username",
            description: "your last.fm username",
            required: true
        },
        ]
      }
  ],
  /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction, Flutterbot) {
     
      const subcommand = interaction.options.getSubcommand();
  
     
      switch (subcommand){

        case'albums':
        const fm_username = interaction.options.getString('username');
        const albums = await fetchRecentAlbums(fm_username); 
        await interaction.deferReply(); 
        const img = createCanvas(300, 300);
        
        const ctx = img.getContext('2d');
        const imageSize = 100; 
        console.log(albums);
        if(!albums)
          return interaction.editReply('user does not exist');

        for (let i = 0; i < albums.length; i++) {
          const imageUrl = albums[i].image[3]['#text'];
          if (imageUrl) {
            const image = await loadImage(imageUrl);
             ctx.drawImage(image, (i % 3) * imageSize, Math.floor(i / 3) * imageSize, imageSize, imageSize);
          }
        }
        
        try{
              await interaction.editReply({files: [{ attachment: img.toBuffer('image/png'), name: 'collage.png' }]});
              break;
      } catch (error) {
        throw new fsClientError('unable to initalize image buffer as interaction callback', error);

      }
      
        case "overview": 
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
    
          interaction.editReply(
            {embeds:[embed]}
          );
          break;
        } catch (error) {
          return interaction.editReply(error.response.data.message);
          
        }
        default: 
          return interaction.reply('there was an issue');
         
      }
      }

    }
   
