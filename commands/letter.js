const fs = require('fs');
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
require('dotenv').config();


module.exports = {
    name: 'letter',
    description: 'get',
    execute(client, message, args) {

       let rawdata = fs.readFileSync('assets/season1.json');
        var episode_data = JSON.parse(rawdata);
 

        //Parse Multi-Dimensional JSON episode data 
        let index1 = Math.floor(Math.random() * episode_data.length);
        let index2 = Math.floor(Math.random() * episode_data[index1].length);
        
    
        let randResult = episode_data[index1][index2];
      
        message.channel.send(randResult2.text);


    }
}