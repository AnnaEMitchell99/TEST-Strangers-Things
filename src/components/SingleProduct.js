

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// const SingleProduct = (props) => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await fetch(`${BaseUrl}/posts/${id}`);
//         const data = await response.json();
//         setProduct(data.data.post);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProductData();
//   }, [id]);

//   return (
//     <div>
//       {product ? (
//         <>
//           <h2>{singleProductElement.title}</h2>
//           <h2>{singleProductElement[id].title}</h2>
//           <p>Description: {singleProductElement.description}</p>
//           <p>Price: {singleProductElement.price}</p>
//           <p>Location: {singleProductElement.location}</p>
//           <p>Username: {product.username}</p>
//         </>
//       ) : (
//         <div>Loading...
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default SingleProduct;









// const CohortName = '2301-FTB-MT-WEB-FT';
// const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState([]);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await fetch(`${BaseUrl}/posts/${posts}`);
//         const translatedData = await response.json();
//         const actualProductData = translatedData.results
//         setProduct(actualProductData);
//       } catch (error) {
        
//       }
//     };

//     fetchProductData();
// //   }, [id]);
// }, []);

//   return (
//     <div>
//       {product ? (
//         <>
//           <h2>{product.title}</h2>
//           <p>Description: {product.description}</p>
//           <p>Price: {product.price}</p>
//           <p>Location: {product.location}</p>
//           <p>Username: {product.username}</p>
//         </>
//       ) : (
//         <div>Loading...</div>
//       )}

//     </div>
//   );
//  };




// export default SingleProduct;






// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

// const SingleProduct = (props) => {
//   const { id } = useParams();
//   const [product, setProduct] = useState([]);
//   const {productProps} = props;

//   const mySelectedProduct = productProps;

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await fetch(`${BaseUrl}/posts`);

//         const translatedData = await response.json();

//         const actualProductData = translatedData.data.posts

//         setProduct(actualProductData)
//       } catch (error) {
        
//       }
//     };

//     fetchProductData();
//   }, [id]);

//   return (
//     <div>
//       {product ? (
//         <>
          
//           {/* <h2>{props.productProps.title}</h2> */}
//           <p>Description: {product.description}</p>
//           <p>Price: {product.price}</p>
//           <p>Location: {product.location}</p>
//           <p>Username: {product.username}</p>
//         </>
//       ) : (
//         <div>Loading...</div>
//       )}

//     </div>
//   );
// };

// export default SingleProduct;




const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const SingleProduct = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        
      console.log(props.productProps)

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
    <div>
      {product ? (
        <>
          <h2>{product.title}</h2>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Location: {product.location}</p>
          <p>Username: {product.author.username}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleProduct;


