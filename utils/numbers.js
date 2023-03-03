module.exports = {
    clamp: function (input, min, max) {// min is inclusive, max is inclusive, non numbers log an error and returns 0
        input = Number.parseInt(input);
        min = Number.parseInt(min);
        max = Number.parseInt(max);
        if (isNaN(input) || isNaN(min) || isNaN(max)) return console.error("An input wasn't a number", input, min, max), 0;
        return Math.min(Math.max(input, min), max);
    },
    within: function (input, min, max) {// min is inclusive, max is inclusive, non numbers log an error and returns false
        input = Number.parseInt(input);
        min = Number.parseInt(min);
        max = Number.parseInt(max);
        if (isNaN(input) || isNaN(min) || isNaN(max)) return console.error("An input wasn't a number", input, min, max), false;
        return input >= min && input <= max;
    },
    range: function(min, max) {// min is inclusive, max is exclusive, non numbers log an error and returns 0
        min = Number.parseInt(min);
        max = Number.parseInt(max);
        if (isNaN(min) || isNaN(max)) return console.error("An input wasn't a number", min, max), 0;
        return Math.random() * (max - min) + min; // despite this function being capable of running max as the lesser value and that having logical problems i wont be throwing errors if that happens
    },
    frange: function(min, max) {// min is inclusive, max is exclusive, non numbers log an error and returns 0
        min = Number.parseInt(min);
        max = Number.parseInt(max);
        if (isNaN(min) || isNaN(max)) return console.error("An input wasn't a number", min, max), 0;
        return Math.floor(Math.random() * (max - min) + min); // despite this function being capable of running max as the lesser value and that having logical problems i wont be throwing errors if that happens
    },
    map: function() {

    }
}