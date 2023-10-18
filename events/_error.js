const { Events } = require('discord.js');


module.exports = {
    name: Events.Error,
    once: true,
    execute(Flutterbot, error) {
        console.log('My Websocket has encountered an error :(');
        console.log(`client's WebSocket encountered a connection error: \n${error}`);

        //send error information to debugging channel for devs to see before archiving it 
        //const channel = Flutterbot.channels.cache.get(debugging_channel);
        //if (channel) {
            // const message = 'An error occurred:\n```js\n%s\n```' + `Instance: ${os.hostname} \n Server: ${guild_name}`;
            // channel.send(`An error occurred: ${util.format(message, error.message)}`);
        //}

       // let errorMessage = "temp holder error message";
        //fs.appendFile("error_log.txt", errorMessage, console.log);
    },
};