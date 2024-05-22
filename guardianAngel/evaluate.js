
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
   
   /**
    * The validateAge function is used to determine if a user's account is older than the minimum age requirement
    * set by the server owner. 
    * 
    *
    * @param db Fluttershy's database 
    * @param member the member object that triggered the onGuildMemberJoin event 
    *
    * @return int | boolean wether or not the account meets the minimum age requirement. Or the number of days *over* the minimum age requirement if the account's age exceedes
    *  (wrapped in a promise)
    *
    */
   async validateAge(db, message)
   { 
      //console.log(client);
      //dont ask/ I dont understand. for some fucking reason the only way to get any of the properties from 
      //"member" and "guild" to be accessible with pipeline concatenation is to re-write them to another variable.
      // yadda yaddah garbage collection prudent use of memory blahblah 
      console.log(message);
      console.log(`db=${typeof(db)}`);

      
      let MinAge = await db.query(`SELECT joinage_days FROM GUILDS WHERE guild_id=${message.member.guild.id}`); 
      console.log(`evaluate.js 19: The Minumum required age for new accounts on this server is ${MinAge}`);
      console.log(MinAge[0].joinage_days);
      
   
      if(!MinAge)
      {
         console.log('evaluage.js validateAge() no default new member age set in  database, using default of one month');
         const defaultAgeDays = new Date();
         oneMonthAgo.setMonth(defaultAgeDays.getMonth() - 1);
         
         
         //return the number of days *over* the minimum requirement,
         //by def anything < 1 will always evalulate to true.
         
         ///the reason this expression is written in tetriary is to save one if statement pettily.
         ///it can be read like this    (p.s) I know u understand this stuff these notes are for me :skull:
        
         //  RETURN (int num of days older than the default) IF account is older than default DEFAULT false 
         return (message.author.createdAt - defaultAgeDays) ? message.author.createdAt < defaultAgeDays : false 
      }
      else
      {
         const daysAgo = new Date(); 
        
         daysAgo.setDate(daysAgo.getDate() - MinAge[0].joinage_days)

         //all of the exact same shit applies here too 
         return (message.author.createdAt - daysAgo) ? message.author.createdAt < daysAgo : false; 
      }

   }
   
   async onGuildMemberJoin(db, message)
   {
     //if the account does not meet the minumum age requirement, this can be read as a boolean "false"
     
     //must resist urge. to. use. this-> operator.I love c++ :slobber: 
     age = this.validateAge
      
   

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
      if(await this.positiveURL(client, message).match)
      {
         client.log(`This shit is for realsies bro. ${message.content}`)
      }
   }
   /**
    * Asks the URLhaus website for an updated dataset of malicious URLs and saves them to a JSON file.
    *  **Don't run this more than once every five or so minutes, or ideally even longer. We want to be very polite to the people at URLhaus :)**
    *
    * @param db Fluttershy's Database
    * @return A promise
    *
    */
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
    
   /**
    * The positiveURL function is a function that checks if the message contains any URLs.
    * If it does, then it will check to see if the URL matches one defined in the database of malicous urls.
    * If so, we match and preform a distribution probability curve with a very high bias in order to make 
    * ABSOLUTLEY FUCKING SURE. 
    *
    * @param client Send a message to the channel
   async negativeurl(client, message)
       {
   
         const contenturls = message
    * @param message Get the message object from discord
    *
    * @return A match object
    *
    */
   async positiveURL(client, message)
    {
      const contentUrls = message.content.match(this.urlRegex); 
       if (contentUrls) {

         ///very computationally expensive to preform, only fetch the db if there is a url detected. 
         

        
         let bad_stuff = await client.db.query(`SELECT url FROM THREATS`);
         let urls =[];
         bad_stuff.forEach((RowDataPacket)=>
            {
                  urls.push(RowDataPacket.url);
            });
   
         
         
         
         if(bad_stuff.includes(contentUrls[0]))
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
    
    async isStupidFuckingNitroScam(client, message)
    {
     // if()
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
