const { EmbedBuilder, User } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Get Someponys Avatar',
    helpText: `Pull up somepony's avatar \n Use: **/avatar** <mention someone>`,
    options: [
        {
            type: 6,
            name: "somepony",
            description: "choose somepony to check their avatar",
            required: true
        }
    ],
    async execute(interaction,Flutterbot)  {

        
        let taggedUser = interaction.options.getUser('somepony');
        
    
        const avatarembed = new EmbedBuilder()
            .setAuthor({"name": taggedUser.username, "iconURL":taggedUser.displayAvatarURL({ format: 'png' })})
            .setDescription()
            .setImage()
           
        return interaction.reply({embeds: [avatarembed], ephemeral:true});
    }
}
