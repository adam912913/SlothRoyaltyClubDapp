require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');

const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const gateway_url = "https://gateway.pinata.cloud/ipfs/";

let pinata_api_keys = JSON.parse(fs.readFileSync(process.env.CONFIG_PINATA_API_KEYS));
let upload_status = JSON.parse(fs.readFileSync(process.env.CONFIG_UPLOAD_STATUS_PATH));

let pinata_api_key = pinata_api_keys[process.env.CONFIG_CURRENT_USE_PINATA_ACCOUNT].api_key;
let pinata_api_secret = pinata_api_keys[process.env.CONFIG_CURRENT_USE_PINATA_ACCOUNT].api_secret;
let art_dir = process.env.CONFIG_DIR_ARTS;
let metadata_dir = process.env.CONFIG_DIR_METADATAS;
let uploaded_art_count = upload_status.upload_success_nft_keys.length;

console.log(pinata_api_key, pinata_api_secret);

upload_art_item = (cur_key) => {
    let art_file_name = art_dir + upload_status.misupload_nft_keys[cur_key] + '.png';
    let art_metadata_file_name = metadata_dir + upload_status.misupload_nft_keys[cur_key] + '.json';
    let data = new FormData();
    data.append(`file`, fs.createReadStream(art_file_name), {
        filepath: basePathConverter(art_dir, art_file_name)
    })
    axios.post(url,
        data,
        {
            maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'pinata_api_key': pinata_api_key,
                'pinata_secret_api_key': pinata_api_secret
            }
        }
    ).then(function (response) {
        //handle response here
        images_hash = response.data.IpfsHash;
        let cur_art_metadata = JSON.parse(fs.readFileSync(art_metadata_file_name));
        cur_art_metadata.image = gateway_url + images_hash;
        upload_status.upload_success_nft_keys.push(upload_status.misupload_nft_keys[cur_key]);
        upload_status.misupload_nft_keys.splice(cur_key, 1);
        uploaded_art_count = upload_status.upload_success_nft_keys.length;

        console.log(art_file_name, art_metadata_file_name);
        console.log(`image url: `, gateway_url + images_hash);

        fs.writeFileSync(art_metadata_file_name, JSON.stringify(cur_art_metadata, null, '\t'));
        fs.writeFileSync(process.env.CONFIG_UPLOAD_STATUS_PATH, JSON.stringify(upload_status, null, '\t'));
        if (uploaded_art_count < process.env.CONFIG_MAX_UPLOAD_COUNT) {
            upload_art_item(0);
        }
    }).catch(function (error) {
        //handle error here
        console.log("Error ---");
        console.log(error);
    });
}

// deploy images first to get the ipfs hash
upload_arts = () => {
    upload_art_item(0);
};

upload_arts();