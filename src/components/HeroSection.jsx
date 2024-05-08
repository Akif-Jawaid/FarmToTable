import { Row, Col, Card } from 'react-bootstrap';
import "../assets/styles/style-HeroSection.css"
import { Link } from 'react-router-dom';


function HeroSection() {
    return (
        <>
            <Row className='mb-4'>
                <Col lg={7}>
                    <Card className='hero_card mb-4 mb-lg-0'>
                        <img src="images/hero-1.jpg" alt="" srcSet="" className='w-100' />
                        <div className="hero_card_content">
                            <span className='mb-3'>100% Farm Fresh Food</span>
                            <h1 className='mb-3'>
                                Farm on Hand
                            </h1>
                            <Link to='/' className="text-decoration-none">
                                <button className='buy_btn_filled'>Shop now</button>
                            </Link>
                        </div>
                    </Card>
                </Col>
                <Col lg={5} className='right_card'>
                    <Card className='hero_card'>
                        <img src="images/hero-2.jpg" alt="" srcSet="" className='w-100' />
                        <div className="hero_card_content_2">
                            <h5>Organic Vegetables</h5>
                            <h6>100% Organic</h6>
                        </div>
                    </Card>
                    <Row>
                        <Col md={6}>
                            <Card className='hero_card  mb-4 mb-md-0'>
                                <img src="images/hero-3.jpg" alt="" srcSet="" className='w-100' />
                                <div className="hero_card_content_3 text-center">
                                    <h5>Organic Fruits</h5>
                                    <h6>100% Organic</h6>
                                </div>
                                <Link to='/fruits' className="text-decoration-none">
                                    <button className="buy_btn">Shop now</button>
                                </Link>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className='hero_card'>
                                <img src="images/hero-4.jpg" alt="" srcSet="" className='w-100' />
                                <div className="hero_card_content_3 text-center">
                                    <h5>Organic Veges</h5>
                                    <h6>100% Organic</h6>
                                </div>
                                <Link to='/vegetables' className="text-decoration-none">
                                    <button className="buy_btn">Shop now</button>
                                </Link>
                            </Card>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </>
    );
}

export default HeroSection;
