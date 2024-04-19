const {
  PermissionFlagsBits,
  SnowflakeUtil
} = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');

const colors = {
  "": "\x1b[0m",
  italic: "\x1B[3m",
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  grey: "\x1b[90m",

  bgblack: "\x1b[40m",
  bgred: "\x1b[41m",
  bggreen: "\x1b[42m",
  bgyellow: "\x1b[43m",
  bgblue: "\x1b[44m",
  bgmagenta: "\x1b[45m",
  bgcyan: "\x1b[46m",
  bgwhite: "\x1b[47m",
  bggray: "\x1b[100m",
  bggrey: "\x1b[100m"
}

class Log {

  constructor({
      modifierList = [],
      message = '',
      logAll = true,
      forced = true,
      tofile = true,
      clear = Boolean,
      frame = ''
  }) {
      !logAll && console.log(`${colors.bright}${colors.red}TAKE CARE TO NOTE LOGALL IS DISABLED${colors.reset}`);
      console.log(clear);
      if (clear) this.clearLog();
      console.log(frame);
      return function(modifierList, message, forced, frame) {
          if (!logAll && !forced) return;
          if (Array.isArray(message)) {
              message = message.join(" ");
          }
          if (message === undefined) {
              message = modifierList;
              modifierList = "";
          }
          if (frame) {
              console.log(`${colors.underscore}${frame}${colors.reset}`);
          }


          let pirate = modifierList.toLowerCase().split(" ");
          let combine = "";
          pirate.forEach(c => colors[c] ? combine += colors[c] : null);
          console.log(`${combine}${message}${colors.reset}`);
          if (tofile) {

              fs.appendFile('Flutterbot.log', message + '\n', (err) => {
                  if (err) {
                      console.error('Error writing to log file:', err);
                  }
              });
          }

      }
  }


  clearLog() {
      fs.writeFile('Flutterbot.log', '', (err) => {
          if (err) {
              console.error('Error clearing the log file:', err);
          } else {
              console.log('Log file cleared successfully.');
          }
      });
  }
}

