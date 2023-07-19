import {React, useEffect, useState} from "react";
import styles from "./FeaturedStock.module.scss";
import featured from "../../../assets/icons/featured.svg";
import up from "../../../assets/icons/up.svg";
import {useGetPriceQuery} from "../../../redux/slices/api/finnhubApiSlice";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';


const FeaturedStock = ({symbol, name}) => {
	const darkModeTheme = useSelector(selectDarkMode);
	useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;

	const {data, error, isLoading} = useGetPriceQuery(symbol);
	const [status, setStatus] = useState(); //State used to track if there is current gain or loss for stock

	useEffect(() => {
		if (data) {
			setStatus(() => {
				return parseFloat(data.d) > 0 ? "up" : "down";
			});
			// console.log(data);
			// console.log(typeof data.d)
		}
	}, [data]);

	return (
		data && (
			<Link
				to={{
					pathname: "/stock-viewer",
					search: `?symbol=${symbol}&description=${name.replace(/\s+/g, "+")}`,
				}}>
				<div className={`${status === "up" ? styles.positive : styles.negative} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
					<div className={`${styles.stockInformation} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
						<div className={`${styles.stockIcon} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
							<img src={featured} alt="stock-icon" />
						</div>
						<div className={`${styles.stockName} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
							<h1>{symbol}</h1>
							<h4>{name}</h4>
						</div>
					</div>
					<div className={`${styles.stockResults} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
						<p>{parseFloat(data.d.toFixed(2)) > 0 ? `+$${data.d.toFixed(2)} (${data.dp.toFixed(2)}%)` : `-$${data.d.toString().slice(1)} (${data.dp.toFixed(2)}%)`}</p>
						<span>
							<img src={up} alt="up" />
						</span>
					</div>
					<div className={styles.stockPrice}>
						{`$${data.c.toFixed(2)}`}
					</div>
				</div>
			</Link>
		)
	);
};

export default FeaturedStock;
