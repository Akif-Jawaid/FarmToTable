import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import VARIABLES from "../../environmentVariables";
import { useDispatch } from "react-redux";
import {loginUser} from '../redux/actions/authActions';

function Login() {
  const dispatch=useDispatch();
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post(
          `${VARIABLES.API_URL_REMOTE}/user-Login`,
          userData
        );
        if (response.status === 200) {
          const token = response.data.data.token;
          localStorage.setItem("token", token);
          console.log("Login Successful and the user:", response.data);
          toast.success("Login successful!!");
          setUserData({
            password: "",
            email: "",
          });
          //Dispatch action to Redux store
          dispatch(loginUser(response.data.data));
          setTimeout(() => {
            if (response.data.data.role === "user") {
          
              window.location.href = "/FarmToTable/#/user/";
              
            } else if (response.data.data.role === "admin") {
              window.location.href = "/FarmToTable/#/admin/";
            }
            else if (response.data.data.role === "farmer") {
              window.location.href = "/FarmToTable/#/farmer/";
            }
          }, 1000);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Login failed!!");
        console.log("Failed to login:", error);
      }
    }
    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setValidated(false);
  };

  return (
    <>
      <div className="py-4 justify-content-center">
        <div className="col-lg-6 d-block m-auto border rounded p-3 login_div">
          <h4 className="fw-bolder mb-4">Login</h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom01" className="mb-3">
              <Form.Label>Username or email address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Username or email address"
                name="email"
                onChange={handleInputChange}
                value={userData.email}
                
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid username or email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={userData.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              className="btn_filled mb-3"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>

          <Link to="/register" className="primary_color">
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
