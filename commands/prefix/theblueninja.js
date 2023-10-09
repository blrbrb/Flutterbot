const {EmbedBuilder, Embed} = require(`discord.js`);
const {stringToDate,convertToTimezone} = require('../../utils/utilities.js'); 
const chrono = require('chrono-node'); 


module.exports = {
	name: 'theblueninja',
	description: 'info about the blueninja',
    cooldown: 2, 
	async execute(Flutterbot, message, args) 
    {
        const embed = new EmbedBuilder().setAuthor({'name': 'TBN'}).setTitle("Support The Blue Ninja")
        .setDescription('**The Blue Ninja** is a story-based 3D platformer currently in development, from indie dev Smg065 (Kenneth). \n Play as a group of villains led by the notorious Dr. Gear, as set they out on an adventure that might just lead somewhere none of them could have anticipated... To questions about their own morality, the true nature of good, evil, and all of the things inbetween.')
        .setThumbnail("https://c10.patreonusercontent.com/4/patreon-media/p/campaign/8044565/ca657a9443b6438caa1a805919fba242/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/1.png?token-time=1696291200&token-hash=vwA5AuoDLxsmJFTEIx1gezrQLZiY-trOb0zLNNNy-bA%3D")
        .setURL("https://www.patreon.com/theblueninja/about").setColor("32CD32")
        .setFields({'name': 'Supporter Tiers', 'value': '* **Helibot** \n   - Exclusive updates on features, bugs, and development situations as they evolve \n  - Able to access the constant Q&A in the Discord, replied to regularly on Sundays \n - Credit as a Helibot level Patreon Supporter \n - My Thanks! \n  - Work in Progress Updates \n - Patron Exclusive Posts and Messages \n  - Spot in Credits \n  - Discord Access  \n* **Gearbot** \n - Everything in the Helibot tier \n - Development Screenshots \n - Unique name colour for credit name/Discord role \n - Audio of meetings regarding TBNs story (SPOILERS) \n - Behind The Scenes Content \n  Work In Progress Updates \n - Patron Exclusive Posts and Messages \n - Spot In Credits \n - Discord Access  \n* **Red Ninja** \n - Everything in the Gearbot tier \n  - Unfinished builds of TBN, with cheat codes and features not in demos \n  - Beta/Test Versions \n  - Behind The Scenes Content \n  Work In Progress Updates \n  - Patron Exclusive Posts and Messages \n  Spot In Credits \n  Discord Access '})
        //.setFields({'name': 'Gearbot', 'value': '* Everything in the Helibot tier \n * Development Screenshots \n * Unique name colour for credit name/Discord role \n * Audio of meetings regarding TBNs story (SPOILERS) \n * Behind The Scenes Content \n * Work In Progress Updates \n * Patron Exclusive Posts and Messages \n * Spot In Credits \n * Discord Access'})
       // .setFields({'name': 'Red Ninja', 'value': '* Everything in the Gearbot tier \n * Unfinished builds of TBN, with cheat codes and features not in demos \n * Beta/Test Versions \n * Behind The Scenes Content \n * Work In Progress Updates \n * Patron Exclusive Posts and Messages \n * Spot In Credits \n * Discord Access'})
        return message.reply({embeds:[embed]});
    }
}