// import React, { useEffect, useState } from 'react'
// import './Products.css';
// import { Link, useLocation, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// // Assets
// import AddBtn from '../../../Assets/icons/add-bold-btn.png'
// import filterHumberger from '../../../Assets/icons/humberger-icon.png'
// import arrowUpDown from '../../../Assets/icons/arrow-up-donw.png'
// import arrowBlack from '../../../Assets/icons/hide-arrow-black.png'
// import closeBtn from '../../../Assets/icons/close-btn.png'
// import paginationArrow from '../../../Assets/icons/arrow-right-large.png'
// import star from "../../../Assets/icons/Star 19.png"
// import heart from '../../../Assets/icons/heart-vector.png'
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { IoMdClose } from "react-icons/io";

// // Components

// import ProductCard from '../ProductCard/ProductCard';
// import ProductCardShimmer from '../Loaders/productCardShimmer/productCardShimmer';
// import QuickView from '../QuickView/QuickView';
// import CartSidePannel from '../Cart-side-section/CartSidePannel';
// import MobileViewProductFilters from '../MobileViewProductFilters/MobileViewProductFilters';
// import Breadcrumb from '../../../Global-Components/BreadCrumb/BreadCrumb';

// // Functions and Context
// import { url } from '../../../utils/api';
// import axios from 'axios';
// import { useProducts } from '../../../context/productsContext/productContext';
// import { useCart } from '../../../context/cartContext/cartContext';
// import { useList } from '../../../context/wishListContext/wishListContext';
// import { toast } from 'react-toastify';

// const Products = ({ productArchiveHading }) => {

//     const {
//         cart,
//         cartProducts,
//         addToCart,
//         cartSectionOpen,
//         setCartSectionOpen,
//         increamentQuantity,
//         decreamentQuantity,
//         removeFromCart,
//         calculateTotalPrice
//     } = useCart();
//     const { subCategorySlug } = useParams();
//     const location = useLocation();
//     const params = new URLSearchParams(location.search);
//     const query = params.get('query');
//     // console.log("query", query);
//     const [viewAccording, setViewAccording] = useState('false')

//     useEffect(() => {
//         if (query !== null) {
//             setViewAccording('true')
//         } else {
//             setViewAccording('false')
//         }
//     }, [])
//     // const [searchedProducts, setSearchedProducts] = useState([]);


//     // useEffect(() => {
//     //     console.log("searched products with query", query)
//     // }, [])

//     // state variables
//     const [hoveredIndex, setHoveredIndex] = useState(null);
//     const [hideFilters, setHideFilters] = useState(false);
//     const [relevanceTrue, setRelevanceTrue] = useState(false)
//     const navigate = useNavigate()
//     const [showAvailaabilityBox, setShowAvailabilityBox] = useState(false)
//     const [showAllFilters, setShowAllFilters] = useState(false);
//     const [addToCartClicked, setAddToCartClicked] = useState(false)
//     const [quickViewClicked, setQuickView] = useState(false);
//     const [products, setProducts] = useState([]);
//     const [isFetching, setIsFetching] = useState(false);

//     const fetchProductData = async () => {
//         const queryApi = `/api/v1/products/by-name?name`;
//         setProducts([])
//         try {

//             if (query) {
//                 const response = await axios.get(`${url}${queryApi}=${query}`);
//                 // Parse the JSON response
//                 const data = response.data.products;
//                 setProducts(data);
//             } else {
//                 const response = await axios.get(`${url}/api/v1/products/by-category?categorySlug=${subCategorySlug}`);
//                 // Parse the JSON response
//                 const data = response.data.products;
//                 setProducts(data);
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchProductData()
//     }, [])

//     useEffect(() => {
//         fetchProductData()
//     }, [query])

//     useEffect(() => {
//         fetchProductData()
//     }, [subCategorySlug])

//     // const handleCartSectionOpen = (item) => {
//     //     setAddToCartClicked(true)
//     // }

//     const handleCartSectionClose = () => {
//         setAddToCartClicked(false)
//     }

//     const [quickViewProduct, setQuickViewProduct] = useState({})
//     const handleQuickViewOpen = (item) => {
//         setQuickView(true);
//         setQuickViewProduct(item)

//     }
//     const handleQuickViewClose = () => { setQuickView(false) }

//     const handleProductClick = (item) => {
//         navigate(`/product/${item.slug}`, { state: item });
//     };

//     // filters data
//     const filtersData = [
//         {
//             name: 'Product Type', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },
//         {
//             name: 'Color', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Blue' },
//                 { type: 'checkbox', name: 'Green' },
//                 { type: 'checkbox', name: 'Orange' },
//                 { type: 'checkbox', name: 'Red' },
//             ]
//         },
//         {
//             name: 'Material', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },
//         {
//             name: 'Collection', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },
//         {
//             name: 'Style', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },
//         {
//             name: 'Features', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },
//         {
//             name: 'Price', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },
//         {
//             name: 'Collection', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },
//         {
//             name: 'Shipping Type', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },
//         {
//             name: 'Review Rating', icon: AddBtn, filters: [
//                 { type: 'checkbox', name: 'Dining Room Sets' },
//                 { type: 'checkbox', name: 'Bar Sets' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//                 { type: 'checkbox', name: 'Kitchen Islands' },
//             ]
//         },

//     ]

