
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "./UserProfile.css"

// const CohortName = '2301-FTB-MT-WEB-FT';
// const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

// const UserProfile = () => {

//     const [userPosts, setUserPosts] = useState([]);

//     const myData = async () => {

//                 try {
//                     const myJWT = localStorage.getItem("token");
        
//                   const response = await fetch(`${BaseUrl}/users/me`, {
//                     headers: {
//                       'Content-Type': 'application/json',
//                       'Authorization': `Bearer ${myJWT}`
//                     },
//                   });
//                   const result = await response.json();
//                   console.log(result);
//                   return result
//                 } catch (err) {
//                   console.error(err);
//                 }
//               }

//     const fetchUserPosts = async () => {
//         try {
//           const myJWT = localStorage.getItem("token");
//           const myUsername = localStorage.getItem("username");
//           const response = await fetch(`${BaseUrl}/posts?author_username=${myUsername}`, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${myJWT}`,
//             },
//           });
//           const result = await response.json();
//           setUserPosts(result.data.posts);
//         } catch (err) {
//           console.error(err);
//         }
//       };
      

//     useEffect(() => {
//         fetchUserPosts();
//     }, []);

//     return (
//         <div>
//             <div id="profileLinks">
//                 <Link to="/createPost">Create Post</Link>
//                 <Link to="/messages">Messages</Link>
//             </div>
//             <div>
//                 <h1>My Posts</h1>
//                 {userPosts.map(post => (
//                     <div key={post._id}>
//                         <h2>{post.title}</h2>
//                         <p>{post.description}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default UserProfile;


import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserProfile.css"

const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

const UserProfile = () => {

    const [userPosts, setUserPosts] = useState([]);

    const myData = async () => {

                try {
                    const myJWT = localStorage.getItem("token");
        
                  const response = await fetch(`${BaseUrl}/users/me`, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${myJWT}`
                    },
                  });
                  const result = await response.json();
                  console.log(result);
                  return result
                } catch (err) {
                  console.error(err);
                }
              }

    const fetchUserPosts = async () => {
        try {
          const myJWT = localStorage.getItem("token");
          const myUsername = localStorage.getItem("username");
          const response = await fetch(`${BaseUrl}/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myJWT}`,
            },
          });
          const result = await response.json();
          setUserPosts(result.data.posts);
        } catch (err) {
          console.error(err);
        }
      };
      

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
                {userPosts.map(post => (
                    <div id="myPosts" key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>{post.price}</p>
                        <p>{post.location}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserProfile;




