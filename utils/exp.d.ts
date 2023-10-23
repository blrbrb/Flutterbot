
import { BaseInteraction, GatewayMessageReactionAddDispatch, Message, MessageReaction, User } from 'discord.js';
import {PonyExpData, ReactionData, fsGuild } from './types';

/**
 * expeirence points for an individual user
 * @classdesc Object attached to each user in a guild that automatically calculates, and scribes 
 * expeirence points from server interactions. All PonyExp objects are updated at once by the {@link expHandler}
 * within Flutterbot's main event loop
 * 
 * @see {expHandler}{PonyExpData}
 *
 * @export
 * 
 * @implements {PonyExpData}
 * @class
 */
declare class PonyExp implements PonyExpData
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


addExp(pts:number)
  
 /** called from the handler, updates values in the experience object.
 * @see expHandler
 * @name update
 * @param {...{}} args
 * @returns {{\}\}
 */
update(...args:any[]): string[]
  

_calculateRequired()
 
_onMessageCreate(message:any):string[]
  
_onInteractionCreate(interaction:BaseInteraction)
  
 
_onMessageReaction(reaction:MessageReaction, user:User)
  
  /**
 * pipe all of this instances' PonyExpvalues into an object. 
 * @date 10/13/2023 - 5:05:26 AM
 * @name toJSON
 * @returns {object}
 */
toJSON(): object
  
 }


 export default PonyExp;