//     // Related Categories Data
//     const relatedCategoriesData = [
//         { categoryName: 'Leather Living Room sets', link: '#' },
//         { categoryName: 'Reclining Living Room Sets', link: '#' },
//         { categoryName: 'Small space Living Room sets', link: '#' },
//         { categoryName: 'Sleeper Sofa Living Room sets', link: '#' },
//         { categoryName: 'Sofa & Loveseat sets', link: '#' },
//         { categoryName: 'Sofa & chair sets', link: '#' },
//     ]

//     // open filters when page load
//     const initialOpenFilters = filtersData.map((_, index) => index);
//     const [openFilterIndices, setOpenFilterIndices] = useState(initialOpenFilters);

//     // Change image on hover function
//     // const handleImageHover = (index) => {
//     //     setHoveredIndex(index);
//     // };

//     // const handleImageHoverLeave = () => {
//     //     setHoveredIndex(null);
//     // };

//     // // show availiblity of product dropdown function
//     // const handleMouseEnter = () => {
//     //     setShowAvailabilityBox(true)
//     // }

//     // const handleMouseLeave = () => {
//     //     setShowAvailabilityBox(false)
//     // }

//     // filter Relevance function
//     const handleFilterSection = () => {
//         setHideFilters(!hideFilters)
//     }

//     const handleRelevance = () => {
//         setRelevanceTrue(!relevanceTrue);
//     }

//     // show filter type data
//     const handleFilterClick = (index) => {
//         setOpenFilterIndices(prev => {
//             if (prev.includes(index)) {
//                 return prev.filter(i => i !== index); // Close the filter
//             } else {
//                 return [...prev, index]; // Open the filter
//             }
//         });
//     };

//     // show max 5 filters default and on click all
//     const toggleFiltersVisibility = () => {
//         setShowAllFilters(prevState => !prevState);
//     };

//     // Card title words limit
//     const maxLength = 50;
//     const truncateTitle = (title, maxLength) => {
//         if (!title) return '';
//         return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
//     };

//     // Select Color Variations Functions
//     const [selectedColorIndices, setSelectedColorIndices] = useState(Array(products.length).fill(0));
//     const handleVariantImageClick = (cardIndex, colorIndex) => {
//         const updatedIndices = [...selectedColorIndices];
//         updatedIndices[cardIndex] = colorIndex;
//         setSelectedColorIndices(updatedIndices);
//     };
//     const colorIndex = useSelector((state) => state.colorIndex.colorIndex)

//     // Mobile view Script
//     const [mobileFilters, setMobileFilters] = useState(false);
//     const [selectedGrid, setSelectedGrid] = useState('')
//     const [activeGrid, setActiveGrid] = useState('')
//     const handleActiveGrid = (grid) => {
//         setActiveGrid(grid);
//         setSelectedGrid(grid)
//     }
//     const handleMobileFilters = () => {
//         setMobileFilters(true)
//     }

//     // wish list 
//     const { addToList, removeFromList, isInWishList } = useList()
//     const notify = (str) => toast.success(str);
//     const notifyRemove = (str) => toast.error(str)

//     const handleWishList = (item) => {
//         if (isInWishList(item.uid)) {
//             removeFromList(item.uid);
//             notifyRemove('Removed from wish list', {
//                 autoClose: 10000,
//                 className: "toast-message",
//             })
//         } else {
//             addToList(item)
//             notify("added to wish list", {
//                 autoClose: 10000,
//             })
//         }
//     }

//     return (
//         <div className='products-main-container'>
//             <Breadcrumb />

