

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
    boost: {
      message: '**{user} just boosted the server!**',
      title: 'Thank you for boosting the server!',
      description: `${emojis.boost} Enjoy your exclusive role! ${emojis.boost}`
    },
    welcome: {
      message: 'Welcome to **{guild}**! {user}'
    },
    goodbye: {
      message: 'Goodbye, **{user}**. Hope we can see you again soon.',
      banMessage: '**{user}** was banned from the server.'
    }, 
    //format parameters = s{song_name, song_duraion, song_user}
    nowPlaying: ["🎶 Now playing **${song_name}** / ${song_duration} / requested by ${song_user}", "Playing 🎵 ${song_name} / ${song_duration} / for ${song_user} 🎤", "We're listening to ${song_name} / ${song_duration} requested by ${song_user} 🎤"],
    addSong: ["Alright! I'll add ${song_name} to the queue", "No problem. Let me add ${song_name} to the playlist!", "Adding ${song_name} to our queue", "sure thing, we'll add ${song_name} to the queue", "I'll ask Vinyl to add ${song_name} to the tracklist for us", 
              "Got it. Adding ${song_name} to our playlist.", "${song_name}? Consider it done. Adding it to the queue", "Added ${song_name} to the turntable", "I accidentally killed an old woman once! Anyways, added ${song_name} to the queue!", "Here you go, ${song_name} has been queued!",
            "Nice choice! putting ${song_name} onto the queue", "Don't go anywhere, I added ${song_name} to the playlist", "Get ready for ${song_name} because we're gonna be listening to it soon", "Angel has slaughtered countless innocents! Adding ${song_name} to the playlist!", 
           "I like the sound of this one!, adding ${song_name} to the playlist!"]
  },
  errorMessage:
  {
    Distube:
    {
      noQueue:["But there isn't a queue! Use /play to search for songs!", "There isn't any music playing silly try using /play :query: first", "I can't do that! There's not any music playing right now try /play :query"],
      ageRestricted:["I'm sorry, it looks like this video is age restricted."],
      unavailable:["I'm sorry, this video isn't avalible in your region... I can't get to it", "Youtube is telling me to buzz off right now. I can't get any details about this video", "There's something wrong on Youtube's end. Is this video copyrighted, Age Restricted, or unavalible?"]
      
    },
    quotesfromError:
    {
      //format parameters = name
      noQuotesForMember: ["${name} hasn't said anything quotable in this server yet", "no quotes for ${name} here :(", "*chirp chirp* ${name} hasn't been quoted in this server before"],
      //format parameters = none 
      noQuotesForGuild: ["there have not been any quotes saved to this guild yet! Use /serverquote to save something special", 
      "Ponyville town hall doesn't seem to have any records for quotes in this server... use /serverquote to make some", "It doesn't look like there's anything saved here. Use /serverquote to register new quotes for this server"],
    },
    wrong_channel: 'The command you sent cannot be used in that channel.'

  },

  commandResponses:
  {
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
    "Eazy-E will be avenged"],

  }
  
 
}
