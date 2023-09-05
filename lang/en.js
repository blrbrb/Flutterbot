

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
  
 
}
