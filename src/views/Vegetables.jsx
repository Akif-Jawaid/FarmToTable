import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Card, Col, Row } from "react-bootstrap";
import { product } from "../utils/data";
import { getImageUrl } from "../utils/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import VARIABLES from "../../environmentVariables";

function Vegetables() {
  const [vegetableList, setVegetablesList] = useState([]);

  const vegetableProducts = product.filter((item) => item.type === "Vegetable");
  const handleViewList = async () => {
    try {
      const response = await axios.get(
        `${VARIABLES.API_URL_REMOTE}/product-view-vegetable`
      );
      if (response.status === 200) {
        setVegetablesList(response.data.data);
      }
    } catch (error) {
      toast.error("failed to view");
      console.log(error);
    }
  };

  useEffect(() => {
    handleViewList();
    console.log(vegetableList);
  }, []);

  return (
    <>
      <h2>Vegetables</h2>
      <Row className="py-3">
        {Array.isArray(vegetableList) &&
          vegetableList.map((product) => (
            <Col key={product._id} md={4} lg={3}>
              <Link
                to={{
                  pathname: `/product-details/${product._id}`,
                  state: { product: product },
                }}
                className="text-decoration-none"
              >
                <Card className="mb-3">
                  <div className="d-block p-3">
                    <div className="d-flex">
                      <small className="w-50 text-start text-secondary">
                        {product.category.name}
                      </small>
                    </div>
                    <img
                      src={`${VARIABLES.API_URL_REMOTE}/uploads/${product.productImage}`}
                      alt={product.productImage}
                      srcSet=""
                      className="w-100"
                    />
                    <div className="d-block text-start mb-3">
                      <h4>₹{product.price}</h4>
                      <h6>{product.name}</h6>
                    </div>
                    <button className="btn_white w-100">Add to cart</button>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Vegetables;
