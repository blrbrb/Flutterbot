
const request = require('request'); 

require('dotenv').config();  

module.exports = {
name: 'img',
description: 'sends a random image corresponding to a google image search',
    async execute(client, message, args)
    {
      console.log('correct module'); 
    	
  let splitWord = message.toString().split(" ");
  let searchWrd = "";
  let googKey = process.env.GOOGLEAPI; 
  let cxKey = "46019e35da5554f43";
  
  for (var i = 1; i < splitWord.length; i++) {
    if (i > 1) {
      searchWrd = searchWrd + " ";
    }

    searchWrd = searchWrd + splitWord[i];
  }

  
  request(
    "https://cse.google.com/cse?cx=46019e35da5554f43#gsc.tab=1&gsc.q=" + "searchWrd",
    function(err, res, body) {
      let data;
	console.log(request);
      try {
        data = JSON.parse(body);
      } catch (error) {
        console.log(error);
        return;
      }

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
      const embed = {
        title: "You searched for: " + searchWrd,
        description: randResult.title,
        color: 10680479,
        image: {
          url: randResult.link
        },
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL
        },
        footer: {
          icon_url: message.author.displayAvatarURL,
          text:
            "type next to get another image or quit to stop the image research"
        },
        fields: []
      };
      message.channel.send({ embed });
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
          const embed = {
            title: "You searched for: " + searchWrd,
            description: randResult.title,
            color: 10680479,
            image: {
              url: randResult.link
            },
            author: {
              name: message.author.tag,
              icon_url: message.author.displayAvatarURL
            },
            footer: {
              icon_url: message.author.displayAvatarURL,
              text:
                "here you go! :3"
            },
            fields: []
          };
          message.channel.send({ embed });
        } else if (message.content == "quit") {
          collector.stop();
          message.channel.send("Stopping your search");
        }
      });
    }
  );
  
  
  
  

  
    }}
