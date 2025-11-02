import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import './DeleteSweet.css';

function DeleteSweet() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('access_tokens');

  // Fetch all sweets
  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://127.0.0.1:8000/api/sweets', {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  // Handle deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sweet?');
    if (!confirmDelete) return;

    console.log(id)
    try {
      await axios.delete(`http://127.0.0.1:8000/api/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Sweet deleted successfully!');
      fetchSweets(); // refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to delete sweet');
    }
  };

  return (
    <div className="delete-sweet-container">
      <Navbar />

      {loading ? (
        <p>Loading sweets...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : sweets.length === 0 ? (
        <p>No sweets available</p>
      ) : (
        <div className="sweet-list">
          {sweets.map((sweet, index) => (
            <motion.div
              key={index}
              className="sweet-item"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3>{sweet.name}</h3>
              <p><strong>Category:</strong> {sweet.category}</p>
              <p><strong>Price:</strong> ₹{sweet.price}</p>
              <p><strong>Quantity:</strong> {sweet.quantity}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(sweet.id)}
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeleteSweet;
