const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const {errorMessage} = require('../../lang/en.js');
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
    
       
          
        
        const speaker = interaction.options.get('from').user;
        let username = speaker.username; 
        const userdat  = await Flutterbot.db.query(`SELECT * FROM QUOTES WHERE id=${speaker.id} AND guild_id=${interaction.guild.id} `); 
        

        let embed = new EmbedBuilder()
        .setTitle(`${speaker.username}`)
        .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
        //fetches an array of json objects. A list of all quotes from that person, that have been saved in the guild.
        //let fetched_quotes = Flutterbot.db.get(`${interaction.guild.id}.server_quotes`)
       
        //get wont work with Arrays rn tried
        if(!userdat || userdat.length <=0)
            return interaction.reply(errorMessage.quotesfromError.noMemberQuotes(speaker));
       
        
        //not sure if looping through the actual process of creating the embed breaks it or not, better to be safe? and just loop each quote
        await userdat.forEach(async QuoteObject => {
            let date = new Date(QuoteObject.time)
            embed.addFields({'name': `${date.toLocaleDateString()}`, 'value': QuoteObject.quote, 'inline': false});
        });

        return interaction.reply({ embeds: [embed] });
    },

}