module.exports = {
  async getImage(message) {
      const the_channel = message.channel.id;

      // let messageList = await the_channel.fetch().sort(function (a, b) { return b.createdAt - a.createdAt }).array();

      let messageList = (await message.guild.channels.cache.get(the_channel).messages.fetch({
          count: 2
      })).array();
      for (const messageCheck of messageList) {
          if (messageCheck.attachments.array().length !== 0) {
              const result = await client.fileCheck(messageCheck.attachments.array()[0].url);
              if (result !== "Attachment not found") {
                  return result;
              }
          } else if (messageCheck.embeds.length !== 0) {
              if (messageCheck.embeds[0].thumbnail) {
                  const result = await client.fileCheck(messageCheck.embeds[0].thumbnail.url);
                  if (result !== "Attachment not found") {
                      return result;
                  }
              } else if (messageCheck.embeds[0].image) {
                  const result = await client.fileCheck(messageCheck.embeds[0].image.url);
                  if (result !== "Attachment not found") {
                      return result;
                  }
              }
          }
      }

  },
  removeEveryoneMentions(text) {
      // Define regex pattern to match @everyone mentions
      const pattern = /@everyone/g;

      // Use String.replace() to replace all matches of the pattern with an empty string
      const updatedText = text.replace(pattern, "");

      // Return the updated text
      return updatedText;
  },
  formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
  },
  isValidHexColor(color) {

      const hexColorPattern = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;


      return hexColorPattern.test(color);

  },
  formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
  },

  stringToDate(RawDateString) {

      const results = chrono.parse(RawDateString);
      const cleaned = module.exports.consolidateTimeObjects(results[0].start.impliedValues, results[0].start.knownValues);

      if (results.length === 0) {
          console.log('unable to parse date')
          console.log(results)
          return false; // Couldn't parse a date
      }
      let parsed = new Date();
      module.exports.parseDate(cleaned, parsed);


    
      // parsedDate.setUTCHours(parsed.hour, parsed.minutes, parsed.second, parsed.millisecond);



      //convert the parsed values into a date object
      //parsedDate.setFullYear(parsed.year);
      //parsedDate.setHours(parsed.hour);
      const currentDate = new Date();
    
      if (parsed < currentDate) {
          return false; // Date has already passed
      }

      return parsed;
  },
  parseDate(results, Date) {

      Date.setUTCFullYear(results.year, results.month - 1, results.day);
      Date.setUTCHours(results.hour, results.minute, results.second);

  },
  consolidateTimeObjects(impliedValues, knownValues) {
      // Define an object with all possible time components
      const universalObject = {
          year: 0,
          month: 0,
          day: 0,
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
      };

      // Iterate over the keys in the impliedValues object and add them to the universalObject
      for (const key in impliedValues) {
          if (universalObject.hasOwnProperty(key)) {
              universalObject[key] = impliedValues[key];
          }
      }

      // Iterate over the keys in the knownValues object and add them to the universalObject
      for (const key in knownValues) {
          if (universalObject.hasOwnProperty(key)) {
              universalObject[key] = knownValues[key];
          }
      }

      return universalObject;
  },

  langRand(langArray) {
      const randomIndex = Math.floor(Math.random() * langArray.length);
      const randomElement = langArray[randomIndex];
      //OH FUCK yeah. I feel kinda clever for this one. SHIT IS COCAINE. 
      const rendered_message = module.exports.removeEveryoneMentions(randomElement);
      return randomElement;
  },
  convertToTimezone(date, targetTimezone) {
      const options = {
          timeZone: targetTimezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false, // Use 24-hour format
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      return formatter.format(date);

  },
  resolveGuildID(object) {
      if (!typeof(object) == 'object') {
          alert('attempting to resolve id from raw string or number');
          if (module.exports.IsSnowflake(object))
              return object;
          else return false;
      }

      if (object instanceof Discord.Guild)
          return object.id;
      else if (object.guild && object.guild instanceof Discord.Guild)
          return object.guild.id;
      else return false;



  },
  resolveUserID(object) {

      if (!typeof(object) == 'object') {
          alert('attempting to resolve id from raw string or number');
          if (module.exports.IsSnowflake(object))
              return object;
          else throw new Error(`unable to resolve User Snowflake ID from ${object}`);
      }
      if (object instanceof Discord.User)
          return object.id;
      else if (object.user && object.user instanceof Discord.User)
          return object.user.id;
      else if (object.member && object.member instanceof Discord.GuildMember)
          return object.member.id;
      else if (object.author && object.author instanceof Discord.User)
          return object.author.id;
      else return false;
  },

  resolveID(IDResolveable) {
      if (module.exports.IsSnowflake(IDResolveable))
          return IDResolveable;
      let ID;
      ID = module.exports.resolveGuildID(IDResolveable) !== false ? module.exports.resolveGuildID(IDResolveable) : module.exports.resolveUserID(IDResolveable);
      if (typeof(ID) === 'boolean')
          throw new Error('unable to resolve ID');
      else
          return ID;



  },

  ProgressBar(current, whole) {
      //This is NOT my code. 
      //All emily. Just making it so that I can use it elsewhere also 
      if (current > whole) {
          return "cant calculate percentage to display";
      }

      let Percent = (current / whole) * 100;
      let PerTen = Math.floor(Percent / 10);
      let percentBar = `${'🟥'.repeat(PerTen)}${'⬜'.repeat(10 - PerTen)}`;
      return percentBar;
  },
  displayList(array) {
      if (!array.length) return log("bright green", "\nEmpty\n");
      let headers = Object.keys(array[0]);
      let table = new Array(array.length + 2).fill().map(() => new Array(headers.length));
      for (let i = 0; i < headers.length; i++) {
          let h_fixed = headers[i].split("_").filter(x => x).map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join(' ');
          table[0][i] = h_fixed;
          for (let j = 0; j < array.length; j++) {
              let d = array[j][headers[i]];
              table[2 + j][i] = String(d);
          }
          let mCount = 0;
          for (let j = 0; j < table.length; j++) {
              if (j == 1) continue;
              mCount = Math.max(mCount, table[j][i].length);
          }
          table[1][i] = ("").padEnd(mCount, "-");
          for (let j = 0; j < table.length; j++) {
              if (j == 1) continue;
              table[j][i] = table[j][i].padEnd(mCount, " ");
          }
      }
      table.map(pirate => pirate.join("  "));
      log("");
      for (let i = 0; i < table.length; i++) {
          if (i == 0) log("bright blue", table[i]);
          else if (i == 1) log("bright white", table[i]);
          else log("bright green", table[i]);
      }
      log("");
      return;
  },
  ID() {
      module.exports.generate = function() {
          return new Date().valueOf();
      }
  },
  format(template, replacements) {
      return template.replace(/\${(.*?)}/g, (match, key) => {
          // Check if the key exists in replacements, otherwise, return the original match
          return replacements.hasOwnProperty(key) ? replacements[key] : match;
      });
  },
  isYoutubeUrl(url) {

      // Regular expressions to match different YouTube link formats
      const youtubeShortRegex = /youtu.be\/([^?&]+)/;
      const youtubeRegularRegex = /youtube\.com\/(?:watch\?v=|shorts\/)([^?&]+)/;
      const youtubeMusicRegex = /music\.youtube\.com\/watch\?v=([^?&]+)/;
      return (
          youtubeShortRegex.test(url) ||
          youtubeRegularRegex.test(url) ||
          youtubeMusicRegex.test(url)
      );
  },
  formatYtLink(input) {

      const youtubeShortRegex = /youtu.be\/([^?&]+)/;
      const youtubeRegularRegex = /youtube\.com\/(?:watch\?v=|shorts\/)([^?&]+)/;
      const youtubeMusicRegex = /music\.youtube\.com\/watch\?v=([^?&]+)/;

      // Check if the input matches any of the regex patterns
      if (youtubeShortRegex.test(input)) {
          const match = input.match(youtubeShortRegex);
          if (match && match[1]) {
              const videoId = match[1];
              return `https://youtube.com/watch?v=${videoId}`;
          }
      } else if (youtubeRegularRegex.test(input)) {
          const match = input.match(youtubeRegularRegex);
          if (match && match[1]) {
              const videoId = match[1];
              return `https://youtube.com/watch?v=${videoId}`;
          }
      } else if (youtubeMusicRegex.test(input)) {
          const match = input.match(youtubeMusicRegex);
          if (match && match[1]) {
              const videoId = match[1];
              return `https://youtube.com/watch?v=${videoId}`;
          }
      }

      // If no match is found, return the input as is
      return input;
  },

  isSpotifyUrl(url) {
      const SPexp = RegExp(/^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+(\?[^\s]+)?$/);
      console.log(SPexp.test(url));
      if (SPexp.test(url))
          return 'spotify';
      else
          return false;
  },
  isSoundCloudUrl(url) {
      const SCexp = RegExp(/^https:\/\/soundcloud\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\?[^\s]+)?$/);
      if (SCexp.test(url)) {
          return 'soundcloud';
      } else {
          return false;
      }
  },
  MusicMediaUrl(url) {
      if (module.exports.isYoutubeUrl(url)) {
          return "yt";
      }
      if (module.exports.isSpotifyUrl(url)) {
          return "spotify";
      }
      if (module.exports.isSoundCloudUrl(url)) {
          return "soundcloud";
      } else {
          return "";
      }

  },
  hasVoiceChannelPermissions(interaction, Flutterbot) {
      const self = interaction.guild.members.cache.get(Flutterbot.client.user.id);
      if (!self.permissions.has(PermissionFlagsBits.Connect) || !self.permissions.has(PermissionFlagsBits.Speak)) {
          return false;
      } else {
          return true;
      }
  },
  nsfwChannel(interaction) {
      if (interaction.hasOwnProperty('channel')) {
          return interaction.channel.nsfw
      }
      if (interaction.hasOwnProperty('member')) {
          if (interaction.member.hasOwnProperty('voice')) {
              if (interaction.member.voice.hasOwnProperty('channel')) {
                  return interaction.member.voice.channel.nsfw;
              }
              return false;
          }
          return false;
      } else {
          return false;
      }
  },
  IsSnowflake(integer_id) {
      try {
          return SnowflakeUtil.deconstruct(integer_id).timestamp > SnowflakeUtil.epoch;
      } catch {
          return false;
      }
  },
  printCurrentFrame() {
      const stack = new Error().stack;
      const callerLine = stack.split("\n")[2].trim();
      return callerLine;
  },
  sharedKeys(obj1, obj2) {
      for (const key in obj1) {
          let keys = [];
          if (obj2.hasOwnProperty(key)) {
              keys.push(key);
          }
      }
      return keys; // No common keys found
  },
  Log
}