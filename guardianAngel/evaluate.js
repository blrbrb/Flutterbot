
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const {youShouldLitterallyNeverSeeThis} = require('../lang/en.js');
const { Log } = require('../utils/utilities.js');

class Evaluator
{
   constructor(Database,client) {
    this.urlRegex = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/g;
    this.intel = this.loadIntel()
   }
   
   validateAge(member)
   {
      let MinAge = this.db.getGuildConfig(member.guild, "newMemberMinimumAge");
    
      if(!MinAge)
      {
         Log('yellow','evaluage.js validateAge() no default new member age set in server config, using default of one month',tofile=false);
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
    
      const guild = client.guilds.cache.get(member.guild.id);

      let qRoleID = this.db.getGuildConfig(member.guild, 'quaratine_role'); 
      let quarantinedUsers =this.db.getGuildConfig(member.guild, 'quaratined');

      if(!quarantinedUsers)
      {
         this.db.setGuildConfig(member.guild, 'quarantined', [member.id]); 
      }
      else
      {
         quarantinedUsers.push(member.user.id); 
         this.db.setGuildConfig(member.guild, 'quarantined', quarantinedUsers);
      }
      
      if(!qRoleID)
      {
         console.log('evaluate.js quaratine(). Guild quaratine role is not set in config')
         this.createQuaratineRole(member);
         return; 
      }
      else{
      const qRole = await guild.roles.cache.get(qRoleID);

      if(qRole)
      {
       
         await member.roles.add(qRole);
         return
      }
      
      return;
      }
      
   }

   async createQuaratineRole(client, member)
   {
    
      const guild = client.guilds.cache.get(member.guild.id);

       // Define the role's properties
         const roleData = {
            name: 'Quaratine', // Replace with the desired role name
             color: 'RED', // Replace with the desired color (e.g., 'BLUE', 'RED', 'RANDOM', etc.)
             permissions: ['SEND_MESSAGES', 'READ_MESSAGES'], // Replace with the desired permissions
             hoist: true, // Display role members separately in the member list (optional)
             mentionable: true, // Allow the role to be mentioned (optional)
            };

            guild.roles.create({
               data: roleData,
               reason: 'Flutterbot.js default quaratine role did not exist. Initalizing from scratch', // Optional reason for audit logs
             })
               .then((role) => {
                 console.log(`Created role: ${role.name}`);
                 this.db.setGuildConfig(guild, 'quaratine_role',role.id);
               })
               .catch((error) => {
                 console.error('Error creating role:', error);
               });

            
            return;
 

   }

   async onMessage(client, message)
   {
      if(this.positiveURL(client, message).match)
      {
         client.log(`This shit is for realsies bro. ${message.content}`)
      }
   }
   async updateIntelligence() {
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
        // Save the links to a JSON file
        const jsonData = JSON.stringify(links, null, 2); 
        //save it as a class variable for convenience
        
        fs.writeFileSync('assets/intelligence.json', jsonData);
    
        console.log('Links have been saved to links.json');
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    loadIntel()
    {
      const raw = fs.readFileSync('assets/intelligence.json');
      const data =  JSON.parse(raw);
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
   
}

module.exports = Evaluator;