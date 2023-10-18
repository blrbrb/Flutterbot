
const {EmbedBuilder, Embed} = require(`discord.js`);
const {stringToDate,convertToTimezone} = require('../../utils/utilities.js'); 
const chrono = require('chrono-node');

module.exports = {
	name: 'time',
	description: 'sends a timestamp',
    cooldown: 2, 
	async execute(Flutterbot, message, args) 
    {
        if(args.length <= 0){
            const timestamp = new Date(Date.now());
            
            const utcDate = new Date(
                timestamp.getUTCFullYear(),
                timestamp.getUTCMonth(),
                timestamp.getUTCDate(),
                timestamp.getUTCHours(),
                timestamp.getUTCMinutes(),
                timestamp.getUTCSeconds()
              );
              const embed = new EmbedBuilder().setAuthor({'iconURL': Flutterbot.user.displayAvatarURL(), 'name':`Flutterbot`})
            
              .setDescription(`Current local times:`) 
              .addFields({'name': 'Detroit', 'value': `${convertToTimezone(utcDate, 'America/Detroit')}`},
                         {'name': 'Dublin', 'value': `${convertToTimezone(utcDate, 'Europe/Dublin')}`},
                         {'name': 'Paris', 'value': `${convertToTimezone(utcDate, 'Europe/Paris')}`},
                         {'name': 'Berlin', 'value': `${convertToTimezone(utcDate, 'Europe/Berlin')}`},
                         {'name': 'Rome', 'value': `${convertToTimezone(utcDate, 'Europe/Rome')}`},
                         {'name': 'Istanbul', 'value': `${convertToTimezone(utcDate, 'Europe/Istanbul')}`},
                         {'name': 'Jerusalem', 'value': `${convertToTimezone(utcDate, 'Asia/Jerusalem')}`},
                         {'name': 'Kolkata', 'value': `${convertToTimezone(utcDate, 'Asia/Kolkata')}`},
                         {'name': 'Singapore', 'value': `${convertToTimezone(utcDate, 'Asia/Singapore')}`},
                         {'name': 'Hong Kong', 'value': `${convertToTimezone(utcDate, 'Asia/Hong_Kong')}`},
  
              )
              message.reply({embeds: [embed], ephemeral: true}); 
            return; 
        }
        else {
            const datequery = message.content.slice(("-time").length).trim();
            let rawDate = stringToDate(datequery); 
            if(!rawDate)
            {
                message.channel.send('this date has already passed!');
                return;
            }
            const results = chrono.parse(datequery);

            let parsedDate = results[0].start.date(); 
            
            if(!parsedDate)
            {
                message.channel.send(`unable to parse date from \`${datequery}\`. \n Try saying something like "in four hours", "tomorow at noon", "in thirteen seconds". Avoid vague statements like "at six", "at lunchtime", etc.`);
                return 
            }
           

            const utcDate = new Date(
                parsedDate.getUTCFullYear(),
                parsedDate.getUTCMonth(),
                parsedDate.getUTCDate(),
                parsedDate.getUTCHours(),
                parsedDate.getUTCMinutes(),
                parsedDate.getUTCSeconds()
              );

            timestamp = Math.floor(parsedDate / 1000); 
            timestampUTC = Math.floor(utcDate / 1000); 
            console.log(timestamp);
            const embed = new EmbedBuilder().setAuthor({'iconURL': Flutterbot.user.displayAvatarURL(), 'name':`Flutterbot`})
            
            .setDescription(`Local times corresponding to ${datequery}:`) 
            .addFields({'name': 'Detroit', 'value': `${convertToTimezone(utcDate, 'America/Detroit')}`},
                       {'name': 'Dublin', 'value': `${convertToTimezone(utcDate, 'Europe/Dublin')}`},
                       {'name': 'Paris', 'value': `${convertToTimezone(utcDate, 'Europe/Paris')}`},
                       {'name': 'Berlin', 'value': `${convertToTimezone(utcDate, 'Europe/Berlin')}`},
                       {'name': 'Rome', 'value': `${convertToTimezone(utcDate, 'Europe/Rome')}`},
                       {'name': 'Istanbul', 'value': `${convertToTimezone(utcDate, 'Europe/Istanbul')}`},
                       {'name': 'Jerusalem', 'value': `${convertToTimezone(utcDate, 'Asia/Jerusalem')}`},
                       {'name': 'Kolkata', 'value': `${convertToTimezone(utcDate, 'Asia/Kolkata')}`},
                       {'name': 'Singapore', 'value': `${convertToTimezone(utcDate, 'Asia/Singapore')}`},
                       {'name': 'Hong Kong', 'value': `${convertToTimezone(utcDate, 'Asia/Hong_Kong')}`},

            )
            message.reply({embeds: [embed], ephemeral: true}); 
          
            return;
        }

    }
    


}

