import React, { useEffect } from 'react'
import './OutdoorFaves.css';
import outDoorBanner from '../../../Assets/images/outdoor-fav-banner.png';
import { Link, useNavigate } from 'react-router-dom';

const OutdoorFaves = ({categories}) => {
    const navigate = useNavigate()

    console.log("related categories", categories)
    const notMain = categories?.filter((isMain) => isMain?.is_main === 0 );
    console.log("is main or not", notMain)
    const relatedCategoryData = [
        {category: 'brown wicker patio furniture'},
        {category: 'deep seating patio furniture'},
        {category: 'heavy duty patio furniture'},
        {category: 'I shaped outdoor seating'},
        {category: 'outside patio'},
    ]

    const handleNavigate = (item) => {
        const mainCategory = categories.filter((isMain) => isMain?.is_main === 1 )
        if(mainCategory?.length > 0){
            navigate(`/${mainCategory?.[0].slug}/${item.slug}`)
        }else {
            navigate(`/living-rooms/${item.slug}`)
        }
    }
    
  return (
    <div className='out-door-faves-main'>
        
        <div className='related-category-div'>
            <h3>Related Categories</h3>
            <div className='related-category-tags'>
                {notMain?.length > 0 ? (
                    notMain && notMain.map((item, index) => {
                    return <p key={index} className='related-category' onClick={() => handleNavigate(item)}>{item.name}</p>
                })
                ) : (
                    categories && categories.map((item, index) => {
                    return <p key={index} className='related-category' onClick={() => handleNavigate(item)}>{item.name}</p>
                })
                )}
            </div>
        </div>
    </div>
  )
}

export default OutdoorFaves
