
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import './PurchaseSweet.css';
import { useNavigate } from 'react-router-dom';

function ReStockSweet() {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantities, setQuantities] = useState({});
    const [purchaseLoading, setPurchaseLoading] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('access_tokens');

    // Fetch sweets
    const fetchSweets = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:8000/api/sweets', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            setSweets(res.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to load sweets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        fetchSweets();
    }, []);

    // Handle quantity change
    const handleQuantityChange = (id, value) => {
        const numValue = parseInt(value);
        if (numValue >= 0) {
            setQuantities({ ...quantities, [id]: numValue });
        }
    };

    // Handle purchase
    const handlePurchase = async (sweet) => {
        const quantity = quantities[sweet.id];
        
        // if (!quantity || quantity <= 0) {
        //     alert('Please enter a valid quantity');
        //     return;
        // }

        // if (quantity > sweet.quantity) {
        //     alert(`Only ${sweet.quantity} items available in stock`);
        //     return;
        // }

        try {
            setPurchaseLoading({ ...purchaseLoading, [sweet.id]: true });
            
            await axios.post(
                `http://localhost:8000/api/sweets/${sweet.id}/restock`,
                { quantity: parseInt(quantity) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            console.log(`Purchased ${quantity} of ${sweet.name}`);
            alert(`Successfully restocked ${quantity} ${sweet.name}(s)!`);
            
            // Reset quantity for this item
            setQuantities({ ...quantities, [sweet.id]: '' });
            
            // Refresh the list to update available quantity
            fetchSweets();
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || err.response?.data?.detail || 'Failed to complete purchase';
            alert(errorMsg);
        } finally {
            setPurchaseLoading({ ...purchaseLoading, [sweet.id]: false });
        }
    };

    return (
        <div className="main">
            <Navbar />
            <div className="purchase-container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="page-title">ReStock Sweets</h1>
                </motion.div>

                {loading ? (
                    <div className="loading-container">
                        <p>Loading sweets...</p>
                    </div>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : sweets.length === 0 ? (
                    <p className="no-data">No sweets available</p>
                ) : (
                    <div className="sweet-list">
                        {sweets.map((sweet) => (
                            <motion.div
                                key={sweet.id}
                                className="sweet-item"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <h3>{sweet.name}</h3>
                                <p><strong>Category:</strong> {sweet.category}</p>
                                <p><strong>Price:</strong> ₹{sweet.price}</p>
                                <p><strong>Available:</strong> {sweet.quantity}</p>

                                <div className="purchase-actions">
                                    <input
                                        type="number"
                                        min="1"
                                        max={sweet.quantity}
                                        placeholder="Enter quantity"
                                        value={quantities[sweet.id] || ''}
                                        onChange={(e) => handleQuantityChange(sweet.id, e.target.value)}
                                        className="quantity-input"
                                        disabled={sweet.quantity === 0}
                                    />
                                    <button 
                                        onClick={() => handlePurchase(sweet)}
                                        className="purchase-button"
                                        disabled={purchaseLoading[sweet.id] || sweet.quantity === 0}
                                    >
                                        {purchaseLoading[sweet.id] ? 'Processing...' : 'Purchase'}
                                    </button>
                                </div>
                                
                                {sweet.quantity === 0 && (
                                    <p className="out-of-stock">Out of Stock</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReStockSweet;