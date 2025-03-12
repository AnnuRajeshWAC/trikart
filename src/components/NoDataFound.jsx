import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { mutate } from "swr";
const NoDataFound = ({handleBack}) => {

  return (
    <Container className="text-center mt-5">
      <h2>No Data Found</h2>
      <p>Sorry, we couldn't find any results matching your search.</p>
      <Button onClick={handleBack} variant="primary">
        Go Back
      </Button>
    </Container>
  );
};

export default NoDataFound;
