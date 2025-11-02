

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { filter, p, u } from 'framer-motion/client'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Atom } from 'react-loading-indicators'
import { motion } from 'framer-motion'
import './Dashboard.css'





const original = {
    name: "",
    category: "",
    minPrice: 0,
    maxPrice: 0,
};
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
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    // const [results, setResults] = useState([]);


    const navigate = useNavigate()

    useEffect(() => {
        const fetchSweets = async () => {
            setLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000))
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

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name)
        setFilters((prev) => ({ ...prev, [name]: value }))
    }
    const handleSearch = async () => {
        try {
            setLoading(true)

            const params = {};

            // Only add a param if the value has changed from the original
            // if (name !== original.name && name.trim() !== "") params.name = name.trim();
            // if (category !== original.category && category.trim() !== "") params.category = category.trim();
            // if (minPrice !== original.minPrice && minPrice > 0) params.min_price = minPrice;
            // if (maxPrice !== original.maxPrice && maxPrice > 0) params.max_price = maxPrice;
            if (name) params.name = name;
            if (category) params.category = category;
            if (minPrice > 0) params.min_price = minPrice;
            if (maxPrice > 0) params.max_price = maxPrice;
            console.log(params)

            const token = localStorage.getItem('access_tokens')  // or wherever you store it
            console.log("Sending search parameters:", params);
            const response = await axios.get('http://127.0.0.1:8000/api/sweets/search/', {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
                params

            });
            console.log(response.data)
            setSweets(response.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleadd = async () =>{
        navigate('/addsweets')
    }
    const handledelete = async() =>{
        navigate('/deletesweets')
    }

    return (
        <div className='main'>
            <Navbar />
            <div className='dashboard-header'>

                <input type='text' placeholder='Name' value={filter.name} onChange={(e) => { setName(e.target.value) }} className='filter-input' ></input>
                <input type='text' placeholder='Category' value={filter.category} onChange={(e) => { setCategory(e.target.value) }} className='filter-input' ></input>
                <input type='number' placeholder='MinPrice' value={filter.min_price} onChange={(e) => { setMinPrice(e.target.value) }} className='filter-input' ></input>
                <input type='number' placeholder='MaxPrice' value={filter.max_price} onChange={(e) => { setMaxPrice(e.target.value) }} className='filter-input' ></input>
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
                <button className='add-button' onClick={handleadd}>+</button>
                <button className='add-button' onClick={handledelete}>-</button>
            </div>
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