
var cheerio = require('cheerio');
var request = require('request');

module.exports = {
name: 'newpony',
description: 'Get an entierly Unique Pony from thisponydoesnotexist!',
    async execute(Discord, client, interacion,debug)
    {
        var options = {
            url: "https://ifunny.co/tags/" + args,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"

            }
        }

    }
}

