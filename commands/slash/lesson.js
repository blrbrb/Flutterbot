const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lesson',
    description: 'get a randomly fetched quote from the FIM TV series!',
    helpText: `I'll pull up a random snippet of dialouge from any of the nine seasons of FIM \n Use: **/lesson**`,
    async execute(interaction, Flutterbot) {
        //TO DO: Find a way to fetch corresponding images for each pony speaking. 

        let rawdata = fs.readFileSync('assets/season1.json');

        var speaker_images = new Map();

        var links = [];
        initimages(speaker_images);
        //arr.set(

        var episode_data = JSON.parse(rawdata);

        //await train(episode_data); 

        var seasons = ["season1", "season2", "season3", "season4", "season5", "season6"];


        //Parse Multi-Dimensional JSON episode data 
        let seasonrand = seasons[Math.floor(Math.random() * seasons.length)];
        let episoderand = Math.floor(Math.random() * episode_data.mlp[seasonrand].length);
        let numrand = Math.floor(Math.random() * episode_data.mlp[seasonrand][episoderand].length);

        let randResult = episode_data.mlp[seasonrand][episoderand][numrand];
        //configure the embed with the details parsed from the data  
        if (randResult.song === 'true') {
            const embed = new MessageEmbed().setTitle(randResult.speaker).setDescription('*' + randResult.text + '*').setColor(0xfbfb2b).setThumbnail(speaker_images.get(randResult.speaker.toString()));
        }

        //console.log(randResult.speaker); 

        const embed = new EmbedBuilder().setTitle(randResult.speaker.toString(), null).setDescription(randResult.text.toString()).setColor(0xfbfb2b).setThumbnail(speaker_images.get(randResult.speaker.toString()));

        interaction.reply({ embeds: [embed] });
    }
}

function initimages(map1) {
    console.log('function called');
    map1.set("AppleJack", "http://fc01.deviantart.net/fs70/i/2011/260/d/9/applejack_vector_by_hombre0-d4a3lwt.png");
    map1.set("Twilight Sparkle", "https://derpicdn.net/img/2022/6/12/2885727/large.png");
    map1.set("Starlight Glimmer", "https://derpicdn.net/img/2018/2/17/1657915/small.png");
    map1.set("Coco Pommel", "https://derpicdn.net/img/2017/5/20/1441055/full.png");
    map1.set("Princess Cadence", "https://derpicdn.net/img/2014/11/28/773283/large.png");
    map1.set("Spike", "https://derpicdn.net/img/2022/6/13/2886255/large.png");
    map1.set("Apple Bloom", "https://derpicdn.net/img/2017/1/1/1329946/large.png");
    map1.set("Pinkie Pie", "https://derpicdn.net/img/view/2022/6/13/2886572.png");
    map1.set("Fluttershy", "https://derpicdn.net/img/2022/6/14/2886815/large.jpg");
    map1.set("Rainbow Dash", "https://derpicdn.net/img/2022/6/13/2886559/large.png");
    map1.set("Granny Smith", "https://derpicdn.net/img/2017/6/2/1452122/large.png");
    map1.set("Princess Luna", "https://derpicdn.net/img/2022/6/11/2884848/large.jpg");
    map1.set("Princess Celestia", "https://derpicdn.net/img/2022/6/12/2885592/large.png");
    map1.set("Mayor Mare", "https://derpicdn.net/img/view/2022/5/22/2870134.jpg");
    map1.set("Big McIntosh", "https://derpicdn.net/img/2022/5/30/2876279/large.jpg");
    map1.set("Diamond Tiara", "https://derpicdn.net/img/2016/1/10/1063925/large.png");
    map1.set("Sweetie Belle", "https://derpicdn.net/img/2016/6/22/1184509/large.png");
    map1.set("Scootaloo", "https://derpicdn.net/img/2016/12/13/1316653/large.png");
    map1.set("Princess Ember", "https://derpibooru.org/images/2872567?q=Princess+Ember");
    map1.set("Trixie", "https://derpicdn.net/img/2017/2/9/1358464/large.png");
    map1.set("Shining Armor", "https://derpicdn.net/img/2015/7/13/936529/large.png");
    map1.set("Spitfire", "https://derpicdn.net/img/2017/4/21/1417431/large.png");
    map1.set("Photo Finish", "https://derpicdn.net/img/view/2022/5/14/2865080.jpg");
    map1.set("Zecora", "https://derpicdn.net/img/2022/6/12/2885617/large.jpg");
    map1.set("Cheese Sandwhich", "https://derpicdn.net/img/2016/3/22/1114636/large.png");
    map1.set("Cheerilee", "https://derpicdn.net/img/2022/5/30/2876432/large.png");
    map1.set("Rarity", "https://i.pinimg.com/originals/9d/b7/9d/9db79d51e38bb3ab3b3ae1f2c7e463fe.png");

    // return map; 
}
