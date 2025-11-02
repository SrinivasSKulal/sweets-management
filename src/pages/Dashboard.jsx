

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { p, u } from 'framer-motion/client'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Atom } from 'react-loading-indicators'
import { motion } from 'framer-motion'
import './Dashboard.css'

function Dashboard() {
    // const handleclick = async () => {
    //     const storedname = localStorage.getItem('username')
    //     const access_tokens = localStorage.getItem('access_tokens')
    //     console.log(storedname)
    //     console.log(access_tokens)
    // }


    const [sweets, setSweets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchSweets = async () => {
            setLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve , 2000))
                const token = localStorage.getItem('access_tokens')  // or wherever you store it

                const response = await axios.get('http://127.0.0.1:8000/api/sweets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                if (!response.data) {
                    alert("The response from the api call was empty")
                }
                setSweets(response.data)
                setLoading(false)

            } catch (err) {

                console.log(err)
                setError('Failed to load sweets')
                setLoading(true)

            }
        };
        fetchSweets();


    }, [navigate])






    return (
        <div className='main'>
            <Navbar />
            {/* <h1>Dashboard</h1> */}
            <motion.div
                className="dashboard-card"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className='sweet-list'>
                    {
                        loading ? (<Atom color="#32cd32" size="medium" text="Trying to find the List of sweets" textColor="" />) :
                            error ? (
                                <p className='error'>{error}</p>
                            ) : sweets.length == 0 ? (
                                <p>No sweets found</p>
                            ) : (
                                sweets.map((sweet, index) => {
                                    return (<motion.div
                                        key={index}
                                        className="sweet-item"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h3>{sweet.name}</h3>
                                        <p><strong>Category:</strong> {sweet.category}</p>
                                        <p><strong>Price:</strong> ₹{sweet.price}</p>
                                        <p><strong>Quantity:</strong> {sweet.quantity}</p>

                                    </motion.div>)
                                })
                            )
                    }
                </div>

            </motion.div>

        </div>
    )


}


export default Dashboard