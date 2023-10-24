const { ApplicationCommandOptionType, Interaction } = require("discord.js");
const {Flutterbot} = require('../../client/Flutterbot');
const {createCanvas, loadImage} = require('canvas');
const { fsClientError } = require("../../utils/types");

const axios = require('axios');
/**
     * @param {Interaction} interaction
     *
     */
async function fetchRecentAlbums(username) {
  

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${process.env.FM_KEY}&format=json&limit=9`;
  
    try {
      const response = await axios.get(url);
      const albums = response.data.topalbums.album.slice(0,9);
      console.log(albums[0].image);
      return albums;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

  module.exports = 
  { name: "fmmosaic",
   description: "get your last played track",
   options: [
    {
        type: ApplicationCommandOptionType.String,
        name: "username",
        description: "your last.fm username",
        required: true
    }],
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction,Flutterbot)
    {
        const fm_username = interaction.options.getString('username'); 
        const albums = await fetchRecentAlbums(fm_username); 
        interaction.deferReply('one moment please 💕...'); 
        const img = createCanvas(300, 300);
        
        const ctx = img.getContext('2d');
        const imageSize = 100; 
        for (let i = 0; i < albums.length; i++) {
          const imageUrl = albums[i].image[3]['#text'];
          if (imageUrl) {
            console.log('valid', imageUrl);
            const image = await loadImage(imageUrl);
             ctx.drawImage(image, (i % 3) * imageSize, Math.floor(i / 3) * imageSize, imageSize, imageSize);
          }
        }
        
        try{
              await interaction.editReply({files: [{ attachment: img.toBuffer('image/png'), name: 'collage.png' }]});
      } catch (error) {
        throw new fsClientError('unable to initalize image buffer as interaction callback', error);
        return; 
      }
    }
  };