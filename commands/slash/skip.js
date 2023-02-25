module.exports = {
    name: 'skip',
    description: 'skip the currently playing song',
    options: [
        {
            type: 10,
            name: 'song',
            description: "Queued song to skip e.g '2' will skip the second song in queue"
        }
    ],
    async execute(Discord, client, interaction, debug) {
        const queue = await client.DisTube.getQueue(interaction);
        const q = queue.songs.map((song, i) => `skipping ${song.name} - \`${song.formattedDuration}\``).join('\n');

        let selection;

        if (!queue.autoplay && queue.songs.length <= 1) {
            skipped_song = queue.songs.song;
            client.DisTube.stop(interaction);
            interaction.reply(`There aren't any more songs in the queue! I'll tell my birdies to stop singing`);
        }

        if (interaction.options.getNumber('song')) {
            selection = interaction.options.getNumber('song');
            if (selection - 1 > queue.songs.size())
                return interaction.reply(`but that song doesn't exist!`);
            else queue.songs.splice(selection - 1, 1);
            interaction.reply(`removed ${queue.songs[selection - 1].name}`);
        }
        else client.DisTube.skip(interaction);
        console.log(queue.songs[0].name)
        interaction.reply(`skipping! ${queue.songs[0].name}`);
    }
}