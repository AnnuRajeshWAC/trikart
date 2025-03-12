import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSearchParams } from "react-router-dom";
import { mutate } from "swr";

const PaginationEx = ({ pagecount,handlePage }) => {
  const [searchParam, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParam.get("page")) || 1;
  const totalPages = Math.ceil(pagecount / 28); 

 
  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={()=>handlePage(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={ ()=>handlePage(currentPage - 1)} disabled={currentPage === 1} />

      {Array.from({ length: totalPages}, (_, i) => i + 1).map((p) => (
        <Pagination.Item
        key={p}
          onClick={()=>handlePage(p)}
          active={searchParam.get("page") === p.toString()}
        >
          {p}
        </Pagination.Item>
      ))}

      {currentPage + 2 < totalPages && (
        <Pagination.Item onClick={()=>handlePage(totalPages)}>
          {totalPages}
        </Pagination.Item>
      )}

      <Pagination.Next onClick={ ()=>handlePage(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={ ()=>handlePage(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default PaginationEx;
