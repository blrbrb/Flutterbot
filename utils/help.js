
module.exports = {
    name: 'help',
    description: "get helpful information about Flutterbot",
    options: [
        {
            type: 3,
            name: "command",
            description: "what can i help you with?",
            choices: ["play","fmrecent","deepfry","queue","skip"],
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
    execute(Discord, shy, interaction) {
        let command = this.slashCommands.get(interaction.options.getString('command'));
        let text = "E"; 
        
        if (command) text = command.helpText;
        interaction.reply({
            content: text,
            ephemeral: true
        });
    }
};