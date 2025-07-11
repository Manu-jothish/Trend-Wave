import React from "react";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductQuery } from "../slices/productApiSlice";
import { useParams } from "react-router-dom";
import Product from "../components/Product";

function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductQuery();

  return (
    <>
      <h1>Latest Product</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <>
          <Row>
            {products?.products?.map((product, index) => (
              <Col sm={12} md={6} ig={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;
