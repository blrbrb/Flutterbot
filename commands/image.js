var Scraper = require('images-scraper');

const google = new Scraper({
puppeteer: {
    headless:true
}
})

module.exports = {
name: 'image',
description: 'sends a random image corresponding to a google image search',
    async execute(client, message, args, debug)
    {
       // message.channel.send(scraper);
        const image_query = args.join(" ");
        console.log(image_query);
        if(debug) {
            message.channel.send('fetching with kq! =' + image_query);
            message.channel.send('running scripts...');
        }

        if(!image_query) return message.channel.send('Please Supply a SearchTerm');
        
        const image_results = await google.scrape(image_query, 1);
        message.channel.send(image_results[0].url);
        
        if(debug)
        {
            message.channel.send('successfully scraped:' + " " + image_results.length + " " +'image results');
        }
    }
}
