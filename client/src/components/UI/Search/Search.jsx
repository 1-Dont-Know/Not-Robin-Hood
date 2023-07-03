import React, {useState, useEffect, useRef} from "react";
import styles from "./Search.module.scss";
import {Link} from "react-router-dom";
import {useGetStockTickerQuery} from "../../../redux/slices/api/alphaVantageApiSlice";
// Dark Mode
import {useSelector} from "react-redux";
import {selectDarkMode} from "./../../../redux/slices/darkModeSlice";

// Search Bar component receives a placeholder prop for the search default message
const Search = ({placeholder}) => {
	// useDebounce Hook that tracks when the user's search query changes by using useEffect
	function useDebounce(value, delay) {
		// State and setters for debounced value
		const [debouncedValue, setDebouncedValue] = useState(value);

		useEffect(
			() => {
				// Update debounced value after delay
				const handler = setTimeout(() => {
					setDebouncedValue(value);
					setResultsIsOpen(true);
					// console.log(searchQuery);
				}, delay);

				// Cancel the timeout if value changes (also on delay change or unmount)
				// This is how we prevent debounced value from updating if value is changed ...
				// .. within the delay period. Timeout gets cleared and restarted.
				return () => {
					clearTimeout(handler);
				};
			},
			[value] // Only re-call effect if value changes
		);

		return debouncedValue;
	}

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 500);
	const [resultsIsOpen, setResultsIsOpen] = useState(false);

	//Function that handles when the user changes the text in the search bar
	const inputChanged = (e) => {
		setSearchQuery(e.target.value);
	};

	// Dark Mode Theme
	const darkModeTheme = useSelector(selectDarkMode);
	// When Settings page is rendered, we will set our localstorage "darkMode": false by default;
	useEffect(() => {
		localStorage.setItem("darkMode", darkModeTheme);
	}, [darkModeTheme]);

	//Alpha Vantage API call to search for company/stock ticker. Only runs after set amount of time defined by useDebounce call.
	//Skips calling the API if the search query is an empty string.
	const {
		data: {bestMatches} = {},
		isSuccess,
		isLoading,
		isError,
	} = useGetStockTickerQuery(debouncedSearchQuery);

	/* Function to handle if user clicks outside search box or search window */
	function useOutsideAlerter(ref) {
		useEffect(() => {
			//Run if clicked on outside of element
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					// console.log("You clicked outside of the search window");
					setResultsIsOpen(false);
					setSearchQuery("");
				}
			}
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	/********************************************************************/

	/*Display Search Results to Console for Testing*/
	// useEffect(() => {
	//   if (bestMatches) {
	//     console.log(bestMatches);
	//   }
	// }, [bestMatches]); // Only re-call effect if value or delay changes
	/***********************************************/

	return (
		<div ref={wrapperRef}>
			{/* Search Field */}
			<div className={`${styles.container} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
				<input
					className={`${styles.search} ${darkModeTheme ? styles["dark-mode-search"] : ""}`}
					type="text"
					placeholder={placeholder}
					value={searchQuery}
					onChange={inputChanged}
				/>
			</div>

			{
				//If there is no data, or if there is a blank search query, or if the search results box is not open, render empty search results
				!bestMatches || searchQuery === "" || resultsIsOpen === false ? (
					<></>
				) : (
					//Otherwise, render the list of search results
					<ul
						className={`${styles.searchResults} ${
							darkModeTheme ? styles["dark-mode-results"] : ""
						}`}>
						{
							//If best matches exist, render list
							bestMatches.map((item) => {
								return (
									item["4. region"] === "United States" && (
										<li key={item["1. symbol"]}>
											<Link
												className={`${styles.listResult} ${
													darkModeTheme ? styles["dark-mode"] : ""
												}`}
												to={{
													pathname: "/stock-viewer",
													search: `?symbol=${item["1. symbol"]}&description=${item[
														"2. name"
													].replace(/\s+/g, "+")}`,
												}}
												onClick={() => setResultsIsOpen(false)}>
												<span>{item["2. name"]}</span>
												<span style={{color: "green"}}>{item["1. symbol"]}</span>
											</Link>
										</li>
									)
								);
							})
						}
					</ul>
				)
			}
		</div>
	);
};

export default Search;
