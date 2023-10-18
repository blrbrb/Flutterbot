
import { BaseInteraction, GatewayMessageReactionAddDispatch, Message, MessageReaction, User } from 'discord.js';
import {PonyExpData, ReactionData } from './types';


/**
 * Object attached to each user in a guild that automatically calculates, and scribes 
 * expeirence points from server interactions. All PonyExp objects are updated at once by the 
 * @see {expHandler} within the events loop. 
 *
 * @export
 * @class PonyExp
 * @implements {PonyExpData}
 */
export class PonyExp implements PonyExpData
{
/**
 * Creates an experience object for an individual user.
 * @param {PonyExpData} 
 * 
 */
msg:number; 
level:number;  
amongus:number;
d7oomyscore:number; 
cmds:number; 
required:number;
reacts: ReactionData
experience: number; 
total_exp:number;
constructor(Data?:PonyExpData)
{ 
    this.total_exp = 0;
   if(Data){

      //the values for level and experience will be initalized with zero.
     this.msg = Data.msg;
     this.reacts =  Data.reacts;
     this.cmds =  Data.cmds;
     this.required =  Data.required; 
     this.d7oomyscore =  Data.d7oomyscore;
     this.amongus =  Data.amongus;
    this.total_exp = Data.total_exp;
    this.experience = Data.experience
    this.level = Data.level;
}
   else {
   
     this.msg = 0;
     this.reacts = new ReactionData(0,0);
     this.cmds = 0;
     this.required =  0;
     this.d7oomyscore =  0;
     this.amongus =  0;
     this.experience = 0;
     this.total_exp = 0;
     this.level = 0;}
     this.required = 0 + this._calculateRequired(); 
     
     
  }
  addExp(pts:number)
  {
    this.experience += pts; this.total_exp +=pts;
  }

 /** called from the handler, updates values in the experience object.
 * @see expHandler
 * @name update
 * @param {...{}} args
 * @returns {{\}\}
 */
update(...args:any[]): string[]
  { //need to return ids of all accessed users
    //this will execute first always, outside / after the switch To make sure leveling is updated properly.
    if(this.experience >= this.required)
    {
      this.level += 1; 
      this.experience = 0; 
      this.required = this._calculateRequired(); 
    }
   
    const length = args.length; 
    switch(length){
      case 1:
        if(args[0] instanceof Message){
        //will exec for msg create, delete, or inter. create.
        
          return this._onMessageCreate(args[0]);
          }
        else if(args[0] instanceof BaseInteraction){
          return this._onInteractionCreate(args[0]);
         }
        
        break;
        //continue to append more else if when adding more PonyExpchecks and updates in different events 
        //bro was yanderedev. 
        //break;
      case 2:
        //for now, the only event that sends two arguments is onMessageReactionAdd
        return this._onMessageReaction(args[0], args[1]);
        
       default: 
        throw new Error(`Invalid arguments ${args[0].constructor.name}, and ${args[1].constructor.name}`);
     }
   
    return [""]
  }


_calculateRequired()
  {
    const baseExperience = 100;
    
    const experienceMultiplier = 1.2;
    
    const experienceRequired = Math.round(baseExperience * Math.pow(experienceMultiplier, this.level - 1));
    
    return experienceRequired;
  }

_onMessageCreate(message:any):string[]
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
 
_onInteractionCreate(interaction:BaseInteraction)
  {
    this.addExp(25); 
    this.cmds += 1; 
    return [interaction.user.id];
  }
 
_onMessageReaction(reaction:MessageReaction, user:User)
  {
    let anim_multiplier = reaction.emoji.animated ? 55 : 1  
    let skull_multiplier = 0; 
    let recieverId: undefined | string;
    //this is entierly non-objective. Extra points if the emoji's name has "fluttershy" in it. 
    if(reaction.emoji.name)
     skull_multiplier = reaction.emoji.name.includes('fluttershy') ? 15 : 1 
    
    //if the emoji has a snowflake ID, it's a guild ID 
    let guildemoji_multiplier = reaction.emoji.id ? 20 : 1 
    
    //all emojis get a rand base point value from 1 to 5 
    let base = 1 + Math.random() * 3; 

    const seed = (Math.random() * 10) + 100;
    
    const multiplier = Math.floor(base * (anim_multiplier + skull_multiplier + guildemoji_multiplier));
    
    //increment the reactions given counter
    this.reacts.sent += 1;  
    //Set the new values, and save the object 
    this.experience+= multiplier; this.total_exp += multiplier; 
    if(reaction.message.author)
     recieverId = reaction.message.author.id; //fetch the user who has been reacted to

    if(recieverId === user.id || recieverId === undefined)
    {
      return [user.id]; 
    }
    else
    {
        return [user.id, recieverId];
    }

  }
  /**
 * pipe all of this instances' PonyExpvalues into an object. 
 * @date 10/13/2023 - 5:05:26 AM
 * @name toJSON
 * @returns {object}
 */
toJSON(): object
  {
   
    return Object(this);
  }


 } 


 export default PonyExp;