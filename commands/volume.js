const { within } = require('../utils/numbers.js');
module.exports = {
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
    async execute(Discord, client, interaction) {
        const queue = await client.DisTube.getQueue(interaction);
        var set_volume = interaction.options.getNumber('volume');
        if (!queue) return interaction.reply(`There are no songs in queue 😔`);
        if (!within(set_volume, 1, 100)) return interaction.reply(`Sorry I can't set that volume.`); // its "1" to 100 because if its 0 then why have the bot making sounds

        client.DisTube.setVolume(interaction, set_volume);
        interaction.reply(`the volume has been set to **${set_volume} / 100**`);
    }
}