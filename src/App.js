import React, { useContext, useEffect, useState } from 'react';
import web3 from './connection/web3';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Web3Context from './store/web3-context';
import CollectionContext from './store/collection-context';
import NFTCollection from './artifacts/SlothRoyaltyClub.json';

const App = () => {
    const web3Ctx = useContext(Web3Context);
    const collectionCtx = useContext(CollectionContext);
    const [is_valid_account, set_is_valid_account] = useState(false);

    useEffect(() => {
        // Check if the user has Metamask active
        if (!web3) {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
            return;
        }

        // Function to fetch all the blockchain data
        const loadBlockchainData = async () => {
            // Request accounts acccess if needed
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error(error);
            }

            // Load account
            const account = await web3Ctx.loadAccount(web3);

            // Load Network ID
            const networkId = await web3Ctx.loadNetworkId(web3);

            // console.log(NFTCollection)
            // Load Contracts      
            const nftDeployedNetwork = NFTCollection.networks[networkId];
            const nftContract = collectionCtx.loadContract(web3, NFTCollection, nftDeployedNetwork);
            // console.log(nftContract)

            if (nftContract) {
                // Load total Supply
                const totalSupply = await collectionCtx.loadTotalSupply(nftContract);
                collectionCtx.setMintedCount(parseInt(totalSupply));

                // Load Collection
                collectionCtx.loadCollection(nftContract, totalSupply);
                collectionCtx.setNftIsLoading(false)

                // Event subscription
                nftContract.events.Transfer()
                    .on('data', (event) => {
                        console.log("block updated !");
                        console.log(event);
                        collectionCtx.IncreaseMintedCount()
                        console.log(collectionCtx.minted_count);
                        // collectionCtx.loadTotalSupply(nftContract);
                        // collectionCtx.updateCollection(nftContract, event.returnValues.tokenId, event.returnValues.to);
                        // collectionCtx.setNftIsLoading(false);
                    })
                    .on('error', (error) => {
                        console.log(error);
                    });
            }
            else {
                window.alert('NFTCollection contract not deployed to detected network.');
            }

            if (account == process.env.REACT_APP_OWNER_ADDRESS) {
                set_is_valid_account(true);
            }

            console.log(collectionCtx)

            // Metamask Event Subscription - Account changed
            window.ethereum.on('accountsChanged', (accounts) => {
                window.location.reload();
            });

            // Metamask Event Subscription - Network changed
            window.ethereum.on('chainChanged', (chainId) => {
                window.location.reload();
            });
        };

        loadBlockchainData();
    }, []);

    // const showContent = web3 && collectionCtx.contract && marketplaceCtx.contract && web3Ctx.account;
    // const showContent = web3 && collectionCtx.contract && web3Ctx.account && is_valid_account;
    const showContent = web3 && collectionCtx.contract && web3Ctx.account;

    return (
        <React.Fragment>
            {/* {!is_valid_account ? 'Invalid Account, You should use ' + process.env.REACT_APP_OWNER_ADDRESS : showContent && (
                <React.Fragment>
                    <Header />
                    <Main />
                    <Footer />
                </React.Fragment>
            )} */}
            {showContent && (
                <React.Fragment>
                    <Header />
                    <Main />
                    <Footer />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default App;
