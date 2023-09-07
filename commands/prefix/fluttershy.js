const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

let conversation = { past_user_inputs: [], generated_responses: [] };
let response_temp = ' ';
const command_prefix = 'fs';

const API_URL = 'https://api-inference.huggingface.co/models/EllyPony/flutterbot';

module.exports = {
    name: "fs",
    description: "talk with FlutterShy",
    async execute(Flutterbot, message, args) {
        message.channel.sendTyping();
        console.log(message.content);
        let input = {
            message: message.content.slice(("-").length + command_prefix.length).trim(),
            question: false
        }

        if (input.message.includes('?'))
            input.question = true;

        conversation.past_user_inputs.push(input.message);

        query({
            "inputs": {
                "past_user_inputs": conversation.past_user_input,
                "generated_responses": conversation.generated_responses,
                "text": input.message
            }
        }).then((response) => {
            console.log(response);

            if (response.hasOwnProperty('estimated_time')) {
                // console.log(response.estimated_time);
                // message.reply(`instantizing from ellypony/flutterbot on huggingface.io...  \ Il y a: \ ${response.estimated_time}`);
                console.log(`instantizing from ellypony/flutterbot on huggingface.io...  \ Il y a: \ ${response.estimated_time}`);
                console.log(`We're starting up it should take ${response.estimated_time} seconds...`);
                message.reply(`We're starting up it should take ${response.estimated_time} seconds...`);
            }

            if (response.hasOwnProperty("error")) {

                message.channel.send(response.error);
                console.log(response.error);

                if (response.error.hasOwnProperty('estimated_time')) { }
            } else if (response.hasOwnProperty("generated_text")) {

                response_temp = response.generated_text;

                console.log(conversation);
                message.reply(response.generated_text);
                conversation.generated_responses.push(response_temp);
            }
        });

        const json = JSON.stringify(conversation);

        fs.writeFile("assets/conversation.json", json, function (err, result) {
            if (err) console.log('JSON file writing error in FlutterShy.js caught', err);
        });
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