//             <div className='products-and-filter-container'>
//                 {/* Filters side bar section code */}
//                 <div className={`filters-section ${hideFilters ? 'hide-filter' : ''}`}>
//                     {/* <div className={`hide-filters-btn ${viewAccording ? 'hide-filter-btn-query-search' : ''}`}> */}
//                     <div className={`hide-filters-btn`}>
//                         <button onClick={handleFilterSection}>
//                             <img src={arrowBlack} alt='arrow black' />
//                             Hide Filters
//                         </button>
//                     </div>
//                     <div className='filters-inner-container'>
//                         <div className='filters-heading-section'>
//                             <h3>Filters</h3>
//                             <p>Clear Filters</p>
//                         </div>
//                         <div className='all-filters-section'>
//                             {filtersData.slice(0, showAllFilters ? filtersData.length : 5).map((item, index) => {
//                                 const isOpen = openFilterIndices.includes(index);
//                                 return <div key={index} className='single-filter'>
//                                     <span onClick={() => handleFilterClick(index)}>
//                                         <p>{item.name}</p>
//                                         <img src={item.icon} alt='btn' className={isOpen ? 'rotate' : ''} />
//                                     </span>
//                                     <div className={`${item.name === 'Color' ? 'color-filter' : 'filters'} ${isOpen ? 'show-filter' : ''}`} >
//                                         {item.name === 'Color' ? (
//                                             item.filters.map((innerItem, innerIndex) => (
//                                                 <span key={innerIndex} className={`color-span`} >
//                                                     <input type={innerItem.type} placeholder='checkbox' className='custom-checkbox'
//                                                         id={`filter-${innerIndex}`} />
//                                                     <label htmlFor={`filter-${innerIndex}`}>{innerItem.name}</label>
//                                                 </span>
//                                             ))
//                                         ) : (
//                                             item.filters.map((innerItem, innerIndex) => (
//                                                 <span key={innerIndex}>
//                                                     <input type={innerItem.type} placeholder='checkbox' className='custom-checkbox'
//                                                         id={`filter-${innerIndex}`} />
//                                                     <label htmlFor={`filter-${innerIndex}`}>{innerItem.name}</label>
//                                                 </span>
//                                             ))
//                                         )}
//                                     </div>
//                                 </div>
//                             })}
//                         </div>
//                         <div className='less-or-all-filters-btn'>
//                             <button onClick={toggleFiltersVisibility}>
//                                 {showAllFilters ? 'Show Less Filters' : 'View All Filters'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Products section code */}
//                 <div className={`products-section ${hideFilters ? 'full-width' : ''}`}>
//                     {/* product heading */}
//                     <div className={`products-heading ${query ? 'query-hide-search-heading' : ''}`}>
//                         <div className='show-filter-btn-and-product-count'>
//                             <button className={`show-filter-btn ${hideFilters ? 'hide-show-filter-btn' : ''}`} onClick={handleFilterSection}>
//                                 <img src={arrowBlack} alt='arrow black' className={`show-filter-btn-arrow ${hideFilters ? 'rotate-show-filter-arrow-icon' : ''}`} />
//                                 Show Filters
//                             </button>
//                             <p>220 Items starting at $266.99</p>
//                         </div>
//                         <div className='relevance-container'>
//                             <div className='relevance-heading'>
//                                 <h3>Sort by:</h3>
//                                 <span onClick={handleRelevance}>
//                                     <p>Relevance</p>
//                                     <MdKeyboardArrowDown size={20} className={`relevance-arrow ${relevanceTrue ? 'rotate-relevance-arrow' : ''}`} />
//                                 </span>
//                                 <div className={`relevance-dropdown ${relevanceTrue ? 'show-relevance' : ''}`}>
//                                     <p>Item One</p>
//                                     <p>Item Two</p>
//                                     <p>Item Three</p>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                     <div className={`product-main ${hideFilters ? 'increase-columns' : ''}`}>

//                         {products && products.length > 0 ? (
//                             products.map((item, index) => {
//                                 return <ProductCard
//                                     key={index}
//                                     slug={item.slug}
//                                     singleProductData={item}
//                                     maxWidthAccordingToComp={"100%"}
//                                     justWidth={'100%'}
//                                     tagIcon={item.productTag ? item.productTag : heart}
//                                     tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
//                                     mainImage={`${item.image.image_url}`}
//                                     productCardContainerClass="product-card"
//                                     ProductSku={item.sku}
//                                     tags={item.tags}
//                                     ProductTitle={truncateTitle(item.name, maxLength)}
//                                     stars={[
//                                         { icon: star, title: 'filled' },
//                                         { icon: star, title: 'filled' },
//                                         { icon: star, title: 'filled' },
//                                         { icon: star, title: 'filled' },
//                                         { icon: star, title: 'filled' },
//                                     ]}
//                                     reviewCount={item.reviewCount}
//                                     lowPriceAddvertisement={item.lowPriceAddvertisement}
//                                     priceTag={item.regular_price}
//                                     sale_price={item.sale_price}
//                                     financingAdd={item.financingAdd}
//                                     learnMore={item.learnMore}
//                                     mainIndex={index}
//                                     deliveryTime={item.deliveryTime}
//                                     stock={item.manage_stock}
//                                     attributes={item.attributes}
//                                     handleCardClick={() => handleProductClick(item)}
//                                     handleQuickView={() => handleQuickViewOpen(item)}
//                                     handleWishListclick={() => handleWishList(item)}
//                                 />
//                             })
//                         ) : (
//                             Array.from({ length: 12 }).map((_, index) => (
//                                 <ProductCardShimmer />
//                             ))
//                         )}

//                     </div>
//                     {/* Product Card Code End */}
//                     <div className='view-more-products-button-div'>
//                         <button className='view-more-btn'>View 15 more</button>
//                     </div>
//                 </div>
//             </div>
//             {/* Mobile view product section */}
//             <div className='mobile-view-product-and-filter-section'>
//                 <div className='mobile-view-filters-section'>
//                     <div className='mobile-view-filter-head'>
//                         <div className='mobile-view-product-count'>
//                             <p>214 items</p>
//                             <p>Starting at $ 299</p>
//                         </div>
//                         <div className='mobile-view-product-card-grid-select'>
//                             <div className={`mobile-view-card-grid-single-col ${activeGrid === 'single-col' ? 'grid-active' : ''}`} onClick={() => handleActiveGrid('single-col')}></div>
//                             <div className='mobile-view-card-grid-dual-col' onClick={() => handleActiveGrid('dual-col')}>
//                                 <div className={`mobile-view-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
//                                 <div className={`mobile-view-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='mobile-view-filter-body'>
//                         <button className='mobile-view-show-filters' onClick={handleMobileFilters}>
//                             <img src={filterHumberger} alt='filter' />
//                             Show Filter
//                         </button>
//                         <button className={`mobile-view-sort-btn`}>
//                             <img src={arrowUpDown} alt='arrow up down' />
//                             Sort
//                         </button>
//                     </div>
//                 </div>
//                 <div className={`${selectedGrid === 'single-col' ? 'mobile-view-product-single-column' : 'mobile-view-products-main-container'} `}>

