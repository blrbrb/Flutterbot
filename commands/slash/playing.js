module.exports = {
    name: 'playing',
    description: 'get the currently playing song',
    helpText: `View the currently playing track  \n Use: **/resume**`,
    async execute(interaction, client) {
        const queue = await client.DisTube.getQueue(interaction);

        let track = queue.songs[0];
        const time = track.duration * 1000;

        const current_time = await queue.currentTime;
        const splitBar = ((total, current, size = 40, line = '▬') => {
            if (current > total) return [line.repeat(size + 2), (current / total) * 100];
            const percentage = current / total;
            const progress = Math.round((size * percentage));
            const bar = line.repeat(progress).replace(/.$/, '🔘') + line.repeat(size - progress);
            const calculated = percentage * 100;
            return [bar, calculated];
        })(current_time === 0 ? current_time : time, current_time, 10)[0];
        const string = `🎵🕊️:  \n ***${queue.songs[0].name}***  ${splitBar} \ [${queue.formattedCurrentTime}/${track.formattedDuration}]`;
        interaction.reply(string);
    }
}