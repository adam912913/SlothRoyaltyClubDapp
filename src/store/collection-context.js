import React from 'react';

const CollectionContext = React.createContext({
    contract: null,
    totalSupply: null,
    collection: [],
    nftIsLoading: true,
    processMinting: false,
    minted_count: 0,
    loadContract: () => { },
    loadTotalSupply: () => { },
    loadCollection: () => { },
    updateTotalSupply: () => { },
    updateCollection: () => { },
    setNftIsLoading: () => { },
    setMintedCount: () => { },
    IncreaseMintedCount: () => { },
    setprocessMinting: () => { }
});

export default CollectionContext;