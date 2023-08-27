const { Collection } = require("discord.js");
let prefixFiles = require('./utils/findFiles')(__dirname, './commands/prefix', '.js');
let slashFiles = require('./utils/findFiles')(__dirname, './commands/slash', '.js');

let prefixcommands = new Collection();
let slashcommands = new Collection();

//init text input commands
for (let file of prefixFiles) {
    let command = require(`./commands/prefix/${file}`);
    // let total = commandFiles.length;

    // process.stdout.clearLine();
    // process.stdout.cursorTo(0);
    // process.stdout.write("loading commands: " + Math.round((1 + commandFiles.indexOf(file)) / total * 100) + "%");

    prefixcommands.set(command.name, command);

    process.stdout.write(" ");
}
// console.log(' ');

//init the slash commands
for (let file of slashFiles) {
    let command = require(`./commands/slash/${file}`);

    // let total = slashFiles.length;

    // process.stdout.clearLine();
    // process.stdout.cursorTo(0);
    // process.stdout.write("loading Slash Commands: " + Math.round((1 + slashFiles.indexOf(file)) / total * 100) + "%");

    slashcommands.set(command.name, command);
}
// console.log(' ');

//setup help command helpText's
{
    let helpJS = require('./utils/help.js');
    helpJS.helpSetup(slashcommands);
    //just for now until we can get a fix going, sorry emily :(
    // we'll see
    // slashcommands.set(helpJS.name, helpJS);
}

module.exports = { prefixcommands, slashcommands };