
import { Link } from "react-router-dom";
import { useState } from "react";
import "./AllProducts.css"
import SingleProduct from "./SingleProduct";

const AllProducts = (props) => {
    const { productProps } = props;

    const [searchQuery, setSearchQuery] = useState("");

    let filteredProducts = productProps.filter((singleProductElement) => {
        let lowerCasedTitle = singleProductElement.title.toLowerCase();
        return lowerCasedTitle.includes(searchQuery.toLowerCase())
    })

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
                        </div>
                    )
                }) : <div>No Products Found</div>
            }
        </section>
        </div>
    )

}


export default AllProducts;