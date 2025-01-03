import React from 'react'
import './BestSellerShimmer.css';
import BestSellerProductCardShimmer from '../../BestSellerProductCard/BestSellerProductCardShimmer';

const BestSellerShimmer = () => {
  return (
    <div className='best-seller-shimmer-main-container'>
      <div className='best-seller-cover-image-shimmer'></div>
      <div className='best-seller-products-main-container'>
        <div className='best-seller-product-head'>
            <div className='best-seller-main-heading'></div>
            <div className='best-seller-categories-container'>
                {Array.from({length: 3}).map((_, index) => (
                    <div className='best-seller-category-title-shimmer'></div>
                ))}
            </div>
        </div>
        <div className='best-seller-product-cards-shimmer-container'>
            {Array.from({length: 6}).map((_, index) => (
                <BestSellerProductCardShimmer key={index} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default BestSellerShimmer
