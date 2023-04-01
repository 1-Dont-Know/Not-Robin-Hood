import React, { useState } from 'react';
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = pageNumbers.slice(indexOfFirstPage, indexOfLastPage);

  const handlePrevClick = () => {
    setCurrentPage(prevState => prevState - 1);
  }

  const handleNextClick = () => {
    setCurrentPage(prevState => prevState + 1);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  }

  let pageLinks = null;

  if (pageNumbers.length <= 5) {
    pageLinks = pageNumbers.map((page, index) => {
      return (
        <li key={index}>
          <button onClick={() => handlePageClick(page)}>{page}</button>
        </li>
      );
    });
  } else if (currentPage <= 3) {
    pageLinks = (
      <>
        {[1, 2, 3, 4, 5].map((page, index) => {
          return (
            <li key={index}>
              <button onClick={() => handlePageClick(page)}>{page}</button>
            </li>
          );
        })}
        <li>...</li>
        <li>
          <button onClick={() => handlePageClick(pageNumbers.length)}>{pageNumbers.length}</button>
        </li>
      </>
    );
  } else if (currentPage > 3 && currentPage < pageNumbers.length - 2) {
    pageLinks = (
      <>
        <li>
          <button onClick={() => handlePageClick(1)}>1</button>
        </li>
        <li>...</li>
        {[currentPage - 1, currentPage, currentPage + 1].map((page, index) => {
          return (
            <li key={index}>
              <button onClick={() => handlePageClick(page)}>{page}</button>
            </li>
          );
        })}
        <li>...</li>
        <li>
          <button onClick={() => handlePageClick(pageNumbers.length)}>{pageNumbers.length}</button>
        </li>
      </>
    );
  } else {
    pageLinks = (
      <>
        <li>
          <button onClick={() => handlePageClick(1)}>1</button>
        </li>
        <li>...</li>
        {[pageNumbers.length - 4, pageNumbers.length - 3, pageNumbers.length - 2, pageNumbers.length - 1, pageNumbers.length].map((page, index) => {
          return (
            <li key={index}>
              <button onClick={() => handlePageClick(page)}>{page}</button>
            </li>
          );
        })}
      </>
    );
  }

  let prevButton = null;
  let nextButton = null;

  if (currentPage > 1) {
    prevButton = (
      <button onClick={handlePrevClick}>Prev</button>
    );
  }

  if (currentPage < pageNumbers.length) {
    nextButton = (
      <button onClick={handleNextClick}>Next</button>
    );
  }

  return (
    <nav>
      <ul className='pagination'>
        {prevButton}
        {pageLinks}
        {nextButton}
      </ul>
    </nav>
  );
};

export default Pagination;
