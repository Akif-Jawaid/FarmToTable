import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../assets/styles/style-ProductDetails.css";

import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { product } from "../utils/data";
import { toast } from "react-toastify";
import axios from "axios";
import VARIABLES from "../../environmentVariables";

export default function ProductDetails() {
  const { productId } = useParams();
  const [productItem, setProductItem] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [cartDetails, setCartDetails] = useState({
    productId: productId,
    quantity: 1,
  });

  const handleProductDetails = async () => {
    try {
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/view-product-Id`,
        { productId }
      );
      console.log(response);
      if (response.status === 200) {
        setProductItem(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to view!!");
    }
  };
  const handleAddCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login first!!");
      setTimeout(() => {
        window.location.href = "#/login";
      }, 2000);
    } else {
      try {
        const response = await axios.post(
          `${VARIABLES.API_URL_REMOTE}/add-cart`,
          cartDetails,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        if (response.status === 409) {
          toast.success("product already added!!");
        }
        if (response.status === 201) {
          toast.success("product is added!!");
        }
      } catch (error) {
        console.log("error in add to cart:", error);
      }
    }
  };

  useEffect(() => {
    // Find the product by its ID
    const foundProduct = product.find(
      (item) => item.id === parseInt(productId)
    );
    if (foundProduct) {
      setProductItem(foundProduct);
    } else {
      // Handle case where product is not found
      console.log("Product not found");
    }
    handleProductDetails();
  }, [productId]); // Re-run effect when productId changes
  console.log(productItem);

  return (
    <>
      <Row>
        <Col lg={6}>
          <div className=" border rounded mb-3">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {productItem && (
                <SwiperSlide>
                  <img
                    src={`${VARIABLES.API_URL_REMOTE}/uploads/${productItem.productImage}`}
                    alt={productItem.productImage}
                    className="w-100"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </Col>
        <Col lg={6}>
          {productItem && (
            <>
              <h3>Whole Foods Market, Organic {productItem.name}</h3>
              <Row>
                <Col md={6}>
                  <i className="bi bi-star-fill me-1"></i>
                  <i className="bi bi-star-fill me-1"></i>
                  <i className="bi bi-star-fill me-1"></i>
                  <i className="bi bi-star-fill me-1"></i>
                  <i className="bi bi-star me-1"></i>
                </Col>

                <Col md={6} className="text-md-end">
                  <i className="bi bi-whatsapp me-1"></i>
                  <i className="bi bi-facebook me-1"></i>
                  <i className="bi bi-instagram me-1"></i>
                </Col>
              </Row>
              <hr />
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                molestias ab aperiam ratione esse sequi iste adipisci. Debitis
                beatae temporibus neque amet sit eveniet aliquid nobis.
                Laboriosam vero sunt ipsam?
              </p>
              <h3>₹{productItem.price}</h3>

              <div key="radio" className="mb-3">
                <Form.Check
                  inline
                  label="500gm"
                  name="group1"
                  type="radio"
                  id="radio1"
                  required
                />
                <Form.Check
                  inline
                  label="1000gm"
                  name="group1"
                  type="radio"
                  id="radio2"
                  required
                />
              </div>
              <Link
                to={{
                  pathname: `/cart/${productItem._id}`,
                  state: { product: productItem },
                }}
                className="text-decoration-none"
              >
                <button type="button" className="btn_filled" onClick={handleAddCart}>
                  Add to cart
                </button>
              </Link>
              <hr />

              <p>
                Category :{" "}
                <span className="text-secondary">
                  {productItem.category.name}
                </span>
              </p>

              <div className="card_div d-block border rounded p-3">
                <h6 className="primary_color ps-2">Guaranteed Safe Checkout</h6>
                <div className="d-flex">
                  <img src="./images/visa.svg" alt="visa" />
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
