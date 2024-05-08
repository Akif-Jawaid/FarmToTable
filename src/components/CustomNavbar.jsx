import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { decode } from "jwt-js-decode";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import "../assets/styles/style-Navbar.css";
import "../App.css";

function CustomNavbar() {
  const [isUser, setIsUser] = useState(false);
  const [profileLink, setProfileLink] = useState(null);
  const currentUser=useSelector((state)=>state.auth.isAuthenticated);
  console.log(currentUser);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      let jwt = decode(token);
      setIsUser(true);
      setProfileLink(`/${jwt.payload.user.role}`);
    } else {
      setIsUser(false);
    }
  }, [currentUser]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary border rounded my-3">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="logo.png" alt="" srcSet="" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img src="logo.png" alt="" srcSet="" className="logo" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/vegetables" className="nav-link">
                Vegetables
              </NavLink>
              <NavLink to="/fruits" className="nav-link">
                Fruits
              </NavLink>
              <NavLink to="/contact" className="nav-link">
                Contact us
              </NavLink>
            </Nav>
            {isUser ? (
              <>
                <div className="d-flex align-items-center">
                  <Link to="/wishlist">
                    <i className="bi bi-heart me-2 fs-3 primary_color"></i>
                  </Link>
                  <Link to="/cart">
                    <i className="bi bi-cart me-2 fs-3 primary_color"></i>
                  </Link>
                </div>
                <Link className="text-black m-0 p-0 me-2" to={profileLink}>
                  <i className="bi bi-person-circle fs-3 primary_color"></i>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="custom-btn">Login</button>
                </Link>
              </>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
