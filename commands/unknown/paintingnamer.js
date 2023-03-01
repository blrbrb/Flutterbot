module.exports = {
    name: 'paintingnamer',
    description: 'send a random string of horrible things',
    execute(message, args) {
        var length = Math.floor(Math.random() * 10);

        var words = ["not", "a", "why", "no", "inside", "outside", "there", "here", "under", "car", "van", "house", "on", "with", "stream", "river", "room", "vase", "flower", "bottle", "desk", "light", "lamp", "garden", "shave", "reach", "without", "nor", "shadow", "living", "tree", "shrub", "grass", "couch", "can", "park", "stroll", "day", "night", "winter", "summer", "fall", "spring", "winter", "rain", "snow", "shine", "sleet", "hail", "cloud", "leaf", "storm", "sky", "afternoon", "morning", "night", "twilight", "daybreak", , "there", "thoughts", "tastes", "senses", "feelings", "memories", "scent", "cave", "gourd", "made", "touch", "creation", "past", "hope", "laughter", "smile", "rose", "slope", "sub", "whole", "part", "star", "moon", "shine", "glint", "glimmer", "spark", "embers", "crackle", "smog", "layer", "sound", "somewhere", "someone", "somehow", "room", "table", "apartment", "table", "ground", "field", "host", "imagine", "only", "if", "we", "had", "the", "ability", "to", "retain", "conciousness", "after", "the", "cessation", "constraints", "prove", "material", "materialism", "wrong", "but", "human", "fiber", "soul", "spirit", "ghost", "flesh", "everything", "much", "else", "exists", "perception", "wind", "water", "sun", "flowers", "fresh", "trees", "autum", "breeze", "air", "faint", "quality", "something", "explain", "why", "entire", "real", "interactions", "yet", "unable", "determine", "root", "cast", "too", "cannot", "become", "dusk", "drained", "desert", "ocean", "river", "tudra", "nothing", "lost", "float", "pictures", "events", "yellow", "rainy", "windowsill", "dew", "fog", "remind", "return", "loft", "stones", "mud", "road", "fibers", "stalks", "pond", "drive", "sleep", "rest", "cushion", "find", "found", "self", "mists", "running",
            "will", "time", "ice", "roof", "drops", "thirst", "hunger", "comfort", "dread", "let", "surrender", "give", "despair", "retreat", "peace", "world", "void", "barren", "draft", "forever", "until", "more", "lake", "flow", "everywhere", "time", "saw", "heard", "smelt"]


        var adjectives = ["cold", "bewildered", "forward", "backward", "inner", "perplexed", "misunderstood", "unheard", "unseen", "unfelt", "removed", "wonderful", "invisible", "apparent", "soft", "happy", "long", "distant", "illuminated", "glowing", "bright", "sounded", "gutted", "removed", "gone", "transparent", "thin", "apart", "incomplete", "missing", "forlorn", "free", "hazy", "sunny", "relegated", "distant", "forgotten", "minimal", "great", "important", "present", "pressed", "repressed", "aside", "away", "layered", "entrenched", "pale", "early", "late", "deep", "lengthy", "short", "unknown", "outside", "far", "seperate", "close", "familar", "unfamilar", "feeble", "great", "amazing", "wooded", "green", "perceptible", "physical", "impossible", "dusky", "milky", "thick", "slipping", "buried", "inside", "thin", "dark", "sublime", "underneath", "full", "empty", "paler", "dark", "cool", "red", "drifting", "lumenescent", "small", "smaller", "surrounded", "complete", "parched", "dried", "pictured", "misty", "calm", "floating", "misplaced", "beyond", "unnamed", "found", "smallest", "felt", "falling", "escaped", "held", "touched", "grasped", "overcame", "sheathed", "built", "pained", "painted", "written", "rough", "smooth", "silky", "euphoric", "joyful", "friendly", "assured", "rested", "clean", "dirty", "messy", "straight", "twisted", "plain", "reduced", "added", "divided", "contained", "cornered", "planted", "planned", "placed", "put", "parsed", "returned", "centered", "measured", "known", "slovenly", "impoverished", "sheltered", "entitled", "regained", "gained", "blown", "disected", "exited", "free", "enslaved", "servile", "masterly", "owned", "kept", "sent", "used", "forced", "beated", "soiled", "trumped", "trodded", "starved", "gassed", "missed", "hurt", "broken", "replaced", "misunderstood", "spoiled", "devalued", "trusted", "feared", "hated", "reviled", "proud", "tall"];

        var sentence = new Array();
        var i;
        var m;
        var max = Math.floor(Math.random() * 2);

        for (i = 0; i <= max; i++) {
            for (m = 0; m <= max; m++) {
                sentence.push(randomWord(adjectives));
            }
            sentence.push(randomWord(words) + " ");
        }

        message.channel.send(sentence);

        function randomWord(words) {
            var randWord = words[Math.floor(Math.random() * words.length)];
            return randWord;
        }
    }
}