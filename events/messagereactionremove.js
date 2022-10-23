const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageReactionRemove,
	once: true,
	async execute(client) {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot)
            return;
        if (!reaction.message.guild)
            return;



        const channel = await client.channels.fetch(roles_channel);



        const gamer_role = channel.guild.roles.cache.find(role => role.name === 'Gamer');
        const bronerreacts_role = channel.guild.roles.cache.find(role => role.name === `Broner's React`);
        const luna_role = channel.guild.roles.cache.find(role => role.name === 'New Lunar Republic');
        const celestia_role = channel.guild.roles.cache.find(role => role.name === 'Solar Empire');
        const minor_role = channel.guild.roles.cache.find(role => role.name === 'Minor')
        const discordian_role = channel.guild.roles.cache.find(role => role.name === 'Discordian');
        const derpist_role = channel.guild.roles.cache.find(role => role.name === 'Derpist');
        const hive_role = channel.guild.roles.cache.find(role => role.name === 'The hive');


        if (reaction.message.channel.id == roles_channel) {
            //These next if statements are the if statements that will check wether or not the corresponding emoji's for each role have been reacted with
            //TD: potential make this a switch/case statement for efficency? 

            if (reaction.emoji.name === gamer_emoji) {


                await reaction.message.guild.members.cache.get(user.id).roles.remove(gamer_role);

            }
            if (reaction.emoji.name === bronerreacts_emoji) {

                await reaction.message.guild.members.cache.get(user.id).roles.remove(bronerreacts_role);

            }
            if (reaction.emoji.name === luna_emoji) {

                await reaction.message.guild.members.cache.get(user.id).roles.remove(luna_role);

            }
            if (reaction.emoji.name === celestia_emoji) {

                await reaction.message.guild.members.cache.get(user.id).roles.remove(celestia_role);

            }
            if (reaction.emoji.name === hive_emoji) {

                await reaction.message.guild.members.cache.get(user.id).roles.remove(hive_role);

            }
            if (reaction.emoji.name === Derpist_emoji) {

                await reaction.message.guild.members.cache.get(user.id).roles.remove(derpist_role);

            }
            if (reaction.emoji.name === minor_emoji) {

                await reaction.message.guild.members.cache.get(user.id).roles.remove(minor_role);

            }
            if (reaction.emoji.name === discordian_emoji) {

                await reaction.message.guild.members.cache.get(user.id).roles.remove(discordian_role);

            }




        }
        else {
            return;
        }















	},
};
