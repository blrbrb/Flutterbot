const {commandResponses, errorMessage} = require('../../lang/en.js'); 
const {EmbedBuilder} = require('discord.js'); 



module.exports = {
    name: 'filter',
    description: 'Apply a filter to playing music',
    helpText: `Manipulate the quality, and add effects to playing music  \n Use: **/filter** <an filter to apply> \n Note: To Remove an activated Filter, simply run the same command twice`,
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
                },
                {
                    name: 'Earkiller',
                    value: 'earkiller'
                },
                {
                    name: 'Chorus',
                    value: 'chorus'
                },
                {
                    name: 'Speed200%',
                    value: 'speedx200%'
                },
                {
                    name: 'Speed50%',
                    value: 'speed50%'
                },
                {
                    name: 'OneBit',
                    value: '1bit'
                },
                {
                    name: 'EightBits',
                    value: '8bits'
                },
                {
                    name: 'NormalizeLoudness',
                    value: 'normalize'
                },

            ],
            required: true
        },
        {
            type: 3,
            name: 'ffmpeg',
            description: 'Manually specify a FFMPEG filter to apply directly to the stream'
        }
    ],
    async execute(interaction, Flutterbot) {

        const selection = ((interaction.options.getString('filter')) ? interaction.options.getString('filter') : interaction.options.getString('ffmpeg'))
        const queue = await Flutterbot.DisTube.getQueue(interaction);

        if(!queue) return interaction.reply(errorMessage.Distube.QueueEmpty());

        
        if (!queue.filters.has(selection)) {
            queue.filters.add(selection);
           return interaction.reply(commandResponses.Distube.filter(selection));
        }
        else if (queue.filters.has(selection)) {
            queue.filters.remove(selection);
            
           return interaction.reply(`removing the ${selection} filter!~`);
        }
        return interaction.reply('fuck');
    }
}