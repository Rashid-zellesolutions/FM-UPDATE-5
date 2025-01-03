import React from 'react'
import './ProductSliderShimmer.css';

const ProductSliderShimmer = () => {
  return (
    <div className='feature-products-main-container'>
      <div className='feature-product-main-heading'></div>
      <div className='feature-product-cards'>
        {Array.from({length: 3}).map((_, index) => (
            <div className='feature-product-card'>
                <div className='feature-card-product-image-shimmer'></div>
                <div className='feature-product-title-shimmer'></div>
                <div className='feature-product-button-shimmer'></div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSliderShimmer
