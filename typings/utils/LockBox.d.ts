export class LockBox {
    stationaryKey: string | undefined;
    encrypt(data: any): string;
    /**
     * Same as encrypt(), but the key used for the encryption is immediately destroyed.
     * rendering whatever data it has encrypted permanent scrambled. (prob wont work, haven't tested)
     * @param {any} str
     * @returns {any}
     */
    encrypt_forgetKey(message: any): any;
    /**
     * @summary Decrypt secure keys, passwords, secrets, tokens, strings etc
     * @param {string} token_str
     * @returns {string}
     */
    decrypt(encrData: any): string;
    /**
    *
    * @summary Private Class Method: generate a new 32bit hex key to seed encryption ciphers
    * @return {string} key representing random bytes
    */
    generateKey(): string;
    /**
     * @summary Private Class Method: called to update the .env file after a new key is made
     * @returns {undefined}
     */
    updateEnv(): undefined;
    newTimestamp(): string;
    /**
     * @summary Private Class Accessor method. Check if key already exists in enviornment
     * @returns {boolean}
     */
    FirstTimeKey(): boolean;
}
//# sourceMappingURL=LockBox.d.ts.map