import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VARIABLES from "../../environmentVariables";
import { Row, Col, Card, CardBody } from "react-bootstrap";
import "../App.css";
function OrderDetails() {
  const [cartList, setCartList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [BillingAddressDetails, setBillingAddressDetails] = useState({
    firstname: "",
    lastname: "",
    companyname: "",
    country: "India",
    street: "",
    street1: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });
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
  const handleViewBillingAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${VARIABLES.API_URL_REMOTE}/view-billing-address`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        setBillingAddressDetails(response.data.data);
        console.log("billing:", BillingAddressDetails);
      }
    } catch (error) {
      console.log("error in viewing BillingAddress:", error);
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
    handleViewBillingAddress();
    handleCartListView();
  }, []);
  return (
    <>
      <p className="p-3 bg-body-secondary">
        Thank you, your order has been received.
      </p>
      <div className="row">
        <div className="col-md-3">
          <p>
            Order Number: <b>#9048503</b>
          </p>
        </div>
        <div className="col-md-3">
          <p>
            Date: <b>25-12-2023</b>
          </p>
        </div>
        <div className="col-md-3">
          <p>
            Total: <b>₹889</b>
          </p>
        </div>
        <div className="col-md-3">
          <p>
            Payment Method: <b>Online</b>
          </p>
        </div>
      </div>
      <h1 className="mb-3">Order Details</h1>

      <div className="d-flex p-3 bg-body-secondary ">
        <h5 className="w-50 text-start">Product</h5>
        <h5 className="w-50 text-end">Total</h5>
      </div>
      <div className="d-flex p-3">
        <p className="w-50 text-start">Product Name</p>
        <p className="w-50 text-end">Price</p>
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
                  <div style={{ width: "80px" }} className="fs-5 ms-3 me-2">
                    ₹{item.productId.price*item.quantity}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      <div className="d-flex p-3">
        <p className="w-50 text-start">Sub total</p>
        <p className="w-50 text-end">{totalAmount}</p>
      </div>
      <div className="d-flex p-3">
        <p className="w-50 text-start">Payment method</p>
        <p className="w-50 text-end">Online</p>
      </div>
      <div className="d-flex p-3">
        <p className="w-50 text-start">Total</p>
        <p className="w-50 text-end"> ₹{totalAmount + 30} (includes Gst ₹30 )</p>
      </div>
      <div className="card">
        <div className="card-body">
          <p className="m-0 p-0">{BillingAddressDetails.companyname}</p>
          <p className="m-0 p-0">
            {BillingAddressDetails.firstname}
            {BillingAddressDetails.lastname}
          </p>
          <p className="m-0 p-0">{BillingAddressDetails.street}</p>
          <p className="m-0 p-0">{BillingAddressDetails.street1}</p>
          <p className="m-0 p-0">
            {BillingAddressDetails.city} {BillingAddressDetails.pincode}
          </p>
          <p className="m-0 p-0">{BillingAddressDetails.state}</p>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
