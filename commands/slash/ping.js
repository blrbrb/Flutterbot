module.exports = { 
name: 'ping', 
description: "testbed", 
async execute(client, interaction, debug) {
        const greeting = 'Hi! Im Fluttershy :sparkling_heart: '; 

        interaction.reply({ content: greeting });
         
}
}
