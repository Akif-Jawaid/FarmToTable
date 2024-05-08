import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import '../App.css'

export default function Contact() {

    return (
        <>

            <Row>
                <Col md={6}>
                    <div className="rounded p-3 bg-body-tertiary">
                        <h2>Contact Us</h2>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" placeholder="Email" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type="text" placeholder="Subject" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" placeholder="Message" rows={3} />
                            </Form.Group>
                            <button className='btn_filled'>Submit</button>
                        </Form>
                    </div>
                </Col>
                <Col md={6}>
                <iframe className='w-100' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6706877904135!2d78.35762354033605!3d17.427584517893113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c915a6b2ab%3A0x422046359cc10ec6!2sBoys%20hostel%203!5e0!3m2!1sen!2sin!4v1712163416486!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Col>
            </Row>

        </>
    );
}

