module.exports = {
name: 'rarity',
description: '',
    execute(message,args, cmd, Discord)
    {
        
        var greeting_sentences = ["Hi there!, how's it going~", "It's so nice to see you again!", "Hello there~", "My name is twilight sparkle", "Hiya~"];
        
        
        function random_sentence(sentence)
        {
            var rand_sentence = sentence[Math.floor(Math.random() * sentence.length)];
            
            return sentence[1];
        }
        
        const twilight_hello = new Discord.MessageEmbed()
             .setDescription("Hello! My name is Twilight Sparkle: I'm pretty busy studying right now, so you might want to check back later.")
             .setImage('https://www.pinclipart.com/picdir/big/377-3771645_ohum-hello-crankyer-how-are-twilight-sparkle-shy.png');
        const twilight_happy = new Discord.MessageEmbed()
             .setDescription(random_sentence(greeting_sentences))
             .setImage('https://derpicdn.net/img/2012/11/25/163008/large.png');
        
        
        
       
       
        if (args[0] == 'hello') {
                message.channel.send(twilight_happy);
        }
            
        else {
                message.channel.send(twilight_hello);
                message.channel.send(args);
                //message.channel.send(cmd);
        }
            
    
    }
    
    

    
}
