// jwt

/*
    The difference between jwt-web-token and express-jwt
     1.jwt-web-token is used to generate the token string
     2.express-jwt is used to verify the token

     Summary: The bottom layer of express-jwt is also encapsulated with jwt-web-token
*/
let jwt = require('express-jwt')
let {SECRET_KEY} = require('./constant')

module.exports = jwt({
    secret:SECRET_KEY,
    // The new version of express-jwt needs to add: algorithms, similar to encryption algorithms
    algorithms: ['HS256'],
    // whether to add a certificate
    credentialsRequired: true,
}).unless({ // unless()Handle paths that do not want to accept authentication
    path:[
        '/',
        '/api/users/login',
        '/api/users/register',
        // Dynamic routing needs to use this regular method to match
        /^\/api\/articles\/detail\/.*/, 
        /^\/api\/articles\/all\/.*/,
    ]
})