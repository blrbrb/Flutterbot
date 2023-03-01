require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { } = require('');

module.exports = {
    name: 'help',
    description: "get helpful information about Flutterbot",
    options: [
        {
            choices: [],
            required: true
        }
    ],
    helpSetup(slashCommands) {
        this.slashCommands = slashCommands;
        let sC = [...slashCommands.values()]; // i dont trust being able to loop the Collection since i dont have the capabilities to test anything
        for (let command of sC) {
            if (command.helpText) this.options[0].choices.push(command.name);
        }
    },
    execute(Discord, client, interaction) {
        let command = this.slashCommands.get(interaction.options.getString('command'));
        let text = "E";
        if (command) text = command.helpText;
        interaction.reply({
            content: text,
            ephemeral: true
        });
    }
};