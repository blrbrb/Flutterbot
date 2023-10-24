"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.fsSnowflakeType = exports.fsError = exports.fsMemberQuote = exports.ReactionData = exports.fsUser = exports.fsGuild = exports.DataTypes = exports.EllyPonyUrl = exports.NekoNokaUrl = void 0;
const utilities_1 = require("./utilities");
const exp_1 = __importDefault(require("./exp"));
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
/**
 *  contains all of the data created by Flutterbot
 *  associated with a {@link Guild}
 */
class fsGuild {
    constructor(id, args = { newMemberMinimumAge: 0, embedColor: 0, defaultCoolDown: 2, privateRoles: [] }) {
        this.newMemberMinimumAge = args.newMemberMinimumAge;
        this.embedColor = args.embedColor;
        this.defaultCoolDown = args.defaultCoolDown;
        this.privateRoles = args.privateRoles;
        if (!id)
            throw new Error('cannot instantize fsGuild with a valid Guild id!');
        else
            this.id = uUtilities.resolveGuildID(id);
    }
    /**
     * Add a role to a guild's list of {@link privateRoles}
     * @param {Snowflake} [roleID] the role's unique discord Snowflake ID
     */
    addPrivateRole(roleID) {
        this.privateRoles.push(roleID);
        return;
    }
}
exports.fsGuild = fsGuild;
/**
 * contains all of the data created by Flutterbot associated with a {@link User}
 *  @export
 * @class fsUser
 * @implements {fsObject}
 */
class fsUser {
    /**
     * Creates an instance of fsUser.
     *
     * @param {fsUserIDResolvable} id
     * @param {{PonyExp:PonyExp, server_quotes:server_quotes}} [args={PonyExp:new PonyExp(), server_quotes:[]}]
     * @memberof fsUser
     */
    constructor(id, args = { PonyExp: new exp_1.default(), server_quotes: [] }) {
        this.server_quotes = args.server_quotes;
        this.PonyExp = args.PonyExp;
        if (!id)
            throw new Error('cannot instantize fsGuild with a valid Guild id!');
        else
            this.id = uUtilities.resolveUserID(id);
    }
    /**
     * Add a new quote to the user
     *
     * @memberof fsUser
     * @param {fsMemberQuote} quote
     */
    addQuote(quote) {
        this.server_quotes.push(quote);
        return;
    }
}
exports.fsUser = fsUser;
/**
 * Object representing the number of sent and recieved reactions a user has. Component on
 *
 * @class ReactionData
 * @implements {ReactionData}
 */
class ReactionData {
    /**
     * the total number of reactions a user has sent
     * @memberof ReactionData
     */
    /**
     * Creates an instance of ReactionData.
     *
     * @param {number} [sent]
     * @param {number} [recieved]
     * @memberof ReactionData
     */
    constructor(sent, recieved) {
        this.sent = sent;
        this.recieved = recieved;
    }
}
exports.ReactionData = ReactionData;
/**
 * Object representing a quote from a server member
 *
 * @class fsMemberQuote
 * @implements {fsMemberQuote}
 */
class fsMemberQuote {
    /**
     * Creates an instance of fsMemberQuote.
    
     * @param {string} [name] username
     * @param {string} [date] YY/MM/DD
     * @param {string} [id] the User's Discord id;
     * @param {string} [guild] the current guild id
     * @param {string} [quote] the quote
     * @memberof fsMemberQuote
     */
    constructor(name, date, id, guild, quote) {
        this.guild = guild;
        this.date = date;
        this.id = id;
        this.name = name;
        this.quote = quote;
    }
}
exports.fsMemberQuote = fsMemberQuote;
class fsError extends Error {
    constructor(message, error) {
        super(message);
        this.name = 'fsError';
        if (error)
            this.original = error;
        else
            this.original = this;
    }
    /**
     * summary of what caused the error
     * @return {string}
     * @memberof fsError
     */
    what() {
        return this.message;
    }
    /**
     * string containing the method name, filename, and line an error originated from
     * @return {(number | null)}
     * @memberof fsError
     */
    where() {
        if (!this.stack)
            return null;
        // Parse the stack trace to extract the file, method, and line information
        const stackLines = this.stack.split('\n');
        if (stackLines.length >= 2) {
            const match = /at (.+) \((.+):(\d+:\d+)\)/.exec(stackLines[1]);
            if (match && match.length >= 4) {
                const [, method, file, line] = match;
                return `${method}, ${file}, ${line}`;
            }
        }
        return null;
    }
    /**
     * Fetch the original Error class / instance that this
     * error originated from
     *
     * @return  {Error}
     * @memberof fsError
     */
    origin() {
        return this.original;
    }
}
exports.fsError = fsError;
var fsSnowflakeType;
(function (fsSnowflakeType) {
    fsSnowflakeType[fsSnowflakeType["User"] = 0] = "User";
    fsSnowflakeType[fsSnowflakeType["Bot"] = 1] = "Bot";
    fsSnowflakeType[fsSnowflakeType["Server-Member"] = 2] = "Server-Member";
    fsSnowflakeType[fsSnowflakeType["Channel"] = 3] = "Channel";
    fsSnowflakeType[fsSnowflakeType["Role"] = 4] = "Role";
    fsSnowflakeType[fsSnowflakeType["Emoji"] = 5] = "Emoji";
    fsSnowflakeType[fsSnowflakeType["Message"] = 6] = "Message";
    fsSnowflakeType[fsSnowflakeType["Guild"] = 7] = "Guild";
})(fsSnowflakeType || (exports.fsSnowflakeType = fsSnowflakeType = {}));

class fsDatabaseError extends fsError {
    constructor(message, error) {
        super(message, error);
        this.name = 'fsDatabaseError';
    }
}
exports.fsDatabaseError = fsDatabaseError;
    class fsPermissionsError extends fsError {
        constructor(message, error) {
            super(message, error);
            this.name = 'fsPermisionsEror';
        }
    }
    exports.fsPermissionsError = fsPermissionsError;
    class fsClientError extends fsError {
        constructor(message, error) {
            super(message, error);
            this.name = 'fsClientError';
        }
    }
    exports.fsClientError = fsClientError;
    class fsAPIError extends fsError {
        constructor(message, error) {
            super(message, error);
            this.name = 'fsAPIError';
        }
    }
    exports.fsAPIError = fsAPIError;
    class fsTypeError extends fsError {
        constructor(message, error) {
            super(message, error);
            this.name = 'fsTypeError';
        }
    }
    exports.fsTypeError = fsTypeError;
    class fsLockBoxError extends fsError {
        constructor(message, error) {
            super(message, error);
            this.name = 'fsLockBoxError';
        }
    }
    let fsErrorTypes;
    (function (fsErrorTypes) {
        fsErrorTypes[fsErrorTypes["Permissions"] = 0] = "Permissions";
    })(fsErrorTypes = exports.fsErrorTypes || (exports.fsErrorTypes = {}));
