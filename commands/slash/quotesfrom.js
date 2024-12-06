const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const {errorMessage} = require('../../lang/en.js');
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
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
    
    
	     await interaction.deferReply(); 
        const speaker = interaction.options.get('from').user;
        let username = speaker.username; 
        const userdat  = await Flutterbot.db.query(`SELECT * FROM QUOTES WHERE id=${speaker.id} AND guild_id=${interaction.guild.id} `); 
     	const size_t = userdat.length; 
	    const embedsize_t = 25; // current maximum allowed field's in a single embed 

	let embeds = []; 
	   
        let embed = new EmbedBuilder()
        .setTitle(`${speaker.username}`)
        .setThumbnail(speaker.displayAvatarURL({ dynamic: true, size: 256 }))
     	
       
       
        if(!userdat || userdat.length <=0)
            return interaction.editReply(errorMessage.quotesfromError.noMemberQuotes(speaker));
       
        //TD: Create a system that applies buttons to the embed to cycle through more quotes, if the number of quotes would exceede the maximum width alloc to one discord attachment and the entire fucking thing won't come crashing down because someone has 10,000 quotes :slobber: 
	    // 
	    // receive the interaction 
	    //
	    // query the database 
	    //
	    // do fetched quotes exceede maximum width? (expression) [true or false] 
	    //
	    // [true]
	    // Create a new ActionRow() in a loop for the sum of the remaning lines.  
	    // attach a new embed 
	    // push the quote objects into the new embed 
	    // push a new collector object to Fluttershy.client 
	    // handle the ButtonPress action in the client 
	    // delete and scrub the collector data when the button interaction is complete.
	    //
	    // [false] 
	    // continue execution as normal 
        
        shuffle(userdat);
        await userdat.forEach(async QuoteObject => {
		const embed_rollover =  (size_t / embedsize_t > 0) ? (size_t / embedsize_t) : 0; 
	    for(x=0; x< embed_rollover; x++)
		{
			embeds.push(new EmbedBuilder().setTitle(`${speaker.username}`));
		} 
	    let date = new Date(QuoteObject.time)
	     embed.addFields({'name': `${date.toLocaleDateString()}`, 'value': QuoteObject.quote, 'inline': false});
        });

        return interaction.editReply({ embeds: [embed] });
    },

}
