import React, { useContext, useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CollectionContext from '../store/collection-context';

const MitingStatus = () => {
    const collectionCtx = useContext(CollectionContext);
    useEffect(() => {

    })

    return (
        <div className="row">
            <div className="col-lg-12 justify-content text-center pt-4 pb-4">
                <h3>Total Minted NFTs : {collectionCtx.minted_count} / {process.env.REACT_APP_CONFIG_MINT_MAX_COUNT}</h3>
                <ProgressBar animated striped variant="success" now={collectionCtx.minted_count} max={process.env.REACT_APP_CONFIG_MINT_MAX_COUNT} />
            </div>
        </div>
    );
};

export default MitingStatus;