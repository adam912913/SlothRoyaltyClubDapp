import React, { useContext, useEffect } from 'react';

import LastNFTs from "./LastNFTs";

const Main = () => {
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
                                <button type="button" className="btn btn-primary">
                                    Mint NFTs
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <LastNFTs />
        </React.Fragment>
    );
};

export default Main;