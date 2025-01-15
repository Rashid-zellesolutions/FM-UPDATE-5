import React, { useEffect, useState } from 'react'
import './QuickView.css';
import minusBtn from '../../../Assets/icons/minus.png'
import plusBtn from '../../../Assets/icons/plus.png';
import redHeart from '../../../Assets/icons/red-heart.png'
import arrowDown from '../../../Assets/icons/arrow-down-white.png';
import arrowLeft from '../../../Assets/icons/arrow-left.png';
import arrowRight from '../../../Assets/icons/arrow-right.png';
import CartSidePannel from '../Cart-side-section/CartSidePannel';
import { useCart } from '../../../context/cartContext/cartContext';
import crossBtn from '../../../Assets/icons/close-btn.png'
import { FaStar } from "react-icons/fa";
import { url } from '../../../utils/api';
import QuickViewVariations from '../SizeVariant/QuickViewVariations';

const QuickView = ({ setQuickViewProduct, quickViewClose, quickViewShow, quickViewclose }) => {

    console.log("quick view data", setQuickViewProduct)
    console.log("quick view show", quickViewShow)
    // console.log("quick view set show", setQuickViewShow)

    const {
        cart,
        increamentQuantity,
        decreamentQuantity,
        removeFromCart,
        addToCart0,
        cartProducts
    } = useCart();
    const [cartSection, setCartSection] = useState(false);
    const [viewDetails, setViewDetails] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleCartSectionClose = () => {
        setCartSection(false)
        setQuantity(1)
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? setQuickViewProduct.images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === setQuickViewProduct.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleViewDetails = (index) => {
        setViewDetails(prevIndex => (prevIndex === index ? null : index));
    }

    const quickViewData = [
        {
            name: 'Description',
            para: setQuickViewProduct.description,
        },
        {
            name: 'Weight & Dimension',
            para: setQuickViewProduct.short_description
            ,
        },
    ]

    const formatePrice = (price) => {
        return new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
        }).format(price)
    }


    const handleAddToCartProduct = (product) => {
        setCartSection(true);
        addToCart0(product, variableProductData, 0, quantity)


    }

    const imagesLenght = setQuickViewProduct.images && setQuickViewProduct.images.length;
    const [quantity, setQuantity] = useState(1)

    const [variableProductData, setVariableData] = useState();

    const increaseLocalQuantity = () => {
        setQuantity(quantity + 1);
    }
    const decreaseLocalQuantity = () => {
        setQuantity(quantity - 1);
    }

    const [selectedVariationUid, setSelectedVariationUid] = useState(null);
    const handleVariationSelected = (uid) => {
        setSelectedVariationUid(uid);
    };

    useEffect(() => {
        const searchProductInVariation = setQuickViewProduct?.variations?.find((item) => item.uid === selectedVariationUid)
        setVariableData(searchProductInVariation);
    }, [selectedVariationUid])

    // const handleQuckViewClose = () => {
    //     setQuickViewShow(false)
    //     console.log("quick view set show", setQuickViewShow)
    // }

    return (
        <div className={`quick-view-main-container ${quickViewShow ? 'show-quick-view-modal' : ''}`}>
            <button className='quick-view-close-modal-button' onClick={quickViewClose}>
                <img src={crossBtn} alt='close' />
            </button>
            <div className={`quick-view-main ${quickViewShow ? 'slide-quick-view-inner-modal' : ''}`}>
                <div className='quick-view-heading-and-rating'>
                    <h3>{setQuickViewProduct.name}</h3>
                    <div className='quick-view-rating'>
                        <div className='quick-view-start'>
                            {Array.from({ length: 5 }).map((star, index) => (
                                // <img key={index} src={star.icon} alt='star' />
                                <FaStar size={15} className='quick-view-star-icon' />
                            ))}
                            <p>4.1</p>
                        </div>
                        <p>200 Reviews</p>

                    </div>
                </div>
                <div className='quick-view-image-and-variations'>
                    <div className="quick-view-slider">
                        <button className={`quick-view-arrow quick-view-left ${currentIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev}>
                            <img src={arrowLeft} alt='left' />
                        </button>
                        <div className="quick-view-slider-container">
                            {setQuickViewProduct?.type === "simple" ? <div className="quick-view-slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {setQuickViewProduct.images && setQuickViewProduct.images.map((image, index) => (
                                    <img key={index} src={`${url}${image.image_url}`} alt={`Slide ${index + 1}`} />
                                ))}
                            </div> :
                                <div className="quick-view-slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                    {variableProductData?.images && variableProductData?.images?.map((image, index) => (
                                        <img key={index} src={`${url}${image.image_url}`} alt={`Slide ${index + 1}`} />
                                    ))}
                                </div>
                            }
                        </div>
                        <button className={`quick-view-arrow quick-view-right ${currentIndex === imagesLenght - 1 ? 'disabled' : ''}`} onClick={handleNext}>
                            <img src={arrowRight} alt='right' />
                        </button>
                    </div>
                    <div className='quick-view-variations'>
                        <QuickViewVariations default_uid={setQuickViewProduct.default_uid} attributes={setQuickViewProduct.attributes} productData={setQuickViewProduct} variations={setQuickViewProduct.variations} onChangeVar={handleVariationSelected} />
                    </div>
                </div>
                {/* <h3 className='quick-view-price'>{formatedQuickViewProductPrice}</h3> */}
                {setQuickViewProduct.type === "simple" ? <>
                    {
                        setQuickViewProduct.sale_price === "0" ?
                            <h3 className='-quick-view-product-price-tag'>{formatePrice(setQuickViewProduct.regular_price)}</h3> :
                            <h3 className='quick-view-product-price-tag'> <del>{formatePrice(setQuickViewProduct.regular_price)}</del>  {formatePrice(setQuickViewProduct.sale_price)}</h3>
                    }

                </> :
                    <>
                        {
                            variableProductData?.sale_price === "0" ?
                                <h3 className='-quick-view-product-price-tag'>{formatePrice(variableProductData?.regular_price)}</h3> :
                                <h3 className='quick-view-product-price-tag'> <del>{formatePrice(variableProductData?.regular_price)}</del>  {formatePrice(variableProductData?.sale_price)}</h3>
                        }

                    </>}
                <div className='quick-view-add-item-or-cart-btn'>
                    <div className='quick-view-add-or-minus-item'>
                        <button onClick={decreaseLocalQuantity}>
                            <img src={minusBtn} alt='minus' />
                        </button>
                        <p>{quantity}</p>
                        <button onClick={increaseLocalQuantity}>
                            <img src={plusBtn} alt='plus' />
                        </button>
                    </div>
                    <img src={redHeart} alt='heart' className='quickview-heart-icon' />
                    <button className='quick-view-add-to-cart' onClick={() => handleAddToCartProduct(setQuickViewProduct)}>
                        Add To Cart
                    </button>
                </div>
                <div className='quick-view-details-section'>
                    {quickViewData.map((items, index) => (
                        <div key={index} className='quick-view-detail-single-section'>
                            <div className='quick-view-details-heading' onClick={() => handleViewDetails(index)}>
                                <p>{items.name}</p>
                                <button >
                                    <img src={arrowDown} alt='arrow down' className={viewDetails === index ? 'quick-view-rotate-up' : 'quick-view-rotate-down'} />
                                </button>
                            </div>
                            <div className={`quick-view-details ${viewDetails === index ? 'show-details' : ''}`}>
                                <p dangerouslySetInnerHTML={{ __html: items.para }} />
                            </div>
                        </div>
                    ))}

                </div>
                <CartSidePannel
                    cartData={cartProducts}
                    addToCartClicked={cartSection}
                    handleCartSectionClose={handleCartSectionClose}
                    setAddToCartClick={setCartSection}
                    removeFromCart={removeFromCart}
                    decreamentQuantity={decreamentQuantity}
                    increamentQuantity={increamentQuantity}
                />
            </div>
        </div>

    )
}

export default QuickView
