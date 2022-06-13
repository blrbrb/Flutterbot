const fs = require('fs');
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js'); 
const request = require('request'); 
const cheerio = require('cheerio'); 
require('dotenv').config();


module.exports = {
    name: 'letter',
    description: 'get',
  async execute(client, message, args) {
     //TO DO: Find a way to fetch corresponding images for each pony speaking. 
//var speaker_images = {"https://www.deviantart.com/90sigma/art/Twilight-Sparkle-Smiling-529253790", "http://fc01.deviantart.net/fs70/i/2011/260/d/9/applejack_vector_by_hombre0-d4a3lwt.png" }
       let rawdata = fs.readFileSync('assets/season1.json'); 
       
      var speaker_images = new Map(); 
	  var speakers = new Array(); 
       
       
      // speaker_images.set("Twilight Sparkle", "https://www.deviantart.com/90sigma/art/Twilight-Sparkle-Smiling-529253790"); 
       speaker_images.set('Applejack', "http://fc01.deviantart.net/fs70/i/2011/260/d/9/applejack_vector_by_hombre0-d4a3lwt.png");
       //speaker_images.set(
       
        var episode_data = JSON.parse(rawdata); 
        
 var seasons = ["season1", "season2", "season3", "season4", "season5", "season6"]; 
 
     // console.log(episode_data.mlp[12]);
        //Parse Multi-Dimensional JSON episode data 
    let seasonrand = seasons[Math.floor(Math.random() * seasons.length)];  
    let episoderand = Math.floor(Math.random() * episode_data.mlp[seasonrand].length); 
    let numrand =  Math.floor(Math.random() * episode_data.mlp[seasonrand][episoderand].length); 

 
      
      let randResult = episode_data.mlp[seasonrand][episoderand][numrand]; 
      //configure the embed with the details parsed from the data  
      		if(randResult.song == true) 
      			const embed = new MessageEmbed().setTitle(randResult.speaker).setDescription('*'+ randResult.text +'*').setColor(0xfbfb2b); 
      	else 
       const embed = new MessageEmbed().setTitle(randResult.speaker).setDescription(randResult.text).setColor(0xfbfb2b);
       message.channel.send(embed);    
    


    }
}





