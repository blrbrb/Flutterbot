const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'love',
    alias: ['amor', 'lovemeter', 'ship'],
    run: (client, message, command, args, lang,) => {

        let lovers = message.mentions ? Array.from(message.mentions.users.values()) : [client.users.fetch(args[0]), client.users.fetch(args[1])];
        if (!lovers.length) return message.reply(lang.type_one_or_two_users);

        if (!lovers[1]) {
            lovers[1] = lovers[0];
            lovers[0] = message.author;
        }

        if (lovers[0].id == message.member.user.id && lovers[1].id == message.member.user.id) return (message.author) ? message.channel.send(lang.self_love) : message.editReply(lang.self_love);

        let lovePercent = Math.floor(Math.random() * 100 + 1);
        let lovePerTen = Math.floor(lovePercent / 10);
        let percentBar = `${'🟥'.repeat(lovePerTen)}${'⬜'.repeat(10 - lovePerTen)}`
        let percentMessage = lang.lovemeter_messages[lovePerTen];


        let embed = new MessageEmbed()
            .setTitle(`${lovers[0].username} x ${lovers[1].username}`)
            .setDescription(`${lovePercent}%   ${percentBar}\n${percentMessage}`);

        if (message.author) message.channel.send(embed);
        else message.editReply(embed);

    }
}