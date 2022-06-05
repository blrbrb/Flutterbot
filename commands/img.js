
const request = require('request'); 
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
require('dotenv').config();  

module.exports = {
name: 'img',
description: 'sends a random image corresponding to a google image search',
    execute(client, message, args)
    {
      console.log('correct module'); 
    	
  let splitWord = message.toString().split(" ");
  let searchWrd = "";
  let googKey = process.env.GOOGLEAPI; 
  let cxKey = "46019e35da5554f43";
  
  for (var i = 1; i < splitWord.length; i++) {https://cse.google.com/cse?cx=46019e35da5554f43#gsc.tab=1&gsc.q=
    if (i > 1) {
      searchWrd = searchWrd + " ";
    }

    searchWrd = searchWrd + splitWord[i];
  }


        let page = 1; 
  request(
      "https://www.googleapis.com/customsearch/v1?key=" +
      googKey +
      "&cx=" +
      cxKey +
      "&q=" +
      searchWrd +
      "&amp;searchType=image&amp&amp;alt=json",

    function(err, res, body) {
      let data;
	
      try {
        data = JSON.parse(body);
      } catch (error) {
          console.log(error);
          console.log('you are doing it wrong dum dum'); 
        return;
      }
       // console.log(request); 
      if (!data) {
        console.log(data);
        message.channel.send("Error:\n" + JSON.stringify(data));
        return;
      } else if (!data.items || data.items.length == 0) {
        console.log(data);
        message.channel.send("No result for '" + args + "'");
        return;
      }
      // Get random number
      let ranNum = Math.floor(Math.random() * data.items.length);
      let randResult = data.items[ranNum];
        const embed = new MessageEmbed().setTitle(randResult.title).setImage(randResult.link).setColor(0xfbfb2b) 
      message.channel.send(embed);
      const collector = new Discord.MessageCollector(
        message.channel,
        m => m.author.id === message.author.id,
        { time: 100000000 }
      );
      console.log(collector);
      collector.on("collect", message => {
        if (message.content == "next") {
          let ranNum = Math.floor(Math.random() * data.items.length);
          let randResult = data.items[ranNum];
            const embed = new MessageEmbed().setTitle(randResult.title).setImage(randResult.link).setColor(0xfbfb2b)
          message.channel.send({ embed });
        } else if (message.content == "quit") {
          collector.stop();
          message.channel.send("Stopping your search");
        }
      });
    }
  );
  
  
  
  

  
    }}
