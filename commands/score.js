
const { EmbedBuilder, Embed } = require('discord.js');
const fs = require('fs');


const filePath = './assets/scores.json';

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
    //getting unavailble guild error when sent through string formatting f
    const username = user.username; 
    const userId = user.id; 
    console.log('working');
    const userScores = await JSON.parse(fs.readFileSync(filePath));

  
    if (userScores[userId]) {
      score = userScores[userId].score;  
      
    }

    console.log(score);

    try{
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${user.username}'s Score`)
      .setDescription(`Score: ${score}`);

     return interaction.reply({ embeds: [embed] }); 
    } 
    catch(error)
    {
        console.log(error);
    }
  },
};