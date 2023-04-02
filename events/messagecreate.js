const { Events } = require('discord.js');
const { prefix } = require('../config/config.json');
///April fools expirement,

const fs = require('fs');


require('dotenv').config();  





module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {  
        const client = message.client;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();

    
        if (!message.content.startsWith(prefix) || message.author.bot) return;    
 
        
        // let pC = client.prefixcommands.get('fs');
        // if (pC) return pC.execute(client, message, command, args, prefix), undefined;
        // i would like to check whether or not a command was found and ran successfully to return out of this function but its not required.
        client.prefixcommands.get(command)?.execute(client, message, args);





        switch (command) {
            case 'angel': {
                message.channel.send('angel bunny');
            } break;
            case 'fart': {
                message.channel.send('poo poo among us sus');
            } break;
            case 'rip': {
                message.channel.send('Oh no!, it looks like someone died');
            } break;
            case 'uwu': {
                message.channel.send('I am fluttershy and Owo Uwu');
            } break;
            case 'debug': {
                let allowedRole = message.guild.roles.cache.find(role => role.name === "FlutterProgrammer");
    
                if (message.member.roles.cache.has(allowedRole.id) || message.author.id == '252235505318625281') {
                    if (debug)
                        message.channel.send('debug output disabled');
                    else
                        message.channel.send('debugging mode enabled on Fluttershy Build:' + ' ' + process.env.VERSION);
                    debug = true;
                    return; //dangerous
                }
            } break;
        }
        return;
    
    }, 
    
};