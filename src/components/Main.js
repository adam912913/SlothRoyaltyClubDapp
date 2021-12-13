import React, { useContext, useEffect, useState } from 'react';

// import HDWalletProvider from "truffle-hdwallet-provider";
// import web3 from "web3";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import NFTContract from '../artifacts/SlothRoyaltyClub.json';


import Web3Context from '../store/web3-context';
import CollectionContext from '../store/collection-context';

import LastNFTs from "./LastNFTs";
import MitingStatus from "./MitingStatus";

const Main = () => {
    const web3Ctx = useContext(Web3Context);
    const collectionCtx = useContext(CollectionContext);
    // const [is_valid, set_is_valid] = useState(false);

    function action_mint(e) {
        e.preventDefault();
        if (process.env.REACT_APP_OWNER_ADDRESS != web3Ctx.account) {
            alert("You can't mint NFTs. You can only use wallet address " + process.env.REACT_APP_OWNER_ADDRESS);
            return;
        }

        const mintNFT = async () => {
            console.log(collectionCtx)
            collectionCtx.setprocessMinting(true);
            const API_URL = process.env.REACT_APP_ALCHEMY_API_URL
            const PUBLIC_KEY = process.env.REACT_APP_OWNER_ADDRESS
            const PRIVATE_KEY = process.env.REACT_APP_OWNER_PK
            const web3 = createAlchemyWeb3(API_URL)
            const contractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;
            const nftContract = new web3.eth.Contract(NFTContract.abi, contractAddress)
            // return;
            // // for (let i = collectionCtx.totalSupply; i < process.env.REACT_APP_CONFIG_MINT_MAX_COUNT; i++) {
            // for (let i = collectionCtx.totalSupply; i < 3100; i++) {
            //     console.log('Mint ' + i + ' tx started !');
            //     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
            //     //the transaction
            //     const tx = {
            //         from: PUBLIC_KEY,
            //         to: contractAddress,
            //         nonce: nonce,
            //         gas: 500000,
            //         data: nftContract.methods.mintTo(PUBLIC_KEY).encodeABI(),
            //     }
            //     console.log(tx)
            //     const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
            //     console.log(signedTx)
            //     const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            //     console.log(txHash)
            //     if (txHash) {
            //         console.log(
            //             "The hash of your transaction is: ",
            //             txHash,
            //             "\nCheck Alchemy's Mempool to view the status of your transaction!"
            //         )
            //     }
            //     console.log('Mint ' + i + ' tx ended !');
            // }

            // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
            // //the transaction
            // const tx = {
            //     from: PUBLIC_KEY,
            //     to: contractAddress,
            //     nonce: nonce,
            //     gas: 500000,
            //     // data: nftContract.methods.mintToCount(PUBLIC_KEY, process.env.REACT_APP_CONFIG_MINT_MAX_COUNT - collectionCtx.totalSupply).encodeABI(),
            //     data: nftContract.methods.mintToCount(PUBLIC_KEY, 2000).encodeABI(),
            // }
            // console.log(tx)
            // const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
            // console.log(signedTx)
            // const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            // console.log(txHash)
            // if (txHash) {
            //     console.log(
            //         "The hash of your transaction is: ",
            //         txHash,
            //         "\nCheck Alchemy's Mempool to view the status of your transaction!"
            //     )
            // }

            const result = await collectionCtx.contract.methods
                .mintToCount(web3Ctx.account, 1000)
                .send({ from: web3Ctx.account });
            console.log("Minted SRC. Transaction: " + result.transactionHash);
        }
        mintNFT();
    }

    // function action_mint(e) {
    //     e.preventDefault();
    //     if (process.env.REACT_APP_OWNER_ADDRESS != web3Ctx.account) {
    //         alert("You can't mint NFTs. You can only use wallet address " + process.env.REACT_APP_OWNER_ADDRESS);
    //         return;
    //     }

    //     const mintNFT = async () => {
    //         for (let i = 0; i < process.env.REACT_APP_CONFIG_MINT_MAX_COUNT; i++) {
    //             const result = await collectionCtx.contract.methods
    //                 .mintTo(web3Ctx.account)
    //                 .send({ from: web3Ctx.account });
    //             console.log("Minted SRC. Transaction: " + result.transactionHash);
    //         }
    //     }
    //     mintNFT();
    // }

    // if (process.env.REACT_APP_OWNER_ADDRESS == web3Ctx.account) {
    //     set_is_valid(true);
    // }

    return (
        <React.Fragment>
            <div className="mint_wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <main role="main" className="col-lg-12 justify-content text-center pt-2 pb-2">
                            <div className="content mr-auto ml-auto">
                                <img src='./assets/images/banner_title.png' className="title_banner" alt='' />
                            </div>
                            <div className="content mr-auto ml-auto mt-4">
                                <button type="button" className="btn btn-primary" onClick={action_mint}>
                                    Mint NFTs
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <div className="latest_nfts_wrapper">
                <div className="container-fluid">
                    <MitingStatus />
                    <LastNFTs />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Main;