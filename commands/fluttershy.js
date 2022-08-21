const discord = require('discord.js');
const cleverbot = require('cleverbot-free'); 
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv'); 

let conversation = [];
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
        



        console.log(input);

     
        console.log(conversation); 

        query({
            "inputs": {
                "past_user_inputs": conversation,
                "text": input 
            }
        }).then((response) => {
            console.log(JSON.stringify(response));

            conversation.push(input);


            if (response.hasOwnProperty("error")) {
                message.channel.send('please wait one moment... I am hosted remotely, and need a moment to start up..');
                message.channel.send(response.error);
                message.channel.send(`estimated time: ${response.error.estimated_time}s`);

            }
            else if (response.hasOwnProperty("generated_text"))
            {
                message.reply(response.generated_text);
            }

           
        });



        const json = JSON.stringify(conversation);

        fs.writeFile("assets/conversation.json", json, function (err, result) {

            if (err) console.log('JSON file writing error in FlutterShy.js caught', err);

        });

        message.channel.stopTyping();

        //message.reply(bot_reply);


    }
}



async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/EllyPony/flutterbot",
        {
            headers: { Authorization: `Bearer ${process.env.HUGGING_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}