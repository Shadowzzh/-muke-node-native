const crypto = require("crypto");

// 密钥
const SECRET_KEY = "WJio_8776#"

// md5加密
function md5(content) {
    let md5 = crypto.createHash("md5")
    return md5.update(content).digest("hex")
}


// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

// ase 加密
const ase = {
    SECRET_KEY: "www.zhangziheng.top.userId",
    aesEncrypt(data, key) {
        const cipher = crypto.createCipher('aes192', key);
        let crypted = cipher.update(data, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    aseDecrypt(encrypted, key) {
        const decipher = crypto.createDecipher('aes192', key);
        var decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

/**
 * 用 ase 加密 userID
 * @param {string} data 需要加密的字符串
 */
function enUserId(data) {
    return ase.aesEncrypt(data, ase.SECRET_KEY)
}
/**
 * 用 ase 解密uerid
 * @param {string} encrypted 被加密的字符串
 */
function deUserId(encrypted) {
    return ase.aseDecrypt(encrypted, ase.SECRET_KEY)
}

module.exports = {
    genPassword,
    enUserId,
    deUserId,
}