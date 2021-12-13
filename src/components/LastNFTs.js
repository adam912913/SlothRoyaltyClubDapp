import React, { useContext, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const LastNFTs = () => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12 justify-content text-center pt-2 pb-5 pl-4 pr-4">
                    <h4 className="pb-3">Your Latest Minted NFTs</h4>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={10000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        // removeArrowOnDeviceType={["tablet", "mobile"]}
                        // deviceType={this.props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        className="latest_nfts_carousel"
                    >
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/1'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/1.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #1</h3>
                            </a>
                        </div>
                        {/* <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/1'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/1.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #1</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/2'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/2.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #2</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/3'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/3.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #3</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/4'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/4.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #4</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/5'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/5.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #5</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/6'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/6.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #6</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/7'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/7.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #7</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/8'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/8.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #8</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/9'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/9.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #9</h3>
                            </a>
                        </div>
                        <div className="slider_item">
                            <a target="_blank" href={'https://testnets.opensea.io/assets/0x3452dd9331915df3cc00248b7e63b84b8215a223/10'}>
                                <img
                                    className='slider_item_image'
                                    src='./assets/images/10.png'
                                    alt=''
                                />
                                <h3>Sloth Royalty Club #10</h3>
                            </a>
                        </div> */}
                    </Carousel>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LastNFTs;