
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
		
		const queue = await client.DisTube.getQueue(interaction);
		const query = interaction.options.getString('query')
		this.queue_video(interaction,client,query, queue); 


   	
},

	async queue_video(interaction, client, query, queue)
	{

		if (!queue)
		{
			 try
			 {
				client.DisTube.play(interaction, query, {
					member: interaction.member,
					textChannel: interaction.channel,
					interaction

				});
			}
			catch(DisTubeError) 
			{

				console.log(DisTubeError)

			}

			
		}

		else {
			try
			{
			client.DisTube.play(interaction, query, {
				member: interaction.member,
				textChannel: interaction.channel,
				interaction

			});
			}
			catch(DisTubeError)
			{
				console.log(DisTubeError)
				
			}
		
			message.channel.send(`${query}} I'm searching for a result, and  adding it to the queue!`);
			



		}

		

	}
}
