
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const {errorMessage, commandResponses}  = require('../../lang/en.js'); 
const {fsMemberQuote } = require('../../utils/types.js');

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
    async execute(interaction, Flutterbot)
    { 
        
        //im retarded. actual string is stored in ".value"
        let quoted_text = interaction.options.get('quote').value;
        // "-" to appear like a "quote"
        let speaker = interaction.options.get('from').user;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        let userdat = Flutterbot.DB.get(`${speaker.id}`);
        if(!userdat)
        {
            Flutterbot.DB.set(speaker.id,{"server_quotes":[]});
            userdat = Flutterbot.DB.get(`${speaker.id}`);
        }
    
        let data = new fsMemberQuote(interaction.user.username,`${year}\ ${month}\ ${day}`,interaction.user.id, interaction.guild.id,quoted_text);

        //make sure to send interaction.guild, and not anything else so that the db resolves to guild.id.
        if(!userdat.hasOwnProperty('server_quotes')){
         Flutterbot.DB.set(speaker.id, "server_quotes", [data]);}
        else {
        Flutterbot.DB.set(speaker.id, "server_quotes", data);}
       
        let embed = new EmbedBuilder()
            .setTitle(`${speaker.username} on ${month}\\${day}\\${year} `)
            .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(`*${quoted_text}*`);

        interaction.reply({ embeds: [embed] });
    },

}