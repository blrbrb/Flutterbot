var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    name: 'ifunny',
    description: 'grab an image from Ifunny. god help you',
    execute(message, args, debug) {

        // console.log('working');

        var options = {};

        if (message.content.includes('help')) {
            message.channel.send('try entering a one word tag, and or a one word filter. Like "-ifunny "funny" "weird"');
            return;
        }

        switch (args.length) {
            case 1: {
                //console.log('args are one'); 
                //	console.log(args[0]); 

                options = {
                    url: "https://ifunny.co/tags/" + args,
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                    }
                };
            } break;
            case 2: {
                //  console.log('args are 2'); 
                //  console.log(args[1]); 

                options = {
                    url: "https://ifunny.co/tags/" + args[0] + "?filter=" + args[1],
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                    }
                };
            } break;
            default: {
                options = {
                    url: "https://ifunny.co/other",
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                    }
                }
            };
        }

        request(options, function (error, response, responseBody) {

            if (error) { console.log('Im yellow shy, and Eli is a useless, incapable human being'); return; }

            $ = cheerio.load(responseBody);
            //_26gD._3_Go._3brC.
            //This line will change often as Ifunny updates it's dumb API 
            var links = $("._3ZEF img");


            // document.querySelector("#App > div._2Uj_ > div._2kNu > div > div._26gD._3_Go > div:nth-child(1) > div > div.l5Cl > img")

            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("data-src"));

            //message.channel.send(links[1]);

            if (debug) {
                message.channel.send(`Debug Output: response body =   ${Object.keys(links.eq(1))}`);
            }

            console.log(urls);
            if (!urls.length) {
                message.channel.send('I just dont know what went wrong');
                //message.channel.send(urls[1]);

                console.log('you fucked it up, objectvie B kill all humans');

                return;
            } else { // filter through array, send resulting random image
                message.channel.send("p-please don't make me look through ifunny");

                if (debug) {
                    message.channel.send("Fetched Links:");
                    message.channel.send(urls, { code: "js" });
                    message.channel.send(`Array Length ${urls.length}`);
                }

                urls.shift();
                message.channel.send(urls[Math.floor(Math.random() * urls.length)]);

                return;
            }
        });
    }
}