import axios, { all } from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useSWR,{mutate} from "swr";
import ProductCard from "./ProductCard";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import CloseButton from 'react-bootstrap/CloseButton';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Search from "./Search";
import Button  from "react-bootstrap/Button";
import Filters from "./Filters";
import PaginationEx from "./Pagination";
import NoDataFound from "./NoDataFound";
import { Form, InputGroup } from "react-bootstrap";
const ProductList = () => {
 
const {products,isLoading,setPage,clearAllFilters,handleBack,handleCheck,handleSearch,removeFilter,query,allValues,totalItems,handleLanguage,searchParam}=useProductData()


  if (isLoading) return <Spinner />;
  return (
    <>
  <div className="d-flex justify-content-center p-5 gap-5">
 <InputGroup className="mb-3 w-50 mx-auto">
      <Form.Control
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="border-primary"
      />
      <Button onClick={handleSearch}>Search</Button>
    </InputGroup>
  <select name="" id="" value={searchParam.get('index')||'English'} onChange={(e)=>handleLanguage(e)}>
<option value="English">English</option>
<option value="Arabic">Arabic</option>
  </select>
    

  </div>
    <div className="d-flex p-3">
        <div className="">

        </div>
        <div className="p-3">
        {allValues.length>2  && <Button onClick={clearAllFilters}>Clear all</Button>}
<div className="p-1">
{
  allValues?.map((value) => 
    value[0] !== 'query' && value[0]!=='page'? (
      <div className="d-flex" key={value[1]}>
                <CloseButton onClick={() => removeFilter(value[0], value[1])} />
                <p>{value[1]}</p>
            </div>
        ) : null
      )
}

</div>
<Filters products={products?.data?.filter_list} handleCheck={handleCheck}/>
        </div>
        <Container className="p-3">
      <PaginationEx pagecount={totalItems} handlePage={setPage}/>
  <Row>
    {products?.data?.items?.length > 0 ? (
      products.data.items.map((item) => (
        <Col xs={3} key={item.id}>
          <ProductCard item={item} />
        </Col>
      ))
    ) : (
      <NoDataFound handleBack={handleBack}/>
    )}
  </Row>
</Container>
      </div>
      <PaginationEx pagecount={totalItems} handlePage={setPage}/>

    </>
  );
};

export default ProductList;
const useProductData=()=>{
  const [searchParam, setSearchParam] = useSearchParams();
  const [query, setQuery] = useState("");
const [language,setLanguage]=useState('')
  const navigate=useNavigate()
  const allValues=Array.from(searchParam.entries())

  const filter = Array.from(searchParam).reduce((acc, [key, value]) => {
    if (key !== "query"&&key!=="page" && key!=='index') {
        acc[key] = acc[key] ? [...acc[key], value] : [value];
    }
    return acc;
}, {});

console.log(filter);
const languageConfigs = [
  {
    label: "English",
    indexName: "qa-en",
    // clientId: "7645129791",
    // secretKey: "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
    options:{
      "Client-id": "7645129791",
      "Secret-key": "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
      "Content-Type": "application/json",
    }
  },
  {
    label: "Arabic",
    indexName: "qa-ar",
   options:{
    "Client-id": "5807942863",
    "Content-Type": "Llz5MR37gZ4gJULMwf762w1lQ13Iro",
    "Content-Type": "application/json",

   }
  },
];
const handleLanguage=(e)=>{
  const newParams=new URLSearchParams(searchParam)
  
  newParams.set('index',e.target.value)
  setSearchParam(newParams)
  mutate("search", async () => {
    const response = await axiosInstance.post("search", {
      search: searchParam.get("query"),
      filter: filter,
      size: 28,
      sort_by: "1",
      page: 1,
    }, { headers: indexKey });

    return response.data;
  });
}
const indexKey = languageConfigs.find(lan => lan.label === searchParam.get('index'))?.options || {
  "Client-id": "7645129791",
  "Secret-key": "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
  "Content-Type": "application/json",
};


  const search = {
    search: searchParam.get("query"),
    filter: filter,
    size: 28,
    sort_by: "1",
    page: Number(searchParam.get('page'))||1,
  };
  const axiosInstance = axios.create({
    baseURL: " https://uat.search-assist.webc.in/api/",

    timeout: 10000,
  });

  const fetcher = (url) => {
    const response = axiosInstance.post(url, search, {
      headers: indexKey,
    });
    if (response) {
      return response;
    } else {
      console.log("error in fetching");
    }
  };

  const { data: products, isLoading, error } = useSWR("search", fetcher,{keepPreviousData:true});
  const totalItems = products?.data?.total || 0;
  console.log(products?.data?.total);
  
const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (searchParam.has('query')) {
        newParams.set('query', searchParam.get('query'));
    }
    if (searchParam.has('page')) {
        newParams.append('page', searchParam.get('page'));
    }
    setSearchParam(newParams);
    mutate("search", async () => {
        const response = await axiosInstance.post("search", {
          search: newParams.get("query"),
          filter: filter,
          size: 28,
          sort_by: "1",
          page: searchParam.get('page')||1,
        }, { headers: indexKey });
    
        return response.data;
      });
    window.scrollTo({ top: "0px", behavior: "smooth" });
  };
  const handleBack=()=>{
    navigate(-1)
    mutate("search", async () => {
        const response = await axiosInstance.post("search", {
          search: searchParam.get("query"),
          filter: filter,
          size: 28,
          sort_by: "1",
          page: searchParam.get('page')||1,
        }, { headers: indexKey });
    
        return response.data;
      });
  }
  const removeFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParam);
    newParams.delete(key, value);
    setSearchParam(newParams);
    mutate("search", async () => {
        const response = await axiosInstance.post("search", {
          search: newParams.get("query"),
          filter: filter,
          size: 28,
          sort_by: "1",
          page: 1,
        }, { headers: indexKey });
    
        return response.data;
      });
    console.log(filter);
    
  };
  const setPage=(count)=>{
    const newParams = new URLSearchParams(searchParam);
    newParams.set("page", count.toString());
setSearchParam(newParams)
mutate("search", async () => {
    const response = await axiosInstance.post("search", {
      search: newParams.get("query"),
      filter: filter,
      size: 28,
      sort_by: "1",
      page: 1,
    }, { headers: indexKey });

    return response.data;
  });

  }
  const handleCheck = (category, value) => {
    const newParams = new URLSearchParams(searchParam);
    console.log(newParams);
    const existingValue = newParams.getAll(category);
    if (existingValue.includes(value)) {
      newParams.delete(category, value);
    } else {
      newParams.append(category, value);
    }
    setSearchParam(newParams);
    mutate("search", async () => {
        const response = await axiosInstance.post("search", {
          search: newParams.get("query"),
          filter: filter,
          size: 28,
          sort_by: "1",
          page: 1,
        }, { headers: indexKey });
    
        return response.data;
      });
    window.scrollTo({ top: "0px", behavior: "smooth" });
  };
  const handleSearch=(e)=>{
setQuery(e.target.value)
const newParams = new URLSearchParams();
newParams.set('query',query)
setSearchParam(newParams)
mutate("search", async () => {
    const response = await axiosInstance.post("search", {
      search: searchParam.get("query"),
      filter: filter,
      size: 28,
      sort_by: "1",
      page: 1,
    }, { headers: indexKey });

    return response.data;
  });
  }
  return {products,isLoading,setPage,clearAllFilters,handleBack,handleCheck,handleSearch,removeFilter,query,allValues,totalItems,handleLanguage,searchParam}
}