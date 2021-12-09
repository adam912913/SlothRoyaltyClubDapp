const fs = require('fs');
const recursive = require('recursive-fs');
require('dotenv').config()

let upload_metadata_status = JSON.parse(fs.readFileSync(process.env.CONFIG_UPLOAD_METADATA_STATUS_PATH));

optimize_upload_metadata_status = (data_dir) => {
    recursive.readdirr(data_dir, function (err, dirs, files) {
        let metadata_keys = [];
        let metadata_file_count = 0;
        let metadata_file_name = "";
        files.forEach((file) => {
            var splitted = file.split("/");
            metadata_file_name = splitted[splitted.length - 1];
            metadata_keys[metadata_file_count] = parseInt(metadata_file_name.slice(0, metadata_file_name.indexOf('.', -1)));
            metadata_file_count++;
        });
        metadata_keys.sort(function (a, b) { return a - b; })

        let uploaded_nft_keys = upload_metadata_status.upload_success_metadata_keys;
        var found = undefined;
        for (let i = 0; i < metadata_keys.length; i++) {
            found = uploaded_nft_keys.find(element => element === metadata_keys[i]);
            if (found == undefined) {
                upload_metadata_status.misupload_metadata_keys.push(metadata_keys[i]);
            }
        }
        fs.writeFileSync(process.env.CONFIG_UPLOAD_METADATA_STATUS_PATH, JSON.stringify(upload_metadata_status, null, '\t'));
        console.log(upload_metadata_status)
    });
}

optimize_upload_metadata_status(process.env.CONFIG_DIR_METADATAS);