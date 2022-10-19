const { FilterManager, defaultFilters } = require('distube');

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
                },
                {
                    name: 'Karaoke',
                    value: 'karaoke'

                },
                {
                    name: '3D',
                    value: '3d'

                },
                {
                    name: 'Surround',
                    value: 'surround'
        
                },
                {
                    name: 'Gate',
                    value: 'gate'
                },
                {
                    name: 'Tremolo',
                    value: 'tremolo'
                }, 
                {
                    name: 'EarWax',
                    value: 'earwax'

                },
                {
                    name: 'Mcompand',
                    value: 'mcompand'
                },
                {
                    name: 'Echo',
                    value: 'echo'

                },
                {
                    name: 'Haas',
                    value: 'haas'
                }
            ],
            required: true
        },
        
    ],
    async execute(Discord, client, interaction, debug) {

        const selection = interaction.options.getString('filter');
        const queue = await client.DisTube.getQueue(interaction);
        let string = `the ${selection} filter~!`;

        if (!queue.filters.has(selection)) {
            queue.filters.add(selection);
            string = `Added the ${selection} filter~!`;
        }
        else if (queue.filters.has(selection))
        {
            queue.filters.remove(selection);
            string = `Removed the ${selection} filter~!`
        }

        var test_filters = [{
            name: "bassboost",
            value: "bass=g=10"
        },
        {
            name: 'EarWax',
            value: 'earwax'

        },
        {
            name: 'Mcompand',
            value: 'mcompand'
        },
        {
            name: 'Echo',
            value: 'echo'

        },
        {
            name: 'Haas',
            value: 'haas'
        },
        {
            name: 'eartorture',
            value: 'earTorture'


        }

           


        ];

        JSON.stringify(test_filters);
        console.log(test_filters); 
        await interaction.reply(string); 


    }}