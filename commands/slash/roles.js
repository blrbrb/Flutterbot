
const { Interaction,CommandInteraction, EmbedBuilder,PermissionFlagsBits, ContextMenuCommandBuilder} = require('discord.js');
const {Flutterbot} = require('../../client/Flutterbot');
const cmd = new ContextMenuCommandBuilder().setName('roles')

module.exports = {
  name: 'roles',
  description: 'list all available roles',
  /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
  async execute(interaction, Flutterbot) { 
   
    let private_roles = Flutterbot.DB.get(`${interaction.guild.id}.config.private_roles`); 
    let roles; 
    if(private_roles){
      roles = interaction.guild.roles.cache.filter(role => role.name !== '@everyone' && !role.permissions.has(PermissionFlagsBits.Administrator) && !role.managed && !private_roles.includes(role.id));} // Get all roles except @everyone, administrator roles, and roles that have been registered as private roles 
    else {
    roles = interaction.guild.roles.cache.filter(role => role.name !== '@everyone' && !role.permissions.has(PermissionFlagsBits.Administrator) && !role.managed);} // Get all roles except @everyone, administrator roles, and roles that have been registered as private roles 
    const roleNames = roles.map(role => role.name); // Get an array of role names
    
    //fetch guild embed color, if the guild has set an embed color 
    let color = Flutterbot.DB.getGuildConfig(interaction, 'embed_color'); 

    // Create an embed to display the available roles
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Available Roles')
      .setDescription(roleNames.join('\n')); 
    
    if(color)
    {
      embed.setColor(color);
    }
    const user = interaction.user; 
    const dmChannel = await user.createDM();
   
    const filter = (response) => !response.author.bot;
    await dmChannel.send({content: `Here's a list of all of the roles that avalible in ${interaction.guild.name}`, embeds:[embed]});
    Flutterbot.collectors.set(`${interaction.user.id}roleassign`, dmChannel.createMessageCollector({filter})); 
     if(interaction instanceof CommandInteraction)
      return interaction.reply({content:'check your dms!', ephemeral: true});
     else 
     return interaction.message.reply({content:'check your dms!', ephemeral: true});
        
  },
};