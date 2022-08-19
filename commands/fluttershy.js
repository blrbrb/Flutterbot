const discord = require('discord.js');
const cleverbot = require('cleverbot-free'); 
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv'); 


const command_prefix = 'fs';


const headers = {
    'Authorization': 'Bearer ' + process.env.HUGGNING_TOKEN
}

const API_URL = 'https://api-inference.huggingface.co/models/EllyPony/flutterbot';


module.exports = {
    name: "Fluttershy",
    alias: ["Fluttershy"],
    cooldown: 5, 
    run: async (client, message, command, args, prefix) => { 

        message.channel.startTyping();
        console.log(message.content);
        let input = message.content.slice(prefix.length + command_prefix.length).trim();
        let conversation = [];

        if (conversation.length < 1) {
            const conversationdata = fs.readFileSync('assets/conversation.json');
            conversation = JSON.parse(conversationdata);
            if (!conversation.length) {
                conversation = [];
            }
        }


        console.log(input);

        const payload = {
            inputs: {
                past_user_inputs: conversation, 
                text: message.content
            }
        };

        console.log(conversation); 
        const response = await fetch(API_URL, {
            method: 'post',
            body: JSON.stringify(payload), 
            headers: { Authorization: `Bearer ${process.env.HUGGING_TOKEN}` },
        }
        );
        const data = await response.json();
        let bot_reply = ' ';
        if (data.hasOwnProperty('generated_text')) {
            bot_reply = data.generated_text;
            conversation.push(input); 
            conversation.push(data.generated_text); 
        }
        else if (data.hasOwnProperty('generated_responses'))
        {
            console.log(data.generated_responses);
            bot_reply = data.generated_responses; 
        }
        else if (data.hasOwnProperty('error'))
        {
            //do error handling stuff 
            //bot_reply = data.error;
            console.log(data.error); 
            message.reply('there was an error'); 
        }



        const json = JSON.stringify(conversation);

        fs.writeFile("assets/conversation.json", json, function (err, result) {

            if (err) console.log('JSON file writing error in FlutterShy.js caught', err);

        });

        message.channel.stopTyping();

        message.reply(bot_reply);


    }
}