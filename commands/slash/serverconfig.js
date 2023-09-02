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
       // {
       //  type: 1,
       //  name: "enable_guard",
       // description: "poop"
       //}
    ], 
    async execute(interaction,client)
    {
        const subcommand = interaction.options.getSubcommand();
        client.db.guildExists(interaction.guild.id)
        
        switch (subcommand) {
            case 'announcement_channel':
              const channel = interaction.options.getChannel('channel');

              //if the guild already has an announcement's channel saved in the database 
              if(client.db.keyExists(`${interaction.guild.id}.config.annoucement_channel`))
              {
                client.db.modifyEntry(`${interaction.guild.id}.config.annoucement_channel`, channel)
              }
              else 
              client.db.addEntry(`${interaction.guild.id}.config.annoucement_channel`, channel.id) 

              await interaction.reply({content:`Alright! I've set the announcement channel in ${interaction.guild.name} to: ${channel}`});
              break;
      
            case 'hide_role':
              const role = interaction.options.getRole('role');

              //if the guild already has a list of private roles
              if(client.db.keyExists(`${interaction.guild.id}.config.private_roles`))
              {
                temp = client.db.getValue(`${interaction.guild.id}.config.private_roles`)
                console.log(typeof(temp))
                temp.push(role.id)
                client.db.addEntry(`${interaction.guild.id}.config.private_roles`, temp)
              }
              else 
              //if the guild has no list of private roles, create a new one and initalize it with 
              //the role provided
              client.db.addEntry(`${interaction.guild.id}.config.private_roles`, [role.id])
              await interaction.reply(`Okay! I've added: ${role} to the list of private guild roles!`);
              break; 
          
            default:
              await interaction.reply('Unknown subcommand.');
          }

    }
}