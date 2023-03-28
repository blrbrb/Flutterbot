
const { EmbedBuilder, Embed } = require('discord.js');
const fs = require('fs');


const filePath = './assets/scores.json';
//Please for the love of god, do not take this seriously.
module.exports = {
    name: 'score',
    description: `Get someone's score!`,
    options: 
    [
        {
            name: 'user', 
            type: 6, 
            description: 'the user to get a score for',
            required: true
        }
    ],
  async execute(Discord, client, interaction) {
    let score = 0; 
    const user = interaction.options.getUser('user'); 
    const username = user.username; 
    const userId = user.id; 
   
    //get the score data from "db" (it's just a file in the assets dir)
    const userScores = await JSON.parse(fs.readFileSync(filePath)); 
    
    //get wether or not the message should be displayed privatley 
    const private = interaction.options.getBoolean('onlyMe'); 

    const links = ["https://media.tenor.com/hxrYSGggNKYAAAAC/husk.gif","https://www.pinclipart.com/picdir/middle/10-109603_red-sad-smiley-face-clipart.png","https://cdn1.iconfinder.com/data/icons/faces-and-emotions/32/face_feeling_sad-512.png","https://www.vhv.rs/dpng/d/430-4305687_neutral-face-emoji-clipart-emotionless-clipart-hd-png.png", "https://freesvg.org/img/Arnoud999_Right_or_wrong_2.png"]



    if (userScores[userId]) {
      score = userScores[userId].score;  
      
    }

  

    try{ 


    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${user.username}'s Score`)
      .setDescription(`Score: ${score}`);   

      //dumb funny haha emoji logic depending on how "good" or "poor" you score
      if(score <= 0)
      {
        embed.setThumbnail(links[3]); 

        if(score < 0)
        {
          embed.setThumbnail(links[2]);

          if(score < -100)
          {
            embed.setThumbnail(links[1]);
            if(score < -500)
            {
              embed.setThumbnail(links[0]);
            }
          }
        }
      }

      if(score >= 0)
      {
        embed.setThumbnail(links[4]);

      }
     

    
     return interaction.reply({ embeds: [embed],ephemeral: true}); 
    } 
    catch(error)
    {
        console.log(error);
    }
  },
};