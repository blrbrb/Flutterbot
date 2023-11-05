const { EmbedBuilder,ComponentType, ActionRowBuilder,ButtonBuilder, ApplicationCommandOptionType, Interaction} = require('discord.js');
const {Flutterbot} = require('../../client/Flutterbot');
const axios = require('axios');
const {createCanvas, loadImage} = require('canvas');
const { fsClientError } = require("../../structures/types");

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

async function validateLastFMAccount(username) {
  try {
    const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getInfo&user=${username}&api_key=${process.env.FM_KEY}&format=json`);

    if (response.data.error) {
      return [false, 'Invalid username or Last.fm API error.'];
    } else {
      return [true, response.data];
    }
  } catch (error) {
    return [false, `Error: ${error.message}`];
  }
}

async function handleSyncRequest(collector, Flutterbot, interaction)
{

  collector.on('collect', async i => {

		args = i.customId.split('_');
    
		if(args[0]=== 'yes')
    {
      const name = args[1].split('/')[4];
      const info = await validateLastFMAccount(name); 
      const dat = info[1].user;
      Flutterbot.DB.set(i.user, "lastfm", Flutterbot.lockbox.encrypt(JSON.stringify(dat)));
      i.reply({content:`Okay, I'll associate you with this [last.fm account!](${dat.url})`, ephemeral:true});
    }	
    else if(args[0] === 'no')
    {
      i.reply({content:`got it! Make sure to spell your username 100% the same as it appears on your last.fm profile so I can find you easier!`, ephemeral:true});
    }
    
  });
  Flutterbot.collectors.delete(collector);
  return;
  
}
//interaction.reply({content:`Okay, I won't associate you with this account. Make sure you spell your username *EXACTLY* as it appears on your profile!`, ephemeral:true});


module.exports = {
    name: "fm",
    description: "get info from last.fm!",
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
      },
      {
        type:ApplicationCommandOptionType.Subcommand, 
        name:"syncme",
        description: "let me associate your discord username with your last.fm",
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

        case "syncme":
          const username = interaction.options.getString('username');
          const info = await validateLastFMAccount(username);

          const row = new ActionRowBuilder();
          
            row.addComponents(new ButtonBuilder()
              .setCustomId(`yes_${info[1].user.url}`)
              .setLabel('this is me')
              .setStyle('Primary')
            );
            row.addComponents(new ButtonBuilder()
            .setCustomId(`no_${info[1].user.url}`)
            .setLabel('this is NOT me')
            .setStyle('Danger'));

        
          const replyEmbed = new EmbedBuilder().setTitle(info[1].user.name).setThumbnail(info[1].user.image[3]['#text']).setURL(info[1].user.url).setDescription('*This feature is a testing preview, no scrobbling is supported yet!!* this account correct?')
         
          const reply = await interaction.reply({embeds:[replyEmbed], components:[row],ephemeral: true});
          Flutterbot.collectors.set(`fmIntegration${interaction.user.id}`, reply.createMessageComponentCollector({componentType: ComponentType.Button, time: 3_600_000  }));
          return; 
        
        default: 
          return interaction.reply('there was an issue');
         
      }
      },
      handleSyncRequest: handleSyncRequest
    }
   
