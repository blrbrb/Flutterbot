import { Client, GuildMember, Message, PermissionFlagsBits, User } from "discord.js";
import  SimpleDatabase  from "./SimpleDatabase";
import { Log } from "./utilities";

import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

const {youShouldLitterallyNeverSeeThis} = require('../lang/en.js');


export class Evaluator
{
    urlRegex=/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/g; 
    intel: string[];
    db:SimpleDatabase;
    client: Client; 

   constructor(Database:SimpleDatabase,client:Client) {
    this.intel = this.loadIntel()
    this.db = Database; 
    this.client = client;
   }
   
   validateAge(member:GuildMember): boolean
   {
    let MinAge: number =0; 
   
      MinAge = this.db.getGuildConfig(member.guild, "newMemberMinimumAge");
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
   async quaratine(member:GuildMember)
   {
    
      const guild = this.client.guilds.cache.get(member.guild.id);
      if(!guild)
        throw new Error('unable to determine guild. Cannot quaratine this user');
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

   async createQuaratineRole(member:GuildMember)
   {
    
      const guild = this.client.guilds.cache.get(member.guild.id);

       // Define the role's properties
         const roleData = {
           
            };
            if(guild){
            guild.roles.create({
                name: 'Quaratine', // Replace with the desired role name
                color: 'Red', // Replace with the desired color (e.g., 'BLUE', 'RED', 'RANDOM', etc.)
                permissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel], // Replace with the desired permissions
                hoist: true, // Display role members separately in the member list (optional)
                mentionable: true, // Allow the role to be mentioned (optional)
               "reason": 'Flutterbot.js default quaratined role did not exist. Initalizing from scratch to tag potentially malicious users in the future', // Optional reason for audit logs
             })
               .then((role) => {
                 console.log(`Created role: ${role.name}`);
                 this.db.setGuildConfig(guild, 'quaratine_role',role.id);
               })
               .catch((error) => {
                 Log(`Error creating new quarantine role for (${guild.name})[${guild.id}] :`, error);
               });
            }
            
            return;
 

   }

   async onMessage(message:Message)
   {
      if((await this.positiveURL(message)).match)
      {
         Log(`This shit is for realsies bro. ${message.content}`)
      }
   }
   async updateIntelligence() {
      try {
        // Make an HTTP GET request to the webpage
        const response:AxiosResponse<any> = await axios.get('https://urlhaus.abuse.ch/downloads/text/');

        if(!response.data){
            Log('WARN: unable to fetch phishing data from urlhaus');
            return;}
        // Load the HTML content of the webpage using cheerio
        const $ = cheerio.load(response.data.toString());
        let lines:Array<string> = [];
         // Split the content into lines
       
         lines = response.data.toString().split('\n');
 
       // Create an empty array to store the links
        const links:Array<string> = [];

       // Iterate through each line and extract links
       lines.forEach((line) => {
    
      // Remove leading and trailing spaces
      const trimmedLine: string = line.trim();
      
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
        console.error('Error:', error);
      }
    }
    loadIntel()
    {
      const raw = fs.readFileSync('assets/intelligence.json');
      const data =  JSON.parse(raw.toString());
      return data; 
    }
    
   async positiveURL(message:Message)
    {
      const contentUrls = message.content.match(this.urlRegex);
       if (contentUrls) {
         
         if(this.intel.includes(contentUrls[0]))
         {
            //ruh-roh raggey, we gotta racker 
            let origin: string = message.guild ? message.guild.name : message.author.username; //if guild is null and message is a dm, send the author's name 

            Log(`Red, Bold`, `Likely malicious link detected origin: ${origin} content:${message.content}`)
            
            //Delete the msg, better safe than sorry with these odds
            await message.delete()
            .then(() => {
               message.channel.send({embeds:[youShouldLitterallyNeverSeeThis.dearGodItsReal(this.client)]});
            
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
export default Evaluator;