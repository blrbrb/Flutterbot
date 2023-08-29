module.exports = {
    name: 'queue',
    description: 'display the queue of currently playing songs',
    helpText: `View all of the currently queued songs and videos \n Use: **/queue**`,
    async execute(interaction, client) {

        let queue = await client.DisTube.getQueue(interaction);

        if (!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);

        const seconds = Math.floor(queue.currentTime)
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        let q = queue.songs.map((song, i) => `${i === 0 ? 'Currently Playing:' : `${i}.`} ${song.name} - \`${formattedMinutes}:${formattedSeconds}\` \ \`${song.formattedDuration}\``).join('\n');

        interaction.reply(`**# What's Playing? 🎶**\n${q}`);
    }
}