const fs = require('fs');
require('dotenv').config()
let upload_metadata_status = JSON.parse(fs.readFileSync(process.env.CONFIG_UPLOAD_METADATA_STATUS_PATH));
const art_hash = "https://jordanwink.mypinata.cloud/ipfs/QmSUSf9fsA7PYG7zAJpDbQkHQX9nnwHFNKnzG5xsx3qUfV/";

rename_image_json = (data_dir) => {
    let tokenURI = '';
    for (let i = 0; i < upload_metadata_status.misupload_metadata_keys.length; i++) {
        let file_name = upload_metadata_status.misupload_metadata_keys[i];
        let nft_metadata = JSON.parse(fs.readFileSync(data_dir + file_name));
        nft_metadata.image = art_hash + file_name + '.png';
        console.log(nft_metadata.image)
        fs.writeFileSync(data_dir + file_name, JSON.stringify(nft_metadata, null, '\t'));
    }
}

rename_image_json('./datas/metadata_noext/');
