import React, { useEffect, useState } from 'react';
import './SingleProduct.css';
import SingleProductStickySection from '../../Components/SingleProductStickySection/SingleProductStickySection';
import SimillerProducts from '../../Components/SimillerProducts/SimillerProducts';
import FrequentlyBought from '../../Components/FrequentlyBought/FrequentlyBought';
import RatingAndReview from '../../Components/RatingAndReview/RatingAndReview';
import ProductComments from '../../Components/ProductComments/ProductComments';
import OutdoorFaves from '../../Components/OutdoorFaves/OutdoorFaves';
import { useLocation, useParams } from 'react-router-dom';
import { useCart } from '../../../context/cartContext/cartContext';
import { useSingleProductContext } from '../../../context/singleProductContext/singleProductContext';
import WriteReview from '../../Components/WriteReview/WriteReview';
import axios from 'axios'; // Make sure to install axios or use fetch

const SingleProduct = () => {
  // const { cart, addToCart, cartSectionOpen, setCartSectionOpen, increamentQuantity, decreamentQuantity, removeFromCart, calculateTotalPrice } = useCart();
  // const [cartSection, setCartSection] = useState(false);
  const { slug } = useParams();
  const location = useLocation();
  const product = location.state || {};

  // const { singleProduct, increaseQuantity } = useSingleProductContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async (productUid) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://fm.skyhub.pk/api/v1/reviews/get-by-product/${productUid}`);
      setReviews(response.data.reviews);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch reviews');
      setLoading(false);
    }
  };

  

  useEffect(() => {
    if (product?.uid) {
      fetchReviews(product?.uid);
    }
  }, [product?.uid]);

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
    return <div>Product Not Found</div>;
  }

  return (
    <div>
      <SingleProductStickySection productData={product} />
      {product.collection && product.collection.length > 0 ? <SimillerProducts collection={product.collection} /> : <></>}
      {product.related_products && product.related_products.length > 0 ? <FrequentlyBought relatedProducts={product.related_products} /> : <></>}
      <RatingAndReview rating={product?.average_rating} data={reviews} reviews={reviews} loading={loading} error={error} />
      {/* Display reviews or loading/error states */}
      {loading && <div>Loading reviews...</div>}
      {error && <div>{error}</div>}
      {/* {reviews.length > 0 && (
        <div>
          <h2>Customer Reviews</h2>
          {reviews.map((review) => (
            <div key={review.id}>
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <span>Rating: {review.rating}</span>
            </div>
          ))}
        </div>
      )} */}
      <WriteReview product_id={product?.uid} product_name={product?.name} product_permalink={"https://"} />
      <ProductComments data={reviews} />
      <OutdoorFaves />
      {/* <MobileFinancingSlider />
      <AnnouncmentBanners bannerImage={twelveMonthCreditOfferImage} padding={'10px'} />
      <AnnouncmentBanners bannerImage={payPalMobileBanner} padding={'10px 0'} />
      <AnnouncmentBanners bannerImage={sixMonthCreditImage} padding={'10px 0'} />
      <AnnouncmentBanners bannerImage={paymentOptionsBanner} padding={'10px 0'} /> */}
    </div>
  );
};

export default SingleProduct;
