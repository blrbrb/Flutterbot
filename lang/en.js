

const Utilities = require('../utils/utilities.js');
const {discord, EmbedBuilder, Embed, } = require('discord.js');
const fs = require('fs');

class responses 
{
  constructor(JsonData)
  {
    this.data = JsonData | {};
  }
}
/**
 * balls 
 */
class fsLang
{
  constructor(language, data)
  {
   
    this.language = language | 'en';
    this.responses = data | new responses();
    this.userAvatar = '';
    this.global_name = undefined;
  }
  addResponse(responseModule, response)
  {
    if(this.responses[responseModule])
    {
      this.responses[responseModule] = [];
      this.responses[responseModule].push(response); 
    }
    else 
    this.responses[responseModule].push(response); 
  }
  rand(responseModule)
  {
    const randomIndex = Math.floor(Math.random() * this.responses[responseModule].length);
    const randomElement = this.responses[responseModule][randomIndex];
    const rendered_message = Utilities.removeEveryoneMentions(randomElement);
    return rendered_message;
  }
  load(responseModule, file)
  {
   
    responseModule = responseModule || undefined; 
    const path = file || 'assets/lang.json';
    try{
    const dat = fs.readFileSync(path);
    const response = JSON.parse(dat);

    if(dat && response)
    {
      if(responseModule)
        this.responses[responseModule] = response[responseModule];
      else 
        this.responses = response;
      return //console.log(response); 
    }
    else
    {
      return console.log('en.js lin 54: no json lang data to load...');
    }
    
  }
  catch(error)
  {
    console.log(error);
    return;
  }
  }
  format(string, template) {
    return string.replace(/\${(.*?)}/g, (match, key) => {
        // Check if the key exists in replacements, otherwise, return the original match
        return template.hasOwnProperty(key) ? template[key] : match;
    });
}

 addClientDetails(user)
 {
  //save these values for creating response embeds later
    this.userAvatar = user.displayAvatarURL();
    this.username = user.username; 
    this.global_name = user.global_name? user.global_name : undefined;
 }
}

class fsCommandResponder extends fsLang 
{
  constructor(responseModule)
  { 
    //if(this.responses)
  }
  onPlaying()
  {

  }
}




