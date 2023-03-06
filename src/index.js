const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

import {createRoot} from "react-dom/client";
import {useState, useEffect} from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"; 
import { AllProducts, SingleProduct, Homepage } from "./components";

const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
   
    const fetchProductData = async() => {
        try {
            
            const response = await fetch(`${BaseUrl}/posts`);

            const translatedData = await response.json();

            const actualProductData = translatedData.data.posts

            setProducts(actualProductData)
            
        } catch (error) {
            console.log(error);
        }
    }

        fetchProductData();
    }, [])

    return(
        // <div> 
        
    <BrowserRouter>

        <div>

            <div>
                <nav>
                <Link to="/">Homepage</Link>
                </nav>
                <nav>
                    {/* <Link to="./AllProducts">All Products</Link> */}
                    
                </nav>
               <section>
                {
                    
                }
               </section>
            </div>
                {/* {
                    products.length ? products.map((singleProductElement, idx) => {
                        return (
                            <div>
                                <p id="title">Title: {singleProductElement.title}</p>
                                <p id="description">Description: {singleProductElement.description}</p>
                                <p id="price">Price: {singleProductElement.price}</p>
                                <p id="location">Location: {singleProductElement.location}</p>
                                <p id="username">Username: {singleProductElement.username}</p>
                            </div>
                        )
                    }) : <div>No data yet</div>
                } */}
            <Routes>
                {/* <Route path="/posts"element={<AllProducts productProps={products}/>} /> */}
                <Route path="/"element={<AllProducts productProps={products}/>} />
                {/* <Route path="/allproducts/" component={<AllProducts productProps={products} setProducts={setProducts}/>} /> */}
                {/* <Route path="/" element={<Homepage />} /> */}
                {/* <Route path="/products" element={<AllProducts productProps={products} />} /> */}
                <Route path="/products/:id" element={<SingleProduct />} />
            </Routes>
            
        </div>
    </BrowserRouter>
    // </div>
    )
}

const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<App />)
