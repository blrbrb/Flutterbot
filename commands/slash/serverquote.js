
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const {errorMessage, commandResponses}  = require('../../lang/en.js')
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
        //const userdat = Flutterbot.db.get(`${speaker.id}`);
        
     
        //make sure to send interaction.guild, and not anything else so that the db resolves to guild.id.
        Flutterbot.db.query(`INSERT INTO QUOTES(id,guild_id, quote, time) VALUES (${speaker.id}, ${interaction.guild.id}, "${quoted_text}", "${currentDate.toISOString().split("T")[0]}"`);
        let embed = new EmbedBuilder()
            .setTitle(`${speaker.username} on ${month}\\${day}\\${year} `)
            .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(`*${quoted_text}*`);

        interaction.reply({ embeds: [embed] });
    },

}