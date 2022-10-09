
module.exports = {
	name: 'play',
    aliases: ['skip', 'stop', 'queue',], 
    cooldown: 0,
    description: 'Queue a song, or youtube video!',
    async execute(message, args, cmd, client, Discord, debug) {
    	
    	
    	 
switch(cmd) 
{
	
	case "play":
		
		this.queue_video(message,client, args); 
		
    break; 
    
   case "skip":
   
   const queue1 = await client.DisTube.getQueue(message);  
	if(queue1.songs.length >= 1) 
	{	
	try 
	{
		client.DisTube.skip(message); 	
	 
	}catch(e)
	{
		message.channel.send(`there was an error ${e.what()}`);
		console.log(e);  
	}
	}
	else 
	{
		client.Distube.stop(message); 
	}
	break; 
	
	case "queue": 
	const queue = client.DisTube.getQueue(message);
	if(!queue) return message.channel.send(`There are no songs in queue 😔`);
	
	const q = queue.songs.map((song, i) =>`${i===0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n')
	
	message.channel.send(`**Queue**\n${q}`);
	break; 
	
	
	case "pause": 
		client.DisTube.pause(message); 
		break;
	case "resume": 
		client.DisTube.resume(message);
		break; 
	case "stop": 
		client.DisTube.stop(message); 
		break;
	case "volume":
		client.DisTue


default: 
	break; 
   	
}

    	    	
    	
    	
    	
  	

	},
	async queue_video(message, client, args)
	{
		

		const queue = await client.DisTube.getQueue(message);
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