//                     {products.map((item, index) => {
//                         return <ProductCard
//                             key={index}
//                             slug={item.slug}
//                             singleProductData={item}
//                             maxWidthAccordingToComp="100%"
//                             // justWidth={'310px'}
//                             percent={'-12%'}
//                             tagIcon={item.productTag ? item.productTag : item.heart}
//                             tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
//                             mainImage={`${item.image.image_url}`}
//                             productCardContainerClass="product-card"
//                             ProductSku={item.sku}
//                             tags={item.tags}
//                             ProductTitle={truncateTitle(item.name, maxLength)}
//                             stars={[
//                                 { icon: star, title: 'filled' },
//                                 { icon: star, title: 'filled' },
//                                 { icon: star, title: 'filled' },
//                                 { icon: star, title: 'filled' },
//                                 { icon: star, title: 'filled' },
//                             ]}
//                             reviewCount={item.reviewCount}
//                             lowPriceAddvertisement={item.lowPriceAddvertisement}
//                             priceTag={item.regular_price}
//                             sale_price={item.sale_price}
//                             financingAdd={item.financingAdd}
//                             learnMore={item.learnMore}
//                             mainIndex={index}
//                             deliveryTime={item.deliveryTime}
//                             stock={item.manage_stock}
//                             attributes={item.attributes}
//                             handleCardClick={() => handleProductClick(item)}
//                             handleWishListclick={() => handleWishList(item)}
//                         />
//                     })}
//                 </div>
//                 <div className='mobile-view-pagination'>
//                     <p>1</p>
//                     <p>2</p>
//                     <img src={paginationArrow} alt='arrow' />
//                 </div>
//             </div>
//             {/* Related Categories Code */}
//             <div className='related-categories-div'>
//                 <h3>Related Categories</h3>
//                 <div className='related-categories-items'>
//                     {relatedCategoriesData.map((item, index) => {
//                         return <Link key={index} to={item.link}>{item.categoryName}</Link>
//                     })}
//                 </div>
//             </div>

//             {/* Cart Side Section */}
//             <CartSidePannel
//                 cartData={cartProducts}
//                 addToCartClicked={addToCartClicked}
//                 handleCartSectionClose={handleCartSectionClose}
//                 removeFromCart={removeFromCart}
//                 decreamentQuantity={decreamentQuantity}
//                 increamentQuantity={increamentQuantity}
//             />

//             {/* Quick View Section */}
//             <div className={`quick-view-section ${quickViewClicked ? 'show-quick-view-section' : ''}`} onClick={handleQuickViewClose}>
//                 <button className={`quick-view-close`} onClick={handleQuickViewClose}>
//                     {/* <img src={closeBtn} alt='close' /> */}
//                     <IoMdClose size={25} style={{ color: '#595959' }} />
//                 </button>
//                 <div className={`quickview-containt ${quickViewClicked ? 'show-quick-view-containt' : ''}`} onClick={(e) => e.stopPropagation()}>
//                     <QuickView setQuickViewProduct={quickViewProduct} />
//                 </div>
//             </div>

//             {/*Mobile view filters  */}
//             <MobileViewProductFilters
//                 showMobileFilters={mobileFilters}
//                 setMobileFilters={setMobileFilters}
//                 filtersData={filtersData}
//             />
//         </div>
//     )
// }

// export default Products


import React, { useEffect, useState } from 'react'
import './Products.css';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Assets
import AddBtn from '../../../Assets/icons/add-bold-btn.png'
import filterHumberger from '../../../Assets/icons/humberger-icon.png'
import arrowUpDown from '../../../Assets/icons/arrow-up-donw.png'
import arrowBlack from '../../../Assets/icons/hide-arrow-black.png'
import closeBtn from '../../../Assets/icons/close-btn.png'
import paginationArrow from '../../../Assets/icons/arrow-right-large.png'
import star from "../../../Assets/icons/Star 19.png"
import heart from '../../../Assets/icons/heart-vector.png'
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// Components

import ProductCard from '../ProductCard/ProductCard';
import ProductCardShimmer from '../Loaders/productCardShimmer/productCardShimmer';
import QuickView from '../QuickView/QuickView';
import CartSidePannel from '../Cart-side-section/CartSidePannel';
import MobileViewProductFilters from '../MobileViewProductFilters/MobileViewProductFilters';
import Breadcrumb from '../../../Global-Components/BreadCrumb/BreadCrumb';

// Functions and Context
import { url } from '../../../utils/api';
import axios from 'axios';
import { useProducts } from '../../../context/productsContext/productContext';
import { useCart } from '../../../context/cartContext/cartContext';
import { useList } from '../../../context/wishListContext/wishListContext';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { CRangeSlider } from '@coreui/react-pro';
import { MultiRange } from '../../../Global-Components/MultiRangeBar/MultiRange';

