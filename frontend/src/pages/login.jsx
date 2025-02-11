import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState(null);

    const navigate = useNavigate(); 

    const handleUsername = (event) => {setUsername(event.target.value)};
    const handlePassword = (event) => {setPassword(event.target.value)};

    // Store tokens locally and use them to make request for api from backend
    const storeTokens = (accessToken, refreshToken) => {
        const accessExpiry = Date.now() + 5 * 60 * 1000;
        const refreshExpiry = Date.now() + 24 * 60 * 60 * 1000;

        localStorage.setItem('access_token',accessToken);
        localStorage.setItem('access_token_expiry',accessExpiry);

        localStorage.setItem('refresh_token',refreshToken);
        localStorage.setItem('refresh_token_expiry',refreshExpiry);
    };

    /* 
        const [UserData,setUserData] = useState([])

        useEffect(() => {
            axios.get('http://127.0.0.1:8000/api/api/',{headers: {'Authorization': `Bearer ${access_token}` } })
            .then(response=>{
                setUserData(response.data)
                Use more logic like using refresh_token for new access_token if expired 
                return to login page if refresh_token is expired
            })
            .catch(error => {
                console.error(`Can't fetch data: `,error)
            })
        },[])
    */

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://127.0.0.1:8000/api/login/',{username:username,password:password},{headers:{"Content-Type":"application/json"}})
        
        .then(response => {
            setMessage(response.data.message)
            if (response.data.message===true) 
            {
                storeTokens(response.data.access,response.data.refresh);
                navigate('/');
            }
            else {
                setMessage(response.data.message);
            }
        })
        .catch(error => {
            console.error('Error submitting form:',error);
        })
    };
    return (
        <div style={{
            border:'1px solid #4b5362',
            padding:'20px',
            margin:'10px',
            borderRadius:'10px',
            backgroundColor:'#31363f',
            width:'50%',
        }}>
            <form>
                <label>Username:
                    <input value={username} style={{
                        border:'1px solid rgb(26, 162, 183)',
                        margin:"1%",
                    }} type="text" onChange={handleUsername}/>
                </label>

                <label>Password:
                <input value={password} style={{
                        border:'1px solid rgb(26, 162, 183)',
                        margin:"1%",
                    }} type="password" onChange={handlePassword}/>
                </label>

                <button onClick={handleSubmit} style={{
                    cursor:'pointer',
                    width:'10%',
                    border:'1px solid rgb(26, 162, 183)',
                    margin:"1%",
                }}>Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

const Login = () => {
    return (
        <div>
            <h1>Login here</h1>
            <LoginForm/>
        </div>
    )
}

export default Login