import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import "../../App.css"
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Orders from './Orders';
import AccountDetails from './AcountDetails';
import {Address,BillingAddress,ShippingAddress} from './Address';
import {toast} from 'react-toastify'
import {logoutUser} from '../../redux/actions/authActions';

export default function User() {
  const dispatch=useDispatch();
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
          <Link to="/user/dashboard">
            <button className={`admin_btn w-100 py-3 px-3 mb-2 ${location.pathname === '/user/dashboard' ? 'activeBtn' : ''}`}>
              <i className="bi bi-person-circle me-2"></i>Dashboard
            </button>
          </Link>
          <Link to="/user/account-details">
            <button className={`admin_btn w-100 py-3 px-3 mb-2 ${location.pathname === '/user/account-details' ? 'activeBtn' : ''}`}>
              <i className="bi bi-person-fill-check me-2"></i>Account Details
            </button>
          </Link>
          <Link to="/user/orders">
            <button className={`admin_btn w-100 py-3 px-3 mb-2 ${location.pathname === '/user/orders' ? 'activeBtn' : ''}`}>
              <i className="bi bi-list-check me-2"></i>Orders
            </button>
          </Link>
          
          <Link to="/user/address">
            <button className={`admin_btn w-100 py-3 px-3 mb-2 ${location.pathname === '/user/address' ? 'activeBtn' : ''}`}>
              <i className="bi bi-people-fill me-2"></i>Address
            </button>
          </Link>
          
          <Link to="#">
            <button onClick={handleLogout} className={`admin_btn w-100 py-3 px-3 mb-2 ${location.pathname === '/user/logout' ? 'activeBtn' : ''}`}>
              <i className="bi bi-box-arrow-left me-2"></i>Logout
            </button>
          </Link>
        </Col>
        <Col md={9}>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/address' element={<Address/>} />
            <Route path='/address' element={<Address/>} />
            <Route path="/billing-address" element={<BillingAddress />}/>
            <Route path="/shipping-address" element={<ShippingAddress />}/>
       
            <Route path='/account-details' element={<AccountDetails/>} />
          </Routes>
        </Col>
      </Row>
    </>
  );
}
