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

  const [loginMessage, setLoginMessage] = useState(false)
  const handleClickOnOrders = () => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('uuid');
    console.log("user id", userId)
    console.log('user token on order click', token)
    if(!token){
      setLoginMessage(true)
    }
      navigate(`/user-dashboard`);
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
          <Link to={'#'} onClick={handleClickOnOrders}>Orders</Link>
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
    </div>
  )
}

export default PromotionalBanner