import React, { useState, useEffect } from "react";
import globalStyles from "../../../styles/main.module.scss";
import styles from "./Markets.module.scss";
import Pagination from "../../Pagination/Pagination";
import Posts from "./Posts";
import Hero from "../../UI/Hero/Hero";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";
import { useGetCompaniesQuery } from "../../../redux/slices/api/finnhubApiSlice";
import Loader from "../../UI/Loader/Loader";

const Markets = () => {
  // declares a new state variable setSortedStocks and initializes it with the value false
  const [sortedStocks, setSortedStocks] = useState(false);
  // declares a new state variable sortOrder and initializes it with the value "asc".
  // Also declares a setter function setSortOrder that will be used to update the sortOrder state variable
  const [sortOrder, setSortOrder] = useState("asc");
  const [buttonText, setButtonText] = useState(
    sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"
  );

  //This function toggles the sort order when the user clicks the Sort button
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortedStocks((prevState) => !prevState);
  };

  useEffect(() => {
    // Set the button text to the new value with a 300ms delay
    setTimeout(() => {
      setButtonText(sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A");
    }, 200);
  }, [sortOrder]);

  const { data, isLoading, isError, isSuccess } = useGetCompaniesQuery();

  const output =
    data &&
    data.map((item) => item).filter((stock) => stock.type === "Common Stock");

  const getStockData = () => {
    const sortedData =
      output &&
      output.slice().sort((a, b) => {
        return a.displaySymbol.localeCompare(b.displaySymbol);
      });

    // Rearrange the data to match the desired sort order
    if (sortOrder === "asc") {
      return sortedData;
    } else {
      return sortedData.reverse();
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    getStockData() && getStockData().slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* {!isLoading && <Loader />} */}
      {isError && <h2>ERROR!!!</h2>}

      <div style={{ position: "relative", height: "100%" }}>
        {/* Hero Section */}
        {isLoading ? (
          <Loader />
        ) : (
          <Hero>
            {/* SORT SECTION */}
            <section className={styles.sortSection}>
              {/* Create a button to trigger toggleSort function when clicked */}
              <button className={globalStyles.sortButton} onClick={toggleSort}>
                {/* Change button text depending on the sortOrder state */}
                {/* {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"} */}
                <span className={styles.buttonText}>{buttonText}</span>
                <img
                  src={DownVectorIcon}
                  alt="Vector"
                  className={sortedStocks ? styles.rotated : ""}
                />
              </button>
            </section>

            {/* STOCKS SECTIONS */}
            <section>
              <Posts posts={currentPosts} />
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={output && output.length}
                paginate={paginate}
              />
            </section>
          </Hero>
        )}
      </div>
    </>
  );
};

export default Markets;
