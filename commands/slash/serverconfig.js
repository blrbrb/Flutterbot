const { ApplicationCommandOptionType, EmbedBuilder, PermissionFlagsBits, Embed } = require('discord.js');
const fs = require('fs');
const config = require('../../config/config.json');
const { errorMessage } = require('../../lang/en.js');
const { isValidHexColor } = require('../../utils/utilities.js');

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
  async execute(interaction, Flutterbot) {
    const subcommand = interaction.options.getSubcommand();



    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && !config.always_trusted.includes(interaction.user.id)) return interaction.reply(errorMessage.Permissions.adminCommand());

    switch (subcommand) {
      case 'announcement_channel':

        const channel = interaction.options.getChannel('channel');

        Flutterbot.db.query(`INSERT INTO GUILDS (guild_id,announcement_channel) VALUES (${interaction.guild.id}, ${channel.id}) ON DUPLICATE KEY UPDATE guild_id=guild_id,announcement_channel=${channel.id};`);

        await interaction.reply({ content: `Alright! I've set the announcement channel in ${interaction.guild.name} to: ${channel}` });


      case 'hide_role':

        const role = interaction.options.getRole('role');

        Flutterbot.db.query(`INSERT INTO PRIVATE_ROLES (role_id,guild_id) VALUES (${role.id},${interaction.guild.id}) ON DUPLICATE KEY UPDATE role_id=role_id,guild_id=guild_id;`);

        return interaction.reply(`Okay! I've added: ${role} to the list of private guild roles!`);

      case 'set_cooldown':

        const newCooldowntime = interaction.options.getNumber('seconds');

        Flutterbot.db.query(`INSERT INTO GUILDS (guild_id, cooldown_seconds) VALUES (${interaction.guild.id}, ${newCooldowntime}) ON DUPLICATE KEY UPDATE guild_id=guild_id,cooldown_seconds=${newCooldowntime};`);

        return interaction.reply({ content: `the default cooldown length for all commands is now set to ${interaction.options.getNumber('seconds')} seconds`, ephemeral: true });

      case 'set_joinage':

        const newJoinAge = interaction.options.getNumber('days');

        Flutterbot.db.query(`INSERT INTO GUILDS (guild_id,joinage_days) VALUES (${interaction.guild.id}, ${newJoinAge}) ON DUPLICATE KEY UPDATE guild_id=guild_id,joinage_days=${newJoinAge};`);

        const targetDate = new Date(Date.now() + newJoinAge * 24 * 60 * 60 * 1000);

        return interaction.reply(`New members in ${interaction.guild} must now have been on discord for a minimum of ${newJoinAge} days, or <t:${Math.floor(targetDate / 1000)}:R> from today to be released from quarantine`);


      case 'set_embedcolor':

        //this process can take longer than ten seconds, so defer the reply 

        const newColor = interaction.options.getString('color');

        if (!isValidHexColor(newColor)) {
          return interaction.reply({ content: `That's not a valid hexidecimal color value!`, ephemeral: true });
        }

        Flutterbot.db.query(`INSERT INTO GUILDS (guild_id,embed_color) VALUES (${interaction.guild.id}, "${newColor}") ON DUPLICATE KEY UPDATE guild_id=guild_id,embed_color="${newColor}";`);

        const demoembed = new EmbedBuilder()
          .setTitle('Demo Embed!').setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...').setColor(parseInt(newColor.slice(1), 16));
        return interaction.reply({ content: `Embeds in *${interaction.guild}* will now look like this...`, ephemeral: true, embeds: [demoembed] });

      default:
        return interaction.reply('Unknown subcommand.');
    }

  }
}