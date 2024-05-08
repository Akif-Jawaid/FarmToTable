import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import "../../App.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Products from "./Products";
import Users from "./Users";
import AccountDetails from "./AcountDetails";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { logoutUser } from "../../redux/actions/authActions";
export default function Admin() {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("logout successfully");
    dispatch(logoutUser());
    setTimeout(() => {
      
      window.location.href = "/FarmToTable/#/";
    }, 1000);
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <Link to="/admin/dashboard">
            <button
              className={`admin_btn w-100 py-3 px-3 mb-2 ${
                location.pathname === "/admin/dashboard" ? "activeBtn" : ""
              }`}
            >
              <i className="bi bi-person-circle me-2"></i>Dashboard
            </button>
          </Link>
          <Link to="/admin/orders">
            <button
              className={`admin_btn w-100 py-3 px-3 mb-2 ${
                location.pathname === "/admin/orders" ? "activeBtn" : ""
              }`}
            >
              <i className="bi bi-list-check me-2"></i>Orders
            </button>
          </Link>
          <Link to="/admin/products">
            <button
              className={`admin_btn w-100 py-3 px-3 mb-2 ${
                location.pathname === "/admin/products" ? "activeBtn" : ""
              }`}
            >
              <i className="bi bi-box-fill me-2"></i>Products
            </button>
          </Link>
          <Link to="/admin/users">
            <button
              className={`admin_btn w-100 py-3 px-3 mb-2 ${
                location.pathname === "/admin/users" ? "activeBtn" : ""
              }`}
            >
              <i className="bi bi-people-fill me-2"></i>Users
            </button>
          </Link>
          <Link to="/admin/account-details">
            <button
              className={`admin_btn w-100 py-3 px-3 mb-2 ${
                location.pathname === "/admin/account-details"
                  ? "activeBtn"
                  : ""
              }`}
            >
              <i className="bi bi-person-fill-check me-2"></i>Account Details
            </button>
          </Link>
          <Link to="/admin/logout">
            <button
              onClick={handleLogout}
              className={`admin_btn w-100 py-3 px-3 mb-2 ${
                location.pathname === "/admin/logout" ? "activeBtn" : ""
              }`}
            >
              <i className="bi bi-box-arrow-left me-2"></i>Logout
            </button>
          </Link>
        </Col>
        <Col md={9}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/account-details" element={<AccountDetails />} />
          </Routes>
        </Col>
      </Row>
    </>
  );
}
