module.exports = {
 name:'elisponeys',
description: 'send a random string of horrible things',
    execute(message, args)  {

    var length = Math.floor(Math.random() * 10);


    var words = ["gay", "socialist", "socialism", "trans", "black", "race", "antifa", "cancel", "nazi", "values", "women", "amendmand", "gun", "drugs", "venezula", "marx", "starving", "violent", "radical", "left", "Boomer", "gen z", "liberal","garbage", "testicle", "sus", "suspicious", "whore", "racism", "racist", "crime", "slavery", "communism", "hitler" , "lenin", "million", "money", "starve", "cuba", "Castro", "terrorism", "terrorist", "veteran", "flag", "anthem", "parade", "war", "muslim", "abortion", "christian", "jesus", "white", "illegal", "immigrant", "looter", "for", "come", "retarded", "sex", "homosexual", "international", "with", "of", "and", "that", "the", "is", "or", "taint", "not", "a", "why", "no", "inside", "outside", "there", "here", "under", "rectal","and", "fag"];
    
var verbs = ["Support", "love" , "piss", "need", "want", "encourage", "despise", "throw", "live", "enforce", "enact", "create","impose", "destroy", "defile", "have", "know", "become", "care", "think", "see", "like", "control", "buy", "improve", "find"];

var nouns = ["liberal", "socialist", "man", "transwoman", "job", "house", "truck", "homosexual", "green deal", "economy", "stock", "soil", "country", "America", "Mexico", "flag", "gun", "rights", "constitution", "color", "blue", "left", "village", "government", "secret", "inner", "toilet", "camp", "dog", "farm", "store", "Marx", "walmart", "value", "Jesus", "bible", "Supreme Court", "Justice", "police", "minority", "poor", "slums", "poverty", "people", "Arab", "Saudi", "Russia", "news", "media", "CNN", "clinton", "joe", "democrat", "virus", "hoax"];
    
var p_nouns = ["rights", "blacks", "homosexuals", "ideals", "police", "countries", "thoughts", "liberties", "immigrants", "looters", "rioters", "terrorists", "marxists", "communists", "businesses", "iphones", "poor people", "rich people", "owners", "slaves", "thoughts", "guns", "schools", "genders"];


var sentence = new Array();



    sentence.push("Intresting, you claim to" + " ");
    sentence.push(randomWord(verbs)+ " " + randomWord(nouns) + " " + randomWord(words) + " " + randomWord(nouns) + " " +randomWord(words) + " " + randomWord(p_nouns) + " " + "but" + " " + randomWord(verbs) + " " + randomWord(words) + " " + randomWord(p_nouns));





    message.channel.send(sentence);

function randomWord(words)
{
        var randWord = words[Math.floor(Math.random() * words.length)];
    return randWord;
}



}
 

}
