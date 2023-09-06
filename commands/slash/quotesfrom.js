const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const {errorMessage} = require('../../lang/en.js');
const {format, langRand} = require('../../utils.js');
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
    async execute(interaction, Flutterbot)
    {
    
       
          
        
        let speaker = interaction.options.get('from').user
        let username = speaker.username; 
        let embed = new EmbedBuilder()
        .setTitle(`${speaker.username}`)
        .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
        //fetches an array of json objects. A list of all quotes from that person, that have been saved in the guild.
        //let fetched_quotes = Flutterbot.db.getValue(`${interaction.guild.id}.server_quotes`)
        
        //getValue wont work with Arrays rn tried
        let temp = Flutterbot.db.getAllData()
        
        let fetched_quotes = temp[`${interaction.guild.id}`][`server_quotes`]
        
        if(!fetched_quotes)
        {
            embed.setDescription(`${username} hasn't been quoted yet in this guild...`); 
            Flutterbot.db.addEntry(`${interaction.guild.id}.server_quotes`, []);
            return interaction.reply(langRand(errorMessage.quotesfromError.noQuotesForGuild));
        }
        
        let filtered_quotes = fetched_quotes.filter(fetched_quotes => fetched_quotes.id === speaker.id && fetched_quotes.guild === interaction.guild.id)
        
        if(filtered_quotes.length === 0)
        {

            embed.setDescription(format(langRand(errorMessage.quotesfromError.noQuotesForMember), { name:username }));
        }
       
        
        //not sure if looping through the actual process of creating the embed breaks it or not, better to be safe? and just loop each quote
        filtered_quotes.forEach(QuoteObject => {
            
            embed.addFields({'name': QuoteObject.date, 'value': QuoteObject.quote, 'inline': false});
        });

        interaction.reply({ embeds: [embed] });
    },

}