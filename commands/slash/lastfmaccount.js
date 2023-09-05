
const http = require('http');

module.exports = {
	name: 'linklastfm',
	description: 'link your last fm account to scrobble played songs',
	helpText: `Sends a link allowing you to login to your last.fm account, and track your listening with Fluttershy! (in testing, may be unstable)`,
	async execute(interaction, client) 
    {
       
        //var authUrl = client.lstfm.getAuthenticationUrl({'cb': 'http://127.0.0.1:3000'});
        interaction.reply({content:`[login](${client.fmAuthUrl})`,  ephemeral: true}); 

        //pre-initalize the last.fm account information in the database 
       
    }

}