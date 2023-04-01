import React from 'react';
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((page, index) => {
            return <button key={index} onClick = { () => paginate(page)}> { page } </button>
            })
        }
      </ul>
    </nav>
  );
};

export default Pagination;