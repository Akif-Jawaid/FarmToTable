import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import "../../App.css"


export default function Dashboard() {

  return (
    <>
      <Card className='p-3'>
        <h3>Dashboard</h3>
        <Row>
          <Col md={6}>
            <Card className='p-2'>
              <h5 className='m-0'><i className="bi bi-cart-fill me-2"></i>Orders</h5>
              <hr />
              <p className="d-flex">
                Total <span className='ms-auto'>0</span>
              </p>
              <p className="d-flex text-success">
                Completed <span className='ms-auto'>0</span>
              </p>
              <p className="d-flex text-secondary">
                Pending <span className='ms-auto'>0</span>
              </p>
              <p className="d-flex text-primary">
                Processing <span className='ms-auto'>0</span>
              </p>
              <p className="d-flex text-danger">
                Cancelled <span className='ms-auto'>0</span>
              </p>
            </Card></Col>
        </Row>
      </Card>

    </>
  );
}