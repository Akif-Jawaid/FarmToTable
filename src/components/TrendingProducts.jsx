import { Card, Col, Row } from "react-bootstrap";
import { product } from "../utils/data";
import { getImageUrl } from "../utils/utils";
import { Link } from "react-router-dom";

function TrendingProducts() {
    return (
        <>
            <Row className="py-3">
                <h3 className="mb-3">Trending Products</h3>

                {product.map((product) => (
                    <Col key={product.id} xs={6} md={4} lg={3}>
                        <Link to={{ pathname: `/product-details/${product.id}`, state: { product: product } }} className='text-black text-decoration-none'>

                            <Card className="mb-3">
                                <div className="d-block p-3">
                                    <div className="d-flex">
                                        <small className='w-50 text-start text-secondary'>{product.type}</small>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <img src={getImageUrl(product)} alt={product.imageId} srcSet="" className="w-50" />
                                        <div className="d-block text-start mb-3">
                                            <h4>₹{product.price}</h4>
                                            <h6>{product.name}</h6>
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
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default TrendingProducts;