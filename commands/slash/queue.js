const { formatTime } = require('../../utils/utilities.js')

module.exports = {
    name: 'queue',
    description: 'display the queue of currently playing songs',
    helpText: `View all of the currently queued songs and videos \n Use: **/queue**`,
    async execute(client, interaction) {

        let queue = await client.DisTube.getQueue(interaction);

        if(!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);
        
        
        let q = queue.songs.map((song, i) => `${i === 0 ? 'Currently Playing:' : `${i}.`} ${song.name} - \`${formatTime(Math.floor(queue.currentTime))}\` \ \`${song.formattedDuration}\``).join('\n');

        interaction.reply(`**# What's Playing? 🎶**\n${q}`);
    }
}