import { useState } from "react"; 
import { useNavigate } from "react-router-dom"
import "./RegisterForm.css"


const RegisterForm = () => {
 
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState(""); 

  
    const navigate = useNavigate() 


    async function sendRegisterNewAccountReq(e) {
       
        e.preventDefault(); 
        try {
            console.log("Our new username is: " + newUsername)
            console.log("Our new password is: " + newPassword)
            
            if (newPassword.length < 8) {
                alert("Password is too short. Must be at least 8 characters.")
                return;
            } else if (newUsername.length < 8) {
                alert("Username is too short. Must be at least 8 characters.");
                return; 
            }

            
            const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
                },
                body: JSON.stringify({
                    user: {
                        username: newUsername,
                        password: newPassword
                    }
                })
            })

            
            const translatedData = await response.json(); 

            console.log(translatedData)

           
            if (!translatedData.success) {
                alert("Account was not successfully created. Please try again!")
            } else {
                const myJWT = translatedData.data.token;

               
                localStorage.setItem("token", myJWT)

                
                navigate("/")
            }
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <div id="entireForm">
            <h2>Sign up for a new account here!</h2>
            <h3>Please choose a username and password at least 8 characters in length.</h3>

            <form onSubmit={sendRegisterNewAccountReq}>
                <input id="newUsername"
                    type="text" 
                    placeholder="Set New Username"
                    
                    value={newUsername}
                    
                    onChange={(event) => setNewUsername(event.target.value)}
                />
                <input id="newPassword"
                    type="text" 
                    placeholder="Set New Password" 
                    
                    value={newPassword}
                    
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <button id="button" type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default RegisterForm; 
