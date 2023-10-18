import  SimpleDatabase  from "./SimpleDatabase";

import { PonyExp } from "./exp";
import {resolveUserID} from "./utilities"
import { Snowflake } from "discord.js";

export  class expHandler 
{
db: SimpleDatabase;
all: Map<string, PonyExp>;
  /**
 * Creates an instance of expHandler.
 * 
 * @constructor
 * @param {SimpleDatabase} db
 */
constructor(db:SimpleDatabase)
  {
   this.db = db || undefined; 
   /** @name all @type {ExperienceMap} */
    this.all = new Map(); 
    this.load(); 
  }
  /**
 * add a new user to the Experience Map
 * @name addUser
 * @param {SnowfKale} userId
 */
addUser(userId:Snowflake): void 
  {
    this.all.set(userId, new PonyExp()); 
    return; 
  }
  
  /**
 * write all of the data inside of the Expeirence Map to the database
 * @returns {void}
 * @name writeAll
 */
writeAll(): void 
  { 
   
    this.all.forEach((value, key, map) =>
    {
      this.db.set(key, `PonyExp`, value);
    });
        
  }
  /**
 * update the all of the experience objects for users upon a {@link Discord.Events} 
 * @summary Can be used as a callback function, or directly supplied with the API objects created by any of the events
 * described with {@link Discord.Events}. As of current, only onMessageCreate onInteractionCreate, and onMessageReaction add 
 * are actually tracked. Appending additionally logic for any of Discord's other events is as simple as modifying the switch statement in {@link PonyExp}
 * and adding a function to the PonyExpclass to handle said event. 
 * @example 
 * //update the handler all at once for every event 
 *   const eventFiles = require('../utils/findFiles')(__dirname, '../events', '.js');
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
           
         if (event.once) this.client.once(event.name, (...args) => event.execute(this, ...args), (...args) => expHandler.update(...args));
         else this.client.on(event.name, (...args) => event.execute(this, ...args), (...args) => expHandler.update(...args));
  @example 
  //update the handler for the "onMessageCreate" event only as a callback function, passing on the "message" object.
        Flutterbot.on('messageCreate', async () =>
        {//your onMessageCreate code }, async (message) => Flutterbot.expHandler.update(message));
 * 
 * @name update
 * @returns {void}
 * @param {...{}\} args
 */
async update(...args:any[]): Promise<void>
  {
    let accessorId = resolveUserID(args[0]);
    if(accessorId === '493606647126818837')
     return
   
    let current:PonyExp | undefined = this.all.get(accessorId); 

    if(!current){
      this.addUser(accessorId);
      return;
    }  
    const ids = current.update(...args);
   
      //loop through all of the PonyExpobjects in the handler,save, new obj if undefined
     ids.forEach(id => {
      const test = this.all.has(id);
      if(!test){
       
        this.all.set(id, new PonyExp()); 
      }
      else{
        console.log('id found');
        if(!current){
            
            this.addUser(id);
            return;
          }  
      this.all.set(id, current);
      this.db.set(id, 'PonyExp',current);
      }
    });
    
     return;
    
  }
  /**
 * pipe all data in the Expeirence Map into a serialized JSON object
 * @name toJSON
 * @returns {object}
 */
toJSON(): object
  {
   
    const database_object = Object.fromEntries(this.all); 
    //console.log(); 
    return database_object; 
  }
  /**
 * load previously exported Expierence Map data from a database file 
 * @name load
 * @returns {void}
 */
load(): void
  {
    for (const id in this.db.data) 
    { 
         if(this.db.data[id].hasOwnProperty('PonyExp') ){ //&& this.db.data[id].PonyExpinstanceof PonyExp<- finish typescript shit
          const expData = this.db.data[id].PonyExp;
           this.all.set(id, new PonyExp(expData));
         }
    }
 }

};

export default  expHandler;