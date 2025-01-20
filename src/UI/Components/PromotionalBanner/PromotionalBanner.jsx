// import React, {useState, useEffect} from 'react'
// import './PromotionalBanner.css';
// import { Link } from 'react-router-dom';
// import deliverTo from '../../../Assets/icons/delivery.png'
// // import locationModalIcon from '../../Assets/icons/location.png'
// import locationIcon from '../../../Assets/icons/location-red.png';

// const PromotionalBanner = ({handleLanguageModal, handleDeliverModal, currentSelectedCountryFlag, usaFlag, currentSelectedCountry}) => {

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const dynamicHeading = [0, 1, 2]
//     useEffect(() => {
//         const intervelId = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicHeading.length)
//         }, 5000)
//         return () => clearInterval(intervelId);
//     }, [])

//   return (
//     <div className='furniture-mecca-promotional-banner'>
//         <div className='rotating-message'>
//           {currentIndex === 1 ? <span> <Link to={'/contact-us'}>Need help ordering? </Link> <Link className='toll-free-ancor' to={'/contact-us'}> Call  (215) 352-1600 </Link> </span> 
//           : currentIndex === 2 ? <span>Learn about my <Link to={'/financing'} className='toll-free-ancor' href='#'>Financing Options</Link> </span> 
//           : <span>Shop everyday low prices!</span>}
//         </div>
//         <div className='header-links-and-select-language'>
//           <div className='banner-link-container'>
//             <Link to={'/store-locator'}>Stores</Link>
//             <Link to={'#'}>Orders</Link>
//             <Link to={'/financing'}>Financing</Link>
//             <Link to={'#'}>Help</Link>
//           </div>
//           <div className='header-main-banner-language-div'>
//             <button onClick={handleLanguageModal}>
//               <img src={currentSelectedCountryFlag || usaFlag} alt='flag' />
//               {currentSelectedCountry || 'English'}
//             </button>
//           </div>
//         </div>
//         <div className='on-tab-deliver-to' onClick={handleDeliverModal}>
//             <img src={deliverTo} alt="delivery" />
//             <div className='mobile-view-delever-to'> 
//               <p>Deliver to : </p>
//               <Link> PA 19134</Link> 
//             </div>
//         </div>
//       </div>
//   )
// }

// export default PromotionalBanner


import React, { useState, useEffect } from 'react'
import './PromotionalBanner.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import deliverTo from '../../../Assets/icons/delivery.png'
// import locationModalIcon from '../../Assets/icons/location.png'
import locationIcon from '../../../Assets/icons/location-red.png';
import { useUserDashboardContext } from '../../../context/userDashboardContext/userDashboard';
import { useGlobalContext } from '../../../context/GlobalContext/globalContext';
import axios from 'axios';
import { url } from '../../../utils/api';

const PromotionalBanner = ({ handleLanguageModal, handleDeliverModal, currentSelectedCountryFlag, usaFlag, currentSelectedCountry }) => {

  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);
  const dynamicHeading = [0, 1, 2]
  useEffect(() => {
    const intervelId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicHeading.length)
    }, 5000)
    return () => clearInterval(intervelId);
  }, [])


  // const { setMainLoader } = useGlobalContext();
  const { setUserToken } = useUserDashboardContext();
  const [isTokenValid, setIsTokenValid] = useState(false);

  const handleClickOnOrders = async () => {
    const token = localStorage.getItem('userToken');
    const id = localStorage.getItem('uuid');

    console.log("user token and uid", token, id);
    try {
      if (token) {
        const response = await fetch(`${url}/api/v1/web-users/verify-token`, {
          method: "GET",
          headers: {
            authorization: `${token}`,
          },
        });
        if (response.ok) {
          navigate(`/user-dashboard/${id}`, {state: 'orders'});
          console.log("Valid token, navigating with ID:", id);
          console.log("Response ok", response)
        }
      } else {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setIsTokenValid(true);
        console.log("catch block run")
      }
    } catch (error) {
      console.error("Unexpected Error", error)
    }
  }

  const handleCloseLoginMessageModal = () => {
    setIsTokenValid(false)
  }

  return (
    <div className='furniture-mecca-promotional-banner'>
      <div className='rotating-message'>
        {currentIndex === 1 ? (
          <span>
            Need help ordering?{' '}
            <a className='toll-free-ancor' href='tel:2153521600'>
              Call 215 352 1600
            </a>
          </span>
        ) : currentIndex === 2 ? (
          <span>
            Learn about my{' '}
            <Link to='/financing' className='toll-free-ancor'>
              Financing Options
            </Link>
          </span>
        ) : (
          <span>Shop everyday low prices!</span>
        )}
      </div>

      <div className='header-links-and-select-language'>
        <div className='banner-link-container'>
          <Link to={'/store-locator'}>Stores</Link>
          <p onClick={handleClickOnOrders}>Orders</p>
          <Link to={'/financing'}>Financing</Link>
          <Link to={'#'}>Help</Link>
        </div>
        <div className='header-main-banner-language-div'>
          <button onClick={handleLanguageModal}>
            <img src={currentSelectedCountryFlag || usaFlag} alt='flag' />
            {currentSelectedCountry || 'English'}
          </button>
        </div>
      </div>
      <div className='on-tab-deliver-to' onClick={handleDeliverModal}>
        <img src={deliverTo} alt="delivery" />
        <div className='mobile-view-delever-to'>
          <p>Deliver to : </p>
          <Link> PA 19134</Link>
        </div>
      </div>

      <div className={`login-warning-modal-main-container ${isTokenValid ? 'show-login-warning-modal' : ''}`} onClick={handleCloseLoginMessageModal}>
        <div className={`login-warning-modal-inner-container ${isTokenValid ? 'zoom-login-inner-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
          <h3>Login Modal</h3>
        </div>
      </div>
    </div>
  )
}

export default PromotionalBanner