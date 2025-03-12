import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const ProductCard = ({item}) => {
  return <Card style={{ width: '300px',height:'500px' }}>
  <Card.Img variant="top" src={item.image_link} style={{height:'50%',objectFit:"contain"}}/>
  <Card.Body>
    <Card.Title>{item.title}</Card.Title>
    <Card.Text>
      {item.price}
    </Card.Text>
  </Card.Body>
</Card>;
};

export default ProductCard;
