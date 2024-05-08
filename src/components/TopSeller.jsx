import { Card, Col, Row } from "react-bootstrap";
import seller_1 from '../assets/images/Seller_Images/seller_1.png'
import seller_2 from '../assets/images/Seller_Images/seller_2.jpg'
import seller_3 from '../assets/images/Seller_Images/seller_3.jpg'
import seller_4 from '../assets/images/Seller_Images/seller_4.jpg'

function TopSeller() {
    return (
        <>
            <div className="container py-3">
                <Row className="border rounded p-3">
                    <h3 className="mb-3">Top Sellers</h3>

                    <Col md={3}>
                        <Card className="p-2 bg-body-secondary border-0 mb-3">
                            <div className="d-flex">
                                <img src={seller_1} alt="seller_1" className="rounded w-25 me-3" />
                                <div className="d-flex align-items-center">
                                    <div className="d-block">
                                        <h6>
                                            Siraj
                                        </h6>
                                        <div className="d-flex">
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-half text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="p-2 bg-body-secondary border-0 mb-3">
                            <div className="d-flex">
                                <img src={seller_2} alt="seller_2" className="rounded w-25 me-3" />
                                <div className="d-flex align-items-center">
                                    <div className="d-block">
                                        <h6>
                                            Kavya
                                        </h6>
                                        <div className="d-flex">
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-half text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="p-2 bg-body-secondary border-0 mb-3">
                            <div className="d-flex">
                                <img src={seller_3} alt="seller_3" className="rounded w-25 me-3" />
                                <div className="d-flex align-items-center">
                                    <div className="d-block">
                                        <h6>
                                            Rohit
                                        </h6>
                                        <div className="d-flex">
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-half text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="p-2 bg-body-secondary border-0 mb-3">
                            <div className="d-flex">
                                <img src={seller_4} alt="seller_4" className="rounded w-25 me-3" />
                                <div className="d-flex align-items-center">
                                    <div className="d-block">
                                        <h6>
                                            Jemina
                                        </h6>
                                        <div className="d-flex">
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-fill me-1 text-warning"></i>
                                            <i class="bi bi-star-half text-warning"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TopSeller;