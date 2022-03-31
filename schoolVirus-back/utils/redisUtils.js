const redis = require('redis');
const client = redis.createClient(6379, 'localhost');
// const client = redis.createClient();


let set =  (key,value,expire,dbNum) => {
    if (typeof(value)=='object') {
        value=JSON.stringify(value)
    }
    
    console.log(`[redis]set key=${key}  value=${value}  expire=${expire}  dbNum=${dbNum}`)
    if (!dbNum) {
        dbNum = 0
    }
    return  new Promise((resolve, reject) => {
        client.select(dbNum,function (err) {//library
            if (err){
                console.error('redis set Library Fail：'+err)
                
            }else {
                client.set(key,value,function (err,result) {
                    if (err){
                        console.error('redis insert fail：'+err)
                    } else {
                        if (!isNaN(expire) && expire>0){
                            client.expire(key, parseInt(expire));
                        }
                        resolve(result);
                    }
                })
            }

        })
    })
};


let get = async (key, dbNum) => {
    console.log(`[redis]get key=${key} dbNum=${dbNum}`)
    if (!dbNum) {
        dbNum = 0
    }
    return   new Promise((resolve, reject) => {
        client.select(dbNum, function (err) {
            if (err){
                console.error('redis set Library selection failed：'+err)
            }else {
                client.get(key, function (err,result) {
                    if (err){
                        console.error('redis read failed：'+err)
                    } else {
                        resolve(result);
                    }
                })
            }
        })
    })

};

module.exports = {
    get,
    set,
}