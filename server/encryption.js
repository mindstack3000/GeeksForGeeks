const crypto = require('crypto-js');

const encrypt = (inputText) => {
    return crypto.AES.encrypt(inputText, process.env.CRYPTO_SECRET).toString();
}

const decrypt = (encryptedText) => {
    const decrytedText = crypto.AES.decrypt(encryptedText, process.env.CRYPTO_SECRET);
    return decrytedText.toString(crypto.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt
}