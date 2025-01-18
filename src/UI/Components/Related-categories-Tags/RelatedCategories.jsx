import React from 'react'
import './RelatedCategories.css'
import { Link } from 'react-router-dom'

const RelatedCategories = () => {
    const relatedCategoriesData = [
        {categoryName: 'Leather Living Room Sets', link: '#'},
        {categoryName: 'Reclining Living Room Sets', link: '#'},
        {categoryName: 'Small Space Living Room Sets', link: '#'},
        {categoryName: 'Sleeper Sofa Living Room Sets', link: '#'},
        {categoryName: 'Sofa & Loveseat Sets', link: '#'},
        {categoryName: 'Sofa & Chair Sets', link: '#'},
        {categoryName: 'Sofa & Chair Sets', link: '#'},
        {categoryName: 'Sofa & Chair Sets', link: '#'},
        {categoryName: 'Sofa & Chair Sets', link: '#'},
    ]
  return (
    <div className='related-categories-main-div'>
            <h3>Related Categories</h3>
            <div className='related-categories-items'>
                {relatedCategoriesData.map((item, index) => {
                    return <Link key={index} to={item.link}>{item.categoryName}</Link>
                })}
            </div>
        </div>
  )
}

export default RelatedCategories
