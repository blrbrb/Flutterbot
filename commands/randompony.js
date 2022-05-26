var request = require('request')
var cheerio = require('cheerio')

module.exports = {
    name: 'randompony',
    alias: 'pony', 
    description: 'fetch randomly generated pone',
    execute(message, args) {

        // console.log('working');
       

      
            var options = {
                url: "https://thisponydoesnotexist.net/",
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };

        
        


        request(options, function (error, response, responseBody) {

            if (error) { console.log('Im yellow shy, and Eli is a useless, incapable human being'); return; }

            $ = cheerio.load(responseBody);
            //_26gD._3_Go._3brC.
            //This line will change often as Ifunny updates it's dumb API 
            var links = $(".furry-quilt a.furry-link img ");

            message.channel.send(links[1]); 

            // document.querySelector("#App > div._2Uj_ > div._2kNu > div > div._26gD._3_Go > div:nth-child(1) > div > div.l5Cl > img")

            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("src"));
            

            //var urls = new Array($('.furry-link a').map((i, x) => $(x).attr('src')).toArray()); 



            console.log(urls);
            if (!urls.length) {
                message.channel.send('invalid array allocation: urls.length < 0');
                message.channel.send(urls[1]);




                console.log('you fucked it up, objectvie B kill all humans');

                return;
            }


            //filter through array, send resulting random image
            else {
                message.channel.send("This Pony Does Not Exist:");
                urls.shift();
                message.channel.send(urls[1]);
                return;
            }


        });



    }
}




