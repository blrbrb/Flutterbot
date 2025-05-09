const fs = require('fs');

require('dotenv').config();
const {commandResponses} = require('../../lang/en.js');
let conversation = { past_user_inputs: [], generated_responses: [] };
let response_temp = ' ';
const command_prefix = 'fs';

const API_URL = 'https://api-inference.huggingface.co/models/EllyPony/flutterbot';

module.exports = {
    name: "fs",
    description: "talk with FlutterShy",
    cooldown: 0, 
    async execute(Flutterbot, message, args) {
        message.channel.sendTyping();
        console.log(message.content);
      
        
        const data = fs.readFileSync("assets/conversation.json");
       
        past = JSON.parse(data); 
        console.log('loading past conversation data from memory..'); 
       

        console.log(past.past_user_inputs);
        
     
        let input = { 
            question: false,
            past_user_inputs: past.past_user_inputs,
            generated_responses: conversation.generated_responses,
            text: message.content.slice(("-").length + command_prefix.length).trim(),
        }

    

        if (input.text.includes('?'))
            input.question = true;

        conversation.past_user_inputs.push(input.text);

        console.log('querying the hugging face model with..' + input.text + 'isQuestion:')

        await query(
               {"inputs": message.content.slice(("-").length + command_prefix.length).trim()
                   
               }
        ).then((response) => {

            console.log(response);

            if(!response)
            {
                return message.reply('malformed header data from hugging face.io.'); 
            }
         
            if (response[0].hasOwnProperty("error")) {

                //message.channel.send(response.error);
                console.log(response[0].error);

                if (response[0].error.hasOwnProperty('estimated_time'))
                { 
                    message.channel.send(commandResponses.Fluttershy.loadingModel(response[0].error.estimated_time));
                }

            } else if (response[0].hasOwnProperty("generated_text")) {

                response_temp = response.generated_text;

                console.log(conversation);
                message.reply(response[0].generated_text);
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
            headers: { Authorization: `Bearer ${process.env.HUGGING_TOKEN}`, "options":{"min_length": 50,"max_length": 500,"max_new_tokens":1000},"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
