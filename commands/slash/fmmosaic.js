const { ApplicationCommandOptionType } = require("discord.js");

async function fetchRecentAlbums(username) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecentalbums&user=${username}&api_key=${LASTFM_API_KEY}&format=json&limit=9`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const albums = data.recentalbums.album;
      return albums;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  async function createMosaic(albums) {
    const canvas = canvas.createCanvas(600, 600);
    const ctx = canvas.getContext('2d');
  
    for (let i = 0; i < albums.length; i++) {
      const album = albums[i];
      const image = await Canvas.loadImage(album.image[2]['#text']);
      const x = (i % 3) * 200;
      const y = Math.floor(i / 3) * 200;
      ctx.drawImage(image, x, y, 200, 200);
    }
  
    return canvas;
  }

  module.exports = 
  { name: "fmrecent",
   description: "get your last played track",
   options: [
    {
        type: ApplicationCommandOptionType.String,
        name: "username",
        description: "your last.fm username",
        required: true
    }],
    async execute(Flutterbot, interaction)
    {
        const fm_username = interaction.options.getString('username'); 
        const albums = fetchRecentAlbums(username); 
        const mosaic = createMosaic(albums);
    }
  };