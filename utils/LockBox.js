const fs = require('fs');
const crypto = require('crypto');


class LockBox 
{
   
   constructor() {
    //if there is an existing key, everything has already been encrypted with it.
    //it is not necessary to create a new one yet, as all of the old data will become unreadable.
    this.stationaryKey = process.env.ENCRYPTION_KEY;
    if(this.stationaryKey === undefined)
    {
     //only update if it is the first time creating a key
     this.updateEnv()
    }
  
    
  }

  /**
   * @summary Encrypt secure keys, passwords, secrets, tokens, strings etc
   * @param {any} data
   * @returns {any} time encrypted data (Cipheriv, aes-256-cbc block) whatever tf that means. 
   */
  encrypt(data) {
     // I got all of this off of google lol idk wtf crypto does 
    let timestamp =this.newTimestamp(); 
    const key = crypto.createHash('sha256').update(this.stationaryKey + timestamp).digest('hex');
    const iv = crypto.randomBytes(16); // Apparently this needs to be unique, every time. whoops. Had it in the constructor 
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
   
    let encryptedData = cipher.update(data, 'utf8', 'base64');
    encryptedData += cipher.final('base64');
    
    // Return the timestamp + encrypted data
    return `${timestamp}:${iv.toString('hex')}:${encryptedData}`;
  }
  
  /**
   * Same as encrypt(), but the key used for the encryption is immediately destroyed. 
   * rendering whatever data it has encrypted permanent scrambled. (prob wont work, haven't tested)
   * @param {any} str
   * @returns {any}
   */
  encrypt_forgetKey(message)

  { const iv = Buffer.from(ivHex, 'hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.randomBytes(32), Buffer.from(iv, 'hex'));
    let encryptedToken = cipher.update(message, 'utf-8', 'hex');
    encryptedToken += cipher.final('hex');
    return encryptedToken;
  }
  
  /**
   * @summary Decrypt secure keys, passwords, secrets, tokens, strings etc
   * @param {string} token_str
   * @returns {string}
   */
  decrypt(encrData) {
    
  const [timestamp, ivHex, encryptedText] = encrData.split(':');
  const key = crypto.createHash('sha256').update(this.stationaryKey + timestamp).digest('hex');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  
  let decryptedData = decipher.update(encryptedText, 'base64', 'utf8');
  decryptedData += decipher.final('utf8');
  
  return decryptedData;
    
  }
/** 
* 
* @summary Private Class Method: generate a new 32bit hex key to seed encryption ciphers
* @return {string} key representing random bytes 
*/
  generateKey() {
    let Key = crypto.randomBytes(32).toString('hex');
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

  newTimestamp()
  {
    return Date.now().toString();
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