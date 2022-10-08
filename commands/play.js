const { GuildMemberManager, PermissionsBitField} = require('discord.js');
const Discord = require('@discordjs/voice');
const { createAudioPlayer, joinVoiceChannel, createAudioResource , AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const ytpl = require('ytpl');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs'); 
var Stopwatch = require("node-stopwatch").Stopwatch; 
const { DisTube } = require('distube'); 

const path = require('path');
let oneStepBack = path.join(__dirname, '../');
const cron = require('node-cron');
require('dotenv'); 
//Global Variables 
//const queue = new Map();
let dispatcher
const current_time = 0;
const taskMap = {};
var ytAltCookies = [[process.env.FART, process.env.BUTT]];
var verbouse = false;
                        	

 var stopwatch = Stopwatch.create();


module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'queue',], 
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message, args, cmd, client, Discord, debug) {
    	
    	
switch(cmd) 
{
	case "play":
	
	const queue = client.DisTube.getQueue(message);
	if(!queue){
	client.DisTube.play(message.member.voice.channel, args.join(' '), {
    		member:message.member,
    		textChannel: message.channel,
    		message
    		
    		}); }
    		
    	

   
   else 
   {
   	client.DisTube.play(message.member.voice.channel, args.join(' '), {
    		member:message.member,
    		textChannel: message.channel,
    		message
    		
    		}); 
    		let songtitle = args.join(' ');
    	message.channel.send(`${args.join(' ')} added to the queue!`); 
    }
    break; 
    
   case "skip":
   
   const current_queue = client.DisTube.getQueue(message); 
	if(!current_queue)
	{
		message.channel.send(`There are no songs in queue 😔`); 
		return;
	}
	try 
	{
		
		const song = await current_queue.skip(); 
		
	}catch(e)
	{
		message.channel.send('error');
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


default: 
	break; 
   	
}

    	    	
    	
    	
    	
  	

    }}