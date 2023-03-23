import { useEffect, useState } from "react";
// const CohortName = '2301-FTB-MT-WEB-FT';
// const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

const MyMessages = () => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");
  // const CohortName = '2301-FTB-MT-WEB-FT';
  // const BaseUrl = `https://strangers-things.herokuapp.com/api/${CohortName}`;

  useEffect(() => {
    const getMyMessages = async () => {
      try {
        const response = await fetch(`${BaseUrl}/users/me`, {
          // const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMessages(data.data.conversations);
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMyMessages();
  }, []);

  return (
    <div>
      <h2>My Messages</h2>
      {messages.length === 0 ? (
        <p>You have no messages.</p>
      ) : (
        messages.map((conversation) => (
          <div key={conversation._id}>
            <h3>Conversation with {conversation.otherUser.username}</h3>
            {conversation.messages.map((message) => (
              <div key={message._id}>
                <p>{message.content}</p>
                <p>Sent by: {message.fromUser.username}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyMessages;



