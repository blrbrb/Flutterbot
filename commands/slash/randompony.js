const {Flutterbot} = require('../../client/Flutterbot');
const {Interaction} = require('discord.js');
module.exports = {
    name: 'randompony',
    alias: 'pony',
    description: 'fetch randomly generated pone',
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    execute(interaction, Flutterbot) {
        let r = Math.floor(Math.random() * 100000);
        r = r.toString().padStart(5, '0');
        interaction.reply(`https://thisponydoesnotexist.net/v1/w2x-redo/jpgs/seed${r}.jpg`);
    }
}