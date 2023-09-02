const { GuildScheduledEventManager,ApplicationCommandOptionType, PermissionFlagsBits, SlashCommandBuilder, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType, ChannelType } = require("discord.js");
const { description } = require("./maintenance");
const {validateDate} = require("../../utils.js")

module.exports = {
    name: "test",
    description: "a test command",
    options: [
     {
        name: "name",
        description: "What should we call the event?",
        type: ApplicationCommandOptionType.String,
        required: true 
    },
    {
        name: "start",
        description: "When should I start the event?",
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        name: "channel",
        description: "Where should I start the event?",
        type: ApplicationCommandOptionType.Channel,
        channelTypes: [ChannelType.GuildVoice],
        required: true
    },
    {
        name: "description",
        description: "Should I tell everypony to pack a picnic?",
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        name: "image",
        description: "A url to a pretty image to decorate with?",
        type: ApplicationCommandOptionType.String,
        required: false
    },
    {
        name: "reason",
        description: "For any reason special in particular?",
        type: ApplicationCommandOptionType.String,
        required: false
    },
   
    ],
    async execute(interaction, client) {

      const guild_id = interaction.guild.id;
      const raw = interaction.options.getString('start'); 
      const date = validateDate(raw);
      const event_name = interaction.options.getString('name');
      const channel = interaction.options.getChannel('channel');
      const description = interaction.options.getString('description');
      let image_url = interaction.options.getString('image_url');
      let reason = interaction.options.getString('image_url');

      //cannot execute command without event management perms. 
      if (!interaction.member || !interaction.member.permissions.has(PermissionFlagsBits.ManageEvents)) 
      {
        return interaction.reply({content:`I'm sorry, it dosen't look like you have permission to manage roles in this guild`, ephemeral:true})
      }

      //date is required. Only an if statement here to ensure that validateDate() returns true 
      if(!date)
      {
        return interaction.reply({content:`That's not a valid date`, ephemeral:true})
      }

      //if the image url option is not supplied, default to the guild's banner
      if(!image_url)
      {
        image_url = interaction.guild.bannerURL();
      }

      //If a reason has not been supplied, default to sum shiz idk :D
      if(!reason)
      {
        reason = "ponies lol"
      }


      const guild = await interaction.client.guilds.cache.find(guild => guild.id === interaction.guild.id);
      
      if (!guild)
        return console.log('Guild not found');
  
      const event_manager = new GuildScheduledEventManager(guild);
      try {
      await event_manager.create({
        name: event_name,
        scheduledStartTime: date,
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: GuildScheduledEventEntityType.Voice,
        description: description,
        channel: channel,
        image: image_url,
        reason: reason,
      }).then(response =>
      {
        console.log(response);
        //save the event to the db, so we can display the event info later in an embed announcement
        client.db.addEntry(`${guild.id}.events`, response);
        return interaction.reply(`okay!, I'll tell everypony to meetup <t:${parseInt(date.getTime() / 1000)}:R> in ${channel}!`); 
      })
     
    }
   
    catch(error)
    {
        console.log(error) 
        return interaction.reply({content:`There was an error creating this event! @ellypony is a bitch ass motherfucker`, ephemeral: true})
    }
    },
  };