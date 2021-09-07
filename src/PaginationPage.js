import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";
import { useState, useEffect } from "react";

export default function PaginationPage(props) {
  const { onPageChange, active, pageCount } = props;

  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
  );
}
