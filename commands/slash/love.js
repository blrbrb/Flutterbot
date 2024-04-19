const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'love',
    description: 'love meter thingy',
    // alias: ['amor', 'lovemeter', 'ship'],
    options: [
        {
            name: "somepony",
            description: "choose somepony to ship with",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "somepony2",
            description: "choose somepony to ship with",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    execute(interaction, Flutterbot) {
        let lover1 = interaction.options.get('somepony').user;
        let lover2 = interaction.options.get('somepony2')?.user;
        if (!lover2) {
            lover2 = lover1;
            lover1 = interaction.user;
        }

        if (lover1.id == lover2.id && lover1.id == interaction.user.id)
            return interaction.reply('self love response');

        let lovePercent = Math.floor(Math.random() * 100 + 1);
        let lovePerTen = Math.floor(lovePercent / 10);
        let percentBar = `${'🟥'.repeat(lovePerTen)}${'⬜'.repeat(10 - lovePerTen)}`;
        // let percentMessage = lang.lovemeter_messages[lovePerTen];
        let percentMessage = lovePerTen;

        let embed = new EmbedBuilder()
            .setTitle(`${lover1.username} x ${lover2.username}`)
            .setDescription(`${lovePercent}%   ${percentBar}\n${percentMessage}`);

        interaction.reply({ embeds: [embed] });
    }
}