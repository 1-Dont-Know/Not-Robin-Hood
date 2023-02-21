// Button component receive a prop with the type of the button, applied className will be based on the prop, types: 'login', 'google, 'default'

import React from "react";
import styles from "./Search.module.scss";

const Search = ({ placeholder }) => {
    return (
        <div class={styles.container}>
            <input className={styles.search} type="text" placeholder={placeholder} />
        </div>
    );
};

export default Search;