module.exports =
{
    name: 'volume',
    description: 'increase or decrease the volume of the queue',
    options: [
        {
        type: 10,
        name: "volume",
        description: "a volume value 1/100",
        required: true

        }
    ],
    async execute(Discord, client, interaction, debug)
    {
        const queue = await client.DisTube.getQueue(interaction);
        var set_volume = interaction.options.getNumber('volume'); 
        if (!queue)
            interaction.reply(`There are no songs in queue 😔`);
        else
            if (set_volume > 100)
                interaction.reply(`that's too loud!`);

        client.DisTube.setVolume(interaction, set_volume);
        const vol = `the volume has been set to **${set_volume} / 100**`; 
        interaction.reply(vol); 
    }
}