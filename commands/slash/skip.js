const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'skip',
    description: 'skip the currently playing song',
    options: [
        {
            name: 'song',
            description: "Queued song to skip e.g '2' will skip the second song in queue",
            type: ApplicationCommandOptionType.Number
        }
    ],
    async execute(interaction, client) {
        const queue = await client.DisTube.getQueue(interaction);
        if (!queue) return interaction.reply(`But there is no queue! Use /play to search for songs`);
        const q = queue.songs.map((song, i) => `skipping ${song.name} - \`${song.formattedDuration}\``).join('\n');

        console.log(queue.songs.length);

        try {
            //if the queue only has one song, this will throw an err. That's what we want baby
            await client.DisTube.skip(interaction)
            return interaction.reply(`skipping! ${queue.songs[0].name}`);
        }
        catch (err) {

            interaction.reply(`skipping! ${queue.songs[0].name}`);//since it's the last song in the queue, not really important. Can just recreate a new queue when called. Illusion of good design.
            return client.DisTube.stop(interaction);
            //give the user the same message on the front, while behind the scenes the "There is no up next song" error emitted by distube is handled by simply destroying the stream

        }

    }
}