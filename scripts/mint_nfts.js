const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
require('dotenv').config()
const fs = require('fs');

const REACT_APP_MNEMONIC = process.env.REACT_APP_MNEMONIC;
const NODE_API_KEY = process.env.REACT_APP_INFURA_KEY || process.env.REACT_APP_ALCHEMY_KEY;
const isInfura = !!process.env.REACT_APP_INFURA_KEY;
const REACT_APP_NFT_CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.REACT_APP_NETWORK;

if (!REACT_APP_MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error(
        "Please set a REACT_APP_MNEMONIC, Alchemy/Infura key, owner, network, and contract address."
    );
    return;
}

console.log(REACT_APP_MNEMONIC)
console.log(NODE_API_KEY)
console.log(REACT_APP_NFT_CONTRACT_ADDRESS)
console.log(OWNER_ADDRESS)
console.log(NETWORK)

// const NFT_ABI = [
//     {
//         constant: false,
//         inputs: [
//             {
//                 name: "_to",
//                 type: "address",
//             },
//             {
//                 name: "_tokenHash",
//                 type: "string",
//             },
//         ],
//         name: "mintTo",
//         outputs: [],
//         payable: false,
//         stateMutability: "nonpayable",
//         type: "function",
//     },
// ];
const contract = require("../src/artifacts/SlothRoyaltyClub.json");
const NFT_ABI = contract.abi;
const network = NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
const provider = new HDWalletProvider(
    REACT_APP_MNEMONIC,
    isInfura
        ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
);
const web3Instance = new web3(provider);
const nftContract = new web3Instance.eth.Contract(
    NFT_ABI,
    REACT_APP_NFT_CONTRACT_ADDRESS,
    { gasLimit: "1000000" }
);

let upload_metadata_status = JSON.parse(fs.readFileSync(process.env.CONFIG_UPLOAD_METADATA_STATUS_PATH));
let mint_status = JSON.parse(fs.readFileSync('./config/mint_status.json'));

async function mint_nfts() {
    let tokenIDs = Object.keys(upload_metadata_status.tokenURIs);
    let limit_count = parseInt(process.env.REACT_APP_CONFIG_MINT_MAX_COUNT);
    for (let i = mint_status.cur_minting_tokenID_index; i < tokenIDs.length; i++) {
        if (i >= limit_count) {
            break;
        }
        const token_id = tokenIDs[i];
        const tokenURI = upload_metadata_status.tokenURIs[token_id];
        console.log(token_id, tokenURI);

        const result = await nftContract.methods
            // .mintTo(OWNER_ADDRESS, tokenURI)
            .mintTo(OWNER_ADDRESS)
            .send({ from: OWNER_ADDRESS });
        console.log("Minted SRC NFTs. Transaction: " + result.transactionHash);

        console.log("TokenID: " + token_id);
        console.log("TokenURI: " + tokenURI);

        mint_status.cur_minting_tokenID_index++;
        mint_status.minted_tokenIDs.push(parseInt(token_id));

        fs.writeFileSync('./config/mint_status.json', JSON.stringify(mint_status, null, '\t'));
    }
}

mint_nfts();

// process.exit(0);