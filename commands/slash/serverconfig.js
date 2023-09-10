const {ApplicationCommandOptionType, SlashCommandAssertions, IntegrationApplication} = require('discord.js');
const fs = require('fs');
module.exports = {
    name: "config",
    description: "change how I behave in this server",
    options: [
      {
        type: 1,
        name: "announcement_channel",
        description: "what channel should I send announcements to?",
        options: [
          {
            type: 7,
            name: "channel",
            description: "the announcement channel",
            required: true
          }
        ]
      },
      {
        type: 1,
        name: "hide_role",
        description: "Make a role private, so that It can't be listed with /roles or added with /getrole",
        options: [
          {
            type: 8,
            name: "role",
            description: "role you want private",
            required: true
          }
        ]
        },
        {
          type: 1,
          name: "set_cooldown",
          description: "this is an owner/developer only command and will affect all guilds",
          options: [
            {
              type: ApplicationCommandOptionType.Integer,
              name: "seconds",
              description: "(integer) seconds that the default cooldown will last",
              required: true
            }
          ]
          },

       // {
       //  type: 1,
       //  name: "enable_guard",
       // description: "poop"
       //}
    ], 
    async execute(interaction,Flutterbot)
    {
        const subcommand = interaction.options.getSubcommand();
        Flutterbot.db.guildExists(interaction.guild.id);
        
        switch (subcommand) {
            case 'announcement_channel':
              const channel = interaction.options.getChannel('channel');

              
              Flutterbot.db.addEntry(`${interaction.guild.id}.config.annoucement_channel`, channel.id) 

              await interaction.reply({content:`Alright! I've set the announcement channel in ${interaction.guild.name} to: ${channel}`});
              break;
      
            case 'hide_role':
              const role = interaction.options.getRole('role');

              //if the guild already has a list of private roles
              if(Flutterbot.db.getValue(`${interaction.guild.id}.config.private_roles`))
              {
                temp = Flutterbot.db.getValue(`${interaction.guild.id}.config.private_roles`)
                //if the guild already has the role registered as private 
                 if(temp.includes(role.id))
                 {
                  return await interaction.reply(`${role} is already a private member role in this server. ${role} cannot be indexed with /roles, /getRole, and /removerole.`);
                 }
                 else
                temp.push(role.id)
                Flutterbot.db.addEntry(`${interaction.guild.id}.config.private_roles`, temp)
                await interaction.reply(`Okay! I've added: ${role} to the list of private guild roles!`);
                break; 
              }
              else 
              //if the guild has no list of private roles, create a new one and initalize it with 
              //the role provided
              Flutterbot.db.addEntry(`${interaction.guild.id}.config.private_roles`, [role.id])
              await interaction.reply(`key not found`);
              break; 
          
            case 'set_cooldown': 
             
            const newCooldowntime = interaction.options.getNumber('seconds'); 

            const rawConfig = fs.readFileSync('../../config/config.json', 'utf-8');     
            const config = JSON.parse(rawConfig);

            if(!config.always_trusted.includes(interaction.user.id))
            {
              return interaction.reply('you do **not** have permission to run this command.')
            }  

            config.default_cooldown = newCooldowntime; 

            //update and save the modified config shit.
            const updatedConfig = JSON.stringify(config, null, 2); //2 for pretty printing (0)x(0)
            fs.writeFileSync(configFilePath, updatedConfig);

            return interaction.reply(`the default cooldown length for all commands is now set to ${interaction.options.getNumber('seconds')} seconds`)
            default:
              await interaction.reply('Unknown subcommand.');
          }

    }
}