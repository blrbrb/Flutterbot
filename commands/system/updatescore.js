
const fs = require('fs'); 
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
scoreFile ='./assets/scores.json'; 

module.exports={
    name: 'updatescore', 
    description: 'asdasd', 
    async execute(client, message)
    {
        var scores; 
        const {username, id } = message.author;

        console.log(scores);
        fs.readFile(scoreFile, 'utf-8',(err, result) => {
            if (err) console.log(err);
           
           else {
            const scores = JSON.parse(result);
            
        const results = sentiment.analyze(message.content);   
        const token = results.tokens; 
        const score = results.score;
        console.log(score);
        // Add the sentiment score to the user's score
       
        if (!scores[id]) {  
            console.log('id not found');
            scores[id] = { username, score};
        } else { 
            
            scores[id].score += score;
            console.log(scores[id].score)
        }

       

        // Write the scores object to the JSON file
        //await fs.promises.writeFile(filePath, data, { flag: 'a' });
        fs.writeFile(scoreFile, JSON.stringify(scores), function (err, result) {
            if (err) console.log('JSON file writing error in main.js lin 431 caught', err);
        });
            
        // Get the score for the user who sent the message
       

        // Get the sentiment score for the message
       
        

    }
        });
        //console.log(scores);
        
        
       
        
       
      

    },
}