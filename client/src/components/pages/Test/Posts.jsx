import React from 'react';

const Posts = ({ posts }) => {

  return (
    <ul>
        {posts && posts.map((item,idx) => (
            <li key={idx}> {item.displaySymbol} ------------- {item.description} -----  </li> 
        ))}
    </ul>
  );
};

export default Posts;