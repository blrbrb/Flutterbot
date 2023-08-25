const colors = {
    "": "\x1b[0m",
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    grey: "\x1b[90m",

    bgblack: "\x1b[40m",
    bgred: "\x1b[41m",
    bggreen: "\x1b[42m",
    bgyellow: "\x1b[43m",
    bgblue: "\x1b[44m",
    bgmagenta: "\x1b[45m",
    bgcyan: "\x1b[46m",
    bgwhite: "\x1b[47m",
    bggray: "\x1b[100m",
    bggrey: "\x1b[100m"
}
/**
 * @param {boolean} logAll 
 * true by default
 * true enables all logging in the file
 * false disables log calls that doesn't enable the forced parameter
 * NOTE: the forced param will not work if modifierList isnt provided
 */
function Log(logAll = true) {
    !logAll && console.log(`${colors.bright}${colors.red}TAKE CARE TO NOTE LOGALL IS DISABLED${colors.reset}`);
    /**
     * @param {string} modifierList
     * examples:
     * log("bright red", "Error");
     * log("bggreen blue", "Success!");
     * 
     * @param {any} message
     * the body of the log
     * 
     * @param {boolean} forced
     * false by default
     * NOTE: the forced param will not work if modifierList isnt provided
     */
    return function (modifierList, message, forced) {
        if (!logAll && !forced) return;
        if (Array.isArray(message)) {
            message = message.join(" ");
        }
        if (message === undefined) {
            message = modifierList;
            modifierList = "";
        }
        let pirate = modifierList.toLowerCase().split(" ");
        let combine = "";
        pirate.forEach(c => colors[c] ? combine += colors[c] : null);
        console.log(`${combine}${message}${colors.reset}`);
    }
}

function ID() {
    this.generate = function () {
        return new Date().valueOf();
    }
}

const log = new Log(true);

function displayList(array) {
    if (!array.length) return log("bright green", "\nEmpty\n");
    let headers = Object.keys(array[0]);
    let table = new Array(array.length + 2).fill().map(() => new Array(headers.length));
    for (let i = 0; i < headers.length; i++) {
        let h_fixed = headers[i].split("_").filter(x => x).map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join(' ');
        table[0][i] = h_fixed;
        for (let j = 0; j < array.length; j++) {
            let d = array[j][headers[i]];
            table[2 + j][i] = String(d);
        }
        let mCount = 0;
        for (let j = 0; j < table.length; j++) {
            if (j == 1) continue;
            mCount = Math.max(mCount, table[j][i].length);
        }
        table[1][i] = ("").padEnd(mCount, "-");
        for (let j = 0; j < table.length; j++) {
            if (j == 1) continue;
            table[j][i] = table[j][i].padEnd(mCount, " ");
        }
    }
    table.map(pirate => pirate.join("  "));
    log("");
    for (let i = 0; i < table.length; i++) {
        if (i == 0) log("bright blue", table[i]);
        else if (i == 1) log("bright white", table[i]);
        else log("bright green", table[i]);
    }
    log("");
    return;
}

module.exports = { displayList, log, Log, ID };