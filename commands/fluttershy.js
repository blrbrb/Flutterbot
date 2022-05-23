module.exports = {
name: 'flutterhy',
description: 'flutts',
    execute(message,args, cmd, Discord)
    {
    
        
        if(args = 'I love you')
        {
            const user = message.member;
            const user1 = user.toString();
            message.channel.send('I love you to!' + ' ' + user1);
        }
    
    }
    
    
    
}
