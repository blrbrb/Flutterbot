const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    name: 'quote',
    description: 'Fetch randomly generated quotes from inspirobot',
    async execute(interaction, debug) {

        let interact = interaction; 
        var options = {
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

            interaction.reply({content: url});




        });









    }



}

