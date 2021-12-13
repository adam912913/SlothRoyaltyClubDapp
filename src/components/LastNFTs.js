import React, { useContext, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CollectionContext from '../store/collection-context';

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
    const collectionCtx = useContext(CollectionContext);
    console.log(collectionCtx.collection)
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-12 justify-content text-center pt-2 pb-5 pl-4 pr-4">
                    <h4 className="pb-3">Your Latest Minted NFTs</h4>
                    {collectionCtx.nftIsLoading ? (<div className="text-center">
                        <div className="spinner-border text-info text-center"></div>
                    </div>) : ''}
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
                        {collectionCtx.collection.map((item, index) => {
                            return (
                                <div className="slider_item" key={index}>
                                    <a target="_blank" href={item.url + item.id}>
                                        <img
                                            className='slider_item_image'
                                            src={item.image}
                                            alt=''
                                        />
                                        <h3>{item.name}</h3>
                                    </a>
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LastNFTs;