const Discord = require('discord.js');

const {resolveUserID} = require('./utilities.js');


class exp
{
  constructor({level=0, experience=0, msg=0, reacts={given:0, received:0}, d7oomyScore=0, cmds=0, required=0, amongus=0} = {})
  { 
    
      // this = object;
      console.log('the level is : ', level);
      this.level =  level;
      this.experience = experience;
      this.msg= msg;
      this.reacts = reacts; 
      this.d7oomyScore = d7oomyScore;
      this.cmds = cmds;
      this.amongus = amongus; 
    
     if(required) //don't calculate requried exp again if it's already been provided, we'll end up overwriting it.
      this.required = required;
     else 
      this.required = 0 + this.calculateRequired(); 
    
     
      console.log(this);

  }
  
  addExp(pts)
  {
    this.experience += pts; 
  }

  
  update(...args)
  { //need to return ids of all accessed users
    //this will execute first always, outside / after the switch To make sure leveling is updated properly.
    if(this.experience >= this.required)
    {
      this.level += 1; 
      this.experience = 0; 
      this.required = this.calculateRequired(this.level); 
    }
   
    const length = args.length; 
    switch(length){
      case 1:
        if(args[0] instanceof Discord.Message){
        //will exec for msg create, delete, or inter. create.
        
          return this.onMessageCreate(args[0]);
          }
        else if(args[0] instanceof Discord.BaseInteraction){
          return this.onInteractionCreate(args[0]);
         }
        
        break;
        //continue to append more else if when adding more exp checks and updates in different events 
        //bro was yanderedev. 
        //break;
      case 2:
        //for now, the only event that sends two arguments is onMessageReactionAdd
        return this.onMessageReaction(args[0], args[1]);
        
       default: 
        throw new Error(`Invalid arguments ${args[0].constructor.name}, and ${args[1].constructor.name}`);
     }
   
   
  }

  calculateRequired()
  {
    const baseExperience = 100;
    
    const experienceMultiplier = 1.2;
    
    const experienceRequired = Math.round(baseExperience * Math.pow(experienceMultiplier, this.level - 1));
    
    return experienceRequired;
  }
  onMessageCreate(message)
  {
    let experience = 10;
    this.msg += 1; 

    const messageLength = message.content.length;
    experience += Math.min(messageLength, 100); // Limit extra points for long messages
  
    if (/\bhttps?:\/\/\S+\b/.test(message.content)) {
      experience += 20; 
    }
    if(/https?:\/\/(?:media\.)?giphy\.com\/(?:media|embed)\/\w+\/\w+/.test(message.content))
    {
      experience += 15; 
    } 
    if(message.content.includes('among us'))
    {
      this.amongus += 1; 
    }
  
    if (message.content.includes('\n')) {
      experience += 30 * (message.content.split('\n').length - 1); 
    }

    this.addExp(experience); 

    return [message.author.id]; 
  }
  onInteractionCreate(interaction)
  {
    this.addExp(25); 
    console.log(interaction);
    this.cmds += 1; 
    return [interaction.user.id];
  }
  onMessageReaction(reaction, user)
  {
    let anim_multiplier = reaction._emoji.animated ? 55 : 1  
    
    //this is entierly non-objective. Extra points if the emoji's name has "fluttershy" in it. 
    let skull_multiplier = reaction._emoji.name.includes('fluttershy') ? 15 : 1 
    
    //if the emoji has a snowflake ID, it's a guild ID 
    let guildemoji_multiplier = reaction._emoji.id ? 20 : 1 
    
    //all emojis get a rand base point value from 1 to 5 
    let base = 1 + Math.random() * 3; 

    const seed = (Math.random() * 10) + 100;
    
    const multiplier = Math.floor(base * (anim_multiplier + skull_multiplier + guildemoji_multiplier), seed);
    
    //increment the reactions given counter
    this.reacts.given += 1;  
    //Set the new values, and save the object 
    this.experience += multiplier; 
 
    let recieverId = reaction.message.author.id; //fetch the user who has been reacted to
    let recieverExp = this.all.get(recieverId); 

    
    if(recieverId === user.id || recieverId === undefined)
    {
      return [user.id]; 
    }
   
  
    else if(recieverExp === undefined)
    {
       return [user.id];
    }
    else
    {
      if(/https?:\/\/(?:media\.)?giphy\.com\/(?:media|embed)\/\w+\/\w+/.test(reaction.message.content))
      {
        recieverExp.experience += 15; 
        recieverExp.d7oomyScore += 1; 
      } 
      recieverExp.reacts.received += 1; 
      
      return [recieverId, user.id]; 
    }

  }
  pipe()
  {
    console.log('piping exp data...');
    return Object(this);
  }


 };  



class expHandler 
{
  constructor(db)
  {
    this.db = db || undefined; 

    this.all = new Map(); 
    //if(db){
     // this.db = db;} 
    this.load(this.db); 
  }
  addUser(userId)
  {
    this.all.set(userId, new exp()); 
    return; 
  }
  
  writeAll()
  { 
   
    this.all.forEach((value, key, map) =>
    {
      this.db.set(key, `exp`, value);
    });
        
  }
  update(...args)
  {
   
    //the accessed exp obj from this.all
    
    const accessorId = resolveUserID(args[0]);
    if(accessorId === '493606647126818837')
     return
    console.log(accessorId);
    let current = this.all.get(accessorId); 

    if(!current){
      this.addUser(accessorId);
      return;
    }  
    const ids = current.update(...args);
    console.log(`modified expierene value is: `, current.experience);
      //loop through all of the exp objects in the handler,save, new obj if undefined
     ids.forEach(id => {
      const test = this.all.has(id);
      if(!test){
        console.log(`id not found in map`);
        this.all.set(id, new exp()); 
      }
      else{
        console.log('id found');
      this.all.set(id, current);
      this.db.set(id, 'exp',current);
      }
    });
    
     return;
    
  }
  pipe()
  {
    console.log('piping all exp data into db.json...');
    const database_object = Object.fromEntries(this.all); 
    //console.log(); 
    return database_object; 
  }
  load(db)
  {
    
    for (const id in this.db.data) 
    { 
     
         if(this.db.data[id].hasOwnProperty('exp') ){ //&& this.db.data[id].exp instanceof exp <- finish typescript shit
          console.log(this.db.data[id]);
          const expData = this.db.data[id].exp;
          console.log(expData);
          if(id === '493606647126818837')
           this.all.set(id, new exp({level:`99999999999999999999...`, experience:`∞`, msg:`∞`, reacts: {given:`d̶̫̓e̴͑̉͒͐͜f̴i̸͘e̸̻͖̟̣̥͊̑̈́̒̐d̷̊̒͑͋̒̌͑̈́͗̔̇̕͜`, received: `┼▓8└f⌂▓│`}, cmds:expData.cmds, required:`ƒ√2̵̧͔̪̱̭̩̫̱̜͌̇͌̾̈̓͌͠͝5`, amongus: !expData.amongus ===`undefined`? expData.amongus: 0}));
          else
           this.all.set(id, new exp({level:expData.level, experience:expData.experience, msg:expData.msg, reacts: {given:!expData.reacts === `undefined` ? expData.reacts : 0, received: 0}, cmds:expData.cmds, required:expData.required, amongus: !expData.amongus ===`undefined`? expData.amongus: 0}));
         }
        
    }
 }

};
  




module.exports = { 
  exp,
  expHandler
}
