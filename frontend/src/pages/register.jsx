import axios from 'axios'
import { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
// import '../index.css'

const RegisterForm = () => {
    // hooks for username and password of form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate(); 

    const handleUsernameChange = (event) => { setUsername(event.target.value); };
    // Handler for username and password updates
    const handlePasswordChange = (event) => { setPassword(event.target.value); };

    const handleSubmit = (event) => {
        // handles form submission
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register/',{username:username,password:password},{headers:{"Content-Type":"application/json"}})
        // axios helps sending post request to the backend api server

        .then(response => {
            console.log('Form submitted successfully',response.data)
            if (response.data.message === true) 
                navigate('/login')
            else if(response.data.message === `{'username': [ErrorDetail(string='A user with that username already exists.', code='unique')]}`)
            {
                setMessage('A user with that username already exists.')
            }
            else{
                setMessage(response.data.message)
            }
        })
        .catch(error => {
            console.error('Error submitting form:',error)
        })
    };

    return(
        // RegisterForm UI view in webpage
        <div style={{
            border:'1px solid #4b5362',
            padding:'20px',
            margin:'10px',
            borderRadius:'10px',
            backgroundColor:'#31363f',
            width:'50%',
        }}>
            <form onSubmit={handleSubmit}>
                {/* Form with onsubmit = handleSubmit,handleUsernameChange and handlePasswordChange function   */}
                <label>Username:
                    <input type='text' style={{
                        border:'1px solid rgb(26, 162, 183)',
                        margin:"1%",
                    }} value={username} onChange={handleUsernameChange}/>
                </label>
                
                

                <label>Password:
                    <input type='password' style={{
                        border:'1px solid rgb(26, 162, 183)',
                        margin:"1%",
                    }} value={password} onChange={handlePasswordChange}/>
                </label>
                
                
                <button type="submit" style={{
                    cursor:'pointer',
                    width:'10%',
                    border:'1px solid rgb(26, 162, 183)',
                    margin:"1%",
                }}>Submit</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

const Register = () => {
// Actual Register View

/* If want to make get request to server
const [UserData,setUserData] = useState([])

useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/api/')
    .then(response=>{
        setUserData(response.data)
    })
    .catch(error => {
        console.error(`Can't fetch data: `,error)
    })
},[])
*/

return (
    <div>
        {
        /* Loop in a json file
        <h2>Api fetched:</h2>
        <h3>All Users:</h3>
        <div>
        {UserData.map((user,index) => (
                    <span key={index}>{user.username} </span> 
                ))}
        </div> 
        */
        }

        <h1>Register here</h1>
        <RegisterForm/>
    </div>    
)
}

export default Register;