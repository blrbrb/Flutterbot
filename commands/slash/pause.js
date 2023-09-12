const {commandResponses, errorMessage} = require('../../lang/en.js'); 
const { formatTime } = require('../../utils.js');

module.exports = {
    name: 'pause',
    description: 'pause the currently playing song',
    helpText: `Pause the currently playing music or video \n Use: **/pause**`,
    async execute(interaction, Flutterbot) {
        const queue = await Flutterbot.DisTube.getQueue(interaction);
        const song = queue.songs[0];
        const current_time = formatTime(Math.floor(queue.currentTime)); 
        
        if(!queue) return interaction.reply({content:errorMessage.Distube.noQueue(), ephemeral: true});
       
        if(queue.paused)
        {
            return interaction.reply({content:errorMessage.Distube.AlreadyPaused(),  ephemeral: true})
        }

        queue.pause(interaction); 

        return interaction.reply({content:commandResponses.pause(queue),  ephemeral: false});
    }
}