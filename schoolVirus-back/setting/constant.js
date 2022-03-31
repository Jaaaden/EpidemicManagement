// Custom error code, key, expiration time
module.exports = {
    CODE_SUCCESS: 1,  //success
    CODE_ERROR: -1,    //fail
    CODE_TOKEN_EXPIRED: -2,//token fail
    CODE_REPEAT: -3,  //Database already exists with xx value
    CODE_WARNING: -4, //warning
    SECRET_KEY: 'a_huan_jiu_shi_wo', // jwt key
    EXPIRES_TIME: 60 * 60 * 6   // Expiration
}