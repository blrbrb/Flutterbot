require("dotenv").config();
const { REST, Routes } = require("discord.js");

const utilities = require('./utils/utilities.js');

const commands = utilities.findAllCommands("./findAllCommands"); 

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
console.log(commands.ContextCommands);
module.exports =
(async () => {
    
    
        console.log("running request");
        await rest.put(Routes.applicationCommands(clientId), {
            body: commands.SlashCommands
        }).then()
        
      

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands.ContextCommands
        }).catch('this is an error lin 26',console.error).then()
})();
