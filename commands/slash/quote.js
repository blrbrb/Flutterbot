const cheerio = require('cheerio');
const request = require('request');
const {Interaction} = require('discord.js');
const {Flutterbot} = require('../../client/Flutterbot');
module.exports = {
    name: 'quote',
    description: 'fetch randomly generated quotes from inspirobot',
    helpText: `grab a randomly generated quote from inspirobot \n Use: **/quote**`,
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction, Flutterbot) {
        let options = {
            url: "https://inspirobot.me/api?generate=true",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        request(options, function (error, response, responseBody) {

            if (error) { console.log('Something is wrong, and my creator is dumb'); return; }

            $ = cheerio.load(responseBody);

            var url = $('body').text();

            interaction.reply({ content: url });
        });
    }
}