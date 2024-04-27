const { formatTime } = require('../../utils/utilities.js')
const {EmbedBuilder} = require('discord.js');  
const {errorMessage, commandResponses} = require('../../lang/en.js');
const { error } = require('console');
module.exports = {
    name: 'queue',
    description: 'display the queue of currently playing songs',
    helpText: `View all of the currently queued songs and videos \n Use: **/queue**`,
    async execute(interaction, Flutterbot) {
        const embed = new EmbedBuilder(); 

  

        let queue = await Flutterbot.DisTube.getQueue(interaction);

       

        if(!queue) return interaction.reply(errorMessage.Distube.QueueEmpty());
       
       
        //only begin to set the embed properties if the queue exists
       
        embed.setThumbnail(queue.songs[0].thumbnail); 
        embed.setAuthor({name:'Flutterbot.music | Current Queue',iconURL: Flutterbot.client.user.displayAvatarURL()})
        queue.songs.forEach((song, i) => {

        if(i===0){
            embed.addFields({'name':'**Playing**', 'value': `[${song.name}](${song.url}) - \`${formatTime(Math.floor(queue.currentTime))}\` \ \`${song.formattedDuration}\``});
            i++;
        }
        embed.addFields({'name': `\`${i++}:\``, 'value': `[${song.name}](${song.url}) - \`00:00 \` \ \`${song.formattedDuration}\``})

        }); 

        if(color)
        {
            embed.setColor(color);
        }
       
        //let q = queue.songs.map((song, i) => `${i === 0 ? 'Currently Playing:' : `${i}.`} ${song.name} - \`${formatTime(Math.floor(queue.currentTime))}\` \ \`${song.formattedDuration}\``).join('\n');

        interaction.reply({embeds:[embed], ephemeral: true});
    }
}
