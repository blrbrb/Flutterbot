const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'help',
    description: "get helpful information about Flutterbot",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "commands",
            description: "Choose the name of the command ",
            choices: [],
            required: true
        }
    ],
    helpSetup(slashCommands) {
        this.slashCommands = slashCommands;
        let choices =this.options[0].choices;
        slashCommands.every(command => {
            if (command.helpText) choices.push(command.name);
        });
    },
    execute(Discord, client, interaction) {
        let command = this.slashCommands.get(interaction.options.get('commands'));
        text = "The command wasn't found.";
        if (command) text = command.helpText;
        interaction.reply({
            content: text,
            ephemeral: true
        });
    }
};