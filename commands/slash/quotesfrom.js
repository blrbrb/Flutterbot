const { EmbedBuilder,Interaction, ApplicationCommandOptionType } = require('discord.js');
const {errorMessage} = require('../../lang/en.js');
const {Flutterbot} = require('../../client/Flutterbot');
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
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction, Flutterbot)
    {
    

        const speaker = interaction.options.get('from').user;
       
        const userdat = Flutterbot.DB.users.get(speaker.id);
        console.log(userdat);

        let embed = new EmbedBuilder()
        .setTitle(`${speaker.username}`)
        .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
        //fetches an array of json objects. A list of all quotes from that person, that have been saved in the guild.
        //let fetched_quotes = Flutterbot.DB.get(`${interaction.guild.id}.server_quotes`)
        
        //get wont work with Arrays rn tried
       
        if(!userdat)
            return interaction.reply(errorMessage.quotesfromError.noMemberQuotes(speaker));
       
        
        if(!userdat.hasOwnProperty('server_quotes')){Flutterbot.DB.set(speaker.id, "server_quotes", []); return interaction.reply(errorMessage.quotesfromError.noMemberQuotes(speaker)); }

        let fetched_quotes = userdat.server_quotes; 
        console.log(userdat.server_quotes);
        let filtered_quotes = fetched_quotes.filter(fetched_quotes => fetched_quotes.UserId === speaker.id && fetched_quotes.GuildId === interaction.guild.id);
       
        
        if(!filtered_quotes)
        {
            embed.setDescription(errorMessage.quotesfromError.noGuildQuotes(interaction.guild)); 
            Flutterbot.DB.set(speaker.id, "server_quotes", []);
            return interaction.reply(errorMessage.quotesfromError.noMemberQuotes(speaker));
        }
        
      
        
        if(!filtered_quotes.length)
        {

            embed.setDescription(errorMessage.quotesfromError.noMemberQuotes(speaker).content);
        }
       
        
        //not sure if looping through the actual process of creating the embed breaks it or not, better to be safe? and just loop each quote
        filtered_quotes.forEach(QuoteObject => {
            
            embed.addFields({'name': QuoteObject.date, 'value': QuoteObject.quote, 'inline': false});
        });

        interaction.reply({ embeds: [embed] });
    },

}