const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

const { channel } = require('../../lang/en');

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
	async execute(interaction, client) {
		
		const queue = await client.DisTube.getQueue(interaction);
		const query = interaction.options.getString('query');
		
		if(!queue) console.log('the queue does not exist, and will be created now'); 
		
		client.DisTube.play(interaction.member.voice.channel, query, {
			member: interaction.member,
			textChannel: interaction.channel,
		}).then(interaction.reply(`ok! I'll put this into the queues`));
		
		return; 

	},
	async queue_video(interaction, client, query, queue, nsfw) 
	{
		client.DisTube.play(interaction.member.voice.channel, firstResult.url, {
		member: interaction.member,
		textChannel: interaction.channel,
		interaction

		});
		
		
	},
	async results_selection(interaction, client, query) {
		try {
			const result = await client.DisTube.search(query);

			let select_embeds = [];
			const row = new ActionRowBuilder();

			for (x = 0; x < 5; x++) {
				row.addComponents(new ButtonBuilder()
					.setCustomId(result[x].url)
					.setLabel((x + 1).toString())
					.setStyle('Primary'),
				)
				select_embeds.push(new EmbedBuilder().setColor('fdf6af').setTitle(`Result: ${x + 1}`).addFields({ name: `${result[x].name}`, value: result[x].formattedDuration }).setAuthor({ name: result[x].uploader.name, url: result[x].uploader.url }).setThumbnail(result[x].thumbnail))

			}

			await interaction.reply({ embeds: select_embeds, components: [row], ephemeral: true });

		}
		catch (DisTubeError) {
			console.log(DisTubeError);
			interaction.reply({ content: ' Tell @Eli there was an error :( ' + DisTubeError, ephemeral: true });
		}
	},
	async validate_url(url) {
		const exp = RegExp(/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/);
		console.log(await exp.test(url));
		return await exp.test(url);
	},
	///we need to make sure that none of the queries that end up on the queue are nsfw, which is why we check to make sure
	///they aren't age restricted here with ytdl before they can end up queued and crash Distube. 
	async can_play_nsfw(url) {
		const video_info = ytdl.getInfo(url);

		console.log(video_info);
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
			console.log(video_info);

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
	in_nsfw_channel: 0
}