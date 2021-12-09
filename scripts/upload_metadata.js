require('dotenv').config()
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const basePathConverter = require('base-path-converter');

let metadata_dir = process.env.CONFIG_DIR_METADATAS;
let pinata_api_keys = JSON.parse(fs.readFileSync(process.env.CONFIG_PINATA_API_KEYS));
let upload_metadata_status = JSON.parse(fs.readFileSync(process.env.CONFIG_UPLOAD_METADATA_STATUS_PATH));

let pinata_api_key = pinata_api_keys[process.env.CONFIG_METADATA_PINATA_ACCOUNT].api_key;
let pinata_api_secret = pinata_api_keys[process.env.CONFIG_METADATA_PINATA_ACCOUNT].api_secret;

let uploaded_metadata_count = upload_metadata_status.upload_success_metadata_keys.length;

const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const gateway_url = "https://gateway.pinata.cloud/ipfs/";

async function upload_metadata(cur_key) {
    let upload_metadata_index = upload_metadata_status.misupload_metadata_keys[cur_key];
    let art_metadata_file_name = metadata_dir + upload_metadata_index + '.json';
    let data = new FormData();
    data.append(`file`, fs.createReadStream(art_metadata_file_name), {
        filepath: basePathConverter(metadata_dir, art_metadata_file_name)
    })
    let tokenURI = await axios.post(url,
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
        images_hash = response.data.IpfsHash;
        let tokenURI = response.data.IpfsHash;
        console.log("tokenURL : " + gateway_url + tokenURI);
        return tokenURI;
    }).catch(function (error) {
        //handle error here
        console.log("Error ---");
        console.log(error);
        return '';
    });

    if (tokenURI !== '') {
        upload_metadata_status.upload_success_metadata_keys.push(upload_metadata_status.misupload_metadata_keys[cur_key]);
        upload_metadata_status.misupload_metadata_keys.splice(cur_key, 1);
        uploaded_metadata_count = upload_metadata_status.upload_success_metadata_keys.length;
        upload_metadata_status.tokenURIs[upload_metadata_index] = tokenURI;
        fs.writeFileSync(process.env.CONFIG_UPLOAD_METADATA_STATUS_PATH, JSON.stringify(upload_metadata_status, null, '\t'));
        if (uploaded_metadata_count < process.env.CONFIG_MAX_METADATA_UPLOAD_COUNT) {
            upload_metadata(0);
        }
    }
}

// upload_metadata(0);

set_tokenURIs = (folder_hash) => {
    let tokenURI = '';
    for (let i = 0; i < upload_metadata_status.misupload_metadata_keys.length; i++) {
        tokenURI = folder_hash + '/' + upload_metadata_status.misupload_metadata_keys[i] + '.json';

        upload_metadata_status.tokenURIs[upload_metadata_status.misupload_metadata_keys[i]] = tokenURI;
    }
    fs.writeFileSync(process.env.CONFIG_UPLOAD_METADATA_STATUS_PATH, JSON.stringify(upload_metadata_status, null, '\t'));
}

set_tokenURIs('QmZrtCmp5oYCKZSmbVB7v1ppKfadXjA2cZcWSAY1YMUeoKQmZrtCmp5oYCKZSmbVB7');