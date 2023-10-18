"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsMemberQuote = exports.ReactionData = exports.fsGuildObject = exports.DataTypes = exports.EllyPonyUrl = exports.NekoNokaUrl = void 0;
const utilities_1 = require("./utilities");
;
exports.NekoNokaUrl = "https://github.com/NekoNoka/";
exports.EllyPonyUrl = "https://github.com/blrbrb";
exports.DataTypes = {
    Undefined: 0,
    Number: 1,
    String: 2,
    Array: 3,
    Boolean: 4,
    Object: 5,
    Function: 6,
    Unknown: 7
};
class fsGuildObject {
    constructor(id) {
        this.id = (0, utilities_1.resolveGuildID)(id);
    }
}
exports.fsGuildObject = fsGuildObject;
/**
 * Object representing the number of sent and recieved reactions a user has. Component on
 * {@link PonyExp}
 * @export
 * @class ReactionData
 * @implements {ReactionData}
 */
class ReactionData {
    constructor(sent, recieved) {
        this.sent = sent;
        this.recieved = recieved;
    }
}
exports.ReactionData = ReactionData;
/**
 * Object representing a quote from a server member
 *
 * @export
 * @class fsMemberQuote
 * @typedef {fsMemberQuote}
 * @implements {fsMemberQuote}
 */
class fsMemberQuote {
    constructor(name, date, id, guild, quote) {
        this.guild = guild;
        this.date = date;
        this.id = id;
        this.name = name;
        this.quote = quote;
    }
}
exports.fsMemberQuote = fsMemberQuote;
