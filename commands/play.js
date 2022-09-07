const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const ytpl = require('ytpl');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const path = require('path');
let oneStepBack = path.join(__dirname, '../');
const cron = require('node-cron');
require('dotenv'); 
//Global Variables 
const queue = new Map();
let dispatcher
const current_time = 0;
const taskMap = {};
var ytAltCookies = [[process.env.FART, process.env.BUTT]];
var verbouse = false;


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
                let playlist_array = {};
                let playlist = [];

                  
                                          //If the first argument is a link. Set the song object to have two keys. Title and URl.
                 if (ytdl.validateURL(args[0])) {
                     if (ytpl.validateID(args[0])) {


                         message.channel.send('this is a playlist!');


                         const first = await ytpl(args[0], { pages: 1 });
                         //const second = ytpl.continueReq(first.continuation); 
                         //const third = ytpl.continueReg(second.continuation); 	
                         let vids = first.items;
                         //vids.push(first.items); 

                         //console.log(vids);


                         //console.log(playlist_primitive); 
                         //console.log(Object.keys(playlist_primitive)); 
                         //console.log(playlist_primitive[0].title);  
                         var video_lengths = [];

                         for (i = 0; i < vids.length; i++) {

                             playlist[i] = { title: vids[i].title, url: vids[i].url, lengthSeconds: vids[i].durationSec, current_time: current_time, playlist: true, index: vids[i].index };
                             //console.log(playlist[i]);
                         }
                        // console.log(playlist);
                         var fuck = playlist.filter(e => e.length);
                         //console.log(fuck);
                         save_playlist(fuck);





                     }
                   
                   const song_info = await ytdl.getInfo(args[0],{
  requestOptions: {
    headers: {
      Cookie: ytAltCookies[0],
      'x-client-data': process.env.BUTT
    }
  }
} );                   // console.log(song_info.player_response.videoDetails);
                    //console.log(song_info.player_response);
                     console.log('I am getting the video information well'); 
                   // console.log(result_info); 

                    song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, lengthSeconds: song_info.videoDetails.lengthSeconds, current_time: current_time, playlist: false, index: 0}
                    if (debug) { message.channel.send(song) }
                }

               
            
                else {
                    //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                    const video_finder = async (query) => {
                        const video_result = await ytSearch(query);
                        const song_info2 = await ytdl.getInfo(video_result.videos[0].url,{
  requestOptions: {
    headers: {
      Cookie: ytAltCookies[0],
      'x-client-data': process.env.BUTT
   	 }
  	}
  });
                      
                           
            
                        
                        
                        return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                    }

                    const video = await video_finder(args.join(' '));
                    if (video) { 
                    	
                    	  const search_info = await ytdl.getInfo(video.url,{
  requestOptions: {
    headers: {
      Cookie: ytAltCookies[0],
      'x-client-data': process.env.BUTT
    }
  }
});
                                            
                        song = { title: video.title, url: video.url, lengthSeconds: video.seconds, current_time: current_time, playlist: false, index: 0 }
                    } else {
                        message.channel.send('Im so sorry, Im having trouble finding this video');
                    }
                }
                //if the requested link is a youtube playlist 
               

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

                    if (playlist.length > 0)
                    {
                        queue_constructor.songs = playlist; 
                    }

                    //Establish a connection and play the song with the vide_player function.
                    try {
                        const connection = await voice_channel.join();
                        queue_constructor.connection = connection;
                        video_player(message.guild, queue_constructor.songs[0], queue_constructor, server_queue, debug);
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

            case "clear":
                server_queue.songs = [];
                break;

            default:
                return; 

        
        }
    
    },
    busy: false
}  


const video_player = async (guild, song, queue_constructor, server_queue, debug) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        this.busy = false;
        song_queue.voice_channel.leave();
        
        if(debug)
    		song_queue.text_channel.send('queue is null… exiting');  

        queue.delete(guild.id);
      let queuetask = taskMap["update_queue"]; 
     // queuetask.stop(); 
        
            	return; 
    }
   
    else {
   
        var cookies = ytAltCookies[0];
        song_queue.voice_channel.join().then(connection => {

            const stream = ytdl(song.url,{ requestOptions: {
    headers: {
      Cookie: ytAltCookies[0],
      'x-client-data': process.env.BUTT
      }},
          highWaterMark: 1 << 22, filter: 'audioonly'});

            
            

            dispatcher = connection.play(stream, { quality: 'highestaudio', seek: song.current_time, volume: 1 });
            dispatcher.on('start', () => {
                this.busy = true; 
                if (debug) song_queue.text_channel.send('my voice dispatcher has fired the "start" event');
            })

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
                
                	
            }).on('error', error => {

				
                song_queue.text_channel.send(`Some of my songbirds have lost their voices... just a moment while I tend to them`);
               
                song_queue.songs.shift();
                let get_failed = load_savedqueue("assets/music_queue.json").slice();
                if (debug)
                {
                   // song_queue.text_channel.send(error.message);
                    song_queue.text_channel.send(`I'm attempting to restore the queue from music_queue.json...`);
                    song_queue.text_channel.send(`Okay, the top element is...  ${getfailed[0][0]}  is that the right song?`); 
                }

                song_queue.songs.push(get_failed[0][0]);
                video_player(guild, song_queue.songs[0]);
              


                
            });
        }).catch(err => console.log(err.message));

       


        await song_queue.text_channel.send(`feature removed`); 
        
       
    }
} 



const skip_song = (message, server_queue, guild) => {
	const song_queue = queue.get(guild.id);
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue || song_queue.songs < 1){
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
 



const song_queue_data = []; 
		
	
	
	for(x=0; x < song_queue.length; x++) 
	{
		for(y=0; y < song_queue[x].length; y++) 
		{
			console.log(song_queue[y][x]);
			
		}
		
		
	}
	
    if (song_queue.length < 1)
    {
        return; 
    }
    song_queue_data.push(song_queue); 
    
   //Save the Current Timestamp of the playing video 
     

    
  
  
  var watch_timeSeconds = Math.round(dispatcher.streamTime / 1000); 
  
   
    song_queue_data[0][0].current_time = watch_timeSeconds; 
   
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
	const job = cron.schedule("*/30 * * * * *", () => { preserve_queue(message.guild, songs, message); 
	if(!songs) 
   		job.stop(); 
    
	else 
    
    console.log('the music queue has been saved'); });
    job.start(); 
    
    
}

async function save_playlist(playlist_primitive) {
   

    



    for (x = 0; x < playlist_primitive.length; x++) {
        for (y = 0; y < playlist_primitive[x].length; y++) {
            console.log(playlist_primitive[y][x]);

        }


    }

    if (playlist_primitive.length < 1) {
        return;
    }
    

    //Save the Current Timestamp of the playing video 

    const json = JSON.stringify(playlist_primitive);




    fs.writeFileSync(oneStepBack + "assets/music_queue.json", json, function (err, result) {

        if (err) console.log('JSON file writing error in play.js caught', err);

    });

}