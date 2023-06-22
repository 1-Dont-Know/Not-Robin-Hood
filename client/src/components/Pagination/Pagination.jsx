import React, { useState, useEffect } from 'react';
import styles from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../redux/slices/darkModeSlice';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    {/* Dark Mode Theme*/}
    const darkModeTheme = useSelector(selectDarkMode);
    // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
    useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
    {/* End Dark Mode Theme*/}

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
        <li className={`${styles.paginationSeparator} ${darkModeTheme ? styles["dark-mode"] : ""}`} key={index}>
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
              <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={() => handlePageClick(page)}>{page}</button>
            </li>
          );
        })}
        <li className={`${styles.paginationSeparator} ${darkModeTheme ? styles["dark-mode"] : ""}`}>...</li>
        <li>
          <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={() => handlePageClick(pageNumbers.length)}>{pageNumbers.length}</button>
        </li>
      </>
    );
  } else if (currentPage > 3 && currentPage < pageNumbers.length - 2) {
    pageLinks = (
      <>
        <li>
          <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={() => handlePageClick(1)}>1</button>
        </li>
        <li className={`${styles.paginationSeparator} ${darkModeTheme ? styles["dark-mode"] : ""}`}>...</li>
        {[currentPage - 1, currentPage, currentPage + 1].map((page, index) => {
          return (
            <li key={index}>
              <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={() => handlePageClick(page)}>{page}</button>
            </li>
          );
        })}
        <li className={`${styles.paginationSeparator} ${darkModeTheme ? styles["dark-mode"] : ""}`}>...</li>
        <li>
          <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={() => handlePageClick(pageNumbers.length)}>{pageNumbers.length}</button>
        </li>
      </>
    );
  } else {
    pageLinks = (
      <>
        <li>
          <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={() => handlePageClick(1)}>1</button>
        </li>
        <li className={`${styles.paginationSeparator} ${darkModeTheme ? styles["dark-mode"] : ""}`}>...</li>
        {[pageNumbers.length - 4, pageNumbers.length - 3, pageNumbers.length - 2, pageNumbers.length - 1, pageNumbers.length].map((page, index) => {
          return (
            <li key={index}>
              <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={() => handlePageClick(page)}>{page}</button>
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
      <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={handlePrevClick}>Prev</button>
    );
  }

  if (currentPage < pageNumbers.length) {
    nextButton = (
      <button className={`${styles.paginationButton} ${darkModeTheme ? styles["dark-mode"] : ""}`} onClick={handleNextClick}>Next</button>
    );
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {prevButton}
        {pageLinks}
        {nextButton}
      </ul>
    </nav>
  );
};

export default Pagination;
