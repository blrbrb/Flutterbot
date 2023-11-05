"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
 exports.fsClientError = exports.fsTypeError = exports.fsDatabaseError = exports.fsClientError = exports.fsAPIError =exports.fsError = exports.fsMemberQuote = exports.ReactionData = exports.fsUser = exports.fsGuild = exports.fsDataTypes = exports.EllyPonyUrl = exports.NekoNokaUrl = void 0;


exports.NekoNokaUrl = "https://github.com/NekoNoka/";
exports.EllyPonyUrl = "https://github.com/blrbrb";
/**
 * @typedef {Enumerator} fsDataTypes
 * 
 * */



exports.fsDataTypes = {
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
 * @typedef {Enumerator<string, number} fsSnowflakeType
 * 
 * */
exports.fsSnowflakeType = 
{
   User:0,
   Bot:1,
   ServerOrMember:2,
   Channel:3,
   Role: 4,
   Emoji:5,
   Message:6,
   Guild:7,
   Interaction: 8,
   Unkown: 9, 
   Error: 10

}

class fsUniversalInteraction {
    constructor(message, interaction) {
        if (message) {
            this.message = message;
            this.interaction = null;
        }
        else if (interaction) {
            this.message = null;
            this.interaction = interaction;
        }
        else {
            throw new Error('You must provide either a Message or CommandInteraction.');
        }
    }
    //public get methods to fetch the author / user value. Get will not recast the values, or modify the API in any way 
    get author() {
        var _a, _b;
        return ((_a = this.message) === null || _a === void 0 ? void 0 : _a.author) || ((_b = this.interaction) === null || _b === void 0 ? void 0 : _b.user);
    }
    get content() {
        var _a, _b;
        return ((_a = this.message) === null || _a === void 0 ? void 0 : _a.content) || ((_b = this.interaction) === null || _b === void 0 ? void 0 : _b.commandName);
    }
    reply(content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.message) {
                return this.message.reply(content);
            }
            else if (this.interaction) {
                yield this.interaction.reply(content);
            }
        });
    }
    // methods and properties of CommandInteraction
    get options() {
        var _a;
        return (_a = this.interaction) === null || _a === void 0 ? void 0 : _a.options;
    }
    get guild() {
        var _a;
        return (_a = this.interaction) === null || _a === void 0 ? void 0 : _a.guild;
    }
    // Add other methods and props from CommandInteraction?????
    //Acessors 
    isMessage() {
        return !!this.message;
    }
    isInteraction() {
        return !!this.interaction;
    }
}
exports.fsUniversalInteraction = fsUniversalInteraction;

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
    