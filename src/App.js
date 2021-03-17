import React from "react";
import axios from "axios";
import "./styles.css";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);
  const fetchData = () => {
    axios
      .get(`https://picsum.photos/v2/list?page={pageCount}&limit=5`)
      .then((response) => {
        console.log(response);
        setResponseData([...responseData, ...response.data]);
        isNextFunc(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function fetchMoreData() {
    setCount(pageCount + 1);
    fetchData();
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fetching Data</h1>
      </header>
      <button type="button" onClick={fetchData}>
        Click for Data
      </button>
      <InfiniteScroll
        dataLength={responseData.length}
        next={fetchMoreData}
        hasMore={isNext}
        loader={
          <div style={{ overflow: "hidden" }}>
            <CircularProgress />
          </div>
        }
      >
        <table>
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">author</th>
              <th scope="col">width</th>
              <th scope="col">height</th>
              <th scope="col">url</th>
              <th scope="col">download_url</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((data, index) => (
              <tr key={index.toString()}>
                <td>{data.id}</td>
                <td>{data.author}</td>
                <td>{data.width}</td>
                <td>{data.height}</td>
                <td>{data.url}</td>
                <td>{data.download_url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}
export default App;
