module.exports = {
    name: 'randompony',
    alias: 'pony',
    description: 'fetch randomly generated pone',
    execute(interaction, Flutterbot) {
        let r = Math.floor(Math.random() * 100000);
        r = r.toString().padStart(5, '0');
        interaction.reply(`https://thisponydoesnotexist.net/v1/w2x-redo/jpgs/seed${r}.jpg`);
    }
}
