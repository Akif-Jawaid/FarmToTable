import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import VARIABLES from "../../environmentVariables";
function Register() {
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    role:'',
    agreed: false,
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post(
          `${VARIABLES.API_URL_REMOTE}/user-Register`,
          userDetails
        );
        console.log(response);
        if (response.status === 201) {
          toast.success("Registration successful!!");
          resetForm();
        }
      } catch (error) {
        console.error("Error in registration:", error);
        toast.error("Registration failed!!");
      }
    }
    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setUserDetails({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      phone: "",
      email: "",
      role:'',
      agreed: false,
    });
    setValidated(false);
  };

  return (
    <div className="py-4 d-flex justify-content-center ">
      <div className="col-lg-6 d-block m-auto border rounded p-3 login_div">
        <h4 className="fw-bolder mb-4">Register</h4>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="validationCustomFirstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstname"
              value={userDetails.firstname}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustomLastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastname"
              value={userDetails.lastname}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid last name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustomUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter username"
                aria-describedby="inputGroupPrepend"
                name="username"
                value={userDetails.username}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="validationCustomPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustomEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustomPhone" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationRole" className="mb-3">
            <Form.Label>Your role</Form.Label>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              name="role"
              value={userDetails.role}
              onChange={handleInputChange}
            >
              <option>Select your role</option>
              <option value="user">Consumer</option>
              <option value="farmer">Farmer</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="validationCustomAgreement" className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              name="agreed"
              checked={userDetails.agreed}
              onChange={handleInputChange}
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <Button type="submit" className="btn_filled">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
