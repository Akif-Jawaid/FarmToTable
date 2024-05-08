import { Col, Container, Row, Button, Form, InputGroup } from "react-bootstrap";

import "../App.css"
import "../assets/styles/style-Footer.css"
import { Link } from "react-router-dom";


function Footer() {
    return (
        <>
            <div className="mt-3 footer">
                <Container>
                    <Row>
                        <Col md={6} lg={3}>
                            <img src="logo.png" alt="" srcSet="" className='logo mb-3' />
                            <p>
                                When an unknown printer took a galley of type scrambled it to make a type specimen book.
                            </p>
                        </Col>
                        <Col md={6} lg={3}>
                            <h4 className="mb-3">
                                Quick Links
                            </h4>
                            <ul className="list-unstyled">
                                <li>
                                    <Link to='/vegetables' className="text-white text-decoration-none">
                                        Vegetables
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/fruits' className="text-white text-decoration-none">
                                        Fruits
                                    </Link>

                                </li>
                                <li>
                                    Organic foods
                                </li>
                                <li>
                                    Dairy
                                </li>
                                <Link to='/contact' className="text-white text-decoration-none">
                                        Contact
                                    </Link>
                            </ul>
                        </Col>
                        <Col md={6} lg={3}>
                            <h4 className="mb-3">
                                Accoutns
                            </h4>
                            <ul className="list-unstyled">
                                <li>
                                    Dashboard
                                </li>
                                <li>
                                    Orders
                                </li>
                                <li>
                                    Order details
                                </li>
                                <li>
                                    Register
                                </li>
                            </ul>
                        </Col>
                        <Col md={6} lg={3}>
                            <h4 className="mb-3">
                                Sign Up Newsletter
                            </h4>
                            <p>When an unknown printer took a galley of type and scrambled</p>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Type your email"
                                    aria-label="Recipient's email"
                                    aria-describedby="basic-addon2"
                                />
                                <Button className="input_btn">
                                    Send
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <hr />
                    <p>
                        © 2024 FarmToTable. All Rights Reserved by FarmToTable
                    </p>
                </Container>

            </div>
        </>
    )
}

export default Footer;