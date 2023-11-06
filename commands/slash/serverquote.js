
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const {errorMessage, commandResponses}  = require('../../lang/en.js'); 
const {fsServerQuote, fsUser } = require('../../structures/fsUser');
const {Flutterbot} = require('../../client/Flutterbot');
const { PonyExp } = require('../../utils/exp.js');
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
    /**
     * @param {import('discord.js').Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
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
        let user = Flutterbot.DB.users.get(speaker.id);
        console.log(user);

        let data = new fsServerQuote(quoted_text,`${year}\ ${month}\ ${day}`,interaction.user.id,interaction.guild.id);
      
        if(!user)
        {
            Flutterbot.Log(`yellow`, `warn serverquote.js 47: User ${speaker.username} does not exist in databse`);
            Flutterbot.DB.users.set(speaker.id, new fsUser(speaker.id, new PonyExp(), data));
            user = Flutterbot.DB.users.get(speaker.id);
        }
    
    
        //make sure to send interaction.guild, and not anything else so that the db resolves to guild.id.
        user.addQuote(data);
        Flutterbot.DB.users.set(speaker.id,user);
        
        const embed = new EmbedBuilder()
            .setTitle(`${speaker.username} on ${month}\\${day}\\${year} `)
            .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(`*${quoted_text}*`);

        interaction.reply({ embeds: [embed] });
    },

}