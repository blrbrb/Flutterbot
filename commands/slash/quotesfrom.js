const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'quotesfrom',
    description: "get a list of someones greatest hits",
    options: [
        {
            type: ApplicationCommandOptionType.User, 
            description: "show me quotes from...", 
            name: "from", 
            required: true
        }
    ],
    async execute(interaction, client)
    {
    
        let speaker = interaction.options.get('from').user

        //fetches an array of json objects. A list of all quotes from that person, that have been saved in the guild.
        //let fetched_quotes = client.db.getValue(`${interaction.guild.id}.server_quotes`)
        
        //getValue wont work with Arrays rn tried
        let temp = client.db.getAllData()
        let fetched_quotes = temp[`${interaction.guild.id}`][`server_quotes`]
        let filtered_quotes = fetched_quotes.filter(fetched_quotes => fetched_quotes.id === speaker.id && fetched_quotes.guild === interaction.guild.id)

       
        let embed = new EmbedBuilder()
            .setTitle(`${speaker.username}`)
            .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
          
        
        //not sure if looping through the actual process of creating the embed breaks it or not, better to be safe? and just loop each quote
        filtered_quotes.forEach(QuoteObject => {
            
            embed.addFields({'name': QuoteObject.date, 'value': QuoteObject.quote, 'inline': false});
        });

        //Message in case the len of filtered_quotes is 0
        if(filtered_quotes.length === 0)
        {
            embed.setDescription(`${speaker.username} hasn't been quoted yet in this guild...`)
        }
        
        interaction.reply({ embeds: [embed] });
    },

}