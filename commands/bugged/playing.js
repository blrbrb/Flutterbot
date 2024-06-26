﻿const progressbar = require('string-progressbar');

module.exports = {
    name: 'playing',
    description: 'get the currently playing song',
    helpText: `View the currently playing track  \n Use: **/resume**`,
    async execute(interaction,Flutterbot)  {
        const queue = await Flutterbot.DisTube.getQueue(interaction);

        let track = queue.songs[0];
        const time = track.duration * 1000;

        const current_time = await queue.currentTime;

        const string = `🎵🕊️:  \n ***${queue.songs[0].name}***  ${progressbar.splitBar(current_time === 0 ? current_time : time, current_time, 10)[0]} \ [${queue.formattedCurrentTime}/${track.formattedDuration}]`;
        interaction.reply(string);
    }
}