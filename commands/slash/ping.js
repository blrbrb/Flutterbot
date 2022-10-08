module.exports = { 
name: 'ping', 
description: "testbed", 
    execute(interaction, debug) {
        const greeting = 'Hi! Im Fluttershy :sparkling_heart: '; 

        interaction.reply({ content: greeting });
         
}



}
