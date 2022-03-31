// Security interceptor (generates token string)
const jwt = require("jsonwebtoken");

// Verify permissions (token, key, success callback, error callback)
function verify(token, secretkey, success, error) {
    // verify token
    jwt.verify(token, secretkey, function (err, decode) {
        if (err) {
            if (error) {
                error(err);
            }
        } else {
            if (success) {
                success(decode);
            }
        }
    });
}

// Signature (payload-json object-store exists, key, expiration time-seconds)
// Return：number | PromiseLike<ArrayBuffer>
function sign(load, secretkey, expiresIn) {
    var token = jwt.sign(load, secretkey, { expiresIn: expiresIn });
    return token;
}

// Async to sync(token, key)
// return value {Promise<any>}
// In the app.js routing call, it has been converted once, no need to repeat the conversion
function verifySync(token, secretkey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretkey, function (err, decode) {
            if (err) {
                console.log(err.message);
                resolve({ err: "error", msg: "Session Expired" });
            } else {
                console.log("Decryption succeeded");
                resolve(decode);
            }
        });
    });
}

module.exports = { verify, sign, verifySync };


