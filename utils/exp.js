
module.exports = { 
calculateexp(currentLevel) {
    
    const baseExperience = 100;
    
    const experienceMultiplier = 1.2;
    
    const experienceRequired = Math.round(baseExperience * Math.pow(experienceMultiplier, currentLevel - 1));
    
    return experienceRequired;
  },   
expOnMessage(message) {
    // Base experience points for a message
    let experience = 10;
  
    const messageLength = message.content.length;
    experience += Math.min(messageLength, 100); // Limit extra points for long messages
  
    if (/\bhttps?:\/\/\S+\b/.test(message.content)) {
      experience += 20;
    }
    
    if (message.content.includes('\n')) {
      experience += 30 * (message.content.split('\n').length - 1); 
    }
  
    return experience;
  },
updateexp(message,Flutterbot)
{
  let authorExp = Flutterbot.db.getValue(`${message.author.id}`); 
  
  if(authorExp == undefined)
  {  
    console.log('creating new exp object');
    module.exports.initexp(message, Flutterbot);
    return;
  }

  authorExp['exp'] += module.exports.expOnMessage(message);
  authorExp['msg'] += 1;
  

  if(authorExp['exp'] >= authorExp['required'])
  {
      authorExp['level'] += 1; 
      authorExp['exp'] = 0; 
      authorExp['required'] = module.exports.calculateexp(authorExp['level']);
      Flutterbot.db.set(message.author, message.author.id, authorExp);
      return;
  }
  Flutterbot.db.set(message.author, message.author.id, authorExp);
return;
},
expOnReact(reaction, user, Flutterbot)
{
    let authorExp = Flutterbot.db.getValue(`${user.id}`);
    if(!authorExp)
    {
        //do not initalize the exp object on message react. 
        //easier for scripts to fake interactions. must send msg first
       return;
    }
    console.log('updating fucking exp from reaction');
    //if the user object already has reaction exp data stored, add to it
    if(authorExp.hasOwnProperty('reacts'))
    {
        authorExp['reacts'] += 1;  
    }
    else
    {
        //if not, ensure it's created with the correct datatype. 
        authorExp['reacts'] = 1;  
    }
    authorExp['exp'] += 1; 
    Flutterbot.db.set(user, user.id, authorExp);
    return;
},
  initexp: function(message, Flutterbot)
  {
    let authorExp = Flutterbot.db.getValue(`${message.author.id}`); 
    if(!authorExp)
    {   
        console.log('fuckery');
        authorExp = 
        {
         'level': 0, 
         'required': 0,
         'exp': 0, 
         'msg':1
        }; 
        authorExp['required'] = calculateexp(authorExp['level']);
        Flutterbot.db.set(message.author, message.author.id, authorExp);
        return; 
    }
    return;
  },
}