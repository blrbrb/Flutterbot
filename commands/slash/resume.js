module.exports =
{
    name: 'resume',
    description: 'resume a paused song',
    async execute(Discord, client, interaction, debug) {

        const queue = await client.DisTube.getQueue(interaction);

        queue.resume(interaction);
        interaction.reply('Resuming!');

    }
}