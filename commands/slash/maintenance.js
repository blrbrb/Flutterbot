const {developers} = require('../../config/config.json');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = { 
    name: 'announce_maintenance',
    description: 'announce to ALL GUILDS a period of time maintenance will be done on Flutterbot',
    options: [
        {
            name: "beginning_time",
            description: "maintenance start time",
            type: ApplicationCommandOptionType.String,
            required: false 
        },
        {
            name: "ending_time",
            description: "expected end of maintenance",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
async execute(interaction, Flutterbot){
const start = interaction.options.getString('start');
const end = interaction.options.getString('end');

let message = '🛠️ Scheduled Maintenance\n';

//If it ain't me or emily, don't send a message to every single guild 💀
if(!developers.includes(interaction.user.id))
{
    return interaction.reply({content: `you do not have permission to use this command!`, ephemeral: true });
}

if (start) {
  message += `will begin at ${start}.`;
}

if (end) {
  message += `and end around ${end}.`;
}

//just for the lols 
message+= ` During this time, I will not be able to respond to any of your commands because somepony is [*bZzZZtzzzzzzzzz-`
// Iterate through guilds the bot is in and send the announcement, if the guild has a root channel for announcements/webhooks/bots
Flutterbotguilds.cache.forEach((guild) => {
  const announcementChannel = guild.systemChannel;

  if (announcementChannel) {
    announcementChannel.send(message);
  }             
});

await interaction.reply('Maintenance announcement sent to all guilds.');

// You may want to log this announcement for your reference
console.log(`Maintenance announcement sent: ${message}`);
}
}