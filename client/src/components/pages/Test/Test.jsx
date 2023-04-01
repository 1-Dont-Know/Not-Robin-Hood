import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
import { useGetCompaniesQuery } from "../../../redux/slices/apiSlice";
// import { useGetPriceQuery, useGetCompaniesQuery, useGetDetailQuery } from "../../../redux/slices/apiSlice";.
// import axios from 'axios';
import Pagination from "./Pagination"
import Posts from './Posts'

const Test = () =>{
    // const { data, isLoading, isError, isSuccess } = useGetCompaniesQuery();

    // const output = data && data.slice(0,100).map(item => item).filter(stock => stock.type === "Common Stock");

    // console.log(output)

    // const symbol = output && output.slice(0,1).map(item => item.displaySymbol)
    // console.log(symbol)

    // const { data: priceData, isLoading: priceLoading } = useGetPriceQuery(symbol);

    // if(isLoading){}
    // else{
    //     console.log(priceData)
    // }
    // console.log(output);


    // const { data, isLoading, isError, isSuccess } = useGetDetailQuery('A');
    // console.log(data)

    // const [stockPrice, setStockPrice] = useState(); 
    // const symbols = data && data.map(company => company.symbol);
    // console.log(symbols) 

    // const pleaseWork = (symbol) => {
    //     let result = "";
    //     axios.get(`https://finnhub.io/api/v1/quote?symbol=APL&token=cgal7v9r01qkpvoj1i80cgal7v9r01qkpvoj1i8g`)
    //         .then(res =>{
    //             console.log(res)
    //         })
    // }

    // useEffect(() => {
    //     // axios.get(url)
    //     //     .then(res => {
    //     //         const persons = res.data;
    //     //         console.log(persons)
    //     //     })
    //     // pleaseWork();
    //     // setStockPrice(item)
        
    // }, [])

    // console.log(stockPrice);


    const { data, isLoading, isError, isSuccess } = useGetCompaniesQuery();

    const output = data && data.slice(0,100).map(item => item).filter(stock => stock.type === "Common Stock");
    // console.log(output)

    // const [companies, setCompanies] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [postPerPage, setPostPerPage] = useState(10);

    // setCompanies(output);



    // const lastPostIndex = currentPage * postPerPage;
    // const firstPostIndex = lastPostIndex - postPerPage;

    // const currentPost = companies && companies.slice(firstPostIndex, lastPostIndex);
    // console.log(currentPost)

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = output && output.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div> 
            <h1>Hello</h1>
             {isLoading && <h2> ...Loading... </h2>}
             {isError && <h2>ERROR!!!</h2>}
             {isSuccess && (
                <div>
                    {/* {output.map((item,idx) => (
                        <p key={idx}>{item.displaySymbol} ------------- {item.description} -----  </p>
                    ))} */}

                    <Posts posts={currentPosts}  />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={ output && output.length}
                        paginate={paginate}
                    />
                </div>
            )}

            {/* {isSuccess && (
                <Pagination
                    totalPosts={output.length}
                    postPerPage={postPerPage}
                    setCurrentPage ={setCurrentPage}
                />
            )} */}
            {/* <Pagination
                totalPosts={output.length}
                postPerPage={postPerPage}
                setCurrentPage ={setCurrentPage}
            /> */}
        </div> 
    ) 
}
 
export default Test;

////////////////------------------------------------------------

// {isSuccess && (
//     <div>
//         {data && data.result.map((data, idx) => {
//             if(data.result.type === "Common Stock"){
//                 <p key = {idx}> {data.displaySymbol}</p>
//             }
//         }
//         )}
//     </div>
// )}

///////////////////--------------------------------------------

// {isSuccess && (
//     <div>
//         {data && data.result.map((data, idx) => {
//             if(data.type == "Common Stock"){
//                 <p key = {idx}> {data.displaySymbol}</p>
//             }
//         }
//         )}
//     </div>
// )}

///////////////////--------------------------------------------




