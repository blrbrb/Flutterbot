const {ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits, Embed} = require('discord.js');
const fs = require('fs');
const config = require('../../config/config.json');
const {errorMessage } = require('../../lang/en.js');
const {isValidHexColor} = require('../../utils/utilities.js');

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
              type: ApplicationCommandOptionType.Number,
              name: "seconds",
              description: "(integer) seconds that the default cooldown will last",
              required: true
            }
          ]
      },  
      {
          type: 1,
          name: "set_joinage",
          description: "days a member must have existed to not be quarantined",
          options: [
            {
              type: ApplicationCommandOptionType.Number,
              name: "days",
              description: "minimum number of days for an account to have existed",
              required: true
            }
            ]
      },
      {
        type: 1,
        name: "set_embedcolor",
        description: "new default color for embedded messages",
        options: [
          {
            type: ApplicationCommandOptionType.String,
            name: "color",
            description: "a valid hexidecimal color value",
            required: true
          }
            ]
      },
    ], 
    async execute(interaction,Flutterbot)
    {
        const subcommand = interaction.options.getSubcommand();
        Flutterbot.db.Exists(interaction.guild.id);

        if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !config.always_trusted.includes(interaction.user.id)) return interaction.reply(errorMessage.Permissions.adminCommand());

        switch (subcommand) {
            case 'announcement_channel':
              const channel = interaction.options.getChannel('channel');

              
              Flutterbot.db.setGuildConfig(interaction.guild.id, "annoucement_channel", channel.id); 

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
                Flutterbot.db.setGuildConfig(interaction.guild.id,"private_roles", temp);
                await interaction.reply(`Okay! I've added: ${role} to the list of private guild roles!`);
                break; 
              }
              else 
              //if the guild has no list of private roles, create a new one and initalize it with 
              //the role provided
              Flutterbot.db.setGuildConfig(interaction.guild.id,"private_roles", role.id);
              await interaction.reply(`key not found`);
              break; 
          
            case 'set_cooldown': 
             
            const newCooldowntime = interaction.options.getNumber('seconds'); 

            Flutterbot.db.setGuildConfig(interaction.guild, "default_cooldown", newCooldowntime);

            let guildCooldowntime = Flutterbot.db.getValue(`${interaction.guild.id}.config.default_cooldown`); 
            
            //update and replace the modified cooldown times.
                      
            return interaction.reply({content:`the default cooldown length for all commands is now set to ${interaction.options.getNumber('seconds')} seconds`,  ephemeral:true});
            
            case 'set_joinage':
              
              const newJoinAge = interaction.options.getNumber('days'); 
              
              Flutterbot.db.setGuildConfig(interaction.guild, "newMemberMinimumAge", newJoinAge);
              const targetDate = new Date(Date.now() + newJoinAge * 24 * 60 * 60 * 1000);
              return interaction.reply(`New members in ${interaction.guild} must now have been on discord for a minimum of ${newJoinAge} days, or <t:${Math.floor(targetDate / 1000)}:R> from today to be released from quarantine`);

            case 'set_embedcolor': 
            //this process can take longer than ten seconds, so defer the reply 
            
            const newColor = interaction.options.getString('color'); 

            if(!isValidHexColor(newColor))
            {
              return interaction.reply({content: `That's not a valid hexidecimal color value!`,  ephemeral:true});
            }
            
            Flutterbot.db.setGuildConfig(interaction.guild, "embed_color", parseInt(newColor.slice(1), 16)); 

            const demoembed = new EmbedBuilder()
            .setTitle('Demo Embed!').setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...').setColor(parseInt(newColor.slice(1), 16));
            return interaction.reply({content: `Embeds in *${interaction.guild}* will now look like this...`,  ephemeral:true, embeds: [demoembed]});

          default:
             return interaction.reply('Unknown subcommand.');
          }

    }
}