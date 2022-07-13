const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const ytpl = require('ytpl');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
let oneStepBack = path.join(__dirname, '../');
const cron = require('node-cron');

//Global Variables 
const queue = new Map();
let dispatcher
const current_time = 0;


module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'queue',], 
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message, args, cmd, client, Discord, debug) {

let Client = client;
const serverQueue = queue.get(message.guild.id); 
        
      


        
     
        //Checking for the voicechannel and permissions 
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Pardon me uhm... you need to be in a voice channel for me to play music...');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Im so sorry, I dont have permission to do that. Please dont be mad at me');
        if (!permissions.has('SPEAK')) return message.channel.send('Im so sorry, I dont have permission to do that. Please dont be mad at me');

       
        const server_queue = queue.get(message.guild.id); 







        //check to see if the user has entered one of multipule different commands 
        switch (cmd)
        {
            case "play":
                if (!args.length) return message.channel.send('uh.. uhmm.. You need to send the second argument.. I mean, if you want to...');
                let song = {};

                //If the first argument is a link. Set the song object to have two keys. Title and URl.
                if (ytdl.validateURL(args[0])) {
                  
                   
                    const song_info = await ytdl.getInfo(args[0]);
                   // console.log(song_info.player_response.videoDetails);
                    console.log(song_info.player_response);
                    const result_info = await ytSearch(args[0]); 
                   // console.log(result_info); 

                    song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, lengthSeconds: song_info.videoDetails.lengthSeconds, current_time: current_time }
                    if (debug) { message.channel.send(song) }
                }

                if (args[0].includes('playlist?')) {
                    message.channel.send("it's a playlist");
                    let playlist_ID_prototype =  await args[0].toString().split('list='); 
                    //const playlist_ID = playlist_ID_prototype.join();
                    console.log(playlist_ID_prototype[1]); 
                   await message.channel.send(playlist_ID_prototype[1].toString()); 
                    const first_results_batch = await ytpl(String(playlist_ID_prototype[1]), { pages: 1 });
                    const second = await ytpl(first_results_batch.continuation);
                    const third = await ytpl(second.continuation);      
                    message.channel.send('this is a playlist. I can tell the difference now');
                    console.log(second);
                    console.log(third);
                    console.log(first_results_batch);
                }
            
                else {
                    //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                    const video_finder = async (query) => {
                        const video_result = await ytSearch(query);
                        const song_info2 = await ytdl.getInfo(video_result.videos[0].url);
                      
                           if(debug){
                           	 console.log(song_info2.player_response);
                        message.channel.send('data streaming request expires in:' + ' ' + song_info2.player_response.streamingData.expiresInSeconds +' ' + 'seconds'); } 
            
                        
                        
                        return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                    }

                    const video = await video_finder(args.join(' '));
                    if (video) { 
                    	
                    	  const search_info = await ytdl.getInfo(video.url);
                                            
                        song = { title: video.title, url: video.url, lengthSeconds: video.seconds, current_time: current_time }
                    } else {
                        message.channel.send('Im so sorry, Im having trouble finding this video');
                    }
                }

                //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
                
                if (!server_queue) {

                    const queue_constructor = {
                        voice_channel: voice_channel,
                        text_channel: message.channel,
                        connection: null,
                        songs: []
                    }

                    //Add our key and value pair into the global queue. We then use this to get our server queue.
                    queue.set(message.guild.id, queue_constructor);
                    queue_constructor.songs.push(song);

                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        video_player(message.guild, queue_constructor.songs[0], server_queue, debug);
                        autosave(message, queue_constructor.songs); 
                        break; 
                    } catch (err) {
                        queue.delete(message.guild.id);
                        message.channel.send('uhhm. Excuse me. i. Im having trouble connecting...');
                        throw err;
                    }
                } else {

                   
                    server_queue.songs.push(song);
                    autosave(message, server_queue.songs);

                    return message.channel.send(`Okay! **${song.title}** added to queue!`);
                    break; 
                }         

            case "queue": queuemanager(message.guild, message, server_queue, args, Client);
            		break; 


            case "skip": skip_song(message, server_queue, message.guild);
            			break;
            	

            case "stop": stop_song(message, server_queue);
            break;


            default:
                return; 

        
        }
    
}}

