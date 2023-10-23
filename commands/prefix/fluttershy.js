const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();
const {commandResponses} = require('../../lang/en.js');
const { fsError } = require('../../utils/types.js');
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
        
        let input = {
            message: message.content.slice(("-").length + command_prefix.length).trim(),
            question: false
        }

        if (input.message.includes('?'))
            input.question = true;

        conversation.past_user_inputs.push(input.message);
        
        query({
            "inputs": {
                "past_user_inputs": past.past_user_input,
                "generated_responses": conversation.generated_responses,
                "text": input.message
            }
        }).then((response) => {
            try{
            console.log(response);

            if (response.hasOwnProperty('estimated_time')) {
                // console.log(response.estimated_time);
                // message.reply(`instantizing from ellypony/flutterbot on huggingface.io...  \ Il y a: \ ${response.estimated_time}`);
                console.log(`instantizing from ellypony/flutterbot on huggingface.io...  \ Il y a: \ ${response.estimated_time}`);
                console.log(`We're starting up it should take ${response.estimated_time} seconds...`);
                message.reply(`We're starting up it should take ${response.estimated_time} seconds...`);
            }
  
            if (response.hasOwnProperty("error")) {

                if (response.error.hasOwnProperty('estimated_time'))
                { 
                    message.channel.send(commandResponses.Fluttershy.loadingModel(response.error.estimated_time));
                }
                else if (String(response.error))
                {
                    throw new fsError(`I'm having trouble connecting to my model right now, I can't generate text`,new Error(response.error));
                }

            } else if (response.hasOwnProperty("generated_text")) {

                response_temp = response.generated_text;

                console.log(conversation);
                message.reply(response.generated_text);0
                conversation.generated_responses.push(response_temp);
            }
        }
        catch(fsError)
        {
          
            message.reply(`\`${fsError.message}: ${fsError.stack.split('\n')[1]}\``);
            Flutterbot.Log('yellow', `${fsError.stack}`);
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