// import React, { useEffect, useState } from 'react';
// import './SingleProduct.css';
// import SingleProductStickySection from '../../Components/SingleProductStickySection/SingleProductStickySection';
// import SimillerProducts from '../../Components/SimillerProducts/SimillerProducts';
// import FrequentlyBought from '../../Components/FrequentlyBought/FrequentlyBought';
// import RatingAndReview from '../../Components/RatingAndReview/RatingAndReview';
// import ProductComments from '../../Components/ProductComments/ProductComments';
// import OutdoorFaves from '../../Components/OutdoorFaves/OutdoorFaves';
// import { useLocation, useParams } from 'react-router-dom';
// import { useCart } from '../../../context/cartContext/cartContext';
// import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext';
// import WriteReview from '../../Components/WriteReview/WriteReview';
// import axios from 'axios'; // Make sure to install axios or use fetch

// const SingleProduct = () => {
//   // const { cart, addToCart, cartSectionOpen, setCartSectionOpen, increamentQuantity, decreamentQuantity, removeFromCart, calculateTotalPrice } = useCart();
//   // const [cartSection, setCartSection] = useState(false);
//   const { slug } = useParams();
//   const location = useLocation();
//   const product = location.state || {};

//   // const { singleProduct, increaseQuantity } = useSingleProductContext();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchReviews = async (productUid) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`https://fm.skyhub.pk/api/v1/reviews/get-by-product/${productUid}`);
//       setReviews(response.data.reviews);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch reviews');
//       setLoading(false);
//     }
//   };

  

//   useEffect(() => {
//     if (product?.uid) {
//       fetchReviews(product?.uid);
//     }
//   }, [product?.uid]);

//   const handleClickTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   useEffect(() => {
//     handleClickTop();
//   }, [product]);

//   if (!product) {
//     return <div>Product Not Found</div>;
//   }

//   return (
//     <div>
//       <SingleProductStickySection productData={product} />
//       {product.collection && product.collection.length > 0 ? <SimillerProducts collection={product.collection} /> : <></>}
//       {product.related_products && product.related_products.length > 0 ? <FrequentlyBought relatedProducts={product.related_products} /> : <></>}
//       <RatingAndReview rating={product?.average_rating} data={reviews} reviews={reviews} loading={loading} error={error} />
      
//       {loading && <div>Loading reviews...</div>}
//       {error && <div>{error}</div>}
      
//       <WriteReview product_id={product?.uid} product_name={product?.name} product_permalink={"https://"} />
//       <ProductComments data={reviews} />
//       <OutdoorFaves />
//     </div>
//   );
// };

// export default SingleProduct;

import React, { useEffect, useState } from 'react';
import './SingleProduct.css';
import SingleProductStickySection from '../../Components/SingleProductStickySection/SingleProductStickySection';
import SimillerProducts from '../../Components/SimillerProducts/SimillerProducts';
import FrequentlyBought from '../../Components/FrequentlyBought/FrequentlyBought';
import RatingAndReview from '../../Components/RatingAndReview/RatingAndReview';
import ProductComments from '../../Components/ProductComments/ProductComments';
import OutdoorFaves from '../../Components/OutdoorFaves/OutdoorFaves';
import { useLocation, useParams } from 'react-router-dom';
import WriteReview from '../../Components/WriteReview/WriteReview';
import axios from 'axios';
import { url } from '../../../utils/api';

const SingleProduct = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state || null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async (productUid) => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/v1/reviews/get-by-product/${productUid}`);
      setReviews(response.data.reviews);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch reviews');
      setLoading(false);
    }
  };

  const fetchProductBySlug = async (slug) => {
    try {
      const response = await axios.get(`${url}/api/v1/products/get-by-slug/${slug}`);
      const fetchedProduct = response.data.products[0] || {};
      console.log("fetched product", fetchedProduct)
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product by slug:', error);
    }
  };

  useEffect(() => {
    if (!product) {
      fetchProductBySlug(slug);
    } else if (product?.uid) {
      fetchReviews(product?.uid);
    }
  }, [product, slug]);

  useEffect(() => {fetchProductBySlug(slug)}, [slug])

  const handleClickTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleClickTop();
  }, [product]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <SingleProductStickySection productData={product} />
      {product.collection?.length > 0 && <SimillerProducts collection={product.collection} />}
      {product.related_products?.length > 0 && <FrequentlyBought relatedProducts={product.related_products} />}
      <RatingAndReview rating={product?.average_rating} data={reviews} reviews={reviews} loading={loading} error={error} />
      {loading && <div>Loading reviews...</div>}
      {error && <div>{error}</div>}
      <WriteReview product_id={product?.uid} product_name={product?.name} product_permalink={"https://"} />
      <ProductComments data={reviews} />
      <OutdoorFaves />
    </div>
  );
};

export default SingleProduct;

