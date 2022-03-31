/*Tooooooools*/

// yyyyMMddhhmmss
const f14 = "yyyyMMddhhmmss";

//yyyy-MM-dd hh:mm:ss
const f19 = "yyyy-MM-dd hh:mm:ss";

//random 19 id
let newId = function () {
    let c = new Date().format(f14);
    let r = Math.round(Math.random()*(100000));
    return c + r;
}


let getDate14 = function () {
    return new Date().format(f14);
}

//get yyyy-MM-dd hh:mm:ss
let getDate19 = function () {
    return new Date().format(f19);
}

//get yesterday's date
 
let getYestoday = ()=>{
    let day1 = new Date();
    day1.setDate(day1.getDate() - 1);
    return day1.format("yyyy-MM-dd");
}

//yyyy-MM-dd hh:mm:ss
let getDate10 = function () {
    return new Date().format('yyyy-MM-dd');
}

//Verify that the string length is within the maximum length range
let validLength = function (str, maxLength) {
    if (!str) {
        return false;
    }

    // judgment string 
    if (typeof str != 'string') {
        return false;
    }

    // judgment string length
    if (str.length <= maxLength) {
        return true;
    } else {
        return false;
    }
}

// Batch verification length
let validLengthBatch = function (arr) {
    for (let i = 0, l = arr.length; i < l; i ++) {
        let item = arr[i];
        if (!validLength(item.str, item.maxLength)) {
            console.log(item.str);
            console.log(item.maxLength);
            return false;
        }
    }
    return true;
}

//No pageNo, return 1

let formatPageNo = function (pageNo) {
    if (pageNo && parseInt(pageNo) > 0) {
        return parseInt(pageNo);
    }
    return 1;
}

//pageSize
let formatPageSize = function (pageSize) {
    if (pageSize && parseInt(pageSize) > 0) {
        return parseInt(pageSize);
    }
    return 10;
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 
        "d+" : this.getDate(),                    
        "h+" : this.getHours(),                   
        "m+" : this.getMinutes(),                 
        "s+" : this.getSeconds(),                  
        "q+" : Math.floor((this.getMonth()+3)/3),  
        "S"  : this.getMilliseconds()             
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

let error=(resp,msg)=>{
    resp.status(500);
    resp.send(msg);
}

module.exports = {
    newId,
    getDate14,
    getDate19,
    getDate10,
    validLength,
    validLengthBatch,
    formatPageNo,
    formatPageSize,
    getYestoday,
    error

}
