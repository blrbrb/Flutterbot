const { Events,AttachmentBuilder } = require('discord.js');
const { prefix, current_maintenance } = require('../config/config.json');
const fs = require('fs');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(client, message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift(); 

        if(current_maintenance)
        {
            const attachment = new AttachmentBuilder('https://i.imgur.com/Sfgu2QH.jpg', 'No Commands?');
            return message.channel.send({content: 'sorry, someone is working on me right now',files:[attachment]})
        }
    
        //let pC = Flutterbot.clientprefixcommands.get('fs');
        // if (pC) return pC.execute(client, message, command, args, prefix), undefined;
        // i would like to check whether or not a command was found and ran successfully to return out of this function but its not required.
        Flutterbot.clientprefixcommands.get(command)?.execute(client, message, args);
        
        switch (command) {
            case 'angel': {
                message.channel.send('angel bunny');
            } break;
            case 'fart': {
                message.channel.send('poo poo among us sus');
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
                }
            } break;
        }
    }
};