import React, { useState ,useEffect} from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { decode } from "jwt-js-decode";

export default function AccountDetails() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });
  const handleUserDetails = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const jwtDecode = decode(token);
      setUserDetails({
        email: jwtDecode.payload.user.email,
        username: jwtDecode.payload.user.username,
        firstName: jwtDecode.payload.user.firstname,
        lastName: jwtDecode.payload.user.lastname,
      });
    }
  };
  useEffect(() => {
    handleUserDetails();
  }, []);
  return (
    <>
      <Card className="p-3">
        <h4>Edit Account Details</h4>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  id="first-name"
                  name="firstname"
                  value={userDetails.firstName}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  id="last-name"
                  name="lastname"
                  value={userDetails.lastName}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              id="email"
              name="email"
              value={userDetails.email}
            />
          </Form.Group>

          <h5>Password Change</h5>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Current password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>New password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <div className="text-end">
            <Link>
              <button className="btn_filled">Save changes</button>
            </Link>
          </div>
        </Form>
      </Card>
    </>
  );
}
