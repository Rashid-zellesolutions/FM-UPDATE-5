import React, { useEffect, useState } from 'react'
import './MobileViewProductFilters.css'
import crossBtn from '../../../Assets/icons/close-btn.png'
import mainLogo from '../../../Assets/Logo/m_logo_360 2.png';
import AddBtn from '../../../Assets/icons/add-bold-btn.png'
import axios from 'axios';
import { url } from '../../../utils/api';

const MobileViewProductFilters = ({ showMobileFilters, setMobileFilters, filtersData = [] }) => {
    // console.log("all filters data category", allFilters);
    const handleFiltersClose = () => {
        setMobileFilters(false)
    }

    console.log("main mobile page filters", filtersData);

    const [filterOpen, setFilterOpen] = useState('');
    const handleFilterType = (type) => {
        // setFilterOpen((prev) => (prev === index ? null : index));
        setFilterOpen((prevOpen) => prevOpen === type ? '' : type)
    }
    const [showAllFilters, setShowAllFilters] = useState(false)
    const handleShowAllFilters = () => {
        setShowAllFilters(!showAllFilters)
    }
    return (
        <div className={`mobile-view-flters-popup ${showMobileFilters ? 'show-mobile-filter-popup' : ''}`}>
            <button className='close-mobile-filters' onClick={handleFiltersClose}>
                <img src={crossBtn} alt='close btn' />
            </button>
            <div className='mobile-view-filters-head'>
                <a href='/'>
                    <img src={mainLogo} alt='logo' />
                </a>
            </div>
            {/* <div className='mobile-view-filters-body'>
                <div>
                    <h3>Filters</h3>
                    <p>Clear Filters</p>
                </div>
            </div> */}
            <div className='mobile-view-filters-body'>
                <div className='mobile-view-filters-body-head'>
                    <h3>Filters</h3>
                    <a>Clear Filters</a>
                </div>
                <div className='mobile-view-filters-div'>

                    <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-color')}
                        >
                            <p>{filtersData?.colors?.[0]?.name}</p>
                            <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
                                     ${filterOpen === 'open-color' ? 'mobile-filter-section-button-rotate' : ''}`
                            } />
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${filterOpen === 'open-color' ? 'show-filter-type' : ''}`
                        }>
                            {filtersData?.colors?.[0]?.options.map((filter, ind) => (
                                <label className='single-filter-label' key={ind}>
                                    <input
                                        className='custom-checkbox'
                                        type='checkbox'
                                        name={filter.name}
                                        style={{ backgroundColor: filter.value }}
                                    />
                                    {filter.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-rating')}
                        >
                            <p>{filtersData?.colors?.[0]?.name}</p>
                            <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
                                     ${filterOpen === 'open-rating' ? 'mobile-filter-section-button-rotate' : ''}`
                            } />
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${filterOpen === 'open-rating' ? 'show-filter-type' : ''}`
                        }>
                            {filtersData?.colors?.[0]?.options.map((filter, ind) => (
                                <label className='single-filter-label' key={ind}>
                                    <input
                                        className='custom-checkbox'
                                        type='checkbox'
                                        name={filter.name}
                                        style={{ backgroundColor: filter.value }}
                                    />
                                    {filter.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className='mobile-view-single-filter-dropdown'>
                        <div className='mobile-view-single-type'
                            onClick={() => handleFilterType('open-category')}
                        >
                            <p>{filtersData?.colors?.[0]?.name}</p>
                            <img src={AddBtn} alt='add btn' className={`show-filter-add-button 
                                     ${filterOpen === 'open-category' ? 'mobile-filter-section-button-rotate' : ''}`
                            } />
                        </div>
                        <div className={`mobile-single-type-filters 
                                ${filterOpen === 'open-category' ? 'show-filter-type' : ''}`
                        }>
                            {filtersData?.colors?.[0]?.options.map((filter, ind) => (
                                <label className='single-filter-label' key={ind}>
                                    <input
                                        className='custom-checkbox'
                                        type='checkbox'
                                        name={filter.name}
                                        style={{ backgroundColor: filter.value }}
                                    />
                                    {filter.name}
                                </label>
                            ))}
                        </div>
                    </div>

                </div>
                <div className='mobile-view-filters-togle-button'>
                    <button className='mobile-view-more-filters-button' onClick={handleShowAllFilters}>
                        {showAllFilters ? 'View Less Filters' : 'View All Filters'}
                    </button>
                </div>
                <div className='mobile-view-filters-togle-button'>
                    <button className='mobile-view-result-button'>
                        View Result
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MobileViewProductFilters
