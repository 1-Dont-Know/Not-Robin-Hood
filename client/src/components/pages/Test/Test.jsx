import React, { useState, useEffect } from "react";
import { useGetPriceQuery, useGetCompaniesQuery } from "../../../redux/slices/apiSlice";


const Test = () =>{
    const { data, isLoading, isError, isSuccess } = useGetCompaniesQuery();

    const output = data && data.slice(0,100).map(item => item).filter(stock => stock.type === "Common Stock");

    const { data: priceData, isLoading: priceLoading } = useGetPriceQuery();

    console.log(output);

    const [stockPrice, setStockPrice] = useState(); 

    useEffect(() => {
        
    }, [])

    // console.log(stockPrice);

    return(
        <div> 
            <h1>Hello</h1>
             {isLoading && <h2> ...Loading... </h2>}
             {isError && <h2>ERROR!!!</h2>}
             {isSuccess && (
                <div>
                    {output.map((item,idx) => (
                        <p key={idx}>{item.displaySymbol} ------------- {item.description}  </p>
                    ))}
                </div>
            )}
        </div> 
    ) 
}
 
export default Test;