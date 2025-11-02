import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
// import './AddSweet.css';

function AddSweet() {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_tokens');

    const [sweet, setSweet] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSweet((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sweet.name || !sweet.category || !sweet.price || !sweet.quantity) {
            alert('Please fill all fields');
            return;
        }

        try {
            setLoading(true);
            await axios.post(
                'http://127.0.0.1:8000/api/sweets',
                {
                    name: sweet.name,
                    category: sweet.category,
                    price: parseFloat(sweet.price),
                    quantity: parseInt(sweet.quantity),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert('Sweet added successfully!');
            navigate('/dashboard'); // redirect to dashboard
        } catch (err) {
            console.error(err);
            setError('Failed to add sweet');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-sweet-container">
            <Navbar />
            <h1>Add New Sweet</h1>
            <form className="add-sweet-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={sweet.name}
                    onChange={handleChange}
                    className='filter-input'
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={sweet.category}
                    onChange={handleChange}
                    className='filter-input'

                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={sweet.price}
                    onChange={handleChange}
                    className='filter-input'

                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={sweet.quantity}
                    onChange={handleChange}
                    className='filter-input'

                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Sweet'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default AddSweet;
