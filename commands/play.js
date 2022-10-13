
module.exports = {
	name: 'play',
    aliases: ['skip', 'stop', 'queue',], 
	cooldown: 0,
	category: 'Chat Input',
    description: 'Queue a song, or youtube video!',
    async execute(message, args, cmd, client, Discord, debug) {
    	

<<<<<<< HEAD
    	
    	 

=======
>>>>>>> 855ddc359b73438470f3e880a8e1064f7ec75356
		const queue = client.DisTube.getQueue(message);


switch(cmd) 
{
	
	case "play":
<<<<<<< HEAD

		this.queue_video(message,client, args, queue); 
		
=======
		

		this.queue_video(message,client, args, queue); 

>>>>>>> 855ddc359b73438470f3e880a8e1064f7ec75356
    break; 
    
   case "skip":
   

<<<<<<< HEAD
   const queue1 = await client.DisTube.getQueue(message);  
	
=======
>>>>>>> 855ddc359b73438470f3e880a8e1064f7ec75356
		
		if (!queue) {
			message.channel.send(`There are no songs in queue 😔`);
			return;
		}
		else if(queue.songs.length >= 1)
		{
			try
			{
				await client.DisTube.skip(queue); 


			} catch (e) {
				message.channel.send(`there was an error ${e.what()}`);
				console.log(e);
			}
		}
	

	break; 
	
	case "queue": 
	const queue = client.DisTube.getQueue(message);
	if(!queue) return message.channel.send(`There are no songs in queue 😔`);
	
	const q = queue.songs.map((song, i) =>`${i===0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n')
	
	message.channel.send(`**Queue**\n${q}`);
	break; 
	
	
	case "pause": 
		queue.pause(message.member.voice.channel);
		break;
	case "resume": 
		queue.resume(message.member.voice.channel); 
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
		

<<<<<<< HEAD

		
=======
		const queue = await client.DisTube.getQueue(message);

>>>>>>> 855ddc359b73438470f3e880a8e1064f7ec75356
		if (!queue) {
			client.DisTube.play(message.member.voice.channel, args.join(' '), {
				member: message.member,
				textChannel: message.channel,
				message

			});

<<<<<<< HEAD
=======

>>>>>>> 855ddc359b73438470f3e880a8e1064f7ec75356
			
		}




		else {
			client.DisTube.play(message.member.voice.channel, args.join(' '), {
				member: message.member,
				textChannel: message.channel,
				message

			});
<<<<<<< HEAD

=======
>>>>>>> 855ddc359b73438470f3e880a8e1064f7ec75356
			const song_result_queue = await client.DisTube.getQueue(message);

			
			

			
				message.channel.send(`${args.join(' ')} I'm searching for a result, and  adding it to the queue!`);
<<<<<<< HEAD
						
=======

			
>>>>>>> 855ddc359b73438470f3e880a8e1064f7ec75356


		}

		

	}
}
