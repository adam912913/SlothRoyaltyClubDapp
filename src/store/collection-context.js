import React from 'react';

const CollectionContext = React.createContext({
    contract: null,
    totalSupply: null,
    collection: [],
    nftIsLoading: true,
    processMinting: false,
    loadContract: () => { },
    loadTotalSupply: () => { },
    loadCollection: () => { },
    updateTotalSupply: () => { },
    updateCollection: () => { },
    // updateOwner: () => { },
    setNftIsLoading: () => { },
    setprocessMinting: () => { }
});

export default CollectionContext;