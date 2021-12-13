import React, { useContext, useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CollectionContext from '../store/collection-context';

const MitingStatus = () => {
    const collectionCtx = useContext(CollectionContext);
    // console.log(collectionCtx)
    // const [progressbar_value, set_progressbar_value] = useState(collectionCtx.totalSupply * 100 / process.env.REACT_APP_CONFIG_MINT_MAX_COUNT);
    console.log(collectionCtx.totalSupply * 100 / process.env.REACT_APP_CONFIG_MINT_MAX_COUNT)
    useEffect(() => {
        // const timer = window.setInterval(() => {
        //     if (progressbar_value === 100) {
        //         console.log(progressbar_value)
        //         set_progressbar_value(0);
        //     }
        //     set_progressbar_value(prevTime => prevTime + 1);
        // }, 1000);
        // return () => {
        //     window.clearInterval(timer);
        // };
    })

    return (
        <div className="row">
            <div className="col-lg-12 justify-content text-center pt-4 pb-4">
                <h3>Total Minted NFTs : {collectionCtx.totalSupply} / {process.env.REACT_APP_CONFIG_MINT_MAX_COUNT}</h3>
                <ProgressBar animated striped variant="success" now={collectionCtx.totalSupply} max={process.env.REACT_APP_CONFIG_MINT_MAX_COUNT} />
            </div>
        </div>
    );
};

export default MitingStatus;