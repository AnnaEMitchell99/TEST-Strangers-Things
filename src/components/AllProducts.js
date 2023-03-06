
import { Link } from "react-router-dom";
import { useState } from "react";
// import "./AllProducts.css"
import SingleProduct from "./SingleProduct";

const AllProducts = (props) => {
    const { productProps } = props;

    return (
        <section id="list-of-products-section">
            {
                productProps.length ? productProps.map((SingleProductElement, idx) => {
                    return (
                        <div key={idx}>
                            <p>Title: {SingleProductElement.title}</p>
                            <p>Description: {SingleProductElement.description}</p>
                            <p>Price: {SingleProductElement.price}</p>
                            <p>Location: {SingleProductElement.location}</p>
                            {/* <p>Username: {product.author.username}</p> */}
                            {/* <Link to={"/singleproduct/" + idx}>Go to</Link> */}
                            <Link to={`/products/${SingleProductElement._id}`}>Go to {SingleProductElement.title}</Link>
                        </div>
                    )
                }) : <div>No Products Found</div>
            }
        </section>
    )

}


export default AllProducts;