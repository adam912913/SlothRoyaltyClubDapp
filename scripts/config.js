const fs = require('fs');
const recursive = require('recursive-fs');
require('dotenv').config()
console.log(process.env)
fs.writeFileSync('./config/new_file.json', JSON.stringify(process.env, null, '\t'));

config_project = (data_dir) => {
    recursive.readdirr(data_dir, function (err, dirs, files) {
        files.forEach((file) => {
            let cur_file_name = file;
            let rename = file.substr(0, file.length - 5);
            // console.log(rename);
        });
    });
}

config_project('./datas/metadata_noext/');