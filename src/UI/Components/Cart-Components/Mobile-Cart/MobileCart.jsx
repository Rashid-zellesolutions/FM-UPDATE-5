import React from 'react'
import './MobileCart.css';
import deleteIcon from '../../../../Assets/icons/delete-red.png';
import plusBtn from '../../../../Assets/icons/plus.png';
import minusBtn from '../../../../Assets/icons/minus.png';
import { url } from '../../../../utils/api';

const MobileCart = (
    {
        productName,
        productImg,
        productColor,
        productAccesories,
        productSinglePrice,
        productQuantity,
        handleRomoveProduct,
        handleIncreament,
        handleDecreament,
        cartIndex,
        quantity,
        productData
    }) => {

        console.log("cart produt data", productData)
        const formatePrice = (price) => {
            return Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD'
            }).format(price)
        }
        const productTotalPrice = productData.regular_price * quantity;

        const formatedSinglePrice = Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(productSinglePrice);
        const formatedTotalPrice = Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD'
        }).format(productTotalPrice)

    return (
        <div className='mobile-cart'>
            <button className='mobile-delete-product' onClick={() => handleRomoveProduct(cartIndex)}>
                <img src={deleteIcon} alt='delete icon' />
            </button>
            <h3 className='mobile-priduct-name'>{productData.name}</h3>
            <div className='mobile-cart-product-image-and-containt'>
                <img src={`${url}${productData.image.image_url}`} alt='product-image' className='mobile-cart-product-main-image' />
                <div className='mobile-cart-product-containt'>
                    <p>{productColor}</p>
                    <p>{productAccesories}</p>
                    <p>{formatePrice(productData.regular_price)}</p>
                    <div className='mobile-cart-product-count-and-total-price'>
                        <div className='mobile-cart-product-count'>
                            <button onClick={handleDecreament}>
                                <img src={minusBtn} alt='minus' />
                            </button>
                            <p>{quantity}</p>
                            <button onClick={handleIncreament}>
                                <img src={plusBtn} alt='plus-btn' />
                            </button>
                        </div>
                        <p> {formatePrice(productTotalPrice)}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MobileCart
