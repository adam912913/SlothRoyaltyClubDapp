const fs = require('fs');
const recursive = require('recursive-fs');
require('dotenv').config()

let upload_status = JSON.parse(fs.readFileSync(process.env.CONFIG_UPLOAD_STATUS_PATH));

optimize_upload_status = (data_dir) => {
    recursive.readdirr(data_dir, function (err, dirs, files) {
        let art_keys = [];
        let art_file_count = 0;
        let art_file_name = "";
        files.forEach((file) => {
            var splitted = file.split("/");
            art_file_name = splitted[splitted.length - 1];
            art_keys[art_file_count] = parseInt(art_file_name.slice(0, art_file_name.indexOf('.', -1)));
            art_file_count++;
        });
        art_keys.sort(function (a, b) { return a - b; })

        let uploaded_nft_keys = upload_status.upload_success_nft_keys;
        var found = undefined;
        for (let i = 0; i < art_keys.length; i++) {
            found = uploaded_nft_keys.find(element => element === art_keys[i]);
            if (found == undefined) {
                upload_status.misupload_nft_keys.push(art_keys[i]);
            }
        }
        fs.writeFileSync('./config/upload_status.json', JSON.stringify(upload_status, null, '\t'));
        console.log(upload_status)
    });
}

optimize_upload_status(process.env.CONFIG_DIR_ARTS);