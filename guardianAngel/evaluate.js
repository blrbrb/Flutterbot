const fs = require('fs');

module.exports = {
    "royalguard": {
	roleManagement: function(role) 
    {
	
	}, 
    haslogEntry: function(action)
    {
        
            data = JSON.parse(fs.readFileSync('guardianAngel/Log.json'));
            let user = action.executor; 
            // Check if the user is already in the list
            if (data.hasOwnProperty(user.username)) {
                return true; 
             
            }

            else 
            return false; 

     },
        
            // If the file doesn't exist, initialize it with an empty container
           
          
      
          
    writeLog: function(action, guild, score=0)
    {
                
                    data = JSON.parse(fs.readFileSync('guardianAngel/Log.json'));
                    let container = {};
                    let user = action.executor; 
                     
                    //create the log object prototype, just to have it on hand. 
                
                    const LogObject = {
                        "id": user.id,
                        "score": score, 
                        "account_creation": user.createdAt, 
                        "latest_action": Date.now(),
                        "previous_action": {
                            "timestamp": 0,
                            "guild": guild.id, 
                            "type": action.actionType,
                            "target": action.targetType,
                            "action": action.action,
                            "reason": action.reason, },
                            "onCooldown": false, 
                            "suspicion": 0, 
                    };
        
        
                    //check if the log already has valid data. 
                     if (Object.keys(data).length > 0 && data.hasOwnProperty(user.username)){
                         console.log('data exists for this user!');
                         entry = data[user.username]; 
                         
                         
                       
                         LogObject.previous_action = entry.previous_action; 
                        
                        
                        //check here if the last measured timestamps inbetween creating new roles 
                        //is greater than five seconds. If it is, reset the timestamps. 
                         if(entry.latest_action -  entry.previous_action.timestamp > 5000)
                         {
                                LogObject.previous_action.timestamp = 0;

                         }

                         entry.score += score; 
                       
                         
                         container[user.username] = LogObject;
        
                         fs.writeFileSync('guardianAngel/Log.json', JSON.stringify(container));
                         return;
                       
                     }
                    else{
        
                    //append the data for a new entry  
                   
                    //LogObject.previous_actions = data[user.username].previous_actions;
                    //LogObject.previous_action = act;
                    data[user.username] = LogObject;
                         
              
                    // Write the updated list to the JSON file
                    try
                    {
                        fs.writeFileSync('guardianAngel/Log.json', JSON.stringify(data))
                        console.log('guardianAngel audited admin action data saved successfully!');
                        return; 
                    }
                    catch(error)
                    {
                        console.log('guardianAngel error saving audited admin action'); 
                        console.error(error);
                        console.log(error);
                        return;
                    }
                    return; 
                   
                    }
        }, 
        fetchdata: function(username)
        {
                data = JSON.parse(fs.readFileSync('guardianAngel/Log.json'));
            
                 if(username)
                        return data[username]; 
                   
                else
                 return data; 
        },
    

    },
   

    };
   


        


    
   
   

