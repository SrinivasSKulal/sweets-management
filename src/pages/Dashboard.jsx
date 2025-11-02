

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { u } from 'framer-motion/client'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
    const handleclick = async () => {
        const storedname = localStorage.getItem('username')
        const access_tokens = localStorage.getItem('access_tokens')
        console.log(storedname)
        console.log(access_tokens)
    }


    const [sweets, setSweets] = useState([])
    const [loading ,setLoading] = useState(true)
    const [error , setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
            const fetchSweets = async () => {
        try {
            const token = localStorage.getItem('access_tokens')  // or wherever you store it

            const response = await axios.get('http://127.0.0.1:8000/api/sweets', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response)
            if (!response.data){
                alert("The response from the api call was empty")
            }
            setLoading(false)

        } catch (err) {
            
            console.log(err)
            setError('Failed to load sweets')
            setLoading(true)

        }
    };
    fetchSweets();


    } , [navigate])






    return (
        <div className='main'>
            <Navbar />
            <h1>Dashboard</h1>  
            <motion.div
                className="dashboard-card"
                initial={{opacity:0 , y:-30}}
                animate={{opacity : 1 , y : 0}}
                transition = {{duration : 0.5 , ease:'easeOut'}}
            >
                <div className='sweet-list'>
                    
                </div>

            </motion.div>
            
        </div>
    )


}


export default Dashboard