require('dotenv').config();
const { MessageEmbed } = require('discord.js'); 

module.exports = { name: 'help', 
    description: "get helpful information about Flutterbot",
    options: [
        {
            type: 1,
            name: "music_commands",
            description: "Music player & audio manipulation ",
            options: [
                {
                    type: 3,
                    name: "command",
                    description: "a music command",
                    choices: [
                        {
                            name: "Queue",
                            value: "queue"
                        },
                        {
                            name: "Play",
                            value: "play"
                        },
                        {
                            name: "Pause",
                            value: "pause"
                        },
                        {
                            name: "Resume",
                            value: "resume"
                        },
                        {
                            name: "Filter",
                            value: "filter"
                        },
                        {
                            name: "Playing",
                            value: "playing"
                        }
                    ],
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "commands",
            description: "Flutterbot's chat and guild commands",
            options: [
                {
                    type: 3,
                    name: "command",
                    description: "a chat command",
                    choices: [
                        {
                            name: "Ping",
                            value: "ping"
                        },
                        {
                           name: "Boop",
                            value: "boop"
                        },
                        {
                            name: "Lesson",
                            value: "lesson"
                        },
                        {
                            name: "Avatar",
                            value: "avatar"
                        }
                    ],
                    required: true
                }
            ]
        },
        {
            type: 1,
            name: "image_commands",
            description: "Image generation & manipulation",
            options: [
                {
                    type: 3,
                    name: "command",
                    description: "an image command",
                    choices: [
                        {
                            name: "Average",
                            value: "average"
                        },
                        {
                            name: "Mosaic",
                            value: "mosaic"
                        },
                        {
                            name: "Circle",
                            value: "circle"
                        },
                        {
                            name: "Destroy",
                            value: "destroy"
                        },
                        {
                            name: "JPEG",
                            value: "jpeg"
                        },
                        {
                            name: "Deepfry",
                            value: "deepfry"
                        },
                        {
                            name: "Quote",
                            value: "quote"
                        }
                    ],
                    required: true
                }
            ],
            
        },
        {
            type: 1,
            name: "about",
            description: "About Flutterbot",
            options: [
                {
                    type: 3,
                    name: "about ",
                    description: "About Flutterbot",
                    choices: [
                        {
                            name: "kofi",
                            value: "Kofi"
                        },
                        {
                            name: "Generative Conversational Transformer",
                            value: "How does Fluttershy work?"
                        }
                    ],
                    required: true
                }
            ]
        }
    ],
		   execute(Discord, client, interaction, debug) {

               switch (interaction.options.getSubcommand())
         {
            case 'commands':

                       switch (interaction.options.getString('command'))
                       {
                           case 'ping':
                               interaction.reply({
                                   content: `Ping me to see wether or not I am working at the moment~! \n Use: **/ping**`,
                                   ephemeral: true});
                               break;
                           case 'lesson':
                               interaction.reply({
                                   content: `I'll pull up a random snippet of dialouge from any of the nine seasons of FIM \n Use: **/lesson**`,
                                   ephemeral: true
                               });
                               break;
                           case 'boop':
                               interaction.reply({
                                   content: `Boop somepony! \n Use: **/boop** <mention someone>`,
                                   ephemeral: true
                               });
                               break;
                           case 'avatar':
                               interaction.reply({
                                   content: `Pull up somepony's avatar \n Use: **/avatar** <mention someone>`,
                                   ephemeral: true
                               });
                               break;
                           default:
                               break; 
                        
                       }
               

                break; 
                

            case 'image_commands':

                       switch (interaction.options.getString('command'))
                       {

                           case 'average':
                               interaction.reply({
                                   content: `combine and average all of the frames in a gif into a single image \n Use: **/average** <gif embed>`,
                                   ephemeral: true
                               });
                               break;
                           case 'deepfry':
                               interaction.reply({
                                   content: `deepfry an image \n Use: **/deepfry** <jpeg, png, gif, webm embed>`,
                                   ephemeral: true
                               });
                               break;
                           case 'circle':
                               interaction.reply({
                                   content: `add a radial blurr to an image \n Use: **/circle** <jpeg, png, gif, webm embed>`,
                                   ephemeral: true
                               });
                               break;
                           case 'jpeg':
                               interaction.reply({
                                   content: `add more jpeg to an image \n Use: **/jpeg** <jpeg, png, gif, webm embed>`,
                                   ephemeral: true
                               });
                               break;
                           case 'destroy':
                               interaction.reply({
                                   content: `blow somepony up \n Use: **/destroy** <jpeg, png, gif, webm embed>`,
                                   ephemeral: true
                               });
                               break;
                           case 'mosaic':
                               interaction.reply({
                                   content: `turn an image into a sequence of tiles \n Use: **/mosaic** <jpeg, png, gif, webm embed>`,
                                   ephemeral: true
                               });
                               break;
                           case 'quote':
                               interaction.reply({
                                   content: `grab a randomly generated quote from inspirobot \n Use: **/quote**`,
                                   ephemeral: true
                               });
                               break; 
                           default:
                               break;                   
                       }
                     
                break; 
                

            case 'music_commands':

                       switch (interaction.options.getString('command'))
                       {
                           case 'play':
                               interaction.reply({
                                   content: `Queue up a Youtube Video / music to listen to  \n Use: **-play** <youtube link OR youtube search query>`,
                                   ephemeral: true
                               });
                               break;
                           case 'queue':
                               interaction.reply({
                                   content: `View all of the currently queued songs and videos \n Use: **/queue**`,
                                   ephemeral: true
                               });
                               break;
                           case 'pause':
                               interaction.reply({
                                   content: `Pause the currently playing music or video \n Use: **/pause**`,
                                   ephemeral: true
                               });
                               break;
                           case 'resume':
                               interaction.reply({
                                   content: `Resume the paused music or video \n Use: **/resume**`,
                                   ephemeral: true
                               });
                               break;
                           case 'playing':
                               interaction.reply({
                                   content: `View the currently playing track  \n Use: **/resume**`,
                                   ephemeral: true
                               });
                               break;
                           case 'filter':
                               interaction.reply({
                                   content: `Manipulate the quality, and add effects to playing music  \n Use: **/filter** <an filter to apply> \n Note: To Remove an activated Filter, simply run the same command twice`,
                                   ephemeral: true
                               });
                               break;
                           default:
                               break; 
                               



                       }
                       break;

            case 'about':



              switch (interaction.options.getString('about'))
               {
                  case 'kofi':
                      interaction.reply({
                          content: `eventually Eli will put Fluttershy's Kofi here, but he is too lazy rip`,
                          ephemeral: true
                      });
                      break;
              }
            	
            	break;
            			

            default: 
                

            
         }



               if (interaction.options.getSubcommand() === 'commands')
               {
                   console.log('help commands are working'); 
                   interaction.reply('debug. You want help with commands'); 
               }
    }      
           


}
