import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { product } from "../utils/data";
import axios from "axios";
import { toast } from "react-toastify";

import { Row, Col, Card, CardBody } from "react-bootstrap";
import "../App.css";
import VARIABLES from "../../environmentVariables";

export default function Cart() {
  const { productId } = useParams();
  const [productItem, setProductItem] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  if (!localStorage.getItem("token")) {
    toast.error("Please login first");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }
  const handleCartListView = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${VARIABLES.API_URL_REMOTE}/view-cart`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setCartList(response.data.data.cartItems);
      }
    } catch (error) {
      console.log("something is wrong with viewing cartList:", error);
    }
  };
  const handleIncrementQuantity = async (item) => {
    handleCartListView();
    try {
      const newQuantity = parseInt(item.quantity) + 1;
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/update-cart`,
        { productId: item.productId._id, quantity: newQuantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        console.log("updated successfully!!");
        handleCartListView();
      }
    } catch (error) {
      console.log("error in updating the quantity:", error);
    }
    handleCartListView();
  };

  const handleDecrementQuantity = async (item) => {
    handleCartListView();
    const token = localStorage.getItem("token");

    try {
      if (parseInt(item.quantity) === 1) {
        // If the quantity is already 1, remove the item from the cart
        const response = await axios.delete(
          `${VARIABLES.API_URL_REMOTE}/delete-cart-item`,
          {
            data: { productId: item.productId._id },
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Product is removed!!");
          handleCartListView(); // Refresh cart after successful removal
        }
      } else {
        // If quantity is more than 1, decrement the quantity
        const newQuantity = parseInt(item.quantity) - 1;
        const response = await axios.post(
          `${VARIABLES.API_URL_REMOTE}/update-cart`,
          { productId: item.productId._id, quantity: newQuantity },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          console.log("Updated successfully!!");
          handleCartListView(); // Refresh cart after successful update
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
    handleCartListView();
  };

  const handleDeleteItem = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${VARIABLES.API_URL_REMOTE}/delete-cart-item`,
        {
          data: { productId: item.productId._id },
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product is removed!!");
        handleCartListView(); // Refresh cart after successful removal
      }
    } catch (error) {
      console.log("Something went wrong in the deleting the item!!");
    }
  };
  useEffect(() => {
    let total = 0;
    let quantity=0;
    cartList.forEach((item) => {
      total += item.quantity * item.productId.price;
      quantity += parseInt(item.quantity);
    });
    setTotalAmount(total);
    setTotalQuantity(quantity)
  }, [cartList]);
  useEffect(() => {
    const foundProduct = product.find(
      (item) => item.id === parseInt(productId)
    );
    if (foundProduct) {
      setProductItem(foundProduct);
    } else {
      console.log("Product not found");
    }
  }, [productId]);

  useEffect(() => {
    // Calculate total price based on productItem
    if (productItem) {
      setTotalPrice(productItem.price); // Assuming productItem has a quantity property
    }
  }, [productItem]);
  useEffect(() => {
    handleCartListView();
  }, []);
  return (
    <>
      <Row>
        <Col lg="7" className="border rounded p-3">
          <Link to="/" className="text-body">
            Continue shopping
          </Link>

          <hr />

          <div className="mb-3">
            <p className="mb-1">Shopping cart</p>
            <p className="mb-0">You have {cartList.length} items in your cart</p>
          </div>

          {Array.isArray(cartList) &&
            cartList.map((item) => (
              <Card className="mb-3">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <div className="border rounded me-2 p-2">
                        <img
                          src={`${VARIABLES.API_URL_REMOTE}/uploads/${item.productId.productImage}`}
                          className="rounded-3"
                          width={"70px"}
                          alt="Shopping item"
                        />
                      </div>
                      {item.productId.name}
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <div className="col-6 row  m-0 p-0 border border-1 rounded-2  ">
                        <div className="col-8 m-0 p-0 d-flex justify-content-center align-items-center border border-1 border-start-0 border-top-0 border-bottom-0">
                          <p className="m-0 p-0 text-center fs-4 text-secondary ">
                            {item.quantity}
                          </p>
                        </div>
                        <div className="col-4 m-0 p-0">
                          <div
                            className="increment d-flex justify-content-center align-items-center border border-1 border-top-0 border-end-0 border-start-0 m-0 p-0"
                            onClick={() => handleIncrementQuantity(item)}
                          >
                            <i class="bi bi-plus-lg w-auto "></i>
                          </div>
                          <div
                            className="decrement d-flex justify-content-center align-items-center m-0 p-0"
                            onClick={() => handleDecrementQuantity(item)}
                          >
                            <i class="bi bi-dash-lg w-auto"></i>
                          </div>
                        </div>
                      </div>

                      <div style={{ width: "80px" }} className="fs-5 ms-3 me-2">
                        ₹{item.productId.price}
                      </div>
                      <Link
                        to="#"
                        className="text-decoration-none"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
        </Col>

        <Col lg="5">
          <Card className="border rounded">
            <CardBody>
              <h5>Cart totals</h5>
              <p>totalPrice: ₹{totalAmount}</p>
              <p>total Quantity: {totalQuantity}</p>

              <div className="text-center">
                <Link to="/checkout">
                  <button className="btn_filled">Checkout</button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
