
module.exports = {
    name: 'filter',
    description: 'Apply a filter to playing music',
    options: [
        {
            type: 3,
            name: 'filter',
            description: 'what filter to apply',
            choices: [
                {
                    name: 'Basboost',
                    value: 'bassboost'
                },
                {
                    name: 'Flanger',
                    value: 'flanger'
                },
                {
                    name: 'Reverse',
                    value: 'reverse'
                },
                {
                    name: 'Nightcore',
                    value: 'nightcore'
                },
                {
                    name: 'Vaporwave',
                    value: 'vaporwave'
                },
                {
                    name: 'Phaser',
                    value: 'phaser'
                }
            ],
            required: true
        }
    ],
    async execute(Discord, client, interaction, debug) {

        const selection = interaction.options.getString('filter');

        // const queue = client.DisTube.getQueue(interaction);

        client.DisTube.setFilter(interaction, selection);



    }}