const fs = require('fs');
const crypto = require('crypto');


class LockBox 
{
   
   constructor() {
    //if there is an existing key, everything has already been encrypted with it.
    //it is not necessary to create a new one yet, as all of the old data will become unreadable.
    this.Key = process.env.ENCRYPTION_KEY;
    this.iv = crypto.randomBytes(16);
    if(this.Key === undefined)
    {
     //only update if it is the first time creating a key
     this.updateEnv()
    }
  
    
  }

  /**
   * @summary Encrypt secure keys, passwords, secrets, tokens, strings etc
   * @param {any} str
   * @returns {any}
   */
  encrypt(str) {
    const cipher = crypto.createCipher('aes-256-cbc', this.Key);
    let encryptedToken = cipher.update(str, 'utf8', 'hex');
    encryptedToken += cipher.final('hex');
    return encryptedToken;
  }
  
  /**
   * Same as encrypt(), but the key used for the encryption is immediately destroyed. 
   * rendering whatever data it has encrypted permanent scrambled. (prob wont work, haven't tested)
   * @param {any} str
   * @returns {any}
   */
  encrypt_forgetKey(message)
  {
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.randomBytes(32), Buffer.from(this.iv, 'hex'));
    let encryptedToken = cipher.update(message, 'utf-8', 'hex');
    encryptedToken += cipher.final('hex');
    return encryptedToken;
  }
  /**
   * @summary Decrypt secure keys, passwords, secrets, tokens, strings etc
   * @param {string} token_str
   * @returns {string}
   */
  decrypt(token_str) {
    const decipher = crypto.createDecipher('aes-256-cbc', this.Key);
    let decryptedToken = decipher.update(token_str, 'hex', 'utf8');
    decryptedToken += decipher.final('utf8');
    return decryptedToken;
  }
/** 
* 
* @summary Private Class Method: generate a new 32bit hex key to seed encryption ciphers
* @return {string} key representing random bytes 
*/
  generateKey() {
    Key = crypto.randomBytes(32).toString('hex');
    return Key;
  }

  /**
   * @summary Private Class Method: called to update the .env file after a new key is made
   * @returns {undefined}
   */
  updateEnv() {

    // Generate a new encryption key
    const Key = this.generateKey();
  
    const envKey = `
      ENCRYPTION_KEY=${Key}
    `;
  
    fs.writeFileSync('.env', envKey, { flag: 'a' }); //'a' 'append'. Dont erase important stuff already in .env
    log('created new key and updated .env file'); 

  }

  /**
   * @summary Private Class Accessor method. Check if key already exists in enviornment
   * @returns {boolean}
   */
  FirstTimeKey() {
    // Check if 'ENCRYPTION_KEY' exists in the environment variables
    return process.env.ENCRYPTION_KEY == undefined;
  }
  
 

}

module.exports = {LockBox};