const video_player = async (guild, song, server_queue, debug) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
    	song_queue.text_channel.send('queue is null… exiting'); 
        song_queue.voice_channel.leave();
        queue.delete(guild.id);



        return;
    }
    else {
        
        song_queue.voice_channel.join().then(connection => {

            const stream = ytdl(song.url, { highWaterMark: 1 << 22, filter: 'audioonly' });


            dispatcher = connection.play(stream, { quality: 'highestaudio', seek: song.current_time, volume: 1 });
			dispatcher.on('start', () => {if(debug)song_queue.text_channel.send('my voice dispatcher has fired the "start" event');})

            dispatcher.on('end', () => {	
            	if(debug) {
            	song_queue.text_channel.send('the dispatcher "end" event has fired'); }

            	song_queue.songs.shift(); 
            	video_player(guild, song_queue.songs[0]); 
            	
            		            	});
            	
            	
            	
            dispatcher.on('finish', () => {
               
               if(debug) {
                	song_queue.text_channel.send('the dispatcher "finish" event has fired');} 
                song_queue.songs.shift();
                video_player(guild, song_queue.songs[0]);
                
                	
            }).on('error', error => {song_queue.text_channel.send('the stream has crashed')});
        }).catch(err => console.log(err.message));

       


        await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
        
       
    }
} 



const skip_song = (message, server_queue, guild) => {
	const song_queue = queue.get(guild.id);
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
   
   // song_queue.voice_channel.leave();
   
     song_queue.songs.shift();
     video_player(guild, song_queue.songs[0]);
	
}

const stop_song = (message, server_queue, guild) => {
	
    if (!message.member.voice.channel) return message.channel.send('uhhm. Excuse me. I think you may need to be in a voice channel for me to be able to do this... Im so sorry');
    server_queue.songs = [];
    queue.connection.dispatcher.end();
    //server_queue.connection.dispatcher.end();
} 


const queuemanager = async (guild, message, server_queue, args, client) => { 

   
   
     var farts = args[0]; 
     switch (args[0])
     {
     	
     	case 'save': 
     

     	  const da_queue = server_queue;  
     		  preserve_queue(guild,server_queue.songs, da_queue, client);    
     		   message.channel.send("music player queue saved to log file"); 
     		   break; 
     	
     	
         case 'restore':

             //shamelessly copy paste code to make it as if the user had called play, just replace the arguments with the data in music_queue.json
             if (!server_queue) {
                 const voice_channel = message.member.voice.channel;
                 const queue_constructor = {
                     voice_channel: voice_channel,
                     text_channel: message.channel,
                     connection: null,
                     songs: []
                 }

                 queue.set(message.guild.id, queue_constructor);
                 let restored_songs = load_savedqueue("assets/music_queue.json").slice();
                 let num; 
                 for (i = 0; i < restored_songs.length; i++) {
                     num = restored_songs[i].length;

                     for (j = 0; j < restored_songs[i].length; j++) {
                         queue_constructor.songs.push(restored_songs[i][j]);
                         num = restored_songs[i].length;
                     }
                 }

                 console.log(queue_constructor.songs);
                 message.channel.send(`My SongBirds successfully restored **${num}** songs from the last session! 🐤🎵~`);

                 //Establish a connection and play the song with the vide_player function.
                 try {
                     const connection = await voice_channel.join();
                     queue_constructor.connection = connection;
                     video_player(message.guild, queue_constructor.songs[0], server_queue);
                     autosave(message, queue_constructor.songs);
                     break;
                 } catch (err) {
                     queue.delete(message.guild.id);
                     message.channel.send('uhhm. Excuse me. i. Im having trouble connecting...');
                     throw err;
                 }
                 break;
             }
             else {
                 message.channel.send("loading previous queue from save file…");
                 const saved_songs = load_savedqueue("assets/music_queue.json");
                 restore_queuesongs(saved_songs, server_queue, message);
                 break;
             }
    
         
     	default:
     	
             if (!server_queue) {
                 return;
             }
    if(!server_queue.songs) 
    {
    	return; 
    	
    }
     	        	
    if(server_queue.songs.length <= 1) 
    { 
    	 let vidInfo = await ytdl.getInfo(server_queue.songs[0].url); 
    	
		console.log(vidInfo.player_response); 
    	    const embed = new MessageEmbed().setTitle(`**I'm Currently Playing:** \n[${server_queue.songs[0].title}](${server_queue.songs[0].url})`).setImage(getvideo_thumbnail(vidInfo)); 

    	 
    	 
    	   	
    	 message.channel.send(embed); 
    } 	
    
    if(server_queue.songs.length >= 2 ) {
    	
   //this is where the save queue function might need to be called If I ever get around to automating it 
   //just be sure to add an if statement to make sure that the queue isn't completley empty when reading and writing 
    //server_queue.songs
    let vidInfo1 = await ytdl.getInfo(server_queue.songs[1].url); 

     	
     
     const embed = new MessageEmbed().setTitle(`**I'm Currently Playing:** \n[${server_queue.songs[0].title}](${server_queue.songs[0].url})').addField(
     .addField(\n\n**Up Next:** \n `).setImage(getvideo_thumbnail(vidInfo1)).addField("Songs: \n", `\`${server_queue.songs.length}\``, true) 
     
     
     server_queue.songs.forEach(element => {
     	embed.addField(`${element.title}`);
     	console.log(element);
     	}); 
     
     message.channel.send(embed); 
     
    
    }

     	
     	
     	
     	
     }
}
     
