import { Card, Col, Row } from "react-bootstrap";
import card_1 from '../assets/images/card_1.jpg';
import card_2 from '../assets/images/card_2.jpg';
import card_3 from '../assets/images/card_3.jpg';
import '../assets/styles/style-Cards.css';
import '../App.css'
import { Link } from "react-router-dom";


function Cards() {
    return (
        <>
            <Row className="py-3">
                <Col md={4}>
                    <Card className='card_1 mb-3'>
                        <div className="card_content_1">
                            <div className="d-block">
                                <h3>Fresh Root Veges</h3>
                                <p className="fw-bolder">Only <br /><h2 className="fw-bold">₹12</h2></p>
                                <Link to='/vegetables' className="text-decoration-none">
                                    <button className="btn_filled">Shop now</button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className='card_2 mb-3'>
                        <div className="card_content_2">
                            <div className="d-block">
                                <h3>Organic Fruits</h3>
                                <p className="text-danger">100% Organic</p>
                                <p className="fw-bolder">Only <br /><h2 className="fw-bold">₹12</h2></p>
                                <Link to='/fruits' className="text-decoration-none">
                                    <button className="btn_filled">Shop now</button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className='card_3 mb-3'>
                        <div className="card_content_3">
                            <div className="d-block">
                                <h3>Leafy Green & Peas</h3>
                                <p className="text-white">100% Organic</p>
                                <p className="fw-bolder"><h2 className="fw-bold">Only ₹12</h2></p>

                                <Link to='/vegetables' className="text-decoration-none">
                                    <button className="btn_filled">Shop now</button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Cards;