const { ActionRowBuilder, ButtonBuilder, EmbedBuilder,Interaction, ComponentType} = require('discord.js');
const ytdl = require('ytdl-core');
const Utilities= require('../../utils/utilities.js');
const {errorMessage} = require('../../lang/en.js');
const {Flutterbot} = require('../../client/Flutterbot');


module.exports = {
	name: 'play',
	description: 'add a song to the queue',
	helpText: `Queue up a Youtube Video / music to listen to  \n Use: **-play** <youtube link OR youtube search query>`,
	options: [
		{
			type: 3,
			name: 'query',
			description: "A link to a youtube video, or a search term",
			required: true
		}
	],
	/**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
	async execute(interaction, Flutterbot) {
		
		const query = interaction.options.getString('query');
		const self = interaction.guild.members.cache.get(Flutterbot.user.id);
		//we need to make sure the member is actually connected to a voice channel, otherwise she'll crash
		if(interaction.member.voice.channel == null) return interaction.reply({content:'You need to be in a voice channel first!',ephermeal:true });
		
	
		//check to determine wether or not she has permission to join the voice channel 
		//if (!hasVoiceChannelPermissions(interaction, Flutterbot)) return interaction.reply(errorMessage.PermissionError.OnClientVoiceConnectFail(interaction.member.voice.channel));

		//determine if the query is a raw link, or a search term 
		switch(Utilities.MusicMediaUrl(query))
		{
			case 'yt':
			
				Flutterbot.DisTube.play(interaction.member.voice.channel, Utilities.formatYtLink(query), {
					member: interaction.member,
					textChannel: interaction.channel,
				}).then(interaction.reply({content:`Fetching this url from youtube.com...`, ephemeral:true}));
				return; 
			case 'spotify':
				return interaction.reply({content: "Sorry! I don't support Spotify playback yet! It would require my owner buy a very expensive lisence. Perhaps in the future", ephermeal: true});
			case 'soundcloud': 
			Flutterbot.DisTube.play(interaction.member.voice.channel, query, {
				member: interaction.member,
				textChannel: interaction.channel,
			}).then(interaction.reply({content:`Fetching this url from SoundCloud.com...`, ephemeral:true}));
			return; 
			default: 

			interaction.deferReply({content:`Searching for relevant results...`, ephemeral:true}); 
			await this.results_selection(interaction, Flutterbot, query);
			return;

		}
		

	},
	async queue_video(interaction, shy, query, queue, nsfw) 
	{
		Flutterbot.DisTube.play(interaction.member.voice.channel, firstResult.url, {
		member: interaction.member,
		textChannel: interaction.channel,
		interaction

		});
		
		
	},
	async results_selection(interaction, Flutterbot, query) {
		try {
			const result = await Flutterbot.DisTube.search(query);

			let select_embed = new EmbedBuilder(); 
		
			let color = Flutterbot.DB.getGuildConfig(interaction,'embed_color'); 
			select_embed.setColor('fdf6af').setTitle(`Results From Youtube.com`).
			setAuthor({name:'Flutterbot.music', iconURL: Flutterbot.user.displayAvatarURL()})

			if(color)
			{
				select_embed.setColor(color);
			}

			const row = new ActionRowBuilder();
			
		
			for (x = 0; x < 5; x++) {

				row.addComponents(new ButtonBuilder()
					.setCustomId(result[x].url)
					.setLabel((x + 1).toString())
					.setStyle('Primary'),
				)
				select_embed.addFields({ name: `${result[x].uploader.name}`, value: `[${result[x].name}](${result[x].url}) / \`${result[x].formattedDuration}\``});

			

			reply = await interaction.editReply({ embeds: [select_embed], components: [row], ephemeral: true });
			Flutterbot.collectors.set(`distube_results${interaction.user.id}`, reply.createMessageComponentCollector({componentType: ComponentType.Button, time: 3_600_000  }));
			
		} }
		catch (DisTubeError) {
			console.log(DisTubeError);
			interaction.editReply({ content: ` Tell @Eli there was an error :(  + ${DisTubeError}`, ephemeral: true });
		}
		return;
	},
	
	///we need to make sure that none of the queries that end up on the queue are nsfw, which is why we check to make sure
	///they aren't age restricted here with ytdl before they can end up queued and crash Distube. 
	async can_play_nsfw(url) {
		const video_info = ytdl.getInfo(url);

		
		if (video_info.age_restricted && !this.in_nsfw_channel)
			return false;
		else if (video_info.age_restricted && this.in_nsfw_channel)
			return true;
		else
			return true;
	},
	async is_nsfw(url) {
		try {
			const video_info = await ytdl.getInfo(url);
			
			

			if (video_is.age_restricted) {
				return true;
			}
		}

		///the error that is thrown by ytdl occurs because the video is age restricted and ytdl does not have 
		///a ID token. Youtube will not even allow you to see wether or not a video has been marked as nsfw if you aren't signed in 
		catch (err) {
			interaction.reply({ content: `I'm sorry, youtube won't allow me to see wether or not this is nsfw because I am not signed in with an adult's account. Miniget is crashing, which usually means this is an age restricted video`, ephemeral: true });
			return true
		}

		return video_info.age_restricted;
	},
	
 /**
  * to be used in interactioncreate.js. Handles the media selection a user has made after running the /play command 
  * with an ambigious search term. Selected url result is stored as the Button's custom ID. (interaction.customId)
  * the distube selection response is stored as a MessageComponentCollector() inside of the global Flutterbot.collectors() 
  * Map
  * 
  * @param {Discord.disord.MessageComponentCollector} collector The message {@link Discord.disord.MessageComponentCollector} for the current user (Flutterbot.collectors.get(interaction.user.id))
  * @param {Flutterbot} Flutterbot The instance {@link Flutterbot}
  * @param {Discord.discord.interaction} outer_interaction The inst ance of the outer interaction, needed to get the interaction.member.voice.channels property
  * @returns {undefined} responds to the button interaction with a messsage, and queues the selection into Distube
  */
	async handledistubeSelection(collector, Flutterbot, outer_interaction)
	{
		
	 if(outer_interaction.member.voice.channel == null) return i.reply({content:'You need to be in a voice channel first!',ephermeal:true });
	 
	 //init reply embed
	 let color = Flutterbot.DB.getGuildConfig(outer_interaction, 'embed_color'); 
	 const replyembed = new EmbedBuilder(); 
	 replyembed.setAuthor({iconURL: Flutterbot.user.displayAvatarURL(), name:'Flutterbot.music'})

	 if(color) replyembed.setColor(color)	
	

	  collector.on('collect', async i => {
		
		
		selection = i.customId;
		replyembed.setDescription(`Okay! I'll hand [this track](${selection}) over to Vinyl and Octavia!`)
		
		Flutterbot.DisTube.play(outer_interaction.member.voice.channel, selection, {
			member: outer_interaction.member, 
			textChannel: outer_interaction.channel
		}).then(i.reply({embeds:[replyembed],ephemeral:true}))

		Flutterbot.collectors.delete(collector);
		
		return; 
		
	});

   
	},
	in_nsfw_channel: 0
}