module.exports = {
  meta: {
    name: 'English',
    new_lang_message: `I'll speak in English now.`
  },
  author: 'Author',
  message: 'Message',
  channel: 'Channel',
  prefixcommands: 'Prefix Commands:',
  slashcommands: 'Slash commands:',
   
  // DO NOT TRANSLATE COMMAND NAMES
  errorMessage:
  {
    Permissions:
    {
      adminCommand()
      {
        const randomIndex = Math.floor(Math.random() * this.adminMessage.length);
        return {content: this.adminMessage[randomIndex], ephemeral:true} 
      },
      noeventPermission()
      {
        const randomIndex = Math.floor(Math.random() * this.eventMessage.length);
        return {content: this.eventMessage[randomIndex], ephemeral:true} 
      },
      eventMessage:["I can't create an event for you if you don't have permission...", "I'm sorry, it doesn't look like you have permission to create events in this guild...", "If you'd like to create an event, ask the owner for permissions first!", "I can't create an event if you don't have server permissions to start an event! Ask the owner or an admin for some help"],
      adminMessage: ["I'm sorry. But I can't let you do that", "I don't think it's a very good idea to change these settings...", "I'm sorry I can't do that for you, but I would love to help you with anything else!", "I can't let you do that. I'm sorry",
      "I'm sorry I don't have permission to let you do that.", "I can't let you use that command!"], 
      nsfwMessage: ["we can't look at naughty things in this channel!!! Think of the foals!", "There could be little fillies here! Ask an admin or an owner for the lewd role...", "P-put those away a-anon! We're in public! You can't share nsfw stuff here!", "A-anon.. I don't think we should be getting too lewd here"],
      
    },
    Distube:
    {
      /**
       * 
       * @description returns an error message in the 
       * scenario that someone is trying to skip a video on an empty queue, 
       * trying to call /queue for a list of queued videos on an empty queue etc
       * 
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      QueueEmpty()
      {
        return {content: Utilities.langRand(this.noQueue), ephemeral:true} 
      },
      /**
       * 
       * @description returns an error message in the 
       * scenario that someone has queued a video which is age restricted.
       * (and will crash the bot)
       * 
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      Restricted()
      {
        const randomIndex = Math.floor(Math.random() * this.ageRestricted.length);
        return  {content: this.ageRestricted[randomIndex], ephemeral:true} 
      },
      /**
       * 
       * @description returns an error message in the 
       * scenario that someone has queued a video which has been 
       * set to unavailable by youtube
       * 
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      Unavailable()
      {
        const randomIndex = Math.floor(Math.random() * this.unavailable.length);
        return  {content: this.unavailable[randomIndex], ephemeral:true} 
      },
       /**
       * 
       * @description returns an error message in the 
       * scenario that someone is attempting to pause an already paused queue
       * @returns a new {@link discord.InteractionResponse} @param {Flutterbot} Flutterboteral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      AlreadyPaused()
      {
        const randomIndex = Math.floor(Math.random() * this.alreadyPaused.length);
        return {content: this.alreadyPaused[randomIndex], ephemeral:true} 
      },
      noQueue:["But there isn't a queue! Use /play to search for songs!", "There isn't any music playing silly try using /play :query: first", "I can't do that! There's not any music playing right now try /play :query", "Hmmm. It doesn't look like there's anything playing here. Have you tried to queue anything with /play :query ?", 
    "Nopony's given Vinyl anything to play yet."],
      ageRestricted:["I'm sorry, it looks like this video is age restricted.", "I can't play this video, it's age restricted", "This video is age restricted. You'll have to sign in to your own youtube account to watch it"],
      unavailable:["I'm sorry, this video isn't avalible in your region... I can't get to it", "Youtube is telling me to buzz off right now. I can't get any details about this video", "There's something wrong on Youtube's end. Is this video copyrighted, Age Restricted, or unavalible?"],
      alreadyPaused:['the queue is already paused! Use /resume to continue playback of the current track', "I can't do that, the queue is already paused!", "Vinyl Scratch has already paused the music. If you want to continue playback use /resume", "The queue is already paused! Use /resume if you want to continue the current song"],
    },
    quotesfromError:
    {
      /**
       * 
       * @description returns an error message in the 
       * scenario that there haven't been any quotes for the 
       * guild created in the database. In this case it's neccessary to 
       * initalize a new array 
       * 
       * @param {discord.Guild} guild 
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      noGuildQuotes(guild)
      {
        const guildname = guild.name; 
        return {content: Utilities.format(Utilities.langRand(this.noQuotesForGuild), {guildname}), ephemeral:  true};
      },
      /**
       * 
       * @description returns an error message in the 
       * scenario that there haven't been any quotes for a particular member in a guild.
       * 
       * @param {discord.member} member 
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      noMemberQuotes(member)
      {
        const name = member.username; 
        return {content: Utilities.format(Utilities.langRand(this.noQuotesForMember), {name}), ephemeral:true};
      }, 
      noQuotesForMember: ["${name} hasn't said anything quotable in this server yet", "no quotes for ${name} here :(", "*chirp chirp* ${name} hasn't been quoted in this server before"],
      //Utilities.format parameters = none 
      noQuotesForGuild: ["there have not been any quotes saved to ${guildname} yet! Use /serverquote to save something special", 
      "Ponyville town hall doesn't seem to have any records for quotes in ${guildname}... use /serverquote to make some", 
      "It doesn't look like there's anything saved here. Use /serverquote to register new quotes for ${guildname}"],
    },
   //in discord.js v16 a raw role object sent as the content of message, 
   //or interaction response will automatically become an embedded role mention (without ping)
    PermissionError: 
    {
      /**
       * 
       * @description returns an error message in the 
       * scenario that someone is attempting to remove a role 
       * that they already have (this will result in a missing permissions error)
       * 
       * @param {discord.Role} role
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */

      OnRoleSelfAssign(role)
      {
       return {content: Utilities.format(Utilities.langRand(this.noPermissionsMessage.onRoleSelfAssign), {role}), ephemeral:true};
      },
       /**
       * 
       * @description returns an error message in the 
       * scenario that someone is attempting to remove a role 
       * equal too, or less than their default permissons. 
       * 
       * @param {discord.Role} role
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      OnRoleSelfRemove(role)
      {
        return {content: Utilities.format(Utilities.langRand(this.noPermissionsMessage.onRoleSelfRemove), {role}), ephemeral:true};
      },
      OnClientVoiceConnectFail(channel)
      {
        return {content: Utilities.format(Utilities.langRand(this.noPermissionsClientMessage.onClientVoiceConnect), {channel}), ephemeral:true};
      },
       /**
       * 
       * @description returns an error message in the 
       * scenario that someone is missing the required 
       * permissions to preform an action
       * 
       * @param {discord.Role} role
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      missing()
      {
        return {content: Utilities.format(Utilities.langRand(this.noPermissionsMessage.generic)), ephemeral:true};
      },
      noPermissionsMessage:
      {
        missing: ["It doesn't look like you have permission to do that!", "I'm sorry, you don't have permission to do that!", "I can't let you do that. You don't have the required permissions", "I don't think you have permission to do that"],
        onRoleSelfAssign: ["it doesn't look like you have permission to give yourself ${role}", "I'm sorry. But I don't think you're allowed to give yourself ${role}", 
                      "I can't do that. Somepony might get upset at me if I gave you ${role}", "You don't have permission to give yourself ${role} in this server!",
                      "*Pssst*, you don't have permission to give yourself ${role}!"], 
        onRoleSelfRemove: ["I can't remove ${role} from you silly! I don't have permission.", "${role}? I don't think I can remove that from you. Is this role a role with admin permissions? Or a role that dosen't appear with /roles?",
      "I can't remove ${role} from you. I can't see it! It looks like I don't have permission to modify it", "I'm sorry, I can't help you remove ${role}"], 
     
      },
     
      
      roleHiddenMessage: "${role} has been set to hidden",
     
    
      
    },
    ClientPermissionError:
    {
      OnRoleSelfAssign(role)
      {
       return {content: Utilities.format(Utilities.langRand(this.noPermissionsClientMessage.onRoleSelfAssign), {role}), ephemeral:true};
      },
      noPermissionsClientMessage:
      {
        onClientVoiceConnect: ["I'm sorry, I don't think I have permission to join ${channel}", "I don't have permission to join ${channel}!", "I'm sorry. I can't do that. I don't have the permissions needed to join ${channel}"
                              ]
      
      }
    },
    RoleError:
    {
      /**
       * 
       * @description returns an error message in the 
       * scenario that someone has attemped to assign 
       * themselves a role they already have.
       * 
       * 
       * @param {discord.Role} role 
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      alreadyHas: function(role)
      {
        return {content: Utilities.format(Utilities.langRand(this.RoleMessage.alreadyHas), {role}), ephemeral: true};
      },
      /**
       * 
       * @description returns an error message in the 
       * scenario that someone has attempted to assign 
       * themselves a role which has been saved as a private 
       * member role
       * 
       * 
       * @param {discord.Role} role
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       */
      private: function(role)
      {
        return {content: Utilities.format(Utilities.langRand(this.RoleMessage.private) + Utilities.langRand(this.RoleMessage.guidanceMessage), {role}), ephemeral: true};
      },
      /**
       * 
       * @description returns an error message in the 
       * scenario that someone has attemped to assign 
       * themselves a role that belongs to an application, or is 
       * managed by the bot or another bot
       *
       * @param {discord.Role} role 
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */

      clientNoRolePerms(role)
      {
        return {content: Utilities.format(Utilities.langRand(this.RoleMessage.managed) + Utilities.langRand(this.RoleMessage), {role}), ephemeral: true};
      },
      managed: function(role)
      {
        return {content: Utilities.format(Utilities.langRand(this.RoleMessage.managed) + Utilities.langRand(this.RoleMessage.guidanceMessage), {role}), ephemeral: true};
      },
       /**
       * 
       * @description returns an error message in the 
       * scenario that someone has attemped to assign 
       * themselves an administrator role.
       * 
       * 
       * @param {discord.Role} role 
       * @returns a new {@link discord.InteractionResponse} ephermeral
       * (so people don't get embarrased or smth when a command doesn't work) 
       * 
       */
      admin: function(role)
      {
        return {content: Utilities.format(Utilities.langRand(this.RoleMessage.admin) + Utilities.langRand(this.RoleMessage.guidanceMessage), {role}), ephemeral: true};
      },
      RoleMessage:
      {
        alreadyHas: ["${role} it looks like you already have that role", "You already have ${role} silly", "I can't give you ${role}! You already have it", "But you already have ${role}", "${role} is already a role you have in this guild. You can remove it using /removerole"],
        private: ["${role} has been set by a server admin as a private role, I'm sorry but I can't give it to you", "I can't assign you ${role} because that role isn't avalible for self-assignment in this guild", "I'm sorry but ${role} has been marked as a private member role"],
        guidanceMessage: [" You can use /roles to get a list of roles that I can help you with!", " That's okay! If you want to see the roles we are allowed to manage, use /roles to get a list.", " I'm really sorry about that. But you can always find roles that you *are* allowed to add/remove from yourself using the /roles command", " If want to add this role, and it's not on the list of roles provided by /roles, it's probably an application role. Or it's been hidden by a server administrator"],
        managed: ["${role} is another application's managed role, I can't give it to you silly!", "${role}? That looks like an application role that belongs to somepony else. I can't give it to you!", "It seems like ${role} is an application role! I couldn't give it to you if I tried!"],
        admin: ["Oh no, that looks like a very important role I absolutley cannot change it in even the smallest little way", "${role} Oh no no no, I'm sorry. But that's not something I can do", "I can't help you with that ${role} is an admin role", "${role} is a server owner or admin role silly! I couldn't give it to you if I tried", "I can't touch the ${role} it's either a server owner, or admin role."]

      },
   
    }
   
  },

  commandResponses:
  { 
    Distube: {
     /**
       * 
       * @description response message when a video has been popped to the top of the queue and 
       * started playing.
       *  
       * @returns a new {@link discord.InteractionResponse}
       */
     onPlaying(queue,Flutterbot)
     { 
       const song = queue.songs[0];
       
       let color = Flutterbot.DB.getGuildConfig(queue.textChannel, 'embed_color'); 
       const playing = new EmbedBuilder(); 
       if(color) playing.setColor(color);
       const name = song.name; 
       playing.setAuthor({name:'Flutterbot.music',iconURL: Flutterbot.user.displayAvatarURL()})
       //.setThumbnail(song.turl) 
       .setDescription(Utilities.format(Utilities.langRand(this.nowPlayingMessage), {song_name:song.name, song_url: song.url, duration:song.formattedDuration}))
       return {embeds:[playing]};
     },
      /**
        * 
        * @description response message when a video has been found by Distube, and inserted
        * into the queue following a query.
        * @param queue {@link Distube.queue}
        * @returns a new {@link discord.InteractionResponse} 
        */
     onAddSong(queue, Flutterbot)
     {
       const first = queue.songs[0];
      
       const songAdded = new EmbedBuilder();
       let color = Flutterbot.DB.getGuildConfig(queue.textChannel, 'embed_color'); 
       if(color) songAdded.setColor(color);
       songAdded.setAuthor({name: 'Flutterbot.music',iconURL: Flutterbot.user.displayAvatarURL()})
       .setDescription(Utilities.format(Utilities.langRand(this.addSongMessage), {song_name: first.name, song_duration: `${first.formattedDuration}`, song_url: first.url}))
       let x = 0; 

       queue.songs.forEach(song => {
        if(x === 0){
          songAdded.addFields({name:`Currently Playing: ${song.name}`, value: `[${song.name}](${song.url}) \`${song.currentTime} / ${song.formattedDuration}\``})
          x++; 
        }
        else{
        songAdded.addFields({name:`${x++}: ${song.name}`, value: `[${song.name}](${song.url}) \`00:00 / ${song.formattedDuration}\``})
        }
      });
       return songAdded; 
     },
     /**
        * 
        * @description response message when the queue has finished playing all of 
        * the queued videos, right before she leaves the voice channel
        * 
        * @returns a new {@link discord.InteractionResponse} 
        */
     onQueueFinish()
     {
       
       return {content: Utilities.langRand(this.queueFinishMessage)};
     },
      /**
        * 
        * @description response message for when the /play command has been used 
        * to queue a song.
        * 
        * @returns a new {@link discord.InteractionResponse} 
        */
     onQuery()
     {
       
       return {content: Utilities.langRand(this.queryMessage)};
     },
     resume(queue)
     {
       const song = queue.songs[0]; 
       const current_time = formatTime(Math.floor(queue.currentTime)); 
       const duration = song.formattedDuration; 
       const songname = song.name;
       const randomIndex = Math.floor(Math.random() * this.resumeMessage.length);
       return {content: Utilities.format(this.resumeMessage[randomIndex], {song: songname, time:current_time, duration:duration}), ephemeral:false};
     }, 
      /**
        * 
        * @description response message to be sent after successful execution of /pause
        * 
        * @returns a new {@link discord.InteractionResponse}  
        * 
        */
     pause(queue)
     {
       const song = queue.songs[0]; 
       const current_time = formatTime(Math.floor(queue.currentTime)); 
       const duration = song.formattedDuration; 
       const songname = song.name;
       const randomIndex = Math.floor(Math.random() * this.pauseMessage.length);
       return {content:Utilities.format(this.pauseMessage[randomIndex], {song: songname, time: current_time, duration: duration}), ephemeral:false};
     },
      /**
        * 
        * @description response message to be sent after successful execution of /filter
        * 
        * @returns a new {@link discord.InteractionResponse}  
        * 
        */
     filter(filter)
     {
       const randomIndex = Math.floor(Math.random() * this.filterMessage.length);
       return  {content: Utilities.format(this.filterMessage[randomIndex], {filter: filter}), ephemeral:false};
     },
     //Utilities.format parameters = s{song_name, song_duraion, song_user}
     nowPlayingMessage: ["🎶 Now playing **[${song_name}](${song_url})** / ${duration}", "Playing 🎵 **[${song_name}](${song_url})** / ${duration} 🎤", "We're listening to **[${song_name}](${song_url})** / ${duration}🎤","*metalic pegasus noises* Now playing **[${song_name}](${song_url})** / ${duration}", "Here's **[${song_name}](${song_url})**, it'll be playing for around ${duration}", "Now Playing **[${song_name}](${song_url})** for the next ${duration}", "*shy robotic pegasus noises* Now Playing **[${song_name}](${song_url})** / ${duration}", "*electronic stuttering* Please don't look inside the shed. Now Playing **[${song_name}](${song_url})** /${duration}",
                       "Remember that time I sung for the PonyTones? It was tramuatic!! Now Playing **[${song_name}](${song_url})** / ${duration}", "*in robotic Flutterguy voice* And now, a top track from [INSERT ARTIST]. [INSERT DJ COMMENTARY] **[${song_name}](${song_url})** / ${duration} ", "*shy robot voice* N-Now Playing **[${song_name}](${song_url})** / ${duration}", "*shy electronic squeaks* E-eep! I- I'm going to sing **[${song_name}](${song_url})** / ${duration} now...", "I cannot associate emotions with music in this robotic husk. Now Playing **[${song_name}](${song_url})** / ${song_duration}", "I can't beleive they actually convinced me to sing on stage all those years ago. Now Playing **[${song_name}](${song_url})** / ${duration}"],
     addSongMessage: ["Alright! I'll add **[${song_name}](${song_url})** to the queue", "No problem. Let me add **[${song_name}](${song_url})** to the playlist!", "Adding **[${song_name}](${song_url})** to our queue", "sure thing, we'll add **[${song_name}](${song_url})** to the queue", "I'll ask Vinyl to add **[${song_name}](${song_url})** to the tracklist for us", 
               "Got it. Adding **[${song_name}](${song_url})** to our playlist.", "**[${song_name}](${song_url})**? Consider it done. Adding it to the queue", "Added **[${song_name}](${song_url})** to the turntable", "added **[${song_name}](${song_url})** to the queue!", "Here you go, **[${song_name}](${song_url})** has been queued!",
             "Nice choice! putting **[${song_name}](${song_url})** onto the queue", "Don't go anywhere, I added **[${song_name}](${song_url})** to the playlist", "Get ready for **[${song_name}](${song_url})** because we're gonna be listening to it soon", "Angel has slaughtered countless innocents! Adding **[${song_name}](${song_url})** to the playlist!",
            "adding **[${song_name}](${song_url})** to the playlist!", "*Robotic Fluttershy Whimpering* I-Added **[${song_name}](${song_url})** to the q-queue *BZZZZrrrt*", "Don't worry, I'm not shy anymore. They took away my ability to have feelings when they put me in this oubillete of transistors and metal. Adding $[song_name] to the queue!", "*robotic pegasus sounds* **[${song_name}](${song_url})** has been queued!",
           "I am yellow shy. **[${song_name}](${song_url})** added to queue","*metalic wing fluffing sounds* OH, sorry I'll add **[${song_name}](${song_url})** to the queue for you", "DEATH PROTOCOL ACT- I-I mean... Uhm. **[${song_name}](${song_url})** has been added to the queue", "Sounds good. Putting **[${song_name}](${song_url})** on the queue", "*shy metalic clinking* **[${song_name}](${song_url})** is on the queue!"],
     queueFinishMessage:["I'm going back to my cottage now :3", "see ya later", "I've gotta go help Vinyl Scratch pack up her records", "See you next time", "Bye bye!", ":bedtime:"], 
     queryMessage: ["searching youtube for relevant results...", "querying youtube...", "gathering video results from youtube...", "requesting videos from youtube..."],
     
    resumeMessage:["Resuming!`\` ${song} : ${time} / ${duration} `\`", "I'll resume`\`${song}`\` from `\` ${time} `\` now!", "Starting `\` ${song} `\` back from `\` ${time} `\`", "Resuming `\` ${song} `\`", "starting base cannons back up... `\` ${song} : ${time} / ${duration} `\` "],
    pauseMessage:["Pausing!`\` ${song} : ${time} / ${duration} `\`", "I told Viny Scratch and Octavia to pause. `\` ${song} : ${time} / ${duration}  `\`", "Paused: `\`${song}: ${time} / ${duration}`\`"],
    filterMessage:["Ok, I'm going to throw Octavia's record player into the river now. Applying the ${filter} filter", "Adding the ${filter} filter to the queue. Use the /filter command with the same filter name again to remove it!", "I put the ${filter} effect over the queue! If you change your mind use /filter :${filter} to remove it!",
    "I hope this doesn't wake angel up... I'm adding the ${filter} filter to the queue now! (this might take a minute if the video is long, and the ffmpeg buffer needs to catch up.)", "Alright! I'm going to add the ${filter} effect to the queue. Sit tight, it might take a minute for the sound to start again.",  "Adding the ${filter} effect. If the queue seems to pause for a minute, don't worry! We'll be right back."]
    },
    Fluttershy:
    {
       /**
       * 
       * @description response message to be sent after the -fs command has been called for the first time, prompting the 
       * hugging face model to re-initalize with a new conversation.
       * 
       * ephermeral to not clutter up channels with messages. 
       * @returns a new {@link discord.InteractionResponse}  
       * 
       */
      loadingModel(time)
      {
        return  {content: Utilities.format(Utilities.langRand(this.loadingModelMessage), {time}), ephemeral:true} 
      },
      loadingModelMessage:["I need a moment to start up!, use the same command again in around ${time} seconds!", "Just a moment, I need to start back up. Give me ${time} seconds!", "*the pegasus is eeping. give her ${time} seconds to wake up*", "Give me about ${time} seconds to wake back up", "I'll be right there, just ${time} seconds"]
    },
     /**
       * 
       * @description response message to be sent into the survivor channel after the scp command 
       * has been used
       * 
       * @returns a new {@link discord.InteractionResponse}  
       * 
       */
    scp()
    {
      return Utilities.langRand(this.scpMessage);
    },
     /**
       * 
       * @description response message to be sent after successful execution of /getrole
       * 
       * @returns a new {@link discord.InteractionResponse}  
       * 
       */
    getrole(role)
    {
     
      return {content: Utilities.format(Utilities.langRand(this.getroleMessage), {role}), ephemeral:false};
    }, 
    /**
       * 
       * @description response message to be sent after successful execution of /resume
       * 
       * @returns a new {@link discord.InteractionResponse}  
       * 
       */
   
   
    
    //Utilities.format parameters = role. 
    getroleMessage: ["Alright! You've just been given ${role}", "Sure thing! Now you should have ${role}", "Got it, now you have ${role}", "There you go! ${role}", 
    "welcome to ${role}!"],
  
  }, 

  socialHelp:{
    //this gets sent at the start of every conversation.
    imlonely()
    {
      const embed = new EmbedBuilder().setDescription(this.advice);
      
      this.options.forEach(field => {
        embed.addFields(field); 
      });

      return {content: Utilities.langRand(this.BotResponses.onStart), embeds: [embed]} 
    }, 
    handleUserInput(collector)
    {
      
      collector.on('collect', async (userMessage) => {
        if(userMessage.author.bot)
          return;
        else{
         const userContent = userMessage.content.toLowerCase();
        
       
        console.log("User response no.: ", this.globalConfig.usr_str);
            let command = this.parseCommand(this.branchSelectors, userContent); 
            
            if(!command)
            { 
              if(this.globalConfig.case){
                command =  { case: this.globalConfig.case, index: 0, name: this.globalConfig.name, userContent: userContent};
                console.log("not a default command value", command);
              }
              
            }

            //console.log(command.case);
            this.globalConfig.name = command.name;
            //console.log(command.name);
            this.globalConfig.case = command.case;  
            //Make sure that the "stop" keyword command can be used globally through the entire conversation case
            switch(command.case)
            {
                //the user has requested an ice breaker
                case 1: 
                  collector.channel.send(Utilities.langRand(this.BotResponses.onCreateIceBreaker)); 
                  this.globalConfig.str ++; 
                  break; 
                case 2: 
                  collector.channel.send(Utilities.langRand(this.BotResponses.onGames));
                  this.globalConfig.usr_str ++; 
                  break;
                case 3:
                  //has requested 
                  break;
                case 5:
                 //the user has said "stop"
                 collector.channel.send(Utilities.langRand(this.BotResponses.onStop));
                 //reset position in conversation case
                 this.globalConfig.case = '', this.globalConfig.str = 0, this.command = '';
                 collector.stop();
                 break;
                 default:
                  if(this.globalConfig.case === 3 && this.user_str >= 1)
                  {
                    collector.channel.send(Utilities.langRand(Utilities.format(this.BotResponses.confirmInput), {game: userContent}));
      
                  } 
                  if (userContent === 'stop') {
                    collector.stop();
                    collector.channel.send(Utilities.langRand(this.BotResponses.onStop));
                    return;
                  }
                  this.globalConfig.usr_str ++; 
                  //this default statement will often be reached, especially when the convo has just been initalized 
                  //don't worry, it's meant to break here :3
                  break;
            }} 
            return;
        });

        //switch statement, handle all five of the different possible choices
        //important to have this outside of the for loop.
        
        
        collector.on('end', () => {
          collector.channel.send(`Okay, I'm going to leave now. Don't be afraid to talk to me again.`);
        });
      return; 
    },
    
    parseCommand(obj, userContent) {
      const results = [];
    
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          // If the current property is an array, search for the searchString in it
          const innerArray = obj[key];
          innerArray.forEach((item, index) => {
            if (item.includes(userContent)) {
              results.push({ key, index, value: item });
            }
          });
        } else if (typeof obj[key] === "object") {
          // If the current property is an object, recursively search it
          const innerResults = this.parseInput(obj[key], userContent);
          if (innerResults.length > 0) {
            results.push(...innerResults.map(innerResult => ({
              case: key + "." + innerResult.key,
              index: innerResult.index,
              name: innerResult.value,
              userContent: userContent
            })));
          }
        }
      }
    
      return results[0];
    },
    BotResponses:
    {
      onStart: ["Awww, I'm so sorry to hear that. There are always ponies here for you, even if it doesn't seem like it", "I'm really sorry to hear about that"], 
      onCreateIceBreaker: ["Okay! I'll create an ice breaker so that you can get to know everypony a bit better. In the next message, give me a topic to start the conversation off with. (Make sure it's not anything nsfw)"],
      onGames: ["Sure!, If there's something you have in mind I'd be happy to suggjest we play it together in the gaming channel. Make sure it's something that everypony can play, and that it's easy to access. When you're ready, just send me the name of the game or activity in your next message to me without any other text. If you're having trouble thinking of ideas, I have some simple suggjestions! \n You could create a multiplayer [jigsaw puzzle](https://puzzle.aggie.io/) together! \n Start a game of [monopoly](https://richup.io/) in your browser \n Play the world's wackiest [board game](https://www.boardgame-online.com/) with up to 16 friends \n Play golf together on the Pixel Putt discord activity \n play pretend to be xyzz \n draw together on a discord cavnass \n play what do you meme?"],
      confirmInput:["Okay!, so I should ask the gaming channel if they'd like to play ${game} with you? Are you sure? (yes/no)", "You want me to ask #gaming if they'd like to play ${game} with you, right? (yes/no)"],
      promptForAnon: ["Sounds good!, now. Would you like me to mention your name in the server and tell them you're feeling a bit down? ```(yes/no)```"], 
      onStop: ["Alright! I'll see you there. Come back to me if you're still feeling left out.", "I care about you... Don't be afraid to talk to someone.", "thanks for telling me how you feel! I'll leave you alone now", "I hope you start to feel better soon", "Don't be a stranger..."]
    },
    affirmations:["I may be shy at times, and it took me a long time and a lot of friendship to realize it. But both me and you have a unique voice and a valuable perspective to share"],
    advice: "If you think you're feeling up to it, you could try to do one of these things? I know it's not always easy trying to make new friends in an unfamilar place. If you'd like also, I can come up with a conversation starter to get things going for you? I won't tell anypony it was you.",
    options:[{'name': '**ice breaker**', 'value': "give me a topic like 'your favorite color', 'what would you do if you had all the money in the world?' and I'll start the conversation for you. **Just say:** ```Ice Breaker```"},
            {'name': '**suggjest a game to play**', 'value': "give me the name of a game you have, or something that everypony can play together. And I'll anonmyous suggest it for you in the gaming channel. **Just say:**, ```games```"}, 
            {'name': '**event suggjestion**', 'value': "I'll send a message to the mauds asking them to create an event. It must be something that eveyone can enjoy together. (Like a web-browser puzzle game, a watch party, a game of jackbox, etc). Just say ```find something to do```"}, 
            {'name': "**I'm too shy for any of these...**", 'value': "If you don't want me to do any of these things for you, I can create a private message for you. It can either be anonymous, or mention you directly by name. And I can either put it in a private mailbox if you need to vent, or let other ponies know that you're feeling down. Just say ```I'm too shy```"},
            {'name': "** I don't need this / I got here on accident**", 'value': "If you've gotten here on accident, or you don't want this. Just tell me ```stop ```. And I'll leave you alone"}
            ],
    globalResponses: ["stop"],
    globalConfig: {'case': undefined, 'usr_str': 0, 'name':'','userContent': ''},
    branchSelectors:{4:["i'm too shy","im too shy"], 3: ["find something to do"],2:["games"], 1: ["ice breaker"], 5:["stop"]},
    //branchCommands: {1:["yes", "no"]},
    SecondaryResponses:["yes", "no"],
       
  },

  youShouldLitterallyNeverSeeThis:{

    dearGodItsReal(shy)
    {
      const embed = new EmbedBuilder()
      .setAuthor({name:'Flutterbot.guardian', iconURL: shy.user.displayAvatarURL()})
      .setTitle('DANGER')
      .setDescription(this.message)
      .setColor('Red')
      .addFields({'name': 'Where do I get my data?', 'value': "Here's more info on https://urlhaus.abuse.ch/"})
      return embed; 

    },
    message: "the contents of this message have matched 100% identical to a url found on urlhaus The offending url, and message contents have been automatically deleted. \n On the astronomically, outstandingly, devilishly low odds that you are *actually reading this right now*, this is most likely __**not a mistake or programming error**__. \n Rest assured, links are very common. If not vital for the health of a social space. I've been taught the difference between normal urls, and urls that almost certianly are involved in phising scams / malware. I pinky promise. \n I may not function correctly some days, but this is something my creator takes very seriously. If you've sent that link on accident, or if you've unknowingly been sharing it around. I would advise you do research it, or send it through virustotal"
  }
  
}
module.exports.fsLang = fsLang;