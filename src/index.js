const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

import {createRoot} from "react-dom/client";
import {useState, useEffect} from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"; 
import { AllProducts, SingleProduct, RegisterForm, Login, CreatePost, UserProfile, Messages } from "./components";

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
       
        
    <BrowserRouter>

        <div>

            <div>
                <nav id="links">
                <Link to="/">Listings</Link>
                <Link to="/register">Sign Up</Link>
                <Link to="/login">Login</Link>
                {/* <Link to="/createPost">Create Post</Link> */}
                <Link to="/userProfile">Profile</Link>
                </nav>
               
               <section>
                {
                    
                }
               </section>
            </div>
              
            <Routes>
           
                <Route path="/"element={<AllProducts productProps={products} setProductProps={setProducts}/>} />
               
                <Route path="/products/:id" element={<SingleProduct productProps={products}/>} />

                <Route path="register" element={<RegisterForm />}/>

                <Route path="login" element={<Login />}/>

                <Route path="createPost" element={<CreatePost />}/>

                <Route path="userProfile" element={<UserProfile />}/>

                <Route path="messages" element={<Messages />}/>
                
            </Routes>
            
        </div>
    </BrowserRouter>
   
    )
}

const appElement = document.getElementById("app");
const root = createRoot(appElement);
root.render(<App />)
