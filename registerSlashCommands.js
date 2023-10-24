require("dotenv").config();
const { REST, Routes } = require("discord.js");
const { displayList } = require('./utils/utilities.js');
const utilities = require('./utils/utilities.js');

const commands = utilities.findAllCommands("./findAllCommands"); 
console.log(commands);
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log("running request");
        await rest.put(Routes.applicationCommands(clientId, guildId), {
            body: commands.SlashCommands
        })
        //await rest.get(Routes.userGuilds()) 
        //.then(displayList)
        .catch('this is an error lin 19',console.error)  

    } catch (error) {   
        console.log('this is an error lin 19',error);
    }    
})();
