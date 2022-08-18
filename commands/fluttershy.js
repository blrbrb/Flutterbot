const discord = require('discord.js');
const cleverbot = require('cleverbot-free'); 
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv'); 

console.log(process.env.HUGGING_TOKEN);


const headers = {
    'Authorization': 'Bearer ' + process.env.HUGGNING_TOKEN
}

const API_URL = 'https://api-inference.huggingface.co/models/EllyPony/flutterbot';


module.exports = {
    name: "Fluttershy",
    alias: ["Fluttershy"],
    cooldown: 5, 
    run: async (client, message, command, args) => {

        message.channel.startTyping();

        const payload = {
            inputs: {
                text: message.content
            }
        };


        const response = await fetch(API_URL, {
            method: 'post',
            body: JSON.stringify(payload), 
            headers: headers
        }
        );
        const data = await response.json();
        let bot_reply = ' ';
        if (data.hasOwnProperty('generated_text')) {
            bot_reply = data.generated_text;
        }
        else if (data.hasOwnProperty('error'))
        {
            //do error handling stuff 
            //bot_reply = data.error;
            console.log(data.error); 
            message.reply('there was an error'); 
        }

        message.channel.stopTyping();

        message.reply(bot_reply);


    }
}