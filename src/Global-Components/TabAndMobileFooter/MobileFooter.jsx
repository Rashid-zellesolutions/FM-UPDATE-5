import React, { useEffect, useState } from 'react'
import './MobileFooter.css';
import { Link } from 'react-router-dom';
import redFurnitureMecca from '../../Assets/global-images/furniture-mecca-red.jpeg'
import locationIcon from '../../Assets/icons/location.png'
import callIcon from '../../Assets/icons/call.png'
import calander from '../../Assets/icons/white-calander.png'
import mailIcon from '../../Assets/icons/mail.png'
import arrowRightWhite from '../../Assets/icons/arrow-right-white.png'
import clock from '../../Assets/icons/white-clock.png'

import facebookIcon from '../../Assets/icons/facebook.png';
import tiktokIcon from '../../Assets/icons/tiktok.png';
import youtubeIcon from '../../Assets/icons/youtube.png';
import instaIcon from '../../Assets/icons/instagram.png';
import { getCurrentDay, getCurrentTimeForNewYork, url } from '../../utils/api';
import axios from 'axios';
import RatingReview from '../../UI/Components/starRating/starRating';
import { useGlobalContext } from '../../context/GlobalContext/globalContext';

const MobileFooter = () => {
    const footerHide = window.location.pathname

    const [googleRating, setGoogleRating] = useState(null);

    const fetchGoogleRating = async () => {
        const api = `${url}/api/v1/stores/get-top-rated`;

        try {
            let response;
            response = await axios.get(api);
            const stores = response.data.data;
            //   console.log(response,"here isth")
            setGoogleRating(stores)
        } catch (error) {
            console.error("Error fetching stores data", error);
        }
    };

    useEffect(() => {
        fetchGoogleRating();
    }, [])

    // const stars = [
    //     { icon: filledStar },
    //     { icon: filledStar },
    //     { icon: filledStar },
    //     { icon: filledStar },
    //     { icon: unFilledStart }

    // ]

    const socialIcons = [
        { socialIcon: facebookIcon, socialLink: 'https://www.facebook.com/myfurnituremecca' },
        { socialIcon: tiktokIcon, socialLink: 'https://www.tiktok.com/@myfurnituremecca?_t=8gcQvVGSaGI&_r=1' },
        { socialIcon: youtubeIcon, socialLink: 'https://www.youtube.com/@FurnitureMecca1' },
        { socialIcon: instaIcon, socialLink: 'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D' },
    ]

    const contactData = [
        { icon: locationIcon, title: 'Philadelphia', link: '#' },
        { icon: callIcon, title: '215 352 1600', link: '#' },
        { icon: mailIcon, title: 'meccacustomercare@gmail.com', link: '#' }
    ]

    const footerCustomerCareAndAbout = [
        {
            heading: 'Customer Care', navLinks: [
                { name: 'Contact Us', link: '/contact-us' },
                { name: 'Financing', link: '/financing' },
                { name: 'Shipping & Delivery', link: '/shipping-and-delivery' },
                { name: 'Terms & Conditions', link: '/terms-and-conditions' },
                { name: 'Protection Plan', link: '#' },

            ]
        },
        {
            heading: 'About Furniture Mecca', navLinks: [
                { name: 'About Us', link: '/about-us' },
                { name: 'Career', link: '/careers' },
                { name: 'Store Locations', link: '/store-locator' },
                // { name: 'Reference', link: '#' },
                { name: 'My Account', link: '/user-dashboard' },
                { name: 'Blogs', link: '/blogs' },
            ]
        },
    ];

    const {stores} = useGlobalContext()
    const findDefaultStore = () => {
        const defaultStore = stores.find(store => store.postal_code === '19134')
        return defaultStore;
    }

    const defaultStore = findDefaultStore()
    // console.log("Def Store", defaultStore)

    const currentDay = getCurrentDay(getCurrentTimeForNewYork(), 'en-us')
    const defaultStoreTimings = defaultStore?.timings?.find(day => day.day === currentDay);

    const nearStoreDetails = [
        { 
            icon: locationIcon, 
            details: defaultStore?.name },
        { 
            icon: callIcon, 
            details: defaultStore?.phone
 
        },
        { 
            icon: clock, 
            details: defaultStoreTimings?.time
        },
        { 
            icon: calander, 
            details: 'Monday - Sunday' 
        },
    ]

    return (
        <div className={`mobile-view-footer-main-container ${footerHide === '/cart' ? 'hide-mobile-footer' : ''}`}>
           
            {
                googleRating &&
                <div className='footer-banner'>
                    <div className='mobile-view-footer-banner-logo'>
                        <img src={redFurnitureMecca} alt='img' className='company-name-image' />
                    </div>
                    <div className='banner-content'>
                        <h3>Furniture Mecca</h3>
                        {/* <div className='rating-starts-container'>
                            {stars.map((item, index) => {
                                return <img key={index} src={item.icon} alt='start' />
                            })}
                        </div> */}
                        <RatingReview rating={googleRating?.rating} disabled={true} bgColor={"#FFD700"} size={"20px"} />
                        <p>{googleRating?.number_of_reviews} Google Reviews</p>
                    </div>
                </div>
            }

            <div className='footer-social-icons'>
                {socialIcons.map((item, index) => {
                    return <Link key={index} target='_blank' to={item.socialLink}>
                        <img src={item.socialIcon} alt="icon" />
                    </Link>
                })}
            </div>

            <div className='contact-container'>
                {contactData.map((item, index) => {
                    return <span key={index}>
                        <img src={item.icon} alt='img' />
                        {
                            item.title === '215 352 1600' ?
                                <a href='tel:2153521600'>{item.title}</a> :
                                <Link href={item.link}>{item.title}</Link>
                        }

                    </span>
                })}
            </div>

            <div className='mobile-location-section'>
                <h3 className='mobile-footer-location-section'>Nearest Store</h3>
                <div className='near-store-containt-section'>
                    <div className='near-store-image-div'>
                        <img src={`${url}${defaultStore?.images?.[0]?.image_url}`} alt='near store' />
                    </div>
                    <div className='near-store-details-section'>
                        {nearStoreDetails.map((item, index) => (
                            <span key={index}>
                                <img src={item.icon} alt='icon' />
                                <p>{item.details}</p>
                            </span>
                        ))}
                    </div>
                    <div className='appointment-and-outlet-div'>
                        <Link to={'#'}>
                            <p>Outlet</p>
                        </Link>
                        <Link to={'#'}>
                            <p>Directions</p>
                        </Link>
                        <Link to={'/book-an-appointment'}>
                            <p>Book an Appointment</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='mobile-view-terms-and-rights'>
                {footerCustomerCareAndAbout.map((item, index) => (
                    <div className='mobile-footer-nav-links'>
                        <h3 className='mobile-footer-nav-links-heading'>{item.heading}</h3>
                        <div className='mobile-footer-nav-items'>
                            {item.navLinks.map((innerItems, innerIndex) => (
                                <Link className='footer-nav-span' key={innerIndex} to={innerItems.link}>
                                    <img src={arrowRightWhite} alt='arrow right' />
                                    {innerItems.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
                {/* <div className='mobile-view-terms'>
                    <Link to={'/shipping-and-delivery'}>Shipping & Delivery</Link>
                    <Link to={'/terms-and-conditions'}>Terms & Conditions</Link>
                </div> */}
                <div className='mobile-footer-line'></div>
                <div className='mobile-view-right'>
                    <p>2020 - 2024 Furniture Mecca. All Rights Reserved</p>
                    <span>
                        <p>Designed & maintained by </p>
                        <Link target='_blank' to={'https://zellesolutions.com/'}>Zelle Solutions</Link>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default MobileFooter
