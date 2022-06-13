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
        
 	
	
        //Parse Multi-Dimensional JSON episode data 
        let index1 = Math.floor(Math.random() * episode_data.length);
        
              
        let index2 = Math.floor(Math.random() * episode_data[index1].length);
        // console.log(episode_data[index1]); 
        // console.log(episode_data[index1][index2]);  
        
        
          
        for(var i = 0; i < episode_data[index1].length; i++) 
       {
       	
        	console.log(episode_data[index1][i].speaker); 
        	for(var j = 0; j < episode_data[index1][index2].length; j++) 
        	{ 
        		//console.log(episode_data[index1][index2].speaker); 
        		
        	}
        	
        	speaker_images.set(episode_data[index1][i].speaker, episode_data[index1][i].speaker);  
        	speakers.push(episode_data[index1][i].speaker); 
        	
        	//console.log(speaker_images); 
        	//console.log(removeDuplicates(speakers).flat());  
        	
       }
        

    
        let randResult = episode_data[index1][index2]; 
      //configure the embed with the details parsed from the data  
        const embed = new MessageEmbed().setTitle(randResult.speaker).setDescription(randResult.text).setColor(0xfbfb2b);
        message.channel.send(embed);    
    


    }
}

function matchimage(name) 
{
	
		
}

function removeDuplicates(arr) {
        arr = arr.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
  .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
  .reverse().map(JSON.parse) // revert it to original state        
  
  return arr; } 
       