async function getvideo_details(video_url) 
{
	
	let vidInfo = await ytdl.getInfo(video_url);
	
	return vidInfo.player_response.videoDetails;
	
	
}
      


        	
function getvideo_thumbnail(vidinfo) 
 {
 	
    return vidinfo.player_response.videoDetails.thumbnail.thumbnails[0].url;
 
 }



async function preserve_queue(guild, song_queue, server_queue, client, message) 
{
	console.log("function is working"); 
 

	//console.log(queue);
	//console.log(info); 
	//console.log(queue); 
	//const queue_toObject = $.extend(queue_toObject, queue); 
	//queue_toObject.songs = queue; 
	//console.log(queue_toObject); 
	//queue.forEach(element => {



//const strings = queue.map((o) => JSON.stringify(o)); 

const song_queue_data = []; 
		
		
			
	//console.log(strings); 
	
	
	for(x=0; x < song_queue.length; x++) 
	{
		for(y=0; y < song_queue[x].length; y++) 
		{
			console.log(song_queue[y][x]);
			
		}
		
		
	}
	
			//console.log(strings);       
		// var clean_strings = []; 
    if (song_queue.length < 1)
    {
        return; 
    }
    song_queue_data.push(song_queue); 
    
   //Save the Current Timestamp of the playing video 
     

    
  
  
  var watch_timeSeconds = Math.round(dispatcher.streamTime / 1000); 
  
    //console.log(queue.connection.dispatcher.streamTime); 
    song_queue_data[0][0].current_time = watch_timeSeconds; 
    //console.log(clean_strings); 
    const json = JSON.stringify(song_queue_data);


	

    fs.writeFile(oneStepBack + "assets/music_queue.json", json, function (err, result) {
        
        if (err) console.log('JSON file writing error in play.js caught', err);
        
    });

} 


function load_savedqueue(queue_file) 
{
	
	console.log("reading saved queue"); 
	
	const songdata = fs.readFileSync(queue_file);
	const saved_songs = JSON.parse(songdata); 
	
	
	//console.log(saved_songs); 
	return saved_songs; 
	
	
	
	
}

function restore_queuesongs(savedsongs, server_queue, message)
{


    if (!server_queue.songs) {

        return;
    }
    else 
    
    

        var num = 0; 
    //NOTE TO SELF: this is a two dimensional array. There is no other way around it. There is no easy quick crackhead fix. Just make a messy for loop, and parse your data like a man.
    for (i = 0; i < savedsongs.length; i++)
    {
        num = savedsongs[i].length;
         
        for (j = 0; j < savedsongs[i].length; j++)
            {
                    server_queue.songs.push(savedsongs[i][j]);
            //num = savedsongs[i].length;
            }
      }
      
    message.channel.send(`My SongBirds successfully restored **${num}** songs from the last session! 🐤🎵~`);
 
    
}

async function autosave(message, songs)
{
    
    const job = cron.schedule("*/30 * * * * *", () => { preserve_queue(message.guild, songs, message) });
    job.start();

}
