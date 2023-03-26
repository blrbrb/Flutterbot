const fs = require('fs');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'roleprivate',
  description: 'Creates a new role with the given name and adds its ID to a JSON file. Optionally accepts a role mention to add to the file as well.',
  options: [
    {
      name: 'name',
      description: 'the name of the role to create',
      type: 3,
      required: true,
    },
    {
      name: 'mention',
      description: 'optional: mention an existing role to add its ID to the file',
      type: 8,
      required: false,
    },
  ],
  async execute(Discord, client,interaction) {
    // Check if user is an administrator
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: 'Only administrators can use this command.', ephemeral: true });
    }

    // Get the name of the new role from the command options
    const roleName = interaction.options.getString('name');

    // Create the new role
    let newRole;
    try {
      newRole = await interaction.guild.roles.create({
        name: roleName,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'There was an error creating the new role.', ephemeral: true });
    }

    // Append the new role ID to the JSON file
    const data = JSON.parse(fs.readFileSync('./roles.json'));
    data[newRole.id] = roleName;

    // If there is a mentioned role, append its ID to the JSON file as well
    const mentionedRole = interaction.options.getRole('mention');
    if (mentionedRole) {
      data[mentionedRole.id] = mentionedRole.name;
    }

    fs.writeFileSync('./roles.json', JSON.stringify(data, null, 2));

    // Reply with a confirmation message
    const message = `Created role "${roleName}" with ID "${newRole.id}".`;
    if (mentionedRole) {
      message += ` Also added role "${mentionedRole.name}" with ID "${mentionedRole.id}".`;
    }
    return interaction.reply(message);
  },
};