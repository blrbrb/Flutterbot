"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockBox = void 0;
const utilities_1 = require("./utilities");
const fs_1 = __importDefault(require("fs"));
const node_crypto_1 = __importDefault(require("node:crypto"));
class LockBox {
    constructor() {
        let initalize = process.env.ENCRYPTION_KEY ? false : true;
        if (initalize) {
            this._initEnv();
        }
    }
    /**
     * encrypt data
     * @param {any} data
     * @returns {string}
     */
    encrypt(data) {
        // I got all of this off of google lol idk wtf crypto does 
        let timestamp = this._newTimestamp();
        const key = node_crypto_1.default.createHash('sha256').update(this.stationaryKey + timestamp).digest('hex');
        const iv = node_crypto_1.default.randomBytes(16); // Apparently this needs to be unique, every time. whoops. Had it in the constructor 
        const cipher = node_crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
        let encryptedData = cipher.update(data, 'utf8', 'base64');
        encryptedData += cipher.final('base64');
        // Return the timestamp + encrypted data
        return `${timestamp}:${iv.toString('hex')}:${encryptedData}`;
    }
    /**
     * Same as encrypt(), but the key used for the encryption is immediately destroyed.
     * rendering whatever data it has encrypted permanent scrambled. (prob wont work, haven't tested)
     * @param {any} data
     
     * @returns {any} permanentley encrypted data
     */
    encrypt_forgetKey(data) {
        const iv = node_crypto_1.default.randomBytes(16);
        const cipher = node_crypto_1.default.createCipheriv('aes-256-cbc', node_crypto_1.default.randomBytes(32), Buffer.from(iv.toString(), 'hex'));
        let encryptedToken = cipher.update(data, 'utf-8', 'hex');
        encryptedToken += cipher.final('hex');
        return encryptedToken;
    }
    /**
     * decrypt data
     * @param {string} data
     * @returns {any} decrypted data
     */
    decrypt(data) {
        const [timestamp, ivHex, encryptedText] = data.split(':');
        const key = node_crypto_1.default.createHash('sha256').update(this.stationaryKey + timestamp).digest('hex');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = node_crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
        let decryptedData = decipher.update(encryptedText, 'base64', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    }
    /**
     * Description placeholder
     * @date 10/13/2023 - 5:04:02 AM
     *
     * @returns {*}
     */
    _generateKey() {
        let Key = node_crypto_1.default.randomBytes(32).toString('hex');
        return Key;
    }
    /**
     * initalize the stationary key as an enviornment variable,
     * if it doesn't already exist.
     */
    _initEnv() {
        // Generate a new encryption key
        const Key = this._generateKey();
        const envKey = `
      ENCRYPTION_KEY=${Key}
    `;
        let envFiles = (0, utilities_1.findFiles)('', './', '.env'); //find custom env files
        if (!envFiles) {
            (0, utilities_1.Log)('yellow, bold', 'WARN: Unable to find an enviornment (.env) file. Creating a new one in the working directory');
            fs_1.default.writeFileSync(".env", envKey, { flag: 'a' });
        }
        else {
            fs_1.default.writeFileSync(envFiles[0], envKey, { flag: 'a' });
            (0, utilities_1.Log)('created new key and updated .env file');
        }
    }
    /**
     * returns a string representing unix time at the current moment.
     *
     *
     * @returns {string}
     */
    _newTimestamp() {
        return Date.now().toString();
    }
}
exports.LockBox = LockBox;
exports.default = LockBox;
