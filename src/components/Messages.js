// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "./UserProfile.css"

// const Messages = () => {

//     return (
//         <p>Messages</p>
//     )
// }

// export default Messages;

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CohortName = '2301-FTB-MT-WEB-FT';
const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

const Messages = (props) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const fetchMessages = async () => {
    try {
      const postId = props.match.params.postId;
      const token = localStorage.getItem("token");
      const response = await fetch(`${BaseUrl}/posts/${postId}/messages`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessages(data.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserMessages = async () => {
  try {
    const myJWT = localStorage.getItem("token");
    const response = await fetch(`${BaseUrl}/users/me/messages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myJWT}`,
      },
    });
    const result = await response.json();
    console.log(result.data.messages);
    setUserMessages(result.data.messages);
  } catch (err) {
    console.error(err);
  }
};

  const sendMessage = async (event) => {
    event.preventDefault();
    try {
      const postId = props.match.params.postId;
      const token = localStorage.getItem("token");
      const response = await fetch(`${BaseUrl}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: { content } }),
      });
      const data = await response.json();
      setMessages([...messages, data.data.message]);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
      <div>
        <h1>Messages</h1>
        <ul>
          {messages.map((message) => (
            <li key={message._id}>{message.content}</li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <label>
            Message:
            <input
              type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
