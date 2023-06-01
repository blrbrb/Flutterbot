

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
  commands: [
    {
      name: 'avatar',
      description: 'Sends the avatar of a user.',
      options: [
        {
          name: 'user',
          type: 'USER',
          description: 'The user whose avatar you want to be sent.'
        }
      ]
    },
    {
      name: 'boop',
      description: 'Boops a user.',
      options: [
        {
          name: 'user',
          type: 'USER',
          description: 'The user you want to boop.',
          required: true
        }
      ]
    },
    {
    name: 'volume',
    description: 'increase or decrease the volume of the queue',
    options: [
        {
            type: 10,
            name: "volume",
            description: "a volume value 1/100",
            required: true
        }
    ],
   },
   {
    name: 'showme',
    description: 'Show Me Some Art',
    options: [
        {
            type: 3,
            description: "a colour",
            name: "colour",
            required: true
        }
           ],
    },
    {
    name: 'skip',
    description: 'skip the currently playing song',
    options: [
        {
            type: 10,
            name: 'song',
            description: "Queued song to skip e.g '2' will skip the second song in queue"
        }
    ],
  },
  {
  name: 'filter',
  description: 'Apply a filter to playing music',
  helpText: `Manipulate the quality, and add effects to playing music  \n Use: **/filter** <an filter to apply> \n Note: To Remove an activated Filter, simply run the same command twice`,
  options: [
      {
          type: 3,
          name: 'filter',
          description: 'what filter to apply',
          choices: [
              {
                  name: 'Basboost',
                  value: 'bassboost'
              },
              {
                  name: 'Flanger',
                  value: 'flanger'
              },
              {
                  name: 'Reverse',
                  value: 'reverse'
              },
              {
                  name: 'Nightcore',
                  value: 'nightcore'
              },
              {
                  name: 'Vaporwave',
                  value: 'vaporwave'
              },
              {
                  name: 'Phaser',
                  value: 'phaser'
              },
              {
                  name: 'Karaoke',
                  value: 'karaoke'
              },
              {
                  name: '3D',
                  value: '3d'
              },
              {
                  name: 'Surround',
                  value: 'surround'
              },
              {
                  name: 'Gate',
                  value: 'gate'
              },
              {
                  name: 'Tremolo',
                  value: 'tremolo'
              },
              {
                  name: 'EarWax',
                  value: 'earwax'
              },
              {
                  name: 'Mcompand',
                  value: 'mcompand'
              },
              {
                  name: 'Echo',
                  value: 'echo'
              },
              {
                  name: 'Haas',
                  value: 'haas'
              },
              {
                  name: 'Earkiller',
                  value: 'earkiller'
              },
              {
                  name: 'Chorus',
                  value: 'chorus'
              },
              {
                  name: 'Speed200%',
                  value: 'speedx200%'
              },
              {
                  name: 'Speed50%',
                  value: 'speed50%'
              },
              {
                  name: 'OneBit',
                  value: '1bit'
              },
              {
                  name: 'EightBits',
                  value: '8bits'
              },
              {
                  name: 'NormalizeLoudness',
                  value: 'normalize'
              },

          ],
          required: true
      },
      {
          type: 3,
          name: 'ffmpeg',
          description: 'Manually specify a FFMPEG filter to apply directly to the stream'
      }
  ],
}
  ],
  // DO NOT TRANSLATE COMMAND NAMES
  help: {
    user: {
      avatar: ['avatar {user}', `Sends the mentioned user's profile picture. You can also use the user's ID.`],
      userinfo: ['userinfo {user}', 'Shows info about the user. You can mention them or use their ID.'],
      roleinfo: ['roleinfo {role}', 'Shows info about the role. You can type the name of the role to search for it.'],
      serverinfo: ['serverinfo','Shows info about the server.'],
      rank: ['rank {user (optional)}','Shows your current level and XP.'],
      leaderboard: ['leaderboard','Shows the XP leaderboard.'],
      profile: ['profile {field} {new value}','Edit your profile (on all servers).'],
      emoji: ['jumbo {emoji}', 'Sends the emoji as an image.'],
      love: ['love {user 1} {user 2 (optional)}', 'Checks the compatibility level between two users.'],
      boop: ['boop {user}', 'Boops a user.'],
      hug: ['hug {user}', 'Hugs a user.'],
      kiss: ['kiss {user}', 'Kiss a user.'],
      booru: ['booru {query (optional)}', 'Sends a safe image from Manebooru. You can type search tags.'],
      clop: ['clop {query (optional)}', 'Sends a clop image from Manebooru. You can type search tags. Can only be used in NSFW channels.','NSFW'],
      e621: ['e621 {query (optional)}', 'Sends an image from e621. You can type search tags. Can only be used in NSFW channels.','NSFW'],
      torrent: ['torrent', 'Torrent ponies!'],
      say: ['say {text}', 'Chrysalis says what you type.']
    },
    admin: [
      ['setprefix {prefix}', 'Sets the prefix of the bot commands in this server.'],
      ['setlang {language}', 'Sets the language of the bot in this server.'],
      ['setcolor {hex}', 'Sets the default hex color for embeds.'],
      ['addword {word}', 'Blocks a word in the server.'],
      ['delword {word}', 'Unblocks a word in the server.'],
      ['addwords {words}','Blocks a phrase in the server.'],
      ['delwords {words}', 'Unlocks a phrase in the server.'],
      ['listwords', 'Shows the list of blocked words and phrases.'],
      ['clean {number of messages}', 'Bulk deletes messages. Messages older than two weeks can not be deleted.'],
      ['enable {module}', 'Enables a module.'],
      ['disable {module}', 'Disables a module.'],
      ['config {module}', 'Edits a module.'],
      ['reset {module}', 'Resets a module.'],
      ['rolemenu {roleID} {roleID} {roleID}...', 'Creates a role menu. Every argument is a role ID.'],
      ['welcome {user}', 'Shows a preview of the welcome card for the mentioned user.'],
      ['boost {user}', 'Shows a preview of the boost card.'],
      ['setxp {user} {xp}', 'Sets the amount of XP that a user has.'],
      ['importxp', 'Import XP from other level bots.']
    ]
  },
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
    
  },
  errorMessage:
  {
    Distube:
    {
      noQueue: 
      {
        message: "But there isn't a queue! Use /play to search for songs!" 
      }, 
      ageRestricted:
      {
        message: "I'm sorry, it looks like this video is age restricted. "
      }, 
      unavailable: 
      {
        message: "I'm sorry, this video isn't avalible in your region... I can't get to it"
      }
    }

  },
  wrong_channel: 'The command you sent cannot be used in that channel.',
 
}
