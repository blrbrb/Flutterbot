const {commandResponses, errorMessage} = require('../../lang/en.js'); 
const { formatTime } = require('../../utils.js');

module.exports = {
    name: 'pause',
    description: 'pause the currently playing song',
    helpText: `Pause the currently playing music or video \n Use: **/pause**`,
    async execute(interaction, Flutterbot) {
        const queue = await Flutterbot.DisTube.getQueue(interaction);
       
        
        if(!queue) return interaction.reply(errorMessage.Distube.QueueEmpty());
       
        if(queue.paused)
        {
            return interaction.reply(errorMessage.Distube.AlreadyPaused())
        } 

        const song = queue.songs[0];
        const current_time = formatTime(Math.floor(queue.currentTime)); 

        queue.pause(interaction); 

        return interaction.reply(commandResponses.pause(queue));
    }
}