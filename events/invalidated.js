
const { Events } = require('discord.js');

module.exports = 
{
    name: Events.Invalidated, 
    once: true, 
    async execute(Flutterbot)
    {
        console.error('Bot session invalidated. Shutting down gracefully...');
        Flutterbot.client.destroy(); // Close the bot's connection to Discord.
        process.exit(1); // Exit the process with an error code to indicate a graceful shutdown.
    }
};
