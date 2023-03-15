import { useState } from "react"; 
import { useNavigate } from "react-router-dom"
import "./Login.css"


const Login = ({setAuthenticatedUser}) => {
 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 

  
    const navigate = useNavigate() 


    async function userLogin(e) {
       
        e.preventDefault(); 
        try {         
            console.log(username + " signed in.")
            console.log(username + " entered their password: " + password)
            const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            })

            
            const translatedData = await response.json(); 

            console.log(translatedData)

           
            if (!translatedData.success) {
                alert("Invalid username or password. Please try again.")

            } else {
                const myJWT = translatedData.data.token;

               
                localStorage.setItem("token", myJWT)

                navigate("/")
            }
        } catch (error) {
            console.log(error); 
        }
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setAuthenticatedUser(false); 
        navigate("/login"); 
    }

    return (
        <div id="entireForm">
            <h1>Login</h1>
            <h3>Please enter your username and password below.</h3>
        
            <form onSubmit={userLogin}>
                <input id="username"
                    type="text" 
                    placeholder="Enter Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input id="password"
                    type="password" 
                    placeholder="Enter Password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button id="button" type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default Login; 

