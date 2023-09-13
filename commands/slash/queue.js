const { formatTime } = require('../../utils/utilities.js')
const {EmbedBuilder} = require('discord.js'); 
module.exports = {
    name: 'queue',
    description: 'display the queue of currently playing songs',
    helpText: `View all of the currently queued songs and videos \n Use: **/queue**`,
    async execute(interaction, Flutterbot) {
        const embed = new EmbedBuilder(); 

        let color = Flutterbot.db.getGuildConfig(interaction, 'embed_color'); 

        let queue = await Flutterbot.DisTube.getQueue(interaction);

        embed.setAuthor({'name': 'Current Queue'}); 
        embed.setThumbnail(queue.songs[0].thumbnail); 

        if(!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);
        console.log(queue.songs[0]); 
       
        queue.songs.forEach((song, i) => {

        if(!i===0){
            embed.addFields({'name':'**Currently Playing**', 'value': `[${song.name}](${song.url}) - \`${formatTime(Math.floor(queue.currentTime))}\` \ \`${song.formattedDuration}\``, inline:false});
        }
        embed.addFields({'name': `\`${i}:\``, 'value': `[${song.name}](${song.url}) - \`00:00 \` \ \`${song.formattedDuration}\``, inline: false})

        }); 

        if(color)
        {
            embed.setColor(color);
        }
       
        //let q = queue.songs.map((song, i) => `${i === 0 ? 'Currently Playing:' : `${i}.`} ${song.name} - \`${formatTime(Math.floor(queue.currentTime))}\` \ \`${song.formattedDuration}\``).join('\n');

        interaction.reply({embeds:[embed]});
    }
}