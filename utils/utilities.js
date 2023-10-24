"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.format = exports.Logcolors=exports.IsSnowflake= exports.mergeArrays=exports.MusicMediaUrl=exports.convertToTimezone
exports.findAllCommands = exports.formatSeconds= exports.formatYtLink = exports.getArrayType = exports.getExtension = exports.getSnowflakeType=
exports.findFiles=exports.langRand = exports.nsfwChannel = exports.printCurrentFrame = exports.removeEveryoneMentions = exports.resolveGuildID=
exports.resolveID = exports.resolveUserID = exports.sharedKeys= void 0;
const discord_js_1 = require("discord.js");
const fs = __importStar(require("fs"));
const types_1 = require("./types");
const path = __importStar(require("path"));

    const Logcolors = {
        "italic": "\x1B[3m",
        "reset": "\x1b[0m",
        "bright": "\x1b[1m",
        "dim": "\x1b[2m",
        "underscore": "\x1b[4m",
        "blink": "\x1b[5m",
        "reverse": "\x1b[7m",
        "hidden": "\x1b[8m",
        "black": "\x1b[30m",
        "red": "\x1b[31m",
        "green": "\x1b[32m",
        "yellow": "\x1b[33m",
        "blue": "\x1b[34m",
        "magenta": "\x1b[35m",
        "cyan": "\x1b[36m",
        "white": "\x1b[37m",
        "gray": "\x1b[90m",
        "grey": "\x1b[90m",
        "bgblack": "\x1b[40m",
        "bgred": "\x1b[41m",
        "bggreen": "\x1b[42m",
        "bgyellow": "\x1b[43m",
        "bgblue": "\x1b[44m",
        "bgmagenta": "\x1b[45m",
        "bgcyan": "\x1b[46m",
        "bgwhite": "\x1b[47m",
        "bggray": "\x1b[100m",
        "bggrey": "\x1b[100m"
    };
    /**
         * erases all data in the log file
         *
         */
    function clearLog() {
        fs.writeFile('Flutterbot.log', '', (err) => {
            if (err) {
                console.error('Error clearing the log file:', err);
            }
            else {
                console.log('Log file cleared successfully.');
            }
        });
    }
    /**
     * A simple logger for Flutterbot. Written by [NekoNoka]({@link NekoNokaUrl})
     * @param {string[]} modifierList modifiers listed in {@link Logcolors} that can be used to change the color, weight, etc of log text
     * @param {string} message the message to log (optional)
     * @param {boolean} logAll (optional) default true tsc
     * @param {boolean} forced force a message (optional)
     * @param {boolean} tofile write to Flutterbot.log (optional)
     * @param {boolean} clear clear Flutterbot.log (optional)
     * @param {string} frame provide a frame to print with an error message (optional)
     * @return {void}
     *
     */
    function Log(modifierList, message, logAll = true, forced = true, tofile = true, clear = false, frame) {
        !logAll && console.log(`${utilities_1.Logcolors.bright}${utilities_1.Logcolors.red}TAKE CARE TO NOTE LOGALL IS DISABLED${utilities_1.Logcolors.reset}`);
        if (clear)
            clearLog();
        if (!logAll && !forced)
            return;
        if (Array.isArray(message)) {
            message = message.join(" ");
        }
        if (Array.isArray(modifierList)) {
            modifierList = modifierList.join(" ");
        }
        if (message === undefined && modifierList) {
            message = modifierList;
            modifierList = "";
        }
        else if (modifierList === undefined && message) {
            modifierList = message;
            message = "";
        }
        if (frame) {
            console.log(`${Logcolors.underscore}${frame}${Logcolors.reset}`);
        }
        let pirate = modifierList ? modifierList.toLowerCase().split(" ") : [];
        let combine = "";
        pirate.forEach(c =>Logcolors[c] ? combine +=Logcolors[`${c}`] : null);
        console.log(`${combine}${message}${Logcolors.reset}`);
        if (tofile) {
            fs.appendFileSync('Flutterbot.log', message + '\n');
        }
    }
    exports.Log = Log;
    /**
     * fill placeholder templates in a string with a value
     *
     * @summary templates are denoted by '{}', with a variable name within the square brackets
     * @example
     *      //replace "location" with "the store"
     * const string = "I want to go to the {location}"
     *      format(string, {"location"="the store"})
     * @param {string} template
     * @param {fsLangTemplate} template
     * @return {string}
     */
    function format(string, template) {
        return string.replace(/\${(.*?)}/g, (match, key) => {
            // Check if the key exists in replacements, otherwise, return the original match
            return template.hasOwnProperty(key) ? template[key] : match;
        });
    }
    exports.format = format;
    /**
     * Determine wether or not Fluttershy has permission to speak in a voice based channel
     *
     * @param {Interaction} interaction a discord {@link Interaction} object
     * @param {Client} Flutterbot
     * @return {boolean}
     */
    function hasVoiceChannelPermissions(interaction, Flutterbot) {
        if (!Flutterbot.user)
            throw new types_1.Errors.fsClientError('unable to find a refrence to myself!');
        if (!interaction.guild)
            throw new types_1.Errors.fsAPIError('this interaction has not been sent in a valid guild');
        const self = interaction.guild.members.cache.get(Flutterbot.user.id);
        if (!self)
            throw new types_1.Errors.fsClientError('unable to determine my own ID!');
        else {
            if (!self.permissions.has(discord_js_1.PermissionFlagsBits.Connect) || !self.permissions.has(discord_js_1.PermissionFlagsBits.Speak)) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    exports.hasVoiceChannelPermissions = hasVoiceChannelPermissions;
    /**
     * Determine wether or not a voice based channel is nsfw
     *
     * @param {Interaction} [interaction] a discord {@link Interaction} object
     * @return {boolean}
     * @throws {Error} if the object used to check does not have a member with a valid voice state.
     */
    function nsfwChannel(interaction) {
        if (!interaction.member || !(interaction.member instanceof discord_js_1.GuildMember)) {
            throw new types_1.Errors.fsClientError('this interaction has no member property');
        }
        if (!interaction.member.voice) {
            throw new types_1.Errors.fsClientError('member is not conncected to voice state!');
        }
        if (interaction.hasOwnProperty('member')) {
            if (interaction.member.hasOwnProperty('voice')) {
                if (interaction.member.voice.channel && interaction.member.voice.channel instanceof discord_js_1.VoiceChannel
                    && interaction.member.voice.channel.nsfw) {
                    return true;
                }
                return false;
            }
            return false;
        }
        else {
            return false;
        }
    }
    exports.nsfwChannel = nsfwChannel;
    /**
     * return a random response from an array of default responses
     *
     * @param {Array<string>} [langArray]
     * @return {string}
     */
    function langRand(langArray) {
        const randomIndex = Math.floor(Math.random() * langArray.length);
        const randomElement = langArray[randomIndex];
        const rendered_message = removeEveryoneMentions(randomElement);
        return rendered_message;
    }
    exports.langRand = langRand;
    /**
     * Remove Everyone mentions from a string
     * @author NekoNoka
     * @param {string} [text]
     * @return {string}
     */
    function removeEveryoneMentions(text) {
        const pattern = /@everyone/g;
        const updatedText = text.replace(pattern, "");
        return updatedText;
    }
    exports.removeEveryoneMentions = removeEveryoneMentions;
    /**
     * Formats a value in seconds into [hh]:[mm]:[ss] for the clean display of video and audio length
     * @param {number} seconds
     * @returns {string} the seconds, formatted into [hh]:[mm]:[ss]
     */
    function formatSeconds(seconds) {
        if (seconds > 60 ** 2) //if the supplied value in seconds is greater than one hour (60 squared?? right)
         {
            const hours = Math.floor(seconds / 60);
            const minutes = Math.floor(hours / 60);
            const remainingSeconds = seconds % 60;
            const formattedHours = String(hours).padStart(3, '0');
            const formattedMinutes = String(minutes).padStart(3, '0');
            const formattedSeconds = String(remainingSeconds).padStart(3, '0');
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    exports.formatSeconds = formatSeconds;
    /**
     * Determine wether or not a string or bigint is a valid Discord Snowflake
     *
     * @name IsSnowflake
     * @param {string |bigint} integer_id
     * @returns {(boolean | Snowflake)} Snowflake if provided args are valid snowflake, false if not
     */
    function IsSnowflake(integer_id) {
        try {
            return discord_js_1.SnowflakeUtil.deconstruct(integer_id).timestamp > discord_js_1.SnowflakeUtil.epoch;
        }
        catch (_a) {
            return false;
        }
    }
    exports.IsSnowflake = IsSnowflake;
    /**
     * Fetch the unique Snowflake ID of a guild, accepts any discord api object that can be
     * reduced into a "guild.id" property
     * @param {fsGuildIDResolvable} [object] a discord api object that can be resovled into a unique {@link Guild} snowflake ID. see {@link fsGuildIDResolvable}
     * @return {Snowflake} the resolved snowflake ID as string.
     */
    function resolveGuildID(fsGuildIDResolvable) {
        if (typeof (fsGuildIDResolvable) === 'string') {
            if (IsSnowflake(fsGuildIDResolvable)) {
                if (getSnowflakeType(fsGuildIDResolvable) === types_1.fsSnowflakeType.Guild) {
                    return fsGuildIDResolvable;
                }
                else
                    throw new types_1.Errors.fsTypeError(`unable to resolve Guild ID. This string is a valid snowflake, but not for a guild`);
            }
            else
                throw new types_1.Errors.fsTypeError(`unable to resolve Guild ID. This string is not a valid snowflake`);
        }
        else {
            if (fsGuildIDResolvable instanceof discord_js_1.Guild)
                return fsGuildIDResolvable.id;
            else if (fsGuildIDResolvable.guild && fsGuildIDResolvable.guild instanceof discord_js_1.Guild)
                return fsGuildIDResolvable.guild.id;
            else
                throw new types_1.Errors.fsTypeError(`unable to resolve Guild ID`);
        }
    }
    exports.resolveGuildID = resolveGuildID;
    /**
     * Fetch the unique snowflake ID of a User
     *
     * @name resolveUserID
     * @param {fsUserIDResolvable} [fsUserIDResolvable] a discord api object that can be resovled into a unique {@link User} snowflake ID. see {@link fsUserIDResolvable}
     * @returns {Snowflake} the resolved snowflake ID as string.
     */
    function resolveUserID(fsUserIDResolvable) {
        if (typeof (fsUserIDResolvable) === 'string') {
            if (IsSnowflake(fsUserIDResolvable)) {
                if (getSnowflakeType(fsUserIDResolvable) === types_1.fsSnowflakeType.User) {
                    return fsUserIDResolvable;
                }
                else
                    throw new types_1.Errors.fsTypeError(`unable to resolve User ID. This string is a valid snowflake, but not for a user`);
            }
            else
                throw new types_1.Errors.fsTypeError(`unable to resolve User ID. This string is not a valid snowflake`);
        }
        else {
            if (fsUserIDResolvable instanceof discord_js_1.Message)
                return fsUserIDResolvable.author.id;
            if (fsUserIDResolvable instanceof discord_js_1.User)
                return fsUserIDResolvable.id;
            if (fsUserIDResolvable instanceof discord_js_1.MessageReaction)
                if (fsUserIDResolvable.message.author)
                    return fsUserIDResolvable.message.author.id;
                else
                    throw new types_1.Errors.fsTypeError(`unable to resolve User ID, MessageReaction.message.author is undefined`);
            else if (fsUserIDResolvable.user && fsUserIDResolvable.user instanceof discord_js_1.User)
                return fsUserIDResolvable.user.id;
            else
                throw new types_1.Errors.fsTypeError(`unable to resolve User ID for this object`);
        }
    }
    exports.resolveUserID = resolveUserID;
    /**
     * @summary Fetch the Snowflake ID from any valid discord API object
     *          Similar to {@link resolveGuildID} and {@link resolveUserID} expect
     *          with the ability to resolve for both user and guild ids.
    
     *          (note that objects with seperate instances of the id property will not work here. e.g. GuildMember with
     *          an id for both "Guild" and "User". In these cases it would be wise to call {@link resolveGuildID} or {@link resolveUserID} respectively)]
     *
     * @param {fsIDResolvable} [IDResolvable] a discord api object that can be resovled into a unique snowflake ID. see {@link fsIDResolvable}
     * @returns {Snowflake} the resolved snowflake ID as string.
     */
    function resolveID(IDResolvable) {
        if (IDResolvable instanceof discord_js_1.Guild || IDResolvable instanceof discord_js_1.User)
            return IDResolvable.id;
        ///FUCKIN LOL 
        else if (IDResolvable instanceof discord_js_1.BaseGuildVoiceChannel || IDResolvable instanceof discord_js_1.BaseGuildTextChannel ||
            IDResolvable instanceof discord_js_1.Role || IDResolvable instanceof discord_js_1.GuildEmoji ||
            IDResolvable instanceof discord_js_1.ForumChannel || IDResolvable instanceof discord_js_1.GuildChannel) {
            return IDResolvable.guild.id;
        }
        else if (typeof (IDResolvable) === 'string' && IsSnowflake(IDResolvable)) {
            return IDResolvable;
        }
        else if (IDResolvable instanceof discord_js_1.GuildMember) {
            throw new types_1.Errors.fsTypeError('cannot resolve ID on GuildMember object due to conflicting ID values for both Guild and User');
        }
        else
            throw new types_1.Errors.fsTypeError('unable to resolve ID');
    }
    exports.resolveID = resolveID;
    /**
     * find image attachments on discord Objects without a built in option 
     * to fetch attachments
     * @param {Message}
     * @return {str | undefined} 
     */
    function imageFinder(message){ 
    return new Promise(async (resolve, reject) => {
        try {
            // if (message.attachments.size > 0) {
            //   // If message has image attachment
            //   let imgUrl = await message.attachments.first();
            //   resolve(imgUrl.proxyURL); // Resolve image URL
            // } else if (message.embeds[0] && msg.embeds[0].type == "image") {
            //   // If message has image embed
            //   let imgUrl = message.embeds[0].url;
            //   resolve(imgUrl); // Resolve image URL
            // } else {
          
            let messages = await message.channel.messages.fetch({ limit: 2 });
            let attachmentMessages = messages
                .map((message) => {
                    let attachmentURL = undefined;
                    if (message.attachments.first()) {
                        attachmentURL = message.attachments.first().proxyURL;
                       console.log(attachmentURL); // If message has image attachment set as URL
                    } else {
                        if (message.embeds[0] && message.embeds[0].type == "image") {
                            attachmentURL = message.embeds[0].url;
                            console.log("jpg/png image found"); // If message has image embed set as URL
                        }
                        if (message.embeds[0] && message.embeds[0].type == "gifv") {
                            attachmentURL = message.embeds[0].url + (message.embeds[0].url.match(/(\.gif)/gi) ? "" : ".gif");
                                console.log("gif image found"); // If message has gifv embed set as URL (Ensuring it ends with .gif)
                        }
                        if (message.embeds[0] && message.embeds[0].image != null) {
                            attachmentURL = message.embeds[0].image.url; 
                            console.log(message.embeds[0].image.url);// If message is an embed with an image
                        }
                    }
                    if (attachmentURL) console.log("image found"); return attachmentURL; // Return image URL for each message
                })
                .filter((a) => a != undefined); // Filter out messages with no image
            if (attachmentMessages[0]) {
                resolve(attachmentMessages[0]); // Resolve image URL
            } else {
                reject("No Image found");
            }
            // }
        } catch (e) {
            reject(e);
        }
    });}
    exports.imageFinder = imageFinder; 
    /**
     * Determine wether or not an object has shared keys with another object.
     *
     * @param {object} [obj1]
     * @param {object} [obj2]
     * @returns {string | string[]}
     */
    function sharedKeys(obj1, obj2) {
        let keys = [];
        for (const key in obj1) {
            if (obj2.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        if (keys.length && keys.length > 1)
            return keys; //Multiple common keys found
        else if (keys.length == 1)
            return keys[0]; //One common key found
        else
            return ""; // No common keys found
    }
    exports.sharedKeys = sharedKeys;
    /**
    * get the dataype of an array
    
     * @param {Array<any>} [arr]
     * @return {{type: number, typeName:string}}
     */
    function getArrayType(arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            const firstElementType = typeof arr[0];
            switch (firstElementType) {
                case "number":
                    return {
                        type: types_1.DataTypes.Number, typeName: "Number"
                    };
                case "string":
                    return {
                        type: types_1.DataTypes.String, typeName: "String"
                    };
                case "boolean":
                    return {
                        type: types_1.DataTypes.Boolean, typeName: "Boolean"
                    };
                case "object":
                    if (Array.isArray(arr[0])) {
                        return {
                            type: types_1.DataTypes.Array,
                            typeName: "Array"
                        };
                    }
                    else if (arr[0] === null) {
                        return {
                            type: types_1.DataTypes.Object,
                            typeName: "Object"
                        };
                    }
                    else {
                        return {
                            type: types_1.DataTypes.Object,
                            typeName: "Object"
                        };
                    }
                case "function":
                    return {
                        type: types_1.DataTypes.Function, typeName: "Function"
                    };
                default:
                    return {
                        type: types_1.DataTypes.Unknown, typeName: "Unknown"
                    };
            }
        }
        else {
            return {
                type: types_1.DataTypes.Unknown,
                typeName: "Unknown"
            };
        }
    }
    exports.getArrayType = getArrayType;
    /**
     * Merge the contents of two arrays together
     * @param {Array<any>} [arr1]
     * @param {Array<any>} [arr2]
     * @return {Array<any>}
     */
    function mergeArrays(arr1, arr2) {
        // Check if both arrays have the same data type (numeric or string)
        if ((Array.isArray(arr1) && Array.isArray(arr2)) &&
            (arr1.length > 0 && typeof arr1[0] === typeof arr2[0])) {
            // Merge the arrays
            return arr1.concat(arr2);
        }
        else {
            // Arrays are of different data types, handle the error or return an empty array
            throw new types_1.Errors.fsTypeError(`Incompatible array types received ${typeof arr1[0]} and ${typeof arr2[0]}`);
        }
    }
    exports.mergeArrays = mergeArrays;
    /**
     * Returns true if "url" is a link to media on YouTube
     *
     * @param {string} [url]
     * @returns {boolean}
     */
    function isYoutubeUrl(url) {
        // Regular expressions to match different YouTube link formats
        const youtubeShortRegex = /youtu.be\/([^?&]+)/;
        const youtubeRegularRegex = /youtube\.com\/(?:watch\?v=|shorts\/)([^?&]+)/;
        const youtubeMusicRegex = /music\.youtube\.com\/watch\?v=([^?&]+)/;
        return (youtubeShortRegex.test(url) ||
            youtubeRegularRegex.test(url) ||
            youtubeMusicRegex.test(url));
    }
    /**
     * Returns true if "url" is a link to media on Spotify
     * @param {string} [url]
     * @return {boolean}
     */
    function isSpotifyUrl(url) {
        const SPexp = RegExp(/^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+(\?[^\s]+)?$/);
        if (SPexp.test(url))
            return true;
        else
            return false;
    }
    /**
     * Returns true if "url" is a link to media on SoundCloud
     * @param {string} url
     * @return {boolean}
     */
    function isSoundCloudUrl(url) {
        const SCexp = RegExp(/^https:\/\/soundcloud\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\?[^\s]+)?$/);
        if (SCexp.test(url)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Determine the origin of a media url, returns a string representing the name of media's source
     * @example
     *  //will return "yt"
     *  const sourceType = MusicMediaUrl(https://www.youtube.com/watch?v=mrFOdmzPwcg)
     * @param {string} [url]
     * @return {('yt' | 'soundcloud' | 'spotify' | '')}
     */
    function MusicMediaUrl(url) {
        if (isYoutubeUrl(url)) {
            return "yt";
        }
        if (isSpotifyUrl(url)) {
            return "spotify";
        }
        if (isSoundCloudUrl(url)) {
            return "soundcloud";
        }
        else {
            return "";
        }
    }
    exports.MusicMediaUrl = MusicMediaUrl;
    /**
     * Convert a Date into a timezone specified by timezone str.
     *
     * @param {Date} [date]
     * @param {string} [targetTimezone]
     * @return {Date}
     */
    function convertToTimezone(date, targetTimezone) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: targetTimezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // Use 24-hour format
        });
        return formatter.format(date);
    }
    exports.convertToTimezone = convertToTimezone;
    function printCurrentFrame() {
        const stack = new Error().stack;
        if (stack) {
            const callerLine = stack.split("\n")[2].trim();
            return callerLine;
        }
        else {
            throw new types_1.fsError('unable to initalize callerLine from stack');
        }
    }
    exports.printCurrentFrame = printCurrentFrame;
    /**
     * Find all files in a directory with a given extension
     * Written by [NekoNoka]({@link NekoNokaUrl})
     *
     * @param {string} [dirname]
     * @param {string} [relativePath]
     * @param {string} [endsWith='']
     * 
     */
    function findFiles(dirname, relativePath, endsWith = '') {
        try {
            return fs.readdirSync(path.join(dirname, relativePath)).filter(folder => !folder.startsWith('_') && !folder.startsWith('.DS_STORE') && folder.endsWith(endsWith));
        }
        catch (error) {
            throw new types_1.fsError(error);
        }
    }
    exports.findFiles = findFiles;
    /**
     * Format links to content on Youtube into their proper parseable format
     *
     * @summary links in the domains 1.youtu.be 2.music.youtube 3.youtube.com/watch?v=shorts
     * will all need to be formatted.
     * @param {string} [url] url to check / format
     * @return {string}
     */
    function formatYtLink(url) {
        const youtubeShortRegex = /youtu.be\/([^?&]+)/;
        const youtubeRegularRegex = /youtube\.com\/(?:watch\?v=|shorts\/)([^?&]+)/;
        const youtubeMusicRegex = /music\.youtube\.com\/watch\?v=([^?&]+)/;
        // Check if the url matches any of the regex patterns
        if (youtubeShortRegex.test(url)) {
            const match = url.match(youtubeShortRegex);
            if (match && match[1]) {
                const videoId = match[1];
                return `https://youtube.com/watch?v=${videoId}`;
            }
        }
        else if (youtubeRegularRegex.test(url)) {
            const match = url.match(youtubeRegularRegex);
            if (match && match[1]) {
                const videoId = match[1];
                return `https://youtube.com/watch?v=${videoId}`;
            }
        }
        else if (youtubeMusicRegex.test(url)) {
            const match = url.match(youtubeMusicRegex);
            if (match && match[1]) {
                const videoId = match[1];
                return `https://youtube.com/watch?v=${videoId}`;
            }
        }
        // If no match is found, return the url as is
        return url;
    }
    exports.formatYtLink = formatYtLink;
    /**
     * fetch the extension / type of a file
     * @param {*} url path to the file
     * @return {string} the file's extension
     */
    function getExtension(url) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }
    exports.getExtension = getExtension;
    /**
     * Determines what type of API object a {@link Snowflake} originated from
     *
     * @param {string} [snowflake]
     * @return {fsSnowflakeType}
     */
    function getSnowflakeType(snowflake) {
        const binarySnowflake = BigInt(snowflake).toString(2).padStart(64, '0');
        const objectTypeBits = binarySnowflake.slice(22, 30);
        return parseInt(objectTypeBits, 2);
    }
    exports.getSnowflakeType = getSnowflakeType;
    /**
     * Fetch all of Flutterbot's commands neatly into a collection
     * #### author [NekoNoka]({@link NekoNokaUrl})
     * @export
     * @return {{SlashCommands: fsCommands, PrefixCommands:fsCommands}}
     */
    function findAllCommands() {
        let prefixFiles = findFiles(__dirname, '../commands/prefix', '.js');
        let slashFiles = findFiles(__dirname, '../commands/slash', '.js');
        let PrefixCommands = new discord_js_1.Collection();
        let SlashCommands = new discord_js_1.Collection();
        //init text input commands
        for (let file of prefixFiles) {
            let command = require(`../commands/prefix/${file}`);
          
            // let total = commandFiles.length;
            // process.stdout.clearLine();
            // process.stdout.cursorTo(0);
            // process.stdout.write("loading commands: " + Math.round((1 + commandFiles.indexOf(file)) / total * 100) + "%");
            PrefixCommands.set(command.name, command);
            process.stdout.write(" ");
        }
        // console.log(' ');
        //init the slash commands
        for (let file of slashFiles) {
            let command = require(`../commands/slash/${file}`);
            // let total = slashFiles.length;
            // process.stdout.clearLine();
            // process.stdout.cursorTo(0);
            // process.stdout.write("loading Slash Commands: " + Math.round((1 + slashFiles.indexOf(file)) / total * 100) + "%");
            SlashCommands.set(command.name, command);
        }
        // console.log(' ');
        //setup help command helpText's
        //let helpJS = require('./help.js');
        //helpJS.helpSetup(SlashCommands);
        //just for now until we can get a fix going, sorry emily :(
        // we'll see
        // SlashCommands.set(helpJS.name, helpJS);
        return { PrefixCommands, SlashCommands };
    }
    exports.findAllCommands = findAllCommands;

exports = exports; 