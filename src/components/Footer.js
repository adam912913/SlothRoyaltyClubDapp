import React from 'react';
import Button from "./common/Button";

const Footer = () => {
    return (
        <React.Fragment>
            <footer>
                <div className="footer_wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 justify-content text-center pt-4 pb-4">
                                <Button
                                    className='btn-primary'
                                    routeURL={process.env.REACT_APP_OPENSEA_URL}
                                    title='View Opensea'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;
