const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'quotesfrom',
    description: "get a list of someone's greatest hits",
    options: [
        {
            type: ApplicationCommandOptionType.User, 
            description: "show me quotes from...", 
            name: "~", 
            required: true
        }
    ],
    async execute(interaction, client)
    {
    
        let speaker = interaction.options.get('~').user

        //fetches an array of json objects. A list of all quotes from that person, that have been saved in the guild.
        let fetched_quotes = client.db.getValue(`${interaction.guild.id}.server_quotes.${speaker.id}`)

        let embed = new EmbedBuilder()
            .setTitle(`${speaker.username}`)
            .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
          

        //not sure if looping through the actual process of creating the embed breaks it or not, better to be safe? and just loop each quote
        fetched_quotes.array.forEach(quote => {
            embed.setDescription(`*${quote.quote}*`);
        });
        
        interaction.reply({ embeds: [embed] });
    },

}