import React from "react";
import styles from "./Search.module.scss";

// Search Bar component receives a placeholder prop for the search default message
const Search = ({ placeholder }) => {
    return (
        <div class={styles.container}>
            <input className={styles.search} type="text" placeholder={placeholder} />
        </div>
    );
};

export default Search;