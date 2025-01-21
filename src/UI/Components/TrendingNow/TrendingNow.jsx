// import React, { useEffect, useState } from 'react'

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './TrendingNow.css'
// import CustomSlider from '../CostumSlider/CostumSlider'
// import trandinImage from '../../../Assets/Furniture Mecca/Landing Page/trending-now/tranding-slider-main-image.png'
// import sofaChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/sofa.png'
// import swivalChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/swival-chair.png'
// import slideChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/slide-chair.png'
// import cornerChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/corner.png'
// import chaisChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/chaise.png'
// import armlessChair from '../../../Assets/Furniture Mecca/Landing Page/trending-now/armless-chair.png'
// import axios from 'axios'
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { url } from '../../../utils/api'
// import TrandingNowShmmer from './TrandingNowShimmer/TrandingNowShmmer';

// const TrendingNow = () => {

//     const [currentIndex, setCurrentIndex] = useState(0);
//     // const sliderImages = [trandinImage, trandinImage, trandinImage];
//     const sliderItems = [armlessChair, cornerChair, swivalChair, slideChair, chaisChair, sofaChair]
//     const [data, setData] = useState([]);
//     const getTrandingProductsData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/v1/pages/home/trending-now/get`);
//             // console.log('tranding data', response.data)
//             setData(response.data.data)
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     useEffect(() => {
//         getTrandingProductsData()
//     }, [])
//     // console.log("tranding now data", data)

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % data.sliders && data.sliders.length);
//         }, 3000); // Change slide every 3 seconds

//         return () => clearInterval(interval); // Cleanup interval on component unmount
//     }, [data.sliders]);
//     // Extract only the product objects
//     const productArray = Object.keys(data)
//         .filter(key => key.startsWith('product_'))
//         .map(key => data[key]);

//     const settings = {
//         infinite: true,
//         speed: 1000, // Transition speed in ms
//         autoplay: true,
//         autoplaySpeed: 3000, // Time interval for auto-slide
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         draggable: true,
//         arrows: false,
//         dots: false,
//         pauseOnHover: false,
//     };

//     return (
//         <>
//         {data && Object.keys(data).length > 0 ? (
//             <div className='trending-now-main-container'>
//                 <h3>Trending Now</h3>
//                 <div className='tranding-slider-and-categories'>
//                     <div className="tranding-slider">
//                         <div className="tranding-slides">
//                             <Slider {...settings}>
//                                 {data.sliders &&
//                                     data.sliders.map((image, index) => (
//                                         <div className="trending-slide" key={index}>
//                                             <img
//                                                 src={`${url}${image.image_url}`}
//                                                 alt={`Slide ${index + 1}`}
                                                
//                                             />
//                                         </div>
//                                     ))}
//                             </Slider>
//                         </div>
//                     </div>
//                     <div className='trending-items-cards'>
//                         {productArray.map((item, index) => (
//                             <div key={item.uid} className='trending-item-category'>
//                                 <img src={`${url}${item.image_url}`} alt={item.alt_text} effect='blur' />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         ) : (
//                     <TrandingNowShmmer  />
//         )}
//         </>
// )
// }

// export default TrendingNow


import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TrendingNow.css';
import axios from 'axios';
import { url } from '../../../utils/api';
import TrandingNowShmmer from './TrandingNowShimmer/TrandingNowShmmer';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TrendingNow = ({data}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data && data?.sliders) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % data?.sliders.length); // Correct logic
            }, 3000);

            return () => clearInterval(interval); // Cleanup interval
        }
    }, [data]);

    // Extract only the product objects (if data exists)
    const productArray = data ? Object.keys(data)
        .filter(key => key.startsWith('product_'))
        .map(key => data[key]) : [];

    const settings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        arrows: false,
        dots: false,
        pauseOnHover: false,
    };

    return (
        <>
            {data ? (
                <div className='trending-now-main-container'>
                    <h3>Trending Now</h3>
                    <div className='tranding-slider-and-categories'>
                        <div className="tranding-slider">
                            <div className="tranding-slides">
                                <Slider {...settings}>
                                    {data?.sliders.map((image, index) => (
                                        <div className="trending-slide" key={index}>
                                            <img
                                                src={`${url}${image.image_url}`}
                                                alt={`Slide ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className='trending-items-cards'>
                            {productArray.map((item, index) => (
                                <div key={item.uid} className='trending-item-category'>
                                    <img
                                        src={`${url}${item.image_url}`}
                                        alt={item.alt_text}
                                        effect='blur'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <TrandingNowShmmer />
            )}
        </>
    );
};

export default TrendingNow;