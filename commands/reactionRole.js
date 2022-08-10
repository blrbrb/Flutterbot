module.exports =
{
    name: 'reactionRole',
    description: 'create a message for roles to be added based on interactions with an embed',
    async execute(message, args, Discord, client) {
        const channel = '1006737480550207508';
        //const example_yellow_cucumber_role = '13121412312312';

        const gamer_role = message.guild.roles.cache.find(role => role.name === 'Gamer');
        const bronerreacts_role = message.guild.roles.cache.find(role => role.name === `Broner's React`);
        const luna_role = message.guild.roles.cache.find(role => role.name === 'New Lunar Republic');
        const celestia_role = message.guild.roles.cache.find(role => role.name === 'Solar Empire');
        const minor_role = message.guild.roles.cache.find(role => role.name === 'Minor')
        const discordian_role = message.guild.roles.cache.find(role => role.name === 'Discordian');
        const derpist_role = message.guild.roles.cache.find(role => role.name === 'Derpist');
        const hive_role = message.guild.roles.cache.find(role => role.name === 'The hive');


        const gamer_emoji = '🎮';
        const bronerreacts_emoji = '📺';
        const discordian_emoji = '🟨';
        const minor_emoji = '🔞';
        const luna_emoji = '🌙';
        const celestia_emoji = '☀️';
        const Derpist_emoji = '🧁';
        const hive_emoji = '🐞';

        let embed = new Discord.MessageEmbed()
            .setColor()
            .setTitle(`Hello, my name is Fluttershy... Eli (Elly) is asking me to help with roles!`)
           .setDescription('giving yourself a role here will allow me to write them down, and send my critters over to ping you')
            .addField(`Gamer ${gamer_emoji}`, "The Gamer Roll. I'll ping you whenever the Broners are about to do something fun in a videogame")
           .addField(`Broners React ${bronerreacts_emoji}`, "I'll ping you for watch parties, and New G5 stuff!")
           .addField(`Lunist ${luna_emoji}`, "praise the moon! you are a proud supporter of the night guard")
           .addField(`Solist ${celestia_emoji}`, "praise the sun! you are a summer sunshine enjoyer")
           .addField(`The Hive ${hive_emoji}`, "Buzzzzzzz")
           .addField(`Derpist ${Derpist_emoji}`, `I just don't know what went wrong"`)
           .addField(`I am A **MINOR** ${minor_emoji}`, "saftey first")
           .addField(`Discordian ${discordian_emoji}`, `"But it's RAINING CHOCOLATE"`)
            

        
        //The process of sending the message to the channel needs to be an asyncro process, because it will 
        //take the client and server some time to process the reacion of the end user. 

       let messageembed = await message.channel.send(embed)

       messageembed.react(gamer_emoji);
       messageembed.react(bronerreacts_emoji);
       messageembed.react(luna_emoji);
       messageembed.react(celestia_emoji);
       messageembed.react(hive_emoji);
       messageembed.react(Derpist_emoji);
       messageembed.react(minor_emoji);
       messageembed.react(discordian_emoji);

       client.on('messageReactionAdd', async (reaction, user) => {
            
           if (reaction.message.partial) await reaction.message.fetch();
           if (reaction.partial) await reaction.fetch();
           if (user.bot)
               return;
           if (!reaction.message.guild)
               return;
           
           if (reaction.message.channel.id == channel) {
               //These next if statements are the if statements that will check wether or not the corresponding emoji's for each role have been reacted with
               //TD: potential make this a switch/case statement for efficency? 

               if (reaction.emoji.name === gamer_emoji) {
                  
                   await reaction.message.guild.members.cache.get(user.id).roles.add(gamer_role);
                   
               }
               if (reaction.emoji.name === bronerreacts_emoji) {

                   await reaction.message.guild.members.cache.get(user.id).roles.add(bronerreacts_role);

               }
               if (reaction.emoji.name === luna_emoji) {

                   await reaction.message.guild.members.cache.get(user.id).roles.add(luna_role);

               }
               if (reaction.emoji.name === celestia_emoji) {

                   await reaction.message.guild.members.cache.get(user.id).roles.add(celestia_role);

               }
               if (reaction.emoji.name === hive_emoji) {

                   await reaction.message.guild.members.cache.get(user.id).roles.add(hive_role);

               }
               if (reaction.emoji.name === Derpist_emoji) {

                   await reaction.message.guild.members.cache.get(user.id).roles.add(derpist_role);

               }
               if (reaction.emoji.name === minor_emoji) {

                   await reaction.message.guild.members.cache.get(user.id).roles.add(minor_role);

               }
               if (reaction.emoji.name === discordian_emoji) {

                   await reaction.message.guild.members.cache.get(user.id).roles.add(discordian_role);

               }
              



           }
           else
           {
               return;
           }
       }); 
        

    }


}