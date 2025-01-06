import React, { useRef, useState, useEffect } from 'react';
import './SingleProductStickySection.css';
import { Link, useParams } from 'react-router-dom';
// Sticky Slider Images

// Assets
import redHeart from '../../../Assets/icons/red-heart.png'
import filledHeart from '../../../Assets/icons/filled-heart.png';
import minus from '../../../Assets/icons/minus.png';
import heartIcon from '../../../Assets/icons/red-heart.png'
import plus from '../../../Assets/icons/plus.png';

// Components
import WhatWeOffer from '../WhatWeOffer/WhatWeOffer';
import SingleProductFAQ from '../SingleProductFAQ/SingleProductFAQ';
import AlsoNeed from '../AlsoNeed/AlsoNeed';
import CartSidePannel from '../Cart-side-section/CartSidePannel';
import FinancingOptions from '../FinancingOptions/FinancingOptions';
import SizeVariant from '../SizeVariant/SizeVariant';
import DeliveryOptions from '../DeliveryOptions/DeliveryOptions';
import Breadcrumb from '../../../Global-Components/BreadCrumb/BreadCrumb';
import RatingReview from '../starRating/starRating';

// Alice Slider
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

// functions and context
import { useCart } from '../../../context/cartContext/cartContext';
import { formatedPrice, url } from '../../../utils/api';
import axios from 'axios';
import { useList } from '../../../context/wishListContext/wishListContext';
import { useProductPage } from '../../../context/ProductPageContext/productPageContext';
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";

