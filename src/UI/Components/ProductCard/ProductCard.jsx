import React, { useState, useEffect, useRef } from 'react'
import './ProductCard.css';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setColorIndex } from '../../../Redux/ColorIndex/ColorINdexSlicer';
import cartIcon from '../../../Assets/icons/cart-white.png'
import cartBlack from '../../../Assets/icons/cart-black.png';
import eyeBlack from '../../../Assets/icons/eye-black.png';
import eyeWhite from '../../../Assets/icons/eye-white.png';
import { url } from '../../../utils/api';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useList } from '../../../context/wishListContext/wishListContext';
import { VscHeartFilled } from "react-icons/vsc";
import ProductCardImageShimmer from '../Loaders/CardImageShimmer/cardImageShimmer';

const ProductCard = ({
    tagIcon,
    tagClass,
    mainImage,
    productCardContainerClass,
    mouseEnter,
    mouseLeave,
    ProductTitle,
    ProductSku,
    stars,
    reviewCount,
    lowPriceAddvertisement,
    priceTag,
    sale_price,
    tags,
    financingAdd,
    percent,
    singleProductData,
    slug,
    stock,
    handleQuickView,
    learnMore,
    colorVariation,
    handleAddToCart,
    handleCartSectionOpen,
    mainIndex,
    deliveryTime,
    handleVariantColor,
    selectedColorIndices,
    maxWidthAccordingToComp,
    borderLeft,
    justWidth,
    handleCardClick,
    handleWishListclick,
    attributes,
    type,
    variation
}) => {

    const [isImageLoaded,setImageLoaded] = useState(false);

    const [cartClicked, setCartClicked] = useState(true);
    // console.log("product ", singleProductData);

    const dispatch = useDispatch();
    const selectedColorIndex = useSelector((state) => state.colorIndex.colorIndex);
    // const handleColorVariationIndex = (colorIndex) => {
    //     dispatch(setColorIndex(colorIndex))
    // }

    const handleClick = (colorIndex, color) => {
        dispatch(setColorIndex(colorIndex));
        if (handleVariantColor) {
            handleVariantColor();
        }
    };

    const [cardHovered, setCardHovered] = useState(false);
    const handleMouseEnter = () => {
        setCardHovered(true)
        // console.log(cardHovered);
    }

    const handleMouseLeave = () => {
        setCardHovered(false);
    }

    const [quickViewHovered, setQuickViewHovered] = useState(false);
    const handleQuickViewHover = () => {
        setQuickViewHovered(true);
    }
    const handlQuickViewLeave = () => {
        setQuickViewHovered(false)
    }

    const getPriorityAttribute = (attributes) => {
        return attributes && attributes.find(attr => attr.type === "image") ||
            attributes && attributes.find(attr => attr.type === "color") ||
            attributes && attributes.find(attr => attr.type === "select");
    };

    const priorityAttribute = getPriorityAttribute(attributes);

    // const [selectedColorVariableindex, setSelectedColorVariableIndex] = useState(1)
    // const handleVariationImageSelect = (index) => {
    //     setSelectedColorVariableIndex(index)
    // }


    // Select color
    
    const [hoveredImage, setHoveredImage] = useState()
    const [selectedColor, setSelectedColor] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedColorImage, setSelectedColorImage] = useState();

    const handleColorSelect = (color) => {
        // e.stopPropagation()
        // console.log("change variation click")
        setSelectedColor(color)
        // console.log("selected color", color)
        // console.log('single product', singleProductData)
        const matchingAttribute = singleProductData?.variations?.find(variation =>
            variation?.attributes?.some(attribute =>
                attribute?.type === "color" &&
                attribute?.options?.some(option => option?.value === color)
            )
        );

        setSelectedColorImage(matchingAttribute?.images[0]?.image_url)
        setHoveredImage(matchingAttribute?.images[1]?.image_url)
        // console.log("matching attribute", matchingAttribute)
        return matchingAttribute;
    }

    const handleImageSelect = (image) => {
        // console.log("image", image)
        // e.stopPropagation()
        // console.log("change variation click")
        setSelectedImage(image)
        // console.log('single product', singleProductData)
        const matchingAttribute = singleProductData?.variations?.find(variation =>
            variation?.attributes?.some(attribute =>
                attribute?.type === "image" &&
                attribute?.options?.some(option => option?.value === image)
            )
        );

        setSelectedColorImage(matchingAttribute?.images[0]?.image_url)
        setHoveredImage(matchingAttribute?.images[1]?.image_url)
        // console.log("matching attribute", matchingAttribute)
        return matchingAttribute;
    }

    const [priorArray, setPriorArray] = useState([])
    const moveToFirst = (array, defValue) => {
        const index = array.findIndex(item => item === defValue);
        if(index > 0){
            const [priorityItem] = array.splice(index, 1);
            array.unshift(priorityItem)
            // console.log("set with default array", array)
        }
        setPriorArray(array)
        return array;
    }
    // console.log("dsdgsd", priorArray)
    useEffect(() => {

        const defAttImage = singleProductData?.variations?.find(attr => 
            attr?.uid === singleProductData.default_variation
        )
        // console.log("selected attribute", defAttImage)
        const defAttrColor = defAttImage?.attributes?.find(attribute => 
            attribute?.type === 'color' &&
            attribute?.options?.some(option => option?.value)
        )
        const defoultColor = defAttrColor?.options?.[0]?.value;

        handleColorSelect(defoultColor);

        const attribute = defAttImage?.attributes;
        if(attribute){
            const defaultAttribute = getPriorityAttribute(attribute)
            // console.log("pririty attribute", defaultAttribute)
            if(defaultAttribute){
                const updatedAttributes = moveToFirst(attribute, defaultAttribute)
                // console.log("Updated attributes with priority first:", updatedAttributes);
            }
        }

    }, []);


    const [mainImageHoverIndex, setMainImageHoverIndex] = useState(null)

    // const handleMouseOnMainImage = (id) => {
    //     setMainImageHoverIndex(id);
    //     // console.log("on mouse enter",mainImageHoverIndex);
    // }

    // const handleMouseLeaveOnMainImage = () => {
    //     setMainImageHoverIndex(null)
    //     // console.log("on mouse leave",mainImageHoverIndex);
    // }

    // console.log("type check", priorityAttribute)

    const {isInWishList} = useList();

    return (
        <>
            <div 
                className={`${productCardContainerClass} ${borderLeft ? 'hide-after' : ''} `} 
                style={{ maxWidth: maxWidthAccordingToComp, width: justWidth }}
                
                
            >
                <div className='product-card-data' 
                onClick={() => handleCardClick(singleProductData)}
                >


                    <div className='product-main-image-container' /* onMouseEnter={() => handleMouseOnMainImage(singleProductData?.uid)} onMouseLeave={handleMouseLeaveOnMainImage} */>
                        <div className='tag-and-heart'>
                            <h3 className={`stock-label ${stock?.is_stock_manage === 1 ? 'show-stock-tag' : ''}`}>{stock?.is_stock_manage === 1 ? "In Stock" : "Out of Stock"}</h3>
                            <p className='percent-label'>{percent}</p>
                            {
                                isInWishList(singleProductData.uid) ? 
                                    <VscHeartFilled 
                                        size={25}
                                        style={{color: '#C61B1A'}} 
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            handleWishListclick(singleProductData)
                                        }} 
                                    /> 
                            : 
                                <></>
                            }
                            
                        </div>
                        <img src={`${url}${
                            selectedColorImage 
                            ? mainImageHoverIndex === singleProductData.uid
                            ? hoveredImage
                            : selectedColorImage 
                            : mainImage
                        }`}
                            alt='product img' 
                            className='product-main-img'
                            // onMouseEnter={mouseEnter}
                            // onMouseLeave={mouseLeave} 
                            effect='blur'
                            onLoad={()=>{setImageLoaded(true)}}
                        />
                        {
                            !isImageLoaded && <div className="image_shimmer_loader">
                                
                                <ProductCardImageShimmer/>
                            </div>
                        }
                        <div className='overlay-buttons'>
                            <button className={`overlay-button ${cartClicked ? 'loading' : ''}`} onClick={(e) => { e.stopPropagation() ; handleQuickView()}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <img src={cardHovered ? cartIcon : cartBlack} alt='cart' />
                                Add to cart
                            </button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                handleCardClick(singleProductData);
                            }
                            } className='overlay-button' onMouseEnter={handleQuickViewHover} onMouseLeave={handlQuickViewLeave}>
                                <img src={quickViewHovered ? eyeWhite : eyeBlack} alt='cart' />
                                View Product
                            </button>
                        </div>
                    </div>

                    {tags && <div className="product-tagging">
                        {
                            tags[0] && tags[0].type.toLowerCase() === "text" ?
                                <div className='text-tag' style={{ backgroundColor: tags[0].bg_color, color: tags[0].text_color }} >
                                    {tags[0].text}
                                </div> :
                                <div className='image-tag' >
                                    <img src={"https://fm.skyhub.pk" + tags[0]?.image} alt="" srcset="" />
                                </div>
                        }
                    </div>}
                    <p className='product-sku' onClick={handleCardClick}>SKU : {ProductSku}</p>
                    <Link className='product-title' > {ProductTitle} </Link>
                    <div className='product-rating-stars-div'>
                        {/* {stars.map((stars, starIndex) => {
                            return <img src={stars.icon} alt='star' />
                        })} */}
                        <p>{reviewCount}</p>
                    </div>


                    <p className='mobile-view-low-price'>{lowPriceAddvertisement}</p>


                    {
                        sale_price === "0" ?
                            <h3 className='product-price-del'>${priceTag}</h3> :
                            <h3 className='product-price-tag'> <del className='product-del-price-with-sale-price'>${priceTag}</del>  ${sale_price}</h3>
                    }

                    {priorityAttribute && (
                        <div className='product-card-attr' >
                            {priorityAttribute.type === "image" && (
                                <div className="image-variation">
                                    {priorityAttribute.options.map((item, index) => (
                                        <img
                                            key={index}
                                            onClick={(e) => {e.stopPropagation() ; handleImageSelect(item.value)}}
                                            src={"https://fm.skyhub.pk" + item.value}
                                            alt=""
                                        />
                                    ))}
                                </div>
                            )}

                            {priorityAttribute.type === "color" && (
                                <div className="color-variation-div">
                                    {priorityAttribute.options.map((item, index) => (
                                        <span
                                            key={index}
                                            className="color-variation"
                                            onClick={(e) => {e.stopPropagation() ; handleColorSelect(item.value)}}
                                            style={{
                                                backgroundColor: item.value,
                                                // border: 'none',
                                                border: selectedColor === item.value ? `1px solid ${item.value}` : 'none',
                                                // boxShadow: ''
                                                boxShadow: selectedColor === item.value ? `inset 0 0 0 2px #FFFF` : ''
                                            }}
                                        ></span>
                                    ))}
                                </div>
                            )}

                            {priorityAttribute.type === "select" && (
                                <div className="text-variation">
                                    {priorityAttribute.options.map((item, index) => (
                                        <p key={index} className="attr-var">{item.value}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>


        </>
    )
}

export default ProductCard
