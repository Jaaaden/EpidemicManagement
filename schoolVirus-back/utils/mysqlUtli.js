
var mysql = require('mysql');
let logPrefix=mysql
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port     : '3306',
    database : 'xunke725'
});

//CRUD
 
let exec =  function (sql,params) {
    // return Promise
        return  new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                } else {

                    //query sql 
                    connection.query(sql, params, (err, results) => {

                        if (err) {
                            console.error(err)
                          //  reject(err)
                        } else {
                            console.log(`${logPrefix}result : ${JSON.stringify(results)}`);
                            resolve(results)
                        }
                        // end session release link
                        connection.release()
                    })


                }
            })
        })
}

//Format all parameters as arrays The parameters are variable parameters (variable parameters are not written when the function is declared)
 
let formatParams = function () {
    var array = [];

    //There is a variable arguments in js that can access all incoming values
    for(var i = 0, l = arguments.length; i < l; i++){
        array.push(arguments[i]);
    }
    return array;
}
module.exports = {exec, formatParams};
