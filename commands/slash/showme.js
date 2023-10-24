var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    name: 'showme',
    description: 'show me some art in a particular color',
    options: [
        {
            type: 3,
            description: "a colour",
            name: "colour",
            required: true
        }
    ],
    /**
     * @param {import('discord.js').Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction, Flutterbot) {
        var options = {
            url: "https://artsandculture.google.com/color?col=" + interaction.options.getString('colour').toUpperCase(),
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

     

        request(options, async function (error, response, responseBody) {

            if (error) { console.log('Im yellow shy, and Eli is a useless, incapable human being'); return; }

            $ = await cheerio.load(responseBody);

            var links = $(".DuHQbc.pdfEnd a");

          

            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("data-bgsrc"));

            //message.channel.send(links[1]);

          

            if (!urls.length) {
                interaction.reply('something went wrong');
                //message.channel.send(urls[1]);

                console.log('you fucked it up, objectvie B kill all humans');

                return;
            } else { //filter through array, send resulting random image
                urls.shift();

                const string = `https:${urls[Math.floor(Math.random() * urls.length)]}`;

                return interaction.reply(string);
                
            }
            return;
        });
    }
}