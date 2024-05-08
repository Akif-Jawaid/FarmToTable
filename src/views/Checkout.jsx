import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import VARIABLES from "../../environmentVariables";
function Checkout() {
  const [cartList, setCartList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentType, setPaymentType] = useState("");

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

  const [ShippingAddressDetails, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    companyname: "",
    country: "India",
    street: "",
    street1: "",
    city: "",
    state: "",
    pincode: "",
  });

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

  const handleBillingAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // const decodedUser= decode(token).payload.user._id;

      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/add-billing-address`,
        BillingAddressDetails,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response);
      if (response.status == 201) {
        toast.success("add billing address successfully!!");
        setBillingAddressDetails({
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
        setTimeout(() => {
          window.location.href = "#/user/address";
        }, 2000);
      }
    } catch (error) {
      console.log("error to add Billing Address:", error);
      toast.error("Failed to adding the billing address!!");
    }
  };

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
  const handleInputChangeForBilling = (e) => {
    setBillingAddressDetails({
      ...BillingAddressDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle payment submission

  const handlePayment = async () => {
    try {
      handleBillingAddress();
      const token = localStorage.getItem("token");
      const stripe = await loadStripe(
        "pk_test_51NiiOgSAsO3Y0PmoXLtoCmw8jcEGuCd8XRFykRDonK0TLaRfEHObkFfenaBGl8TjnDGDnJoOctFSHVvmCJueZQKB001KX6rK3N"
      );
      const response = await axios.post(
        `${VARIABLES.API_URL_REMOTE}/payment`,
        { items: cartList },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const result = stripe.redirectToCheckout({
        sessionId: response.data.id, // Assuming the session ID is returned directly in the response data
      });
      if (result.error) {
        console.log(result.error);
        toast.error(result.error);
      }
    } catch (error) {
        toast.error("Error processing payment:", error)
      console.error("Error processing payment:", error);
      setPaymentError("Error processing payment. Please try again later.");
    }
  };

  const handleSubmit = async () => {};
  const handlePaymentType = (e) => {
    if (e.target.value === "cashOnDelivery") {
      // Set the selected payment type to "cashOnDelivery"
      setPaymentType("cashOnDelivery");
    } else if (e.target.value === "onlinePayment") {
      // Set the selected payment type to "onlinePayment"
      setPaymentType("onlinePayment");
    }
  };

  useEffect(() => {
    handleViewBillingAddress();
    handleCartListView();
  }, []);
  useEffect(() => {
    let total = 0;
    cartList.forEach((item) => {
      total += item.quantity * item.productId.price;
    });
    setTotalAmount(total);
  }, [cartList]);

  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <h1>Billing Address</h1>
          <form
            action="/add-billing-address"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="row m-0 p-0">
              <div className="m-0 p-0 mb-3 col-12 pe-0">
                <label htmlFor="email" className="form-label">
                  Email address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="eg. hibbanrahmanhyt@gmail.com"
                  name="email"
                  value={BillingAddressDetails.email}
                  onChange={handleInputChangeForBilling}
                />
              </div>
              <h5 className="m-0 p-0 mb-3">Billing details</h5>
              <div className="mb-3 col-6 p-0">
                <label htmlFor="first-name" className="form-label">
                  First name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  placeholder="First name"
                  name="firstname"
                  value={BillingAddressDetails.firstname}
                  onChange={handleInputChangeForBilling}
                />
              </div>
              <div className="mb-3 col-6 pe-0">
                <label htmlFor="last-name" className="form-label">
                  Last name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last-name"
                  placeholder="Last name"
                  name="lastname"
                  value={BillingAddressDetails.lastname}
                  onChange={handleInputChangeForBilling}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="company-name" className="form-label">
                Company name (optional)
              </label>
              <input
                type="text"
                className="form-control"
                id="company-name"
                placeholder="Company name"
                name="companyname"
                value={BillingAddressDetails.companyname}
                onChange={handleInputChangeForBilling}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country / Region <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                placeholder="India"
                name="country"
                value={BillingAddressDetails.country}
                onChange={handleInputChangeForBilling}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="street-address" className="form-label">
                Street address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="street-address"
                placeholder="House number and street name"
                name="street"
                value={BillingAddressDetails.street}
                onChange={handleInputChangeForBilling}
              />
              <input
                type="text"
                className="form-control mt-3"
                id="street-address"
                placeholder="Apartment, suite, unit, etc. (optional)"
                name="street1"
                value={BillingAddressDetails.street1}
                onChange={handleInputChangeForBilling}
              />
            </div>
            <div className="row m-0 p-0">
              <div className="ms-0 ps-0 mb-3 col-4">
                <label htmlFor="city" className="form-label">
                  Town / City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="eg. Patna, Hyderabad"
                  name="city"
                  value={BillingAddressDetails.city}
                  onChange={handleInputChangeForBilling}
                />
              </div>
              <div className="mb-3 col-4">
                <label htmlFor="state" className="form-label">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="eg. Bihar, Telangana"
                  name="state"
                  value={BillingAddressDetails.state}
                  onChange={handleInputChangeForBilling}
                />
              </div>
              <div className="pe-0 mb-3 col-4">
                <label htmlFor="pincode" className="form-label">
                  PIN Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  placeholder="eg. 847301"
                  name="pincode"
                  value={BillingAddressDetails.pincode}
                  onChange={handleInputChangeForBilling}
                />
              </div>
            </div>

            <div className="row m-0 p-0">
              <div className="mb-3 col-12 p-0">
                <label htmlFor="phone" className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="eg. +91-9973152523"
                  name="phone"
                  value={BillingAddressDetails.phone}
                  onChange={handleInputChangeForBilling}
                />
              </div>
            </div>
            <div className="form-check mt-2 mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="paymentType"
                id="cashOnDelivery"
                value="cashOnDelivery"
                onChange={handlePaymentType}
              />
              <label className="form-check-label" htmlFor="cashOnDelivery">
                Cash on delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentType"
                id="onlinePayment"
                value="onlinePayment"
                onChange={handlePaymentType}
              />
              <label className="form-check-label" htmlFor="onlinePayment">
                Online payment
              </label>
            </div>

            <div className="row m-0 p-0  justify-content-end">
              {paymentType === "cashOnDelivery" ? (
                <Link to="/order-details" className="w-auto">
                  <button className="btn_filled text-light mt-3" type="button">
                    Place order
                  </button>
                </Link>
              ) : (
                <button
                  className="btn_filled text-light mt-3 w-auto"
                  type="button"
                  onClick={handlePayment}
                >
                  Pay with Card
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-md-5">
          <div className="card border rounded">
            <div className="d-block p-3 bg-body-secondary">
              <h4>Product</h4>
            </div>
            <div className="card-body">
              <h6>Product Name</h6>
              {cartList ? (
                cartList.map((item) => (
                  <div className="row m-0 p-0 pt-3 mt-3 align-items-center ">
                    <div className="col-2 ">
                      <div className="w-auto product-image rounded-3">
                        <img
                          src={`${VARIABLES.API_URL_REMOTE}/uploads/${item.productId.productImage}`}
                          alt=""
                          className="rounded-3 border border-1"
                        />
                        <span class="quantity-badge badge bg-secondary position-absolute rounded-circle">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="col-6 ps-4">
                      <h6 className="w-auto m-0 p-0">{item.productId.name}</h6>
                    </div>
                    <div className="col-4">
                      <p className="m-0 p-0 fw-medium text-end">
                        ₹{item.productId.price * item.quantity}.00
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p>Add the product first</p>
                </>
              )}
              <div className="d-flex mt-4">
                <p className="w-50 text-start">Sub total</p>
                <p className="w-50 text-end">₹{totalAmount}</p>
              </div>
              <div className="d-flex ">
                <p className="w-50 text-start">Total</p>
                <p className="w-50 text-end">
                  ₹{totalAmount + 30} (includes Gst ₹30 )
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
