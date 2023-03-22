
import { Link } from "react-router-dom";
import { useState } from "react";
import "./AllProducts.css"
import SingleProduct from "./SingleProduct";
const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

const AllProducts = (props) => {
    const { productProps, setProductProps } = props;

    const [searchQuery, setSearchQuery] = useState("");

    let filteredProducts = productProps.filter((singleProductElement) => {
        let lowerCasedTitle = singleProductElement.title.toLowerCase();
        return lowerCasedTitle.includes(searchQuery.toLowerCase())
    })

    async function deletePost(id) {
        try {
          const myJWT = localStorage.getItem("token");
          const response = await fetch(`${BaseUrl}/posts/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myJWT}`,
            },
            // body: JSON.stringify({ post: { _id: id } }),
          });
          const result = await response.json();
          console.log(result);
          if (result.success) {
            const updatedProducts = productProps.filter(
              (product) => product._id !== id
            );
            setProductProps(updatedProducts);
          }
          return result;
        } catch (err) {
          console.error(err);
        }
      }

    return (
        <div id="allReturn">
        <input id="searchbar"
        type="text"
        placeholder = "Search for items here"
        onChange={(event) => {
            setSearchQuery(event.target.value)
        }}
        >
        </input>
        <section id="list-of-products-section">
            {
                    filteredProducts.length ? filteredProducts.map((SingleProductElement, idx) => {
                    return (
                        <div id="descriptors" key={idx}>
                            <p className="descriptor">Title: {SingleProductElement.title}</p>
                            <p className="descriptor">Description: {SingleProductElement.description}</p>
                            <p className="descriptor">Price: {SingleProductElement.price}</p>
                            <p className="descriptor">Location: {SingleProductElement.location}</p>
                            <Link to={"/products/" + SingleProductElement._id} className="descriptor"> View details </Link>
                            <SingleProduct productProps={SingleProductElement}/>
                            <button 
                                // value={SingleProductElement._id} 
                                value={SingleProductElement._id} 
                                onClick={() => deletePost(SingleProductElement._id)} 
                            >
                                Delete {SingleProductElement.title}
                            </button>
                        </div>
                    )
                }) : <div>No Products Found</div>
            }
        </section>
        </div>
    )

}


export default AllProducts;