import "./styles.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationPage from "./PaginationPage";

export default function App() {
  const [data, setData] = useState(null);
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [active, setActive] = useState(1);

  useEffect(() => {
    // get Call
    Axios.get("https://jsonplaceholder.typicode.com/comments").then(
      (response) => {
        setData(response.data);

        let totalData = response.data;
        if (totalData.length > 100) {
          let pageCount = totalData.length / 100;
          setPageCount(pageCount);
          let pageData = response.data.slice(0, 100);
          setPageData(pageData);
        }
      }
    );
  }, []);

  function onPageChange(number) {
    let upperNum = (number - 1) * 100;
    let lowerNum = number * 100;
    let pageData = data.slice(upperNum, lowerNum);
    setPageData(pageData);
    setActive(number);
  }

  return (
    <div className="App">
      {
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>postID</th>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {pageData &&
              pageData.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.postId}</td>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.body}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      }
      <div>
        <PaginationPage
          pageCount={pageCount}
          active={active}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
