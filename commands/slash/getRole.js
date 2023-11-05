
const { PermissionFlagsBits, Interaction} = require('discord.js');
const {commandResponses, errorMessage} = require('../../lang/en.js');
const {Flutterbot} = require('../../client/Flutterbot');
 


module.exports = {
    name: "getrole",
    description: "assign yourself one of the availble roles in a server",
    options: [
        {
            type: 8,
            name: "role",
            description: "The name of the role to assign yourself",
            required: true,
        },
    ],
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction, Flutterbot) {
        const role = interaction.options.getRole('role');
        const guildMember = interaction.member;
        const guild = Flutterbot.DB.guilds.get(interaction.guild.id);

        const private_roles = guild.config.privateRoles; 
        
        //ensure the target role is not privated or admin
        let exitReason; 
        if(role.managed)
         return interaction.reply(errorMessage.RoleError.managed(role));
        else if(role.permissions.has(PermissionFlagsBits.Administrator))
          return interaction.reply(errorMessage.RoleError.admin(role));
        else if(private_roles.includes(role.id))
          return interaction.reply(errorMessage.RoleError.private(role));
        else if (guildMember.roles.cache.has(role.id)) 
            return interaction.reply(errorMessage.RoleError.alreadyHas(role));
        else 
        //continue normal execution of the command 
        
        try {
            await guildMember.roles.add(role);
            interaction.reply(commandResponses.getrole(role));
        } catch (error) {
            if(error.code === 50013)
            {
                interaction.reply(`\ ${error} \ If you are seeing this, it means that this guild has declined, or overided my default permissions. There's not much I can do. Sorry`);
            }
            console.error(error);

            if(error.code === 50013)
            {
                interaction.reply(`\ ${error} \  If you are seeing this a guild has not given me permission to manage roles. `);
            }
            else{
            interaction.reply({
                content: 'Failed to add role',
                ephemeral: true,
            });}
        }
    },
};