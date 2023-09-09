require("dotenv").config();
const { REST, Routes } = require("discord.js");
const { displayList } = require('./utils.js');

const commands = require("./findAllCommands").slashcommands;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log("running request");
        await rest.put(Routes.applicationCommands(clientId, guildId), {
            body: commands
        })
        //await rest.get(Routes.userGuilds()) 
        .then(displayList)
        .catch(console.error)  

    } catch (error) {   
        console.log(error);
    }    
})();
