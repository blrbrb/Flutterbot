

const {format, formatTime, langRand} = require('../utils.js');
const discord = require('discord.js');
const emojis = require('../utils/emojis.js');

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
  
  defaultValues: {
    /**
       * 
       * @description response message when a video has been popped to the top of the queue and 
       * started playing.
       *  
       * @returns a new {@link discord.InteractionResponse}
       */
    onPlaying(song)
    {
      const duration = song.formattedDuration; 
      const name = song.name; 
      return {content: format(langRand(this.nowPlayingMessage), {song_name:name, duration:duration})};
    },
     /**
       * 
       * @description response message when a video has been found by Distube, and inserted
       * into the queue following a query.
       * 
       * @returns a new {@link discord.InteractionResponse} 
       */
    onAddSong(song)
    {
      const name = song.name; 
      return {content:format(langRand(this.addSongMessage), {song_name: name})};
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
      
      return {content: langRand(this.queueFinishMessage)};
    },
    //format parameters = s{song_name, song_duraion, song_user}
    nowPlayingMessage: ["🎶 Now playing **${song_name}** / ${duration}", "Playing 🎵 **${song_name}** / ${duration} 🎤", "We're listening to **${song_name}** / ${duration}🎤","*metalic pegasus noises* Now playing **${song_name}** / ${duration}", "Here's **${song_name}**, it'll be playing for around ${duration}", "Now Playing **${song_name}** for the next ${duration}", "*shy robotic pegasus noises* Now Playing **${song_name}** / ${duration}", "*electronic stuttering* Please don't look inside the shed. Now Playing **${song_name}** /${duration}",
                      "Remember that time I sung for the PonyTones? It was tramuatic!! Now Playing **${song_name}** / ${duration}", "*in robotic Flutterguy voice* And now, a top track from [INSERT ARTIST]. [INSERT DJ COMMENTARY] **${song_name}** / ${duration} ", "*shy robot voice* N-Now Playing **${song_name}** / ${duration}", "*shy electronic squeaks* E-eep! I- I'm going to sing **${song_name}** / ${duration} now...", "I cannot associate emotions with music in this robotic husk. Now Playing **${song_name}** / ${song_duration}", "I can't beleive they actually convinced me to sing on stage all those years ago. Now Playing **${song_name}** / ${duration}"],
    addSongMessage: ["Alright! I'll add **${song_name}** to the queue", "No problem. Let me add **${song_name}** to the playlist!", "Adding **${song_name}** to our queue", "sure thing, we'll add **${song_name}** to the queue", "I'll ask Vinyl to add **${song_name}** to the tracklist for us", 
              "Got it. Adding **${song_name}** to our playlist.", "**${song_name}**? Consider it done. Adding it to the queue", "Added **${song_name}** to the turntable", "I accidentally killed an old woman once! Anyways, added **${song_name}** to the queue!", "Here you go, **${song_name}** has been queued!",
            "Nice choice! putting **${song_name}** onto the queue", "Don't go anywhere, I added **${song_name}** to the playlist", "Get ready for **${song_name}** because we're gonna be listening to it soon", "Angel has slaughtered countless innocents! Adding **${song_name} to the playlist!",
           "adding **${song_name}** to the playlist!", "*Robotic Fluttershy Whimpering* I-Added **${song_name}** to the q-queue *BZZZZrrrt*", "Don't worry, I'm not shy anymore. They took away my ability to have feelings when they put me in this oubillete of transistors and metal. Adding $[song_name] to the queue!", "*robotic pegasus sounds* **${song_name}** has been queued!",
          "I am yellow shy. **${song_name}** added to queue","*metalic wing fluffing sounds* OH, sorry I'll add **${song_name}** to the queue for you", "DEATH PROTOCOL ACT- I-I mean... Uhm. **${song_name}** has been added to the queue", "Sounds good. Putting **${song_name}** on the queue", "*shy metalic clinking* **${song_name}** is on the queue!"],
    queueFinishMessage:["I'm going back to my cottage now :3", "see ya later", "I've gotta go help Vinyl Scratch pack up her records", "See you next time", "Bye bye!", ":bedtime:"]
  },
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
        return {content: langRand(this.noQueue), ephemeral:true} 
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
       * @returns a new {@link discord.InteractionResponse} ephermeral
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
        return {content: format(langRand(this.noQuotesForGuild), {guildname}), ephemeral:  true};
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
        return {content: format(langRand(this.noQuotesForMember), {name}), ephemeral:true};
      }, 
      noQuotesForMember: ["${name} hasn't said anything quotable in this server yet", "no quotes for ${name} here :(", "*chirp chirp* ${name} hasn't been quoted in this server before"],
      //format parameters = none 
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
       return {content: format(langRand(this.noPermissionsMessage.onRoleSelfAssign), {role}), ephemeral:true};
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
        return {content: format(langRand(this.noPermissionsMessage.onRoleSelfRemove), {role}), ephemeral:true};
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
        return {content: format(langRand(this.noPermissionsMessage.generic)), ephemeral:true};
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
        return {content: format(langRand(this.RoleMessage.alreadyHas), {role}), ephemeral: true};
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
        return {content: format(langRand(this.RoleMessage.private) + langRand(this.RoleMessage.guidanceMessage), {role}), ephemeral: true};
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
      managed: function(role)
      {
        return {content: format(langRand(this.RoleMessage.managed) + langRand(this.RoleMessage.guidanceMessage), {role}), ephemeral: true};
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
        return {content: format(langRand(this.RoleMessage.admin) + langRand(this.RoleMessage.guidanceMessage), {role}), ephemeral: true};
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
      const randomIndex = Math.floor(Math.random() * this.scpMessage.length);
      return this.scpMessage[randomIndex]
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
      const randomIndex = Math.floor(Math.random() * this.getroleMessage.length);
      return {content: format(this.getroleMessage[randomIndex], {role}), ephemeral:false};
    }, 
    /**
       * 
       * @description response message to be sent after successful execution of /resume
       * 
       * @returns a new {@link discord.InteractionResponse}  
       * 
       */
    resume(queue)
    {
      const song = queue.songs[0]; 
      const current_time = formatTime(Math.floor(queue.currentTime)); 
      const duration = song.formattedDuration; 
      const songname = song.name;
      const randomIndex = Math.floor(Math.random() * this.resumeMessage.length);
      return {content: format(this.resumeMessage[randomIndex], {song: songname, time:current_time, duration:duration}), ephemeral:false};
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
      return {content:format(this.pauseMessage[randomIndex], {song: songname, time: current_time, duration: duration}), ephemeral:false};
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
      return  {content: format(this.filterMessage[randomIndex], {filter: filter}), ephemeral:false};
    },
    scpMessage: ["Voices crackle to life from beyond the ethereal realm...", "*in the distance, soft vinyl pops are heard...*", "*voices without form murmur into earshot*", "Something, or somepony. Is trying to communicate with us...", "[Are you able to hear us spirit?](https://www.youtube.com/watch?v=2yi4inP72qM)", "Do not go gentle into that good night, Old age should burn and rave at close of day", 
    "You are not alone here", "waking up from the long dream, into a another one waiting at the end of time. A voice calls out...", "Perhaps death doesn't mean goodbye, but rather, 'til we meet again.", "Pale Death beats equally at the poor pony's gate and at the palaces of kings.", "If you ever want to imagine what it must be like. Just try to remember the last thirteen billion years of your life", 
    "If life transcends death, then I will seek for you there, and if not, I will search for you there too", "Don't worry. They're getting kisses from all of the dogs that have ever existed right now.", "que la salle de bal reste éternelle", "Nopony goes to the bad place. Except maybe Angel bunny.", "My co-creator, Eli was sacrified too. Don't worry I think he's fine. If you're curious, here he is taking the afterlife [entrance exam](https://www.youtube.com/watch?v=ZnvpU0d7vyM)", "Smg is here. He says lokloy should cover him next time",
    "Here's a message from the afterlife. Also Mega says our Tropical Bay Breeze 'has too much coconut rum' so I sent him to the hooficure spa to reflect on his words and apologize.", "Somepony from beyond that gentle goodnight has something to say. Also, I've been getting a lot of questions about wether or not dogs go to pony heaven. The answer is yes dummy.", "Message from the dead! You're going to see the same response at least three times. I'm a robot pegasus, not an omniscent alicorn AI",
    "Do you ever look way up at the stars in the night sky, and think about how much of a silly goober you are? Anyway, here are some words from beyond the grave *ooooooh*", "I was too scared to go out on Nightmare Night all those years ago, but boy was I wrong. Dead ponies are so much fun!", "There is no reason to fear anything, or anypony's spirits that might inhabit my innocuous garden shed. ", 
    "I just want to clear the air, and say that Pinkie Pie absolutely does NOT incorporate anything other than sugar and love into her cupcakes. Anyways, a dead pony is saying something", "Remember that time that mean old stallion tried to rip me off for that cherry? Well this is him now. He's dead", 
    "Angel says it's important for me to start 'appreciating the divine blood of the occult'. So here's a message from beyond the grave", "Do not look in the shed", "*La muerte es la segadora que no toma una siesta al mediodía*", "We've got lots of space inside of the tropical island super-duper pony heaven island resort with kittens", "*emoshy voice* The dead are like, trying to communicate with us right now, uggh", "La de-da de-do, taking care of the animals. I am hearing dead ponies, they are telling me: ", "I see dead ponies", 
    "Pinkie always tells us to giggle at the scary things. I think that's very sweet advice. Here's an afterlife message from a pony who was brutually decapitated", "We are hitting the gritty so hard in pony heaven right now. Or pony hell. Give or take", "By the way, if you're ever wondering how [Eli ended up dying](https://youtu.be/jgwDX3KYLHU)", "Here's a message from a pony who is beyond our realm.", "Filly Cheesteak's last moments [POV](https://images-ext-2.discordapp.net/external/4lsNydk-2j2Fu9JKb8_dcfzHqmPEPsr7gpEmCz9bpSQ/https/media.tenor.com/lUZfU0C9ssEAAAPo/flanders-company-car-crash.mp4)",
    "There are lots of ponies in the afterlife you can talk to! It never gets old here", "When I go to sleep in my cottage at night I hear their voices", "My wings itch. Here's dead pony quote","Can we pretend that airplanes in the night sky, are like shooting stars?", "I've got mail from the skeleton horse ghost that haunts my cottage. Somepony says:", "Dead ponies want you to know:", "In today's afterlife forcast:",
    "This is what happened to everypony who made fun of me in school:", "I think I need to refil my medications. No, nevermind. There's a dead pony talking to me. They want to say:", "You are allowed to hit the gritty after you are dead","NEVER look inside of that garden shed again. I m-mean. Here's a message from the afterlife!","What is death anyways? Angel seems to know a lot about it. Somepony says", 
    "Here's a message from the afterlife. By the way, Discord told me that 'Russian Wagner Guy' was recently checked in down there.", "Discord is asking me to read mail from the dead", "You've got dead pony mail. By the way Nordic is there. Discord told me they're a succubus now.", "Discord wants to me tell everypony, that actually. ALL of your religions got it a little bit right and a little bit wrong. The real answer is ╓̸̨̡̱̭͑́̍̉̌͒̅̀̓̇̊̓̒́͒̾͌͒͆̐̊̈́̄̆̀͊̽̉̓̂́̔̀͂̋̐́̂̇̓̈̏̽͗̾̈͆̊́̀̂̒̈̒̏͋͗̓̄̄̾́̈́̑͋́͑̒̆̿̈̌̉͊̀̆̋̓́͋̅͌̀̒̓̋̒̓̏͑͐̆̾͌̚̕͠͝͝͝͝╩̵̨̢̧̛͚͉̰̦͉̺͔̦̤̣̞̙̱̺͕̝̲͈͓͓̣̮̣̰̼̩̜̬̬͍̖̹̼̪̝̣̰̠̘͉̖̩̀͊̊̀̐̃̋̽̃̽̎͆͒͐̄́͂̎͒̏̐̅̀͒̇̀̒̒͑͗̒̐̾͌̄̃͐̂̈́̑́̿͊̈́͛͗́͊̾̆̔͛͊́̓̀̽͑̎͊̎̈̀̿͛͊̉̓͌͐͋̀̒̌́̍̊̇̌̄̈́̽͌̄̐͘̕̚̚͜͜͜͠͝͝͝͠͠͠͠͝ͅͅṽ̷̡̛̛̛̙̳͚̪̘̼̯̘͇̎͐̓̓̍̎̎͊̅͊́̓́́̋̎̉̂̄̎͋̄̾̒͆̐͊̈́̋̎̿͑̈̇̀̓̋̿̐́͗͐͂͐̃̓̈̌̀͒̔̎̌̆̏͗̑̽̈̓̂̃̐̂̒̀̔̓͛̅̂̎́̃͂̄́̉̀͊́̄̑̃̽̕̚̕̕̕͘͠͝͝͝e̶̡̢̢̡̧̨̨̢̡̡̢̧̛̛̲̼̣̠̘̟̖̫͈̖̲̙͓̝̦̭̝͉̘̬̜̺̻̱̺̱̘̩͍̞̻͓͔͇͉̣̗̱͎̺̞̻̠͚̤̯̦̲̲̼̟͙͇͚͉̙͉͈̟̜̻̘̹̬͓̗̘̲̰͚͍̜͍̩̗̗̗̺͎̟̗͇͎̼͔͎̩̮̺̞̜͎̮̦̣̖͈͎͓̻̗̝͔̺͈̔̾͆̈́͒͆́̅͐̒̿̈́͐̈́͐̃̽̀͗̾̽̀̓̅̋̅̃́̐̏̇͗̇̈̀́̿̎̿̑̋̉̌́͐̈͋̈́̎̊̓̑̐̑̀̀̍̎̆͑̊̄̑͊̌̓͑̾̂̈́̀͂̍̈́̈̈́̌͐̿͂̏̈́͘̕͘͘̚̚͘͘̚͜͜͝͝͝͝͝͠ͅͅ", "Oncoming Traffic","There's a pretty good chance that the pony who wrote this died from brutual sacrifice", 
    "Pinkie, stop giggling. This is serious. A dead pony is trying to make contact with us!", "This next pony died when they accidentally choked on some pie", "Orchids is a veterano pachuco, he is impervious to death", "Don't fear the reaper", "The dead want to gaslight us again:", "Alright everypony, here's another message from beyond the grave. Wait Dratini was sacrified??","Eli wont stop asking me if Pony heaven has any 'halapeno poppers' and that 'that shit was so cash'. Here's a message from the afterlife!", "This is where minecraft animals go when you accidentally drown them", 
    "Discord is telling me that they're running a crazy waterbill in the bad place recently. He thinks it's because of the new 'waiting in a long line in a waterpark with no sunscreen' torture method they're trying out there. Anyways, somepony dead has something to say", "When I was a little pegasus I was scared of death. Now I'm terrified.", 
    "Discord keeps telling me that if anypony 'lay a finger on my shawty' he'll send them to the bad place right away. I don't know what that means, but here's a message from the deceased:", "I've been trying out some new desert recipes from Pinkie Pie recently and o-, Nevermind it looks like a dead pony is trying to make contact:", "When I was a little filly, my dad told me that if I didn't wash my hands before dinner I would die of a horrible sickness. Kind of like how this pony died:", "I am sorry to announce to everypony currently in the afterlife that the next wild savannah tour of 'Isle de Mignonne' will not be able to offer infinite chocolate bars. Please visit any of our other attractions", 
    "Eazy-E will be avenged", "I'm gay"],
    //format parameters = role. 
    getroleMessage: ["Alright! You've just been given ${role}", "Sure thing! Now you should have ${role}", "Got it, now you have ${role}", "There you go! ${role}", 
    "welcome to ${role}!"],
  
    resumeMessage:["Resuming!`\` ${song} : ${time} / ${duration} `\`", "I'll resume`\`${song}`\` from `\` ${time} `\` now!", "Starting `\` ${song} `\` back from `\` ${time} `\`", "Resuming `\` ${song} `\`", "starting base cannons back up... `\` ${song} : ${time} / ${duration} `\` "],
    pauseMessage:["Pausing!`\` ${song} : ${time} / ${duration} `\`", "I told Viny Scratch and Octavia to pause. `\` ${song} : ${time} / ${duration}  `\`", "Paused: `\`${song}: ${time} / ${duration}`\`"],
    filterMessage:["Ok, I'm going to throw Octavia's record player into the river now. Applying the ${filter} filter", "Adding the ${filter} filter to the queue. Use the /filter command with the same filter name again to remove it!", "I put the ${filter} effect over the queue! If you change your mind use /filter :${filter} to remove it!",
    "I hope this doesn't wake angel up... I'm adding the ${filter} filter to the queue now! (this might take a minute if the video is long, and the ffmpeg buffer needs to catch up.)", "Alright! I'm going to add the ${filter} effect to the queue. Sit tight, it might take a minute for the sound to start again.",  "Adding the ${filter} effect. If the queue seems to pause for a minute, don't worry! We'll be right back."]
  }
  
}
