const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;
// import RegisterForm from "./RegisterForm";
// import Login from "./Login";
import "./CreatePost.css"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, createElement } from "react";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate()


  const createPostForm = async (e) => {
    e.preventDefault();

    try {
      const myJWT = localStorage.getItem("token");

      // if (!myJWT) {
      //   console.log("User not authenticated");
      //   return;
      // }
      
      const response = await fetch(`${BaseUrl}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${myJWT}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            location,
            willDeliver
          }
        })
      });
  
      const result = await response.json();
      console.log(result);
      console.log(navigate);
      setData(result);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };


  return (
 
    <div id="createPost">
    <h1 id="title">Create Post</h1>
    <form onSubmit={createPostForm}>

      <label className="inputBoxes" id="titleInput">
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label className="inputBoxes" id="descriptionInput">
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label className="inputBoxes" id="priceInput">
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>

      <label className="inputBoxes" id="locationInput">
        Location: 
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>

      <label className="inputBoxes" id="willDeliverCheckbox">
        Will deliver:
        <input type="checkbox" checked={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} />
      </label>

      <button className="inputBoxes" id="createPostButton" type="submit">Create Post</button>
      
    </form>
 
  </div>
  );
};

export default CreatePost;

  