const { YtDlpPlugin } = require('@distube/yt-dlp');
const { MessageEmbed, MessageButton, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { channel } = require('../lang/en');

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
	async execute(Discord, client, interaction) {
		const interactio = interaction;
		const queue = await client.DisTube.getQueue(interaction);
		const query = interaction.options.getString('query');
		this.in_nsfw_channel = interaction.channel.nsfw;
		is_link = await this.validate_url(query);
		console.log("this is a link ", is_link);

		await client.DisTube.play(interaction.member.voice.channel, query, {
			member: interaction.member,
			textChannel: interaction.channel,
		}).then(interaction.reply(`ok! I'll put this into the queues`));
	},
	async queue_video(interaction, client, query, queue, nsfw) {
		//if the queue has not been initalized
		if (!queue) {
			//if query is link
			if (query.includes('https://')) {
				try {
					//if the channel is not a nsfw channel, make sure age restricted content can't be played there
					if (!channel.nsfw) {
						try {
							info = await ytdl.getInfo(query);
						}
						catch (error) {
							return interaction.reply({ content: 'This is proabably an **age restricted video**. Because ytdl-core.getInfo() is returning an error 404 instead of just telling me the video is age restricted. This is casuing me to die and explode, and restart for everyone, on every server I am in. Apparently the youtube API hates whatever link you have just queued so much, that it hasnt given me or my creator any useful error information at all. Google just refuses to admit that this page exists, most likely because someone said a bad word somewhere in the video. \n there is absolutely nothing that me or my creator can do about this and it is beginning to make him rather bitter. I will send you this long, contrived message every single time that this happens until google gets it together. So dont count on it changing \n **you have now inconvienced yourself, and everyone else on every other server for the 15 seconds it will take me to restart because YouTube is too afraid to show you the word "fuck"** \n', ephemeral: true })
						}
						await interaction.reply({ content: `Okay, I'll add this link to the queue!~`, ephemeral: true });
						await client.DisTube.play(interaction.member.voice.channel, query, {
							member: interaction.member,
							textChannel: interaction.channel,
							interaction
						});
					} else {
						interaction.reply({ content: `Okay, I'll add this link to the queue!~`, ephemeral: true });
					}
					client.DisTube.play(interaction.member.voice.channel, query, {
						member: interaction.member,
						textChannel: interaction.channel,
						interaction
					});
				}
				catch (DisTubeError) {
					interaction.reply('there was an error :( ' + DisTubeError)
					console.log(DisTubeError)
				}
			} else {
				try {
					interaction.reply({ content: `Okay, I'll search youtube for this query and add it the queue!~`, ephemeral: true })
					client.DisTube.play(interaction.member.voice.channel, query, {
						member: interaction.member,
						textChannel: interaction.channel,
						interaction
					});
				}
				catch (DisTubeError) {
					console.log(DisTubeError);
					interaction.reply('there was an error :( ' + DisTubeError);
				}
			}
		} else {
			//if query is link and queue already been initalized
			if (query.includes('https://')) {
				try {
					if (!channel.nsfw) {
						try {
							info = await ytdl.getInfo(query)
						}
						catch (error) {
							return interaction.reply({ content: 'This is proabably an **age restricted video**. Because ytdl-core.getInfo() is returning an error 404 instead of just telling me the video is age restricted. This is casuing me to die and explode, and restart for everyone, on every server I am in. Apparently the youtube API hates whatever link you have just queued so much, that it hasnt given me or my creator any useful error information at all. Google just refuses to admit that this page exists, most likely because someone said a bad word somewhere in the video. \n there is absolutely nothing that me or my creator can do about this and it is beginning to make him rather bitter. I will send you this long, contrived message every single time that this happens until google gets it together. So dont count on it changing \n **you have now inconvienced yourself, and everyone else on every other server for the 15 seconds it will take me to restart because YouTube is too afraid to show you the word "fuck"** \n', ephemeral: true })
						}
					} else {
						client.DisTube.play(interaction.member.voice.channel, query, {
							member: interaction.member,
							textChannel: interaction.channel,
							interaction

						});
					}
				}
				catch (DisTubeError) {
					console.log(DisTubeError);
					interaction.reply({ content: ' Tell @Eli there was an error :( ' + DisTubeError, ephemeral: true });
				}
			} else {
				console.log('I have removed a function from this bracket because fuck it');
			}
			//interaction.reply(`${query}} I'm searching for a result, and  adding it to the queue!`);
		}
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