const SingleProductStickySection = ({ productData }) => {

  // console.log("product data", productData.images);
  const {
    setSingleProductData,
    setSelectedVariationUid,
    findObjectByUID,
    setSelectedVariationData,
    selectedVariationData
  } = useProductPage();

  useEffect(() => {
    console.log("variation data", selectedVariationData)
  }, [])
  


  const { cart, addToCart, decreamentQuantity, increamentQuantity, removeFromCart, calculateTotalPrice, addToCart0, cartProducts } = useCart();
  const [cartSection, setCartSection] = useState(false);
  const [isProtectionCheck, setIsProtectionCheck] = useState(true)

  const [quantity, setQuantity] = useState(1)
  const increaseLocalQuantity = () => {
    setQuantity(quantity + 1);
  }
  const decreaseLocalQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
    // console.log("quantity on sticky", quantity)
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const mobCarouselRef = useRef(null);

  const handleThumbnailClickk = (index) => {
    setActiveIndex(index);
    carouselRef.current.slideTo(index); // Slide to the selected thumbnail
  };
  const handleMobThumbnailClickk = (index) => {
    setMobileActiveIndex(index);
    mobCarouselRef.current.slideTo(index); // Slide to the selected thumbnail
  };

  const handleNextSlide = () => {
    const totalItems = productData.type === 'variable'
      ? selectedVariationData?.images.length
      : productData?.images.length;

    const newIndex = activeIndex === totalItems - 1 ? 0 : activeIndex + 1;

    setActiveIndex(newIndex);
    carouselRef.current.slideTo(newIndex); // Slide to the next thumbnail
  };

  const handleMobNextSlide = () => {
    const totalItems = productData.type === 'variable'
      ? selectedVariationData?.images.length
      : productData?.images.length;

    const newIndex = mobileActiveIndex === totalItems - 1 ? 0 : mobileActiveIndex + 1;

    setMobileActiveIndex(newIndex);
    mobCarouselRef.current.slideTo(newIndex); // Slide to the next thumbnail
  };

  const handlePrevSlide = () => {
    const totalItems = productData.type === 'variable'
      ? selectedVariationData?.images.length
      : productData?.images.length;

    const newIndex = activeIndex === 0 ? totalItems - 1 : activeIndex - 1;

    setActiveIndex(newIndex);
    carouselRef.current.slideTo(newIndex); // Slide to the previous thumbnail
  };

  const handleMobPrevSlide = () => {
    const totalItems = productData.type === 'variable'
      ? selectedVariationData?.images.length
      : productData?.images.length;

    const newIndex = mobileActiveIndex === 0 ? totalItems - 1 : mobileActiveIndex - 1;

    setMobileActiveIndex(newIndex);
    mobCarouselRef.current.slideTo(newIndex); // Slide to the previous thumbnail
  };

  // sticky behavior scrip
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (leftSectionRef.current && rightSectionRef.current) {
        const leftSection = leftSectionRef.current;
        const rightSection = rightSectionRef.current;

        const rightSectionBottom = rightSection.getBoundingClientRect().bottom;
        const leftSectionBottom = leftSection.getBoundingClientRect().bottom;

        if (rightSectionBottom < window.innerHeight) {
          leftSection.style.position = 'absolute';
          leftSection.style.bottom = '0';
        } else {
          leftSection.style.position = 'sticky';
          leftSection.style.bottom = 'auto';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Handle resizing of the window

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // setCartSection(true);
  };

  const handleAddToCartProduct = (product) => {
    setCartSection(true);
    // console.log("quantity on ad function", quantity)
    addToCart(product, quantity, !isProtectionCheck);
  }
  const handleCartClose = () => {
    setCartSection(false)
  }
  const [variationData, setVariationData] = useState([])

  const [selectVariation, setSelectVariation] = useState(0);
  const handleSelectVariation = (value) => {
    setSelectVariation(value);

  }
  const [selectedUid, setSelectedUid] = useState(null);
  console.log("product variation ", productData)
  const handleSelectedVariationData = (value) => {
    console.log("variation data", value)
    setSelectedUid(value);

    const selectedIndex = productData?.variations?.findIndex(variation => variation?.uid === value);

    // console.log(productData.variations);
    // console.log(selectedUid, "here");
    // console.log(selectedIndex, "index");
    setVariationData(productData?.variations?.[selectedIndex]);

  };


  const [selectedColor, setSelectedColor] = useState();
  const handleSelectColor = (value) => {
    setSelectedColor(value);
  }

  //console.log("imgggg", variationData)
  // const formatePrice = (price) => {
  //   return new Intl.NumberFormat('en-us', {
  //     style: 'currency',
  //     currency: 'USD'
  //   }).format(price)
  // }

  // //console.log("product variable", product.type)
  const { addToList, removeFromList, isInWishList } = useList()
  const handleWishList = (item) => {

    if (isInWishList(item?.uid)) {
      removeFromList(item?.uid)
    } else {
      addToList(item)
    }
  }

  return (
    <>
      <div className='sticky-main-container-0'>
        {/* <Breadcrumb /> */} 
        <Breadcrumb sku={productData?.sku} productName={productData?.name} category={productData?.categories?.[0]?.name} categorySlug={productData?.categories?.[0]?.slug} />
        <div className="sticky-main-container">
          <div className='left-section'>
            <div className='single-product-alice-slider'>
              <p className='single-product-slider-main-image-stock-tag' >In Stock</p>
              <button className='single-product-arrow single-product-arrow-left' onClick={handlePrevSlide} >{/* <img src={arrowLeft} alt='left' /> */}
                <IoChevronBack />
              </button>
              <AliceCarousel
                ref={carouselRef}
                activeIndex={activeIndex}
                disableDotsControls
                disableButtonsControls
                items={
                  productData.type === 'variable'
                    ? (selectedVariationData?.images || []).map((img, index) => (
                      <img
                        key={index}
                        src={`${url}${img.image_url}`}
                        className="single-product-slider-img"
                        alt={`Slide ${index}`}
                      />
                    ))
                    : (productData?.images || []).map((item, index) => (
                      <img
                        key={index}
                        src={`${url}${item.image_url}`}
                        className="single-product-slider-img"
                        alt="simple"
                      />
                    ))
                }
                responsive={{
                  0: { items: 1 },
                  1024: { items: 1 },
                }}
              />

              <div className="single-product-slider-thumbnails">
                {productData.type === 'variable' ? (
                  selectedVariationData?.images?.map((img, ind) => (
                    <div
                      key={ind}
                      className={`single-product-slider-thumbnail ${activeIndex === ind ? '' : 'single-product-slider-thumbnail-inactive'}`}
                      onClick={() => handleThumbnailClickk(ind)}
                    >
                      <img src={`${url}${img.image_url}`} alt={`Thumbnail ${ind}`} />
                    </div>
                  ))
                ) : (
                  productData.images?.map((simpleImg, index) => (
                    <div
                      key={index}
                      className={`single-product-slider-thumbnail ${activeIndex === index ? '' : 'single-product-slider-thumbnail-inactive'}`}
                      onClick={() => handleThumbnailClickk(index)}
                    >
                      <img src={`${url}${simpleImg.image_url}`} alt={`Thumbnail ${index}`} />
                    </div>
                  ))
                )}
              </div>

              <button className='single-product-arrow single-product-arrow-right' onClick={handleNextSlide}>
                <IoChevronForward />
              </button>
            </div>
          </div>

          <div className='right-section'>
            <div className='single-product-detail-container'>
              <div className='single-page-product-name-anddetails'>
                <h3 className='single-product-heading'>{productData.name}</h3>
                <p className='single-product-sku'>
                  SKU : {productData.sku}
                </p>
                <div className='single-product-rating'>
                  <RatingReview rating={(productData?.average_rating)} disabled={true} size={"20px"} />
                </div>
                {productData.type === "simple" ? <>
                {/* {console.log("product data on midle", productData)} */}
                  {productData?.sale_price !== "" ? <div className='single-product-prices'>
                    <del className='single-product-old-price'>{formatedPrice(productData.regular_price)}</del>
                    <h3 className='single-product-new-price'>{formatedPrice(productData?.sale_price)}</h3>
                  </div> : <div className='single-product-prices'>
                    <h3 className='single-product-new-price'>{formatedPrice(productData.regular_price)}</h3>
                  </div>
                  }
                </> : <>
                  {selectedVariationData?.sale_price !== "" ? <div className='single-product-prices'>
                    <del className='single-product-old-price'>{formatedPrice(selectedVariationData?.regular_price)}</del>
                    <h3 className='single-product-new-price'>{formatedPrice(selectedVariationData?.sale_price)}</h3>
                  </div> : <div className='single-product-prices'>
                    <h3 className='single-product-new-price'>{formatedPrice(productData.regular_price)}</h3>
                  </div>
                  }
                </>}

                <span className='single-product-shipping'>
                  <p className='single-product-installment-price-price'>$9/month for 6 months - Total $ 199.00 </p>
                  <p>Get it between July 27 - July 31'</p>
                </span>
                <div className='single-product-frame-color'>
                  <SizeVariant
                    productType={productData.type}
                    productData={productData.variations}
                    attributes={productData.attributes}
                    selectedColor={selectedColor}
                    selectVariation={selectVariation}
                    handleSelectColor={handleSelectColor}
                    handleSelectVariation={handleSelectVariation}
                    handleSelectedVariationData={handleSelectedVariationData}
                  />
                </div>

                <div className='add-cart-or-add-items-div'>
                  <div className='item-count'>
                    <button className={`minus-btn ${productData.quantity === 1 ? 'disabled' : ''}`} onClick={decreaseLocalQuantity} disabled={productData.quantity === 1}>
                      <img src={minus} alt='minus btn' />
                    </button>

                    <input type='number' value={quantity} />
                    <button className='plus-btn' onClick={increaseLocalQuantity}>
                      <img src={plus} alt='plus btn' />
                    </button>
                  </div>
                  <img src={isInWishList(productData.uid) ? filledHeart : redHeart} alt='red-heart-icon' className='red-heart-icon' onClick={(e) => { e.stopPropagation(); handleWishList(productData) }} />
                  <button
                    className={`add-to-cart-btn ${isLoading ? 'loading' : ''}`}
                    onClick={() => {
                      handleClick();
                      addToCart0(productData, variationData, !isProtectionCheck ? 1 : 0,quantity)
                      handleAddToCartProduct(productData);
                    }
                    }>
                    {isLoading ? 'Loading...' : 'Add To Cart'}
                  </button>
                </div>
              </div>
              <FinancingOptions />
              {productData.may_also_need && productData.may_also_need.length > 0 ? <AlsoNeed productsUid={productData.may_also_need} /> : <></>}

              <WhatWeOffer key={"single-protection"} isProtected={isProtectionCheck} setIsProtected={setIsProtectionCheck} />
              <DeliveryOptions />
              <SingleProductFAQ description={productData.description} />
            </div>
          </div>
        </div>
        <CartSidePannel
          cartData={cartProducts}
          addToCartClicked={cartSection}
          handleCartSectionClose={handleCartClose}
          setAddToCartClick={setCartSection}
          removeFromCart={removeFromCart}
          decreamentQuantity={decreamentQuantity}
          increamentQuantity={increamentQuantity}
        />
      </div>

      <div className='mobile-view-sticky-main-container'>

        <div className='mobile-view-single-product-slider'>

          <h3 className='mobile-view-product-name'>
            {productData.name}
          </h3>
          <p className='mobile-view-product-sku'>
            SKU: {productData.sku}
          </p>
          <div className='mobile-view-price-and-favorite-div'>
            <div className='old-and-new-price'>
              {productData.type === "simple" ? <>
                {productData?.sale_price !== "0=" ? <div className='single-product-prices'>
                  <del className='single-product-old-price'>{formatedPrice(productData?.regular_price)}</del>
                  <h3 className='single-product-new-price'>{formatedPrice(productData?.sale_price)}</h3>
                </div> : <div className='single-product-prices'>
                  <h3 className='single-product-new-price'>{formatedPrice(productData.regular_price)}</h3>
                </div>
                }
              </> : <>
                {selectedVariationData?.sale_price !== "0=" ? <div className='single-product-prices'>
                  <del className='single-product-old-price'>{formatedPrice(selectedVariationData?.regular_price)}</del>
                  <h3 className='single-product-new-price'>{formatedPrice(selectedVariationData?.sale_price)}</h3>
                </div> : <div className='single-product-prices'>
                  <h3 className='single-product-new-price'>{formatedPrice(productData.regular_price)}</h3>
                </div>
                }
              </>}
            </div>
            <img src={heartIcon} alt='heart' />
          </div>

          <div className='mobile-view-single-product-rating'>
            <RatingReview rating={(productData?.average_rating)} disabled={true} size={"12px"} />
            {/* <p>4.1</p> */}
            {/* <Link>{product.reviewCount} Reviews</Link> */}
          </div>

          <div className='mobile-view-single-product-slider-main-section'>

            <button
              className='mobile-single-product-slider-arrow mobile-single-product-arrow-left'
              onClick={handleMobPrevSlide}
            >
              <IoChevronBack />
            </button>

            <div className='mobile-view-single-product-slider-main-image'>

              <div className='mobile-view-product-tags'>
                <h3>In stock</h3>
                <h3>Clarence Sale</h3>
              </div>

              <AliceCarousel
                ref={mobCarouselRef}
                activeIndex={mobileActiveIndex}
                disableDotsControls
                disableButtonsControls
                items={
                  productData.type === 'variable'
                    ? (selectedVariationData?.images || []).map((img, index) => (
                      <img
                        key={index}
                        src={`${url}${img.image_url}`}
                        className="single-product-slider-img"
                        alt={`Slide ${index}`}
                      />
                    ))
                    : (productData?.images || []).map((item, index) => (
                      <img
                        key={index}
                        src={`${url}${item.image_url}`}
                        className="single-product-slider-img"
                        alt="simple"
                      />
                    ))
                }
                responsive={{
                  0: { items: 1 },
                  1024: { items: 1 },
                }}
              />
            </div>

            <div className='mobile-view-slider-thumb-images'>
              {productData.type === 'variable' ? (
                selectedVariationData?.images?.map((img, ind) => (
                  <div
                    key={ind}
                    className={`single-product-slider-thumbnail ${mobileActiveIndex === ind ? '' : 'single-product-slider-thumbnail-inactive'}`}
                    onClick={() => handleMobThumbnailClickk(ind)}
                  >
                    <img src={`${url}${img.image_url}`} alt={`Thumbnail ${ind}`} />
                  </div>
                ))
              ) : (
                productData.images?.map((simpleImg, index) => (
                  <div
                    key={index}
                    className={`single-product-slider-thumbnail ${mobileActiveIndex === index ? '' : 'single-product-slider-thumbnail-inactive'}`}
                    onClick={() => handleMobThumbnailClickk(index)}
                  >
                    <img  src={`${url}${simpleImg.image_url}`} alt={`Thumbnail ${index}`} />
                  </div>
                ))
              )}
            </div>
            <button
              className='mobile-single-product-slider-arrow mobile-single-product-arrow-right'
              onClick={handleMobNextSlide}
            >
              <IoChevronForward />
            </button>
          </div>

        </div>
        <div className='mobile-view-single-product-details'>
          <div className='mobile-view-color-variant'>
            <SizeVariant
              productType={productData.type}
              productData={productData.variations}
              attributes={productData.attributes}
              selectedColor={selectedColor}
              selectVariation={selectVariation}
              handleSelectColor={handleSelectColor}
              handleSelectVariation={handleSelectVariation}
              handleSelectedVariationData={handleSelectedVariationData}
            />
          </div>

          <div className='mobile-product-count-and-add-to-cart'>

            <div className='mobile-product-count'>

              <button className={`mobile-minus-btn ${productData.quantity === 1 ? 'disabled' : ''}`} onClick={decreaseLocalQuantity} disabled={productData.quantity === 1}>
                <img src={minus} alt='minus btn' />
              </button>

              <p>{quantity}</p>

              <button className='mobile-plus-btn' onClick={increaseLocalQuantity}>
                <img src={plus} alt='plus btn' />
              </button>
            </div>

            <button
              className={`mobile-add-to-cart-btn ${isLoading ? 'loading' : ''}`}
              onClick={() => {
                handleClick();
                addToCart0(productData, variationData, !isProtectionCheck ? 1 : 0)
                handleAddToCartProduct(productData);
              }
              }>
              {isLoading ? 'Loading...' : 'Add To Cart'}
            </button>
          </div>
          <FinancingOptions />
          <SingleProductFAQ />
        </div>
      </div>
    </>
  );
};

export default SingleProductStickySection;