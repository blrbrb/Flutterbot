
const { MessageEmbed, MessageButton, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder} = require('discord.js')

module.exports =
{   name: 'play',
    description: 'add a song to the queue',
    options: [
        {
            type: 3,
            name: 'query',
            description: "A link to a youtube video, or a search term", 
			required: true 
        }

    ],
    async execute(Discord, client, interaction, debug)
    {
		
		const queue = await client.DisTube.getQueue(interaction)        
		const query = interaction.options.getString('query')     
		console.log(interaction.member)    
		console.log(interaction.message)   
		this.queue_video(interaction,client,query, queue) 


   	
},

	async queue_video(interaction, client, query, queue)
	{
		//if the queue has not been initalized
		if (!queue)
		{
			//if query is link
			if(query.includes('https://'))
			{
				try
				{
				  interaction.reply({content:`Okay, I'll add this link to the queue!~`, ephemeral: true})
				   client.DisTube.play(interaction.member.voice.channel, query, {
					   member: interaction.member,
					   textChannel: interaction.channel,
					   interaction
   
				   }); 
				   
			   }
			   catch(DisTubeError) 
			   {
   
				   console.log(DisTubeError) 
				   interaction.reply('there was an error :( ' + DisTubeError)
   
			   }

			}
			else
			{
			 try
			 {
				
				interaction.reply({content:`Okay, I'll search youtube for this query and add it the queue!~`, ephemeral: true})
				client.DisTube.play(interaction.member.voice.channel, query, {
					member: interaction.member,
					textChannel: interaction.channel,
					interaction

				});
			  }
			catch(DisTubeError) 
			{

				console.log(DisTubeError) 
				interaction.reply('there was an error :( ' + DisTubeError)

			}
		    }
			
		}

		else {
			//if query is link and queue already been initalized
			if(query.includes('https://'))
			{
				try
				{

				const result = await client.DisTube.search(query)
				console.log(result)

				client.DisTube.play(interaction.member.voice.channel, query, {
					member: interaction.member,
					textChannel: interaction.channel,
					interaction

				});
				}
				catch(DisTubeError)
				{
				console.log(DisTubeError)
				interaction.reply({content: ' Tell @Eli there was an error :( ' +  DisTubeError, ephemeral: true})
				}
		
			} 
			else {
			try
			{
			const result = await client.DisTube.search(query)
				console.log(result) 
				console.log(result.length)
		
				let select_embeds = []
				const row = new ActionRowBuilder()


				for(x = 0; x < 5; x++)
			   {
					row.addComponents(new ButtonBuilder()
					.setCustomId(result[x].url)
					.setLabel((x+1).toString())
					.setStyle('Primary'), 
					)
					select_embeds.push(new EmbedBuilder().setColor('fdf6af').setTitle(`Result: ${x+1}`).addFields({name: `${result[x].name}`, value: result[x].formattedDuration}).setAuthor({ name: result[x].uploader.name, url: result[x].uploader.url }).setThumbnail(result[x].thumbnail))
					
			   } 


				await interaction.reply({embeds: select_embeds, components: [row], ephemeral: true})

			}
			catch(DisTubeError)
			{
				console.log(DisTubeError)
				interaction.reply({content: ' Tell @Eli there was an error :( ' +  DisTubeError, ephemeral: true})
			}

			}
		 	//interaction.reply(`${query}} I'm searching for a result, and  adding it to the queue!`);
			
		}

		

	}
}
