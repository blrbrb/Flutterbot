
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
   
   const current_queue = client.DisTube.getQueue(message); 
		if (!current_queue) {
			message.channel.send(`There are no songs in queue 😔`);
			return;
		}
		else if(current_queue.songs.length <= 1)
		{
			client.DisTube.stop(message); 
		}
	try 
	{
		
	 const song = await current_queue.skip(); 
		
	}catch(e)
	{
		message.channel.send(`there was an error ${e.what()}`);
		console.log(e);  
	}
	break; 
	
	case "queue": 
	const currentqueue = client.DisTube.getQueue(message);
	if(!currentqueue) return message.channel.send(`There are no songs in queue 😔`);
	
	const q = currentqueue.songs.map((song, i) =>`${i===0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n')
	
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
		

		const queue = client.DisTube.getQueue(message);
		if (!queue) {
			client.DisTube.play(message.member.voice.channel, args.join(' '), {
				member: message.member,
				textChannel: message.channel,
				message

			});

			const song_result = client.DisTube.getQueue(message);

			if (song_result.song.age_restricted)
			{
				return message.channel.send(`I'm sorry, but this is an age restricted video. I can't play it unless you are in a NSFW channel`); 
					
			}
		}




		else {
			client.DisTube.play(message.member.voice.channel, args.join(' '), {
				member: message.member,
				textChannel: message.channel,
				message

			});
			const song_result_queue = client.DisTube.getQueue(message);

			if (song_result_queue.song.age_restricted) {
				return message.channel.send(`I'm sorry, but this is an age restricted video. I can't play it unless you are in a NSFW channel`);

			}
			else
			{
				message.channel.send(`${song_result_queue.song.name} added to the queue!`);
			}


		}

		

	}
}
