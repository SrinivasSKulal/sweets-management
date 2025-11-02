import './Login.css'
import { motion } from 'framer-motion'
import React from 'react'
function Login(){
    return (
        <div className='main-box'>
            <motion.div  
            className='login-card'
            initial={{opacity:0 , y:-30}}
            animate={{opacity:1 , y:0}}
            transition={{duration:0.6, ease:'easeOut'} }
            >
                <h1 className='title'>Register</h1>
                <input type='text' className='login-input' placeholder='Username'></input>
                <input type='password' className='login-input' placeholder='password'></input>
                <a href="/Login">Have a Login?</a>

                <button className='login-button' >Sign In</button>
            </motion.div>
        </div>
    )

}


export default Login
