import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <InputGroup className="mb-3 w-50 mx-auto">
      <Form.Control
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="border-primary"
      />
      <Link to={`/product?query=${query}&page=1`} className="btn btn-primary">
        Search
      </Link>
    </InputGroup>
  );
};

export default Search;