// useEffect(() => {
    //     if (isLoading) {
    //     } else {
    //         // const test = data.c;
    //         console.log(data);
    //         const test = data.c;
    //         setPriceStock(test);
    //     } 
    // }, []) 
    // console.log(priceStock);
   

    // const [companyList, setCompanyList] = useState(null);
    // const { data1, isLoading1 } = useGetCompaniesQuery();
    // const test = "";

    // if (isLoading1) {
    // } else {
    //     const test = data1;
    //     console.log(test);
    // };

    // useEffect(() => {
    //     if (isLoading1) {
    //     } else {
    //         const test = data1;
    //         setCompanyList(test);
    //         // console.log(companyList);
    //     }
    // }, [])

    // console.log(companyList);

    // setCompanyList(prevState => {
    //     return {
    //         ...prevState, 
    //         ...data.result
    //     }
    // });

    ////////////////////////////////////////////////////////////////////

    
    // useEffect(() => {
    //     // const test = "";
    //     let companies;
    //     if (isLoading) {
    //     } else { 
    //         // console.log(data);
    //         companies = data.result;
    //         setCompanyList(companies)
    //     };
    // }, []);
    // console.log(companyList); 
   
   
    // if (isLoading) {
    // } else {
    //     // setCompanyList(data.result);
    //     console.log(data);
    // }

    // useEffect(() => {
    //     // const test = "";
    //     let companies;
    //     companies = data.result;
    //     setCompanyList(companies)
    // }, []);

   

    // if (isLoading && !companyList) {
    // } else {
    //     // const test = data;
    //     // console.log(test);
    //     loadingData();
    // };

    // useEffect(() => {
    //     // if(!companyList){
    //     if (isLoading) {
    //     } else {
    //         setCompanyList(data.result);
    //         console.log(data); 
    //     }  
    //     // }
    //     // const loadingData = async () => {
    //     //     await setCompanyList(data.result);
    //     // }
    //     // if (isLoading) {
    //     // } else {
    //     //     const test = data;
    //     //     console.log(test);
    //     //     loadingData();
    //     // }
        
    // }, [])


    // useEffect( () => {
    //     const fetchData = async (data) => {
    //         // await  setCompanyList(data.result);
    //         console.log(data); 
    //     }

    //     fetchData(data);
    // },[])

    // ---- Serhii ---------------------
    // useEffect( () => {
        // const fetchData = async () => {
        //     await setCompanyList()
        // }

        // return () => {
        //     fetchData()
    //     }
    // },[])
    // --------------------------------

    // console.log(companyList)

    // if (isLoading) {
    //     return <h1>Loading....</h1>
    // }

    ////////////////////////////////////////////////////////////////////

    // const { data: price, isLoading: priceLoder } = useGetPriceQuery("AAPL");

    // let stockPrice;
    // if (priceLoder) {
    // } else {
    //     stockPrice = JSON.stringify(price.c);
    // } 
    // console.log(stockPrice)

    // const { data, isLoading } = useGetCompaniesQuery();
    // // const test = "";
    // let companies;
    // if (isLoading) {
    // } else {
    //     console.log(data);
    //     companies = data.result;
    // };
    // console.log(companies);

///////////////////////////////////////////////////////////////////////////////

    //   old way with old search ----------------------
//   const output = data && data.result.map(item => item).filter(stock => stock.type === "Common Stock");
//   console.log(output);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//     // const [companyList, setCompanyList] = useState();
//     const { data, isLoading, isError, isSuccess } = useGetCompaniesQuery();

//     const [companyList, setCompanyList] = useState(null);
//     // console.log(data);

//     // new way ----------------------------------
//     const output = data && data.map(item => item).filter(stock => stock.type === "Common Stock");
//     // console.log(output);

//     const [myState, setState] = useState();
//     const foobar = "";
//     const { data: priceData, isLoading: priceLoading } = useGetPriceQuery(myState);
//     // console.log(priceData)

//     // const output2 = output.map((item,idx) => (
//     //     foobar = item.displaySymbol
//     // ))
//     // console.log(priceData)


// //   const getStockPrice = (symbol) =>{
// //     const { data: priceData, isLoading: priceLoading } = useGetCompaniesQuery(symbol);
// //     if(priceLoading){
// //         <h1>Loading ... </h1>
// //     }else{
// //         return priceData;
// //     }
// //   }
//     // const symbols = output.map((item,idx) => (
//     //     useGetCompaniesQuery(item.displaySymbol)
//     // ))

//     // const getStockPrice = (symbol) => {
//     //     // setState(symbol)
//     //     axios.get("https://finnhub.io/api/v1/quote?symbol=AAPL&token=cgal7v9r01qkpvoj1i80cgal7v9r01qkpvoj1i8g")
//     //         .then((resp)=> {
//     //             setState(resp.data.c);
//     //         })
//     // }

//     // useEffect(() => {
//     //     getStockPrice();
//     // }, []) 


//     return(
//         <div> 
//             <h1>Hello</h1>
//             {/* // ---- Serhii --------------------- */}
//             {/* {!isLoading && companyList && companyList.slice(0,10).map((stock, idx) => {
//                 return (<p key={idx}>{stock.description}</p>)
//             })} */}
//             {/* <h1>{stockPrice}</h1> */}
//             {/* <h1>{companies}</h1> */}
//              {/* // ---- Serhii --------------------- */}
 
//              {isLoading && <h2> ...Loading... </h2>}
//              {isError && <h2>ERROR!!!</h2>}
//              {isSuccess && (
//                 <div>
//                     {output.map((item,idx) => (
//                         <p key={idx}>{item.displaySymbol} ------------- {item.description} ----------</p>
//                     ))}
//                 </div>
//             )}
//         </div> 
//     ) 
// }
 
// export default Test
