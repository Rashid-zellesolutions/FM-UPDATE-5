import React from 'react'
import './TrandingNowShimmer.css';

const TrandingNowShmmer = () => {
  return (
    <div className='trending-now-shimmer-main'>
      <div className='trending-now-mmain-heading-shimmer'></div>
      <div className='trending-now-images-shimmer-container'>
        <div className='trending-now-main-image-shimmer'></div>
        <div className='trending-now-shimmer-side-images-container'>
            {Array.from({ length: 6 }).map((_, index) => (
                <div className='trending-now-side-image-shimmer'></div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TrandingNowShmmer
