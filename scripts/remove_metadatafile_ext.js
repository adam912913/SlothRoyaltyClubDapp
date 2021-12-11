const fs = require('fs');
const recursive = require('recursive-fs');
require('dotenv').config()

optimize_upload_status = (data_dir) => {
    recursive.readdirr(data_dir, function (err, dirs, files) {
        files.forEach((file) => {
            let cur_file_name = file;
            let rename = file.substr(0, file.length - 5);
            fs.rename(cur_file_name, rename, () => {
                console.log(rename)
            })
        });
    });
}

optimize_upload_status('./datas/metadata_noext/');