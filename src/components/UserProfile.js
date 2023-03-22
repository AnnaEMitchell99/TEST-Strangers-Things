import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserProfile.css"

const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

const UserProfile = (props) => {

    const [userPosts, setUserPosts] = useState([]);
    const [username, setUsername] = useState([]);
    const { productProps, setProductProps } = props;

    const fetchUserPosts = async () => {
        try {
          const myJWT = localStorage.getItem("token");
          const response = await fetch(`${BaseUrl}/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myJWT}`,
            },
          });
          const result = await response.json();
          console.log(result.data.username);
          setUserPosts(result.data.posts);
          setUsername(result.data.username);
          
        } catch (err) {
          console.error(err);
        }
      };
      
    //   async function deletePost(id) {
    //     try {
    //       const myJWT = localStorage.getItem("token");
    //       const response = await fetch(`${BaseUrl}/posts/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${myJWT}`,
    //         },
    //       });
    //       const result = await response.json();
    //       console.log(result);
    //       if (result.success) {
    //         const updatedUserPosts = userPosts.filter(
    //           (post) => post._id !== id
    //         );
    //         setUserPosts(updatedUserPosts);
    //       }
    //       return result;
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }

    async function deletePost(id) {
        try {
          const myJWT = localStorage.getItem("token");
          const response = await fetch(`${BaseUrl}/posts/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myJWT}`,
            },
            body: JSON.stringify({ post: { isActive: false } }),
          });
          const result = await response.json();
          console.log(result);
          if (result.success) {
            const updatedUserPosts = userPosts.filter(
              (post) => post._id !== id
            );
            setUserPosts(updatedUserPosts);
          }
          return result;
        } catch (err) {
          console.error(err);
        }
      }
      
      

    useEffect(() => {
        fetchUserPosts();
    }, []);

    return (
        <div>
            <div id="profileLinks">
                <Link to="/createPost">Create Post</Link>
                <Link to="/messages">Messages</Link>
            </div>
            <div>
                <h1 id="postHeader">My Posts</h1>
                <h2>Username: {username}</h2>
                {userPosts.map(post => (
                    <div id="myPosts" key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>{post.price}</p>
                        <p>{post.location}</p>
                        <button
                            value={post._id}
                            onClick={() => deletePost(post._id)}
                            >
                            Delete post
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserProfile;







