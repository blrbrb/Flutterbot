const { Events } = require('discord.js');
const config = require('../config/config.json');


module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {

        const prefix1 = config.prefix;
        const client = message.client;
        let args = message.content.slice(prefix1.length).trim().split(/ +/g);

        message.guild.commands.set(client.slashcommands).then(() =>
            console.log(`Commands deployed in guild ${message.guild.name}!`));


        console.log(message.guild.id)
        const command = args.shift();

        if (!message.content.startsWith(prefix1) || message.author.bot) return;

        // client.commands.get(command).execute(client, message, args); 
        if (command == 'rip') {
            message.channel.send('Oh no!, it looks like someone died');

            client.commands.get('rip').run(client, message, args);
        }

        if (command == 'uwu') {
            message.channel.send(' I am fluttershy and Owo Uwu');
        }

        if (command == 'reactionRole_HardReset') {
            let allowedRole = message.guild.roles.cache.find(role => role.name === "FlutterProgrammer");
            if (message.member.hasPermission("ADMIN") || message.member.roles.cache.has(allowedRole.id)) {
                create_reaction_roles();
            }
        }

        if (command == 'angel') {
            message.channel.send('angel bunny');
        }

        if (command == 'lesson') {
            client.commands.get('lesson').execute(client, message, args);
        }

        if (command == 'tweet') {
            client.commands.get('tweet').run(client, message, args);
        }

        if (command == 'play' || command == 'queue' || command == 'skip' || command == 'resume' || command == 'pause') {
            await client.commands.get('play').execute(client, message, args);
        }

        if (command == 'img') {
            client.commands.get('img').execute(client, message, args);
        }

        ///Begin Image Commands 

        if (command == 'morejpeg') {
            await client.imgcommands.get('jpeg').run(client, message, args);
        }

        if (command == 'destroy') {
            await client.imgcommands.get('destroy').execute(client, message, args);
        }

        if (command == 'mosaic') {
            //await client.imgcommands.get('mosaic').run(client, message, args, debug); 
        }

        if (command == 'swirl') {
            await client.imgcommands.get('swirl').run(client, message, args);
        }

        if (command == 'paint') {
            await client.imgcommands.get('paint').run(client, message, args);
        }

        if (command == 'text') {
            await client.imgcommands.get('text').run(client, message, args);
        }

        if (command == 'fs') {
            client.commands.get('Fluttershy').run(client, message, command, args, prefix1);
        }

        if (command == 'ifunny') {
            client.commands.get('ifunny').execute(message, args, debug);
        }

        if (command == 'fart') {
            message.channel.send('poo poo among us sus');
        }

        if (command == 'rules' && (message.member.hasPermission("ADMINISTRATOR") == true)) {
            client.commands.get('rules').execute(message, args, Discord);
        }

        if (command == 'setRoleChannel') { }

        if (command == 'rate') {
            client.commands.get('rate').execute(message, args, client);
        }

        if (command == 'boop') {
            //client.commands.get('boop').run(client, message, command, args, prefix1); 
        }

        if (command == 'avatar') {
            client.commands.get('avatar').run(client, message, command, args, lang);
        }

        if (command == 'terminal') {
            client.commands.get('terminal').run(client, message, args);
        }

        if (command == 'help') {
            let args = message.content.slice('help').trim().split(/ +/g);
            client.commands.get('help').execute(client, message, command, args, prefix1, lang, commandFiles);
        }

        if (command == 'debug') {
            let allowedRole = message.guild.roles.cache.find(role => role.name === "FlutterProgrammer");

            if (message.member.roles.cache.has(allowedRole.id) || message.author.id == '252235505318625281') {
                if (debug == true)
                    message.channel.send('debug output disabled');
                else
                    message.channel.send('debugging mode enabled on Fluttershy Build:' + ' ' + process.env.VERSION);
                debug = true;
                return; //dangerous
            }
        }
    }
};