
const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SingleProduct.css"


const SingleProduct = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));


  useEffect(() => {
    const fetchProductData = async () => {

      try {

        if (!Array.isArray(props.productProps)) {
          return;
        }
        

      let individualProduct = props.productProps.filter((SingleProduct) => {
          if (SingleProduct._id == id){
            return SingleProduct
          }
        })

      setProduct(individualProduct[0])
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, []);

 

  return (
    <div id="allReturn">
      {product ? (
        <>
          <h2>{product.title}</h2>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Location: {product.location}</p>
          <p>Username: {product.author.username}</p>
        
        </>
      ) : (
        <div id="emptyDiv"></div>
      )}
    </div>
  );
};

export default SingleProduct;


