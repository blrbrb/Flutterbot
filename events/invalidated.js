
const { Events } = require('discord.js');

module.exports = 
{
    name: Events.Invalidated, 
    once: true, 
    async execute(Flutterbot)
    {
       Flutterbot.Log('orange','Bot session invalidated. Shutting down "gracefully"');
       Flutterbot.destroy(); // Close the bot's connection to Discord.
       process.exit(1); // Exit the process with an error code so that the bash script will pick up on it, and automatically restart
    }
};
