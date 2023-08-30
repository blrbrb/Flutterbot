const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'serverquote',
    description: "forever enshrine someponys words in the hall of fame",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            description: "something said",
            name: "quote",
            required: true
        },
        {
            type: ApplicationCommandOptionType.User, 
            description: "who said it", 
            name: "from", 
            required: true
        }
    ],
    async execute(interaction, client)
    {
        //im retarded. actual string is stored in ".value"
        let quoted_text = interaction.options.get('quote').value;
        // "-" to appear like a "quote"
        let speaker = interaction.options.get('from').user

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');

        let data = {"name": speaker.username, "date":`${year}\ ${month}\ ${day}`, "quote": quoted_text, "id": speaker.id, "guild": interaction.guild.id}
 
        //initalize the guild quotes object with an empty array if they don't already have data
        //This needs to be done, in order to ensure that if someone has not been registered before 
        //a new server_quotes object for their guild gets created with the correct datatype, in this case an array []
        console.log(client.db.getValue(`${interaction.guild.id}.server_quotes`))
        if (client.db.getValue(`${interaction.guild.id}.server_quotes`) == undefined){
         client.db.addEntry(`${interaction.guild.id}.server_quotes`,[data])
         client.db.append(`${interaction.guild.id}.server_quotes`,data)}
        else 
         

         //SimpleDatabase.Append() not working 
         //client.db.append(`${interaction.guild.id}.server_quotes`,data)
        var temp = client.db.getAllData() 
        temp_arr = temp[`${interaction.guild.id}`][`server_quotes`]
        temp_arr.push(data)
        client.db.addEntry(`${interaction.guild.id}.server_quotes`, temp_arr)

        let embed = new EmbedBuilder()
            .setTitle(`${speaker.username} on ${month}\\${day}\\${year} `)
            .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(`*${quoted_text}*`);

        interaction.reply({ embeds: [embed] });
    },

}