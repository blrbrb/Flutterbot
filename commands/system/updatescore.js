
const fs = require('fs'); 
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
scoreFile ='./assets/scores.json'; 

module.exports={
    name: 'updatescore', 
    description: 'asdasd', 
    async execute(client, message)
    {
        let scores = {}; 
        const {username, id } = message.author;
        console.log(scores);
        fs.readFile(scoreFile, 'utf-8', function (err, result) {
            if (err) console.log('poo', err);
           
           
            scores = JSON.parse(result);
            
        // Get the score for the user who sent the message
       

        // Get the sentiment score for the message
        const results = sentiment.analyze(message.content);   
        const token = results.tokens; 
        const score = results.score;
        
        // Add the sentiment score to the user's score
       
        if (!scores[message.author.id]) { 
            scores[message.author.id] = { username, score};
        } else { 
           // let temp = scores[message.author.id].score; 
            scores[message.author.id].score += score; 
            console.log( scores[message.author.id].score)
        }

       

        // Write the scores object to the JSON file
        //await fs.promises.writeFile(filePath, data, { flag: 'a' });
        fs.writeFile(scoreFile, JSON.stringify(scores), function (err, result) {
            if (err) console.log('JSON file writing error in main.js lin 431 caught', err);
        });
        
        


        });
        //console.log(scores);
        
        
       
       
       
      

    },
}