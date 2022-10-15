
module.exports = {
	name: 'play',
    aliases: ['skip', 'stop', 'queue',], 
	cooldown: 0,
	category: 'Chat Input',
    description: 'Queue a song, or youtube video!',
    async execute(message, args, cmd, client, Discord, debug) {
    	


		
		const queue = await client.DisTube.getQueue(message);

switch(cmd) 
{
	
	case "play":

		
		console.log(queue); 
		this.queue_video(message,client, args, queue); 


    break; 
    
 
	

	
	
	break; 
	
	
	case "pause": 
		queue2.pause(message.membe);
		break;
	case "resume": 
		queue2.resume(message.member.voice.channel); 
		break; 
	case "stop": 
		client.DisTube.stop(message); 
		break;
	case "volume-":
		client.DisTube.setVolume(message.member.voice.channel, 40); 


default: 
	break; 
   	
}

    	    	
    	
    	
    	
  	

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
