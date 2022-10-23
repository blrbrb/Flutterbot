
module.exports = {
	name: 'play',
    aliases: ['skip', 'stop', 'queue',], 
	cooldown: 0,
	category: 'Chat Input',
    description: 'Queue a song, or youtube video!',
    async execute(client, message, args) {
    	


		
		const queue = await client.DisTube.getQueue(message);
		console.log(queue); 
		this.queue_video(message,client, args, queue); 


   
   	
},

	async queue_video(message, client, args, queue)
	{

		if (!queue)
		{
			 
				client.DisTube.play(message.member.voice.channel, args.join(' '), {
					member: message.member,
					textChannel: message.channel,
					message

				});



			
		}

		else {
			client.DisTube.play(message.member.voice.channel, args.join(' '), {
				member: message.member,
				textChannel: message.channel,
				message

			});

		
			message.channel.send(`${args.join(' ')} I'm searching for a result, and  adding it to the queue!`);
			



		}

		

	}
}
