const { Collection } = require("discord.js");
let prefixFiles = require('./utils/findFiles')(__dirname, './commands/prefix', '.js');
let slashFiles = require('./utils/findFiles')(__dirname, './commands/slash', '.js');

let prefixcommands = new Collection();
let slashcommands = new Collection();

//init text input commands
for (let file of prefixFiles) {
    let command = require(`./commands/prefix/${file}`);
    prefixcommands.set(command.name, command);
}

//init the slash commands
for (let file of slashFiles) {
    let command = require(`./commands/slash/${file}`);
    slashcommands.set(command.name, command);
}

//setup help command helpText's
{
    let helpJS = require('./utils/help.js');
    helpJS.helpSetup(slashcommands);
    slashcommands.set(helpJS.name, helpJS);
}

module.exports = { prefixcommands, slashcommands };