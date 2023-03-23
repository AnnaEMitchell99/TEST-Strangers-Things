
const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SingleProduct.css"


const SingleProduct = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const [ message, setMessage ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState("")


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

//   const handleMessageSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       // const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
//         const response = await fetch(`${BaseUrl}/posts/${postId}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           message: {
//             content: message,
//           },
//         }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         console.log(data.message);
//         setMessage('');
//         setSuccessMessage('Message sent successfully!');
//       } else {
//         console.error(data);
//         setErrorMessage('Failed to send message');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

 

//   return (
//     <div id="allReturn">
//       {product ? (
//         <>
//           <h2>{product.title}</h2>
//           <p>Description: {product.description}</p>
//           <p>Price: {product.price}</p>
//           <p>Location: {product.location}</p>
//           <p>Username: {product.author.username}</p>
//           <form onSubmit={handleMessageSubmit}>
//           // {errorMessage && <p>{errorMessage}</p>}
//           <label>
//             Message:
//             <textarea value={content} onChange={(e) => setContent(e.target.value)} />
//           </label>
//           <button type="submit">Send Message</button>
//         </form>
//         </>
//       ) : (
//         <div id="emptyDiv"></div>
//       )}
//     </div>
//   );
// };

// const [errorMessage, setErrorMessage] = useState('');

const handleMessageSubmit = async (event) => {
  event.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BaseUrl}/posts/${postId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: content,
        },
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      setMessage('Message sent successfully!');
    } else {
      console.error(data);
      setErrorMessage('Failed to send message');
    }
  } catch (error) {
    console.error(error);
  }
};

return (
  <div id="allReturn">
    {product ? (
      <>
        <h2>{product.title}</h2>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        <p>Location: {product.location}</p>
        <p>Username: {product.author.username}</p>
        <form onSubmit={handleMessageSubmit}>
          {errorMessage && <p>{errorMessage}</p>}
          <label>
            Message:
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </label>
          <button type="submit">Send Message</button>
        </form>
      </>
    ) : (
      <div id="emptyDiv"></div>
    )}
  </div>
);
    };

export default SingleProduct;


