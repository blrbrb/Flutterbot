
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const {youShouldLitterallyNeverSeeThis} = require('../lang/en.js');

class Evaluator
{
   constructor(db) {
    this.db = db; 
    this.urlRegex = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/g;
   // this.intel = this.loadIntel()
    
   }
   
   async validateAge(db, member)
   { 
      //console.log(client);
      let MinAge = await db.query(`SELECT joinage_days FROM GUILDS WHERE guild_id=${member.guild.id}`); 
      console.log(`evaluate.js 19: The Minumum required age for new accounts on this server is ${MinAge}`);
      
      if(!MinAge)
      {
         console.log('evaluage.js validateAge() no default new member age set in server config, using default of one month');
         const oneMonthAgo = new Date();
         oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
         
         return member.user.createdAt < oneMonthAgo;
      }
      else
      {
         const daysAgo = new Date(); 
         daysAgo.setDate(daysAgo.getDate() - MinAge);
         return member.user.createdAt < daysAgo; 
      }

   }
   async quaratine(client, member)
   {
    
      const list = this.db.query('SELECT id FROM QUARANTINED'); 
      console.log(list); 

      if(list.includes(member.id))
      {

      }

   }

   
   async onMessage(client, message)
   {
      if(this.positiveURL(client, message).match)
      {
         client.log(`This shit is for realsies bro. ${message.content}`)
      }
   }
   async updateIntelligence(db) {
      try {
        // Make an HTTP GET request to the webpage
        const response = await axios.get('https://urlhaus.abuse.ch/downloads/text/');
    
        // Load the HTML content of the webpage using cheerio
        const $ = cheerio.load(response.data);
    
         // Split the content into lines
       const lines = response.data.split('\n');

       // Create an empty array to store the links
        const links = [];

       // Iterate through each line and extract links
       lines.forEach((line) => {
    
      // Remove leading and trailing spaces
      const trimmedLine = line.trim();
      
      // Check if the line is not empty and doesn't start with '#' (comments)
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        links.push(trimmedLine);
      }
    });

    links.forEach(async(link)=>
    {
      await db.query(`INSERT INTO THREATS(url) VALUES("${link}")`);
    });
        // Save the links to a JSON file
        const jsonData = JSON.stringify(links, null, 2); 
        //save it as a class variable for convenience
        
        fs.writeFileSync('assets/intelligence.json', jsonData);
    
        console.log('Links have been saved to links.json');
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    loadfromFile(file, db)
    {
      //load custom phishing link / malware definitions from a local json file 
      const raw = fs.readFileSync(file);
      const data =  JSON.parse(raw);   
      let links = data['domains'];    
      links.forEach((link)=>{
         db.query(`INSERT INTO THREATS(url) VALUES("${link}")`);
      });
      
      return data; 
    }
    
   async positiveURL(client, message)
    {
      const contentUrls = message.content.match(this.urlRegex);
       if (contentUrls) {
         
         console.log('Message contains URLs in content this is astronomically likely to be normal:', contentUrls);
         
         if(this.intel.includes(contentUrls[0]))
         {
            //ruh-roh raggey, we gotta racker 
            
            console.log('oh shit');
            //Delete the msg, better safe than sorry with these odds
            await message.delete()
            .then(() => {
               message.channel.send({embeds:[youShouldLitterallyNeverSeeThis.dearGodItsReal(client)]});
            
            });
            return {match: true, urls: contentUrls}; 


         }
         else
            return {match:false, urls: undefined};
         
                                 
       }
       else 
         return {match:false, urls: undefined};

    }

    async onGuildMemberJoin(db, guild, member)
    {
       if(await this.validateAge(member))
         {
            console.log('they good'); 
         }
         else 
         {
            await db.query(`INSERT INTO QUARANTINED(id, guild_id) VALUES (${member.id}, ${guild.id})`); 
         }
    }
   
}

module.exports = Evaluator;
