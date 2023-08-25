require("dotenv").config();
const { REST, Routes } = require("discord.js");
const { displayList } = require('./utils.js');

async function _() {
    //Collect basic information about where the error occured
    const channel = client.channels.cache.get(debugging_channel);
    const guildName = interaction.guild.name
    const guild_name = client.guilds.cache.get(client.user.id).name();

    //temporarily register guild commands here until all guilds she is in are updated with the new com
    const clientId = '817161573201608715';

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    const data = await rest.put(
        Routes.applicationGuildCommands(clientId, interaction.guild.id),
        { body: client.slashcommands }
    );


    if (channel) {
        const message = 'An error occurred:\n```js\n%s\n```' + `Instance: ${os.hostname} \n Server: ${guild_name}`;



        channel.send(util.format(message, error.message));
    }
}

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
        // await rest.get(Routes.userGuilds())
        .then(displayList)
        .catch(console.error)
    } catch (error) {
        console.log(error);
    }
})();

// (async () => {
//     try {
//         client.application.commands.fetch().then(collection => {
//             collection.forEach(command => {
//                 if (command.name === `The specified command name`) {
//                     client.application.commands.permissions.set({
//                         command: command.id, permissions: [
//                             {
//                                 id: 'some_user_id',
//                                 type: 'USER',
//                                 permission: false // Can not use the slash command
//                             }
//                         ]
//                     }).catch(console.log);
//                 }
//             });
//         }).catch(console.log);
//     } catch (error) {
//         console.log(error);
//     }
// })();

// const { REST, Routes, Client, Partials, Collection, GatewayIntentBits, Discord } = require('discord.js');
// const { DisTube } = require('distube');
// const filters = require('./assets/filters.json');
// const path = require('path');
// const util = require('util');
// const os = require("os");

// const { debugging_channel } = require('./config/config.json');
// const client = new Client({});
// client.login(process.env.DISCORD_TOKEN);

// 600525564352135168
// guild.commands.set(commands);