const Products = ({ productArchiveHading }) => {

    const {
        cart,
        cartProducts,
        addToCart,
        cartSectionOpen,
        setCartSectionOpen,
        increamentQuantity,
        decreamentQuantity,
        removeFromCart,
        calculateTotalPrice
    } = useCart();
    const { subCategorySlug } = useParams();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    // console.log("query", query);
    const [viewAccording, setViewAccording] = useState('false')
    useEffect(() => {
        if (query !== null) {
            setViewAccording('true')
        } else {
            setViewAccording('false')
        }
    }, [])
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Set the default query parameter if it doesn't exist
        if (!searchParams.get("page")) {
            setSearchParams({ page: "1" });
        }
    }, [searchParams, setSearchParams]);
    // const [searchedProducts, setSearchedProducts] = useState([]);


    useEffect(() => {
        // console.log("searched products with query", query)
    }, [])

    // state variables
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hideFilters, setHideFilters] = useState(false);
    const [relevanceTrue, setRelevanceTrue] = useState(false)
    const navigate = useNavigate()
    const [showAvailaabilityBox, setShowAvailabilityBox] = useState(false)
    const [showAllFilters, setShowAllFilters] = useState(false);
    const [addToCartClicked, setAddToCartClicked] = useState(false)
    const [quickViewClicked, setQuickView] = useState(false);
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);

    // const fetchProductData = async () => {
    //     const queryApi = `/api/v1/products/by-name?name`;
    //     try {
    //         if(query){
    //             const response = await axios.get(`${url}${queryApi}=${query}`);
    //             // Parse the JSON response
    //             const data = response.data.products;
    //             setProducts(data);
    //             console.log("product archive data with query", response)
    //         }else {
    //             const response = await axios.get(`${url}/api/v1/products/by-category?categorySlug=${subCategorySlug}&per_page=3&page=1`);
    //             // Parse the JSON response
    //             const data = response.data.products;
    //             setProducts(data);
    //             console.log("product archive data", response)
    //         }
    //         const response = await axios.get(`${url}/api/v1/products/by-category?categorySlug=${subCategorySlug}`);
    //         // Parse the JSON response
    //         const data = response.data.products;
    //         setProducts(data);
    //         console.log("product archive data", response)
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };


    const [selectedColors, setSelectedColors] = useState([]);

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedColors((prevSelectedColors) => {
            if (prevSelectedColors.includes(value)) {
                // If color is already selected, remove it
                return prevSelectedColors.filter((color) => color !== value);
            } else {
                // Otherwise, add it to the list of selected colors
                return [...prevSelectedColors, value];
            }
        });
    };



    const [totalPages, setTotalPages] = useState()
    const [activePage, setActivePage] = useState(1);
    const [paginatonLoading, setPaginationLoading] = useState(false);


    const fetchProductData = async () => {
        const page = searchParams.get("page") || "1"; // Get the current page from searchParams or default to 1
        const queryApi = `/api/v1/products/by-name?name`;

        try {
            let response;
            if (query) {
                response = await axios.get(`${url}${queryApi}=${query}`);
            } else {
                setPaginationLoading(true)
                response = await axios.get(
                    `${url}/api/v1/products/by-category?categorySlug=${subCategorySlug}&per_page=3&page=${activePage}`
                );
            }
            const data = response.data.products;
            setTotalPages(response.data.pagination)
            // console.log("Total pages APILoadingStatus", response.data.pagination)
            const colors = response.data?.colors[0].options;
            setProducts(data);
            setColors(colors)
            setSearchParams({ page: activePage })
        } catch (error) {
            setPaginationLoading(false)
            console.error("Error fetching data:", error);
        }
        setPaginationLoading(false)
    };
    const [allFilters, setAllFilters] = useState()
    const fetchFilters = async () => {
        // const api = `/api/v1/products/by-category/filters?category=${subCategorySlug}`;
        const api = `/api/v1/products/by-category/filters?categorySlug=${subCategorySlug}`
        try {
            const response = await axios.get(`${url}${api}`);
            if (response.status === 200) {
                console.log("Filters Fetched Successfully", response.data)
                setAllFilters(response.data)
            } else {
                console.log(`UnExpected ${response.status} Error`)
            }
        } catch (error) {
            console.error("Server Error");
        }
    }

    useEffect(() => {
        fetchFilters();
    }, [])





    useEffect(() => {
        fetchProductData();
    }, [query, searchParams]);

    useEffect(() => {
        fetchProductData()
    }, [query])

    useEffect(() => {
        fetchProductData();
    }, [activePage])

    const handleCartSectionOpen = (item) => {
        setAddToCartClicked(true)
    }

    const handleCartSectionClose = () => {
        setAddToCartClicked(false)
    }

    const [quickViewProduct, setQuickViewProduct] = useState({})
    const handleQuickViewOpen = (item) => {
        setQuickView(true);
        setQuickViewProduct(item)

    }
    const handleQuickViewClose = () => { setQuickView(false) }

    const handleProductClick = (item) => {
        navigate(`/product/${item.slug}`, { state: item });
    };



    const filtersData = [
        {
            name: 'Product Type', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },
        {
            name: 'Color', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Blue' },
                { type: 'checkbox', name: 'Green' },
                { type: 'checkbox', name: 'Orange' },
                { type: 'checkbox', name: 'Red' },
            ]
        },
        {
            name: 'Material', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },
        {
            name: 'Collection', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },
        {
            name: 'Style', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },
        {
            name: 'Features', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },
        {
            name: 'Price', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },
        {
            name: 'Collection', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },
        {
            name: 'Shipping Type', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },
        {
            name: 'Review Rating', icon: AddBtn, filters: [
                { type: 'checkbox', name: 'Dining Room Sets' },
                { type: 'checkbox', name: 'Bar Sets' },
                { type: 'checkbox', name: 'Kitchen Islands' },
                { type: 'checkbox', name: 'Kitchen Islands' },
            ]
        },

    ]

    // Related Categories Data
    const relatedCategoriesData = [
        { categoryName: 'Leather Living Room sets', link: '#' },
        { categoryName: 'Reclining Living Room Sets', link: '#' },
        { categoryName: 'Small space Living Room sets', link: '#' },
        { categoryName: 'Sleeper Sofa Living Room sets', link: '#' },
        { categoryName: 'Sofa & Loveseat sets', link: '#' },
        { categoryName: 'Sofa & chair sets', link: '#' },
    ]

    // open filters when page load
    const initialOpenFilters = filtersData.map((_, index) => index);
    const [openFilterIndices, setOpenFilterIndices] = useState(initialOpenFilters);

    // Change image on hover function
    const handleImageHover = (index) => {
        setHoveredIndex(index);
    };

    const handleImageHoverLeave = () => {
        setHoveredIndex(null);
    };

    // show availiblity of product dropdown function
    const handleMouseEnter = () => {
        setShowAvailabilityBox(true)
    }

    const handleMouseLeave = () => {
        setShowAvailabilityBox(false)
    }

    // filter Relevance function
    const handleFilterSection = () => {
        setHideFilters(!hideFilters)
    }

    const handleRelevance = () => {
        setRelevanceTrue(!relevanceTrue);
    }

    // show filter type data
    const handleFilterClick = (index) => {
        setOpenFilterIndices(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index); // Close the filter
            } else {
                return [...prev, index]; // Open the filter
            }
        });
    };

    // show max 5 filters default and on click all
    const toggleFiltersVisibility = () => {
        setShowAllFilters(prevState => !prevState);
    };

    // Card title words limit
    const maxLength = 50;
    const truncateTitle = (title, maxLength) => {
        if (!title) return '';
        return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
    };

    // Select Color Variations Functions
    const [selectedColorIndices, setSelectedColorIndices] = useState(Array(products.length).fill(0));
    const handleVariantImageClick = (cardIndex, colorIndex) => {
        const updatedIndices = [...selectedColorIndices];
        updatedIndices[cardIndex] = colorIndex;
        setSelectedColorIndices(updatedIndices);
    };
    const colorIndex = useSelector((state) => state.colorIndex.colorIndex)

    // Mobile view Script
    const [mobileFilters, setMobileFilters] = useState(false);
    const [selectedGrid, setSelectedGrid] = useState('')
    const [activeGrid, setActiveGrid] = useState('')
    const handleActiveGrid = (grid) => {
        setActiveGrid(grid);
        setSelectedGrid(grid)
    }
    const handleMobileFilters = () => {
        setMobileFilters(true)
    }

    // wish list 
    const { addToList, removeFromList, isInWishList } = useList()
    const notify = (str) => toast.success(str);
    const notifyRemove = (str) => toast.error(str)
    const handleWishList = (item) => {
        if (isInWishList(item.uid)) {
            removeFromList(item.uid);
            notifyRemove('Removed from wish list', {
                autoClose: 10000,
                className: "toast-message",
            })
        } else {
            addToList(item)
            notify("added to wish list", {
                autoClose: 10000,
            })
        }
    }

    // Product Show Pagination

    const handlePAgeClick = (index) => {
        setProducts([])
        setActivePage(index)
    }

    const handleNextPage = () => {
        setProducts([])
        setActivePage(activePage + 1)
    }
    const handlePrevPage = () => {
        setProducts([])
        setActivePage(activePage - 1);
    }

    const [isOpen, setIsOpen] = useState(false);
    const handleColorFilterOpenClose = (type) => {
        setIsOpen((prevOpen) => prevOpen === type ? '' : type)
    }

    return (
        <div className='products-main-container'>
            <Breadcrumb />

            <div className='products-and-filter-container'>
                {/* Filters side bar section code */}
                <div className={`filters-section ${hideFilters ? 'hide-filter' : ''}`}>
                    {/* <div className={`hide-filters-btn ${viewAccording ? 'hide-filter-btn-query-search' : ''}`}> */}
                    <div className={`hide-filters-btn`}>
                        <button onClick={handleFilterSection}>
                            <img src={arrowBlack} alt='arrow black' />
                            Hide Filters
                        </button>
                    </div>
                    <div className='filters-inner-container'>
                        <div className='filters-heading-section'>
                            <h3>Filters</h3>
                            <p>Clear Filters</p>
                        </div>
                        <div className='all-filters-section'>

                            {/* <div>
                                <h3>Select Colors</h3>
                                {colors && colors?.map((color, i) => (
                                    <div key={color.value}>
                                        <span key={i} className={`color-span`} >
                                            <input type={"checkbox"} placeholder='checkbox' className='custom-checkbox'
                                                id={`filter-${i}`} />
                                            <label htmlFor={`filter-${color.name}`}>{color.name}</label>
                                        </span>
                                        
                                    </div>
                                ))}
                                <div>
                                    <h4>Selected Colors:</h4>
                                    <ul>
                                        {selectedColors.map((color, index) => (
                                            <li key={index}>{color}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div> */}

                            {/* {filtersData.slice(0, showAllFilters ? filtersData.length : 5).map((item, index) => {
                                const isOpen = openFilterIndices.includes(index);
                                return <div key={index} className='single-filter'>
                                    <span onClick={() => handleFilterClick(index)}>
                                        <p>{item.name}</p>
                                        <img src={item.icon} alt='btn' className={isOpen ? 'rotate' : ''} />
                                    </span>
                                    <div className={`${item.name === 'Color' ? 'color-filter' : 'filters'} ${isOpen ? 'show-filter' : ''}`} >
                                        {item.name === 'Color' ? (
                                            item.filters.map((innerItem, innerIndex) => (
                                                <span key={innerIndex} className={`color-span`} >
                                                    <input type={innerItem.type} placeholder='checkbox' className='custom-checkbox'
                                                        id={`filter-${innerIndex}`} />
                                                    <label htmlFor={`filter-${innerIndex}`}>{innerItem.name}</label>
                                                </span>
                                            ))
                                        ) : (
                                            item.filters.map((innerItem, innerIndex) => (
                                                <span key={innerIndex}>
                                                    <input type={innerItem.type} placeholder='checkbox' className='custom-checkbox'
                                                        id={`filter-${innerIndex}`} />
                                                    <label htmlFor={`filter-${innerIndex}`}>{innerItem.name}</label>
                                                </span>
                                            ))
                                        )} 
                                        
                                    </div>
                                </div>
                            })} */}

                                <div>
                                    <MultiRange />
                                </div>
                                
                                <div className='single-filter'>
                                    <span onClick={() => handleColorFilterOpenClose('color-filter')}>
                                        <h3>{allFilters?.colors?.[0]?.name}</h3>
                                        <img src={AddBtn} alt='btn' className={isOpen ? 'rotate' : ''} />
                                    </span>
                                    <div className={`single-filter-items-container ${isOpen === 'color-filter' ? 'show-single-filter-icons' : ''}`}>
                                        {allFilters?.colors?.[0]?.options.map((item, index) => (
                                            <span key={index} className={`color-span`} >
                                                <input type='checkbox' placeholder='checkbox' className='custom-checkbox'
                                                    id={`filter-${index}`} />
                                                <label htmlFor={`filter-${index}`}>{item.name}</label>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                        </div>
                        <div className='less-or-all-filters-btn'>
                            <button onClick={toggleFiltersVisibility}>
                                {showAllFilters ? 'Show Less Filters' : 'View All Filters'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products section code */}
                <div className={`products-section ${hideFilters ? 'full-width' : ''}`}>
                    {/* product heading */}
                    <div className={`products-heading ${query ? 'query-hide-search-heading' : ''}`}>
                        <div className='show-filter-btn-and-product-count'>
                            <button className={`show-filter-btn ${hideFilters ? 'hide-show-filter-btn' : ''}`} onClick={handleFilterSection}>
                                <img src={arrowBlack} alt='arrow black' className={`show-filter-btn-arrow ${hideFilters ? 'rotate-show-filter-arrow-icon' : ''}`} />
                                Show Filters
                            </button>
                            <p>220 Items starting at $266.99</p>
                        </div>
                        <div className='relevance-container'>
                            <div className='relevance-heading'>
                                <h3>Sort by:</h3>
                                <span onClick={handleRelevance}>
                                    <p>Relevance</p>
                                    <MdKeyboardArrowDown size={20} className={`relevance-arrow ${relevanceTrue ? 'rotate-relevance-arrow' : ''}`} />
                                </span>
                                <div className={`relevance-dropdown ${relevanceTrue ? 'show-relevance' : ''}`}>
                                    <p>Item One</p>
                                    <p>Item Two</p>
                                    <p>Item Three</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={`product-main ${hideFilters ? 'increase-columns' : ''}`}>

                        {products && products.length > 0 ? (
                            products.map((item, index) => {
                                return <ProductCard
                                    key={index}
                                    slug={item.slug}
                                    singleProductData={item}
                                    maxWidthAccordingToComp={"100%"}
                                    justWidth={'100%'}
                                    tagIcon={item.productTag ? item.productTag : heart}
                                    tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                                    mainImage={`${item.image.image_url}`}
                                    productCardContainerClass="product-card"
                                    ProductSku={item.sku}
                                    tags={item.tags}
                                    ProductTitle={truncateTitle(item.name, maxLength)}
                                    stars={[
                                        { icon: star, title: 'filled' },
                                        { icon: star, title: 'filled' },
                                        { icon: star, title: 'filled' },
                                        { icon: star, title: 'filled' },
                                        { icon: star, title: 'filled' },
                                    ]}
                                    reviewCount={item.reviewCount}
                                    lowPriceAddvertisement={item.lowPriceAddvertisement}
                                    priceTag={item.regular_price}
                                    sale_price={item.sale_price}
                                    financingAdd={item.financingAdd}
                                    learnMore={item.learnMore}
                                    mainIndex={index}
                                    deliveryTime={item.deliveryTime}
                                    stock={item.manage_stock}
                                    attributes={item.attributes}
                                    handleCardClick={() => handleProductClick(item)}
                                    handleQuickView={() => handleQuickViewOpen(item)}
                                    handleWishListclick={() => handleWishList(item)}
                                />
                            })
                        ) : (
                            Array.from({ length: totalPages?.totalPages }).map((_, index) => (
                                <ProductCardShimmer />
                            ))
                        )}

                    </div>
                    {/* Product Card Code End */}
                    <div className='view-more-products-button-div'>
                        {/* <button
                            className="view-more-btn"
                            onClick={() => {
                                const currentPage = parseInt(searchParams.get("page") || "1", 10);
                                setSearchParams({ page: (currentPage + 1).toString() });
                            }}
                        >
                            View 15 more
                        </button> */}

                        <div className='view-more-products-pagination-main'>
                            <button
                                className='view-more-product-pagination-button'
                                onClick={handlePrevPage}>
                                <MdOutlineKeyboardArrowLeft size={30} />
                            </button>
                            <div className='view-more-product-pages-count'>
                                {
                                    Array.from({ length: totalPages?.totalPages }).map((_, index) => (
                                        <p
                                            className={`view-more-product-page-number ${activePage === index + 1 ? 'active-page-selected' : ''}`}
                                            onClick={() => handlePAgeClick(index + 1,)}
                                        >
                                            {index + 1}
                                        </p>
                                    ))
                                }
                            </div>
                            <button
                                className='view-more-product-pagination-button'
                                onClick={handleNextPage}>
                                <MdOutlineKeyboardArrowRight size={30} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {/* Mobile view product section */}
            <div className='mobile-view-product-and-filter-section'>
                <div className='mobile-view-filters-section'>
                    <div className='mobile-view-filter-head'>
                        <div className='mobile-view-product-count'>
                            <p>214 items</p>
                            <p>Starting at $ 299</p>
                        </div>
                        <div className='mobile-view-product-card-grid-select'>
                            <div className={`mobile-view-card-grid-single-col ${activeGrid === 'single-col' ? 'grid-active' : ''}`} onClick={() => handleActiveGrid('single-col')}></div>
                            <div className='mobile-view-card-grid-dual-col' onClick={() => handleActiveGrid('dual-col')}>
                                <div className={`mobile-view-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
                                <div className={`mobile-view-card-grid-dual-col-inner ${activeGrid !== 'single-col' ? 'active-dual-col' : ''}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className='mobile-view-filter-body'>
                        <button className='mobile-view-show-filters' onClick={handleMobileFilters}>
                            <img src={filterHumberger} alt='filter' />
                            Show Filter
                        </button>
                        <button className={`mobile-view-sort-btn`}>
                            <img src={arrowUpDown} alt='arrow up down' />
                            Sort
                        </button>
                    </div>
                </div>
                <div className={`${selectedGrid === 'single-col' ? 'mobile-view-product-single-column' : 'mobile-view-products-main-container'} `}>

                    {products.map((item, index) => {
                        return <ProductCard
                            key={index}
                            slug={item.slug}
                            singleProductData={item}
                            maxWidthAccordingToComp="100%"
                            // justWidth={'310px'}
                            percent={'-12%'}
                            tagIcon={item.productTag ? item.productTag : item.heart}
                            tagClass={item.productTag ? 'tag-img' : 'heart-icon'}
                            mainImage={`${item.image.image_url}`}
                            productCardContainerClass="product-card"
                            ProductSku={item.sku}
                            tags={item.tags}
                            ProductTitle={truncateTitle(item.name, maxLength)}
                            stars={[
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                                { icon: star, title: 'filled' },
                            ]}
                            reviewCount={item.reviewCount}
                            lowPriceAddvertisement={item.lowPriceAddvertisement}
                            priceTag={item.regular_price}
                            sale_price={item.sale_price}
                            financingAdd={item.financingAdd}
                            learnMore={item.learnMore}
                            mainIndex={index}
                            deliveryTime={item.deliveryTime}
                            stock={item.manage_stock}
                            attributes={item.attributes}
                            handleCardClick={() => handleProductClick(item)}
                            handleWishListclick={() => handleWishList(item)}
                        />
                    })}
                </div>
                <div className='mobile-view-pagination'>
                    <p>1</p>
                    <p>2</p>
                    <img src={paginationArrow} alt='arrow' />
                </div>
            </div>
            {/* Related Categories Code */}
            <div className='related-categories-div'>
                <h3>Related Categories</h3>
                <div className='related-categories-items'>
                    {relatedCategoriesData.map((item, index) => {
                        return <Link key={index} to={item.link}>{item.categoryName}</Link>
                    })}
                </div>
            </div>

            {/* Cart Side Section */}
            <CartSidePannel
                cartData={cartProducts}
                addToCartClicked={addToCartClicked}
                handleCartSectionClose={handleCartSectionClose}
                removeFromCart={removeFromCart}
                decreamentQuantity={decreamentQuantity}
                increamentQuantity={increamentQuantity}
            />

            {/* Quick View Section */}
            <div className={`quick-view-section ${quickViewClicked ? 'show-quick-view-section' : ''}`} onClick={handleQuickViewClose}>
                <button className={`quick-view-close`} onClick={handleQuickViewClose}>
                    {/* <img src={closeBtn} alt='close' /> */}
                    <IoMdClose size={25} style={{ color: '#595959' }} />
                </button>
                <div className={`quickview-containt ${quickViewClicked ? 'show-quick-view-containt' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <QuickView setQuickViewProduct={quickViewProduct} />
                </div>
            </div>

            {/*Mobile view filters  */}
            <MobileViewProductFilters
                showMobileFilters={mobileFilters}
                setMobileFilters={setMobileFilters}
                filtersData={filtersData}
            />
        </div>
    )
}

export default Products