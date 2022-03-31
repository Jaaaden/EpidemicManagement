// file tools
const fs = require("fs");
const formidable = require("formidable");
const tools = require("./tools");

/**
 * upload files
 * @param req
 * @param options Configure formidable and file path related parameters
 *  eg:{
 *      fileDir:"public/file", The file storage path is relative to the referenced location, or an absolute path can be used
 *      fileName:"userIcon.png"
 *  }
 */
function upload(req, options) {
    if (!options) {
        options = {};
    }
    // File storage directory This directory is relative to the referenced location.
    var cacheFolder = options.fileDir || 'public/file';
    if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder);
    }
    let form = new formidable.IncomingForm(); //Create an upload form
    form.encoding = 'utf-8'; //SettingsEdit
    form.uploadDir = cacheFolder; 
    form.keepExtensions = true; //reserved suffix
    form.maxFileSize = options.maxFileSize || 200 * 1024 * 1024; //File size
    form.type = true;
    return new Promise(function(resolve, reject){
        form.parse(req, function(err, fields, files) {
            console.log(`received parameters${fields}`)
            if (err) {
                // Remaining problem: the upload file is abnormal, it will not return immediately, it will be stuck here until it times out
                console.log(`File upload exception：${err.message}`);
                reject({error: err.message});
            } else {
                // Rename
                let avatarName = options.fileName;
                if (!avatarName) {
                    //suffix
                    let extName = '';
                    let fileOriginName = files.file.name;
                    // Determine if there is a suffix
                    if (fileOriginName.indexOf(".") > -1) {
                        let nameArray = fileOriginName.split(".");
                        extName = '.' + nameArray[nameArray.length - 1];
                    }
                    avatarName = tools.newId() + extName;
                }

                let newPath = form.uploadDir + '/' + avatarName;
                fs.renameSync(files.file.path, newPath); //Rename
                console.log(`File upload successfully：${avatarName}`);
                resolve(avatarName);
            }
        });
    });
};

module.exports = {
    upload
};
