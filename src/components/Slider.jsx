import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { product } from '../utils/data';
import { getImageUrl } from '../utils/utils';
import { Container, Card } from 'react-bootstrap';
import 'swiper/css';
import "../assets/styles/style-Slider.css"
import "../App.css"
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import VARIABLES from '../../environmentVariables';

const Slider = () => {
  const [product, setProduct] = React.useState([]);
  const handleViewProduct = async () => {
    try {
      const response = await axios.get(`${VARIABLES.API_URL_REMOTE}/view-product`);
      if (response.status == 200) {
        setProduct(response.data.data);
      }
    } catch (error) {
      toast.error("failed to view!!");
      console.log(error)
    }
  }

  useEffect(() => {
    handleViewProduct();
  }, []);
  return (
    <>
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper mb-3"
      >
        {product.map((productItem, index) => (
          <SwiperSlide key={index}>
            <Card>
              <div className="d-block p-3">
                <div className="d-flex">
                  <small className='w-50 text-start text-secondary'>{productItem.category}</small>
                  <small className='w-50 text-end text-secondary '><i className='bi bi-heart'></i></small>
                </div>
                <img src={`${VARIABLES.API_URL_REMOTE}/uploads/${productItem.productImage}`} alt={productItem.productImage} srcSet="" />
                <div className="d-block text-start mb-3">
                  <h4>₹{productItem.price}</h4>
                  <h6>{productItem.name}</h6>
                </div>
                <Link to={{ pathname: `/product-details/${productItem._id}`, state: { product: productItem } }} className='text-decoration-none'>
                  <button className='btn_white w-100'>Add to cart</button>
                </Link>

              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
