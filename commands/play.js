
module.exports = {
	name: 'play',
    aliases: ['skip', 'stop', 'queue',], 
	cooldown: 0,
	category: 'Chat Input',
    description: 'Queue a song, or youtube video!',
    async execute(message, args, cmd, client, Discord, debug) {
    	


		const queue = client.DisTube.getQueue(message);


switch(cmd) 
{
	
	case "play":

		

		this.queue_video(message,client, args, queue); 


    break; 
    
   case "skip":
   


   const queue1 = await client.DisTube.getQueue(message);  
	

	
		if (queue1.songs.length >= 1) {
			try {
				await client.DisTube.skip(message);


			} catch (e) {
				message.channel.send(`there was an error ${e.what()}`);
				console.log(e);
			}
		}
		else
		{

			client.DisTube.stop(message); 
		}
	break; 
	
	case "queue": 
		const queue2 = await client.DisTube.getQueue(message);
		if (queue2.songs.length < 1) return message.channel.send(`There are no songs in queue 😔`);
	
	const q = queue2.songs.map((song, i) =>`${i===0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n')
	
	message.channel.send(`**Queue**\n${q}`);
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
		



		

		

		if (!queue) {
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

			const song_result_queue = await client.DisTube.getQueue(message);

			
			

			
				message.channel.send(`${args.join(' ')} I'm searching for a result, and  adding it to the queue!`);



		}

		

	}
}
