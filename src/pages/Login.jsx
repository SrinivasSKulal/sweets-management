import './Login.css'
import { acceleratedValues, motion } from 'framer-motion'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login(){

    const [username , setUsername] = useState('')
    const [password, setpassword] = useState('')
    
    const navigate = useNavigate()
    const handleLogin= async () =>{
        if(!username|| !password){
            alert("Username or Password is empty")
            return;
        }
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                username:username,
                password:password
            })
            console.log(response)
            const access_tokens = response.data.access
            console.log(response.data.access)

            localStorage.setItem('access_tokens' , access_tokens)
            localStorage.setItem('username' , username)


            navigate('/dashboard');
        }catch(err){
            console.log(err)
        }
        return
    }


    return (
        <div className='main-box'>
            <motion.div  
            className='login-card'
            initial={{opacity:0 , y:-30}}
            animate={{opacity:1 , y:0}}
            transition={{duration:0.6, ease:'easeOut'} }
            >
                <h1 className='title'>Login</h1>
                <input type='text' className='login-input' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <input type='password' className='login-input' placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)}></input>
                <a href="/Register">Don't have an account. Register ?</a>

                <button className='login-button' onClick={() => handleLogin()}>Sign In</button>
            </motion.div>
        </div>
    )

}


export default Login
