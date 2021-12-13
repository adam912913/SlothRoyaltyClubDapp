import { useReducer } from 'react';

import CollectionContext from './collection-context';

const defaultCollectionState = {
    contract: null,
    totalSupply: null,
    collection: [],
    nftIsLoading: true,
    processMinting: false,
    minted_count: 0,
};

const collectionReducer = (state, action) => {
    if (action.type === 'CONTRACT') {
        return {
            contract: action.contract,
            totalSupply: state.totalSupply,
            collection: state.collection,
            nftIsLoading: state.nftIsLoading,
            minted_count: state.minted_count,
            processMinting: state.processMinting,
        };
    }

    if (action.type === 'LOADSUPPLY') {
        return {
            contract: state.contract,
            totalSupply: action.totalSupply,
            collection: state.collection,
            nftIsLoading: state.nftIsLoading,
            minted_count: state.minted_count,
            processMinting: state.processMinting
        };
    }

    if (action.type === 'LOADCOLLECTION') {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            collection: action.collection,
            nftIsLoading: state.nftIsLoading,
            minted_count: state.minted_count,
            processMinting: state.processMinting
        };
        // return {
        //     collection: action.collection, ...state
        // };
    }

    if (action.type === 'UPDATECOLLECTION') {
        const index = state.collection.findIndex(NFT => NFT.id === parseInt(action.NFT.id));
        let collection = [];

        if (index === -1) {
            collection = [action.NFT, ...state.collection];
        } else {
            collection = [...state.collection];
        }

        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            collection: collection,
            nftIsLoading: state.nftIsLoading,
            minted_count: state.minted_count,
            processMinting: state.processMinting,
        };
    }

    if (action.type === 'LOADING') {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            collection: state.collection,
            processMinting: state.processMinting,
            minted_count: state.minted_count,
            nftIsLoading: action.loading,
        };
    }

    if (action.type === 'MINTING') {
        console.log(action)
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            collection: state.collection,
            nftIsLoading: state.nftIsLoading,
            minted_count: state.minted_count,
            processMinting: action.processMinting,
        };
    }

    if (action.type === 'SET_MINTED_COUNT') {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            collection: state.collection,
            nftIsLoading: state.nftIsLoading,
            processMinting: state.minting,
            minted_count: action.minted_count,
        };
    }

    if (action.type === 'INCREASE_MINTED_COUNT') {
        return {
            contract: state.contract,
            totalSupply: state.totalSupply,
            collection: state.collection,
            nftIsLoading: state.nftIsLoading,
            minted_count: state.minted_count + 1,
            processMinting: state.minting,
        };
    }

    return defaultCollectionState;
};

const CollectionProvider = props => {
    const [CollectionState, dispatchCollectionAction] = useReducer(collectionReducer, defaultCollectionState);

    const loadContractHandler = (web3, NFTCollection, deployedNetwork) => {
        const contract = deployedNetwork ? new web3.eth.Contract(NFTCollection.abi, deployedNetwork.address) : '';
        dispatchCollectionAction({ type: 'CONTRACT', contract: contract });
        return contract;
    };

    const loadTotalSupplyHandler = async (contract) => {
        const totalSupply = await contract.methods.totalSupply().call();
        dispatchCollectionAction({ type: 'LOADSUPPLY', totalSupply: totalSupply });
        return totalSupply;
    };

    const loadCollectionHandler = async (contract, totalSupply) => {
        let collection = [];
        
        for (let i = totalSupply; i > totalSupply - 7; i--) {
            const tokenURI = await contract.methods.tokenURI(i).call();
            try {
                const response = await fetch(tokenURI);
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }

                const metadata = await response.json();
                console.log(metadata)
                // const owner = await contract.methods.ownerOf(i + 1).call();

                // collection = [{
                //     id: i,
                //     name: metadata.name,
                //     image: metadata.image,
                // }, ...collection];
                collection.push({
                    id: i,
                    name: metadata.name,
                    image: metadata.image,
                    url: process.env.REACT_APP_OPENSEA_ITEM_URL + process.env.REACT_APP_NFT_CONTRACT_ADDRESS + '/'
                });
            } catch {
                console.error('Something went wrong');
            }
        }
        dispatchCollectionAction({ type: 'LOADCOLLECTION', collection: collection });
    };

    const updateCollectionHandler = async (contract, id, owner) => {
        let NFT;
        const hash = await contract.methods.tokenURI(id).call();
        try {
            const response = await fetch(`https://ipfs.infura.io/ipfs/${hash}?clear`);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const metadata = await response.json();

            NFT = {
                id: parseInt(id),
                title: metadata.properties.name.description,
                img: metadata.properties.image.description,
                owner: owner
            };
        } catch {
            console.error('Something went wrong');
        }
        dispatchCollectionAction({ type: 'UPDATECOLLECTION', NFT: NFT });
    };

    const setNftIsLoadingHandler = (loading) => {
        dispatchCollectionAction({ type: 'LOADING', loading: loading });
    };

    const setprocessMintingHandler = (processMinting) => {
        dispatchCollectionAction({ type: 'MINTING', processMinting: processMinting });
    };

    const setMintedCountHandler = (minted_count) => {
        dispatchCollectionAction({ type: 'SET_MINTED_COUNT', minted_count: minted_count });
    };

    const IncreaseMintedCountHandler = () => {
        dispatchCollectionAction({ type: 'INCREASE_MINTED_COUNT' });
    };

    const collectionContext = {
        contract: CollectionState.contract,
        totalSupply: CollectionState.totalSupply,
        collection: CollectionState.collection,
        nftIsLoading: CollectionState.nftIsLoading,
        processMinting: CollectionState.processMinting,
        minted_count: CollectionState.minted_count,
        loadContract: loadContractHandler,
        loadTotalSupply: loadTotalSupplyHandler,
        loadCollection: loadCollectionHandler,
        updateCollection: updateCollectionHandler,
        setNftIsLoading: setNftIsLoadingHandler,
        setMintedCount: setMintedCountHandler,
        IncreaseMintedCount: IncreaseMintedCountHandler,
        setprocessMinting: setprocessMintingHandler,
    };

    return (
        <CollectionContext.Provider value={collectionContext}>
            {props.children}
        </CollectionContext.Provider>
    );
};

export default CollectionProvider;