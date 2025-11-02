import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import AddSweet from './pages/AddSweet'
import DeleteSweet from './pages/DeleteSweet'
import PurchaseSweet from './pages/PurchaseSweet'
import ReStockSweet from './pages/ReStockSweet'
function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute>  <Dashboard /></ProtectedRoute>} />
      <Route path="/addsweets" element={<ProtectedRoute><AddSweet /></ProtectedRoute>} />
      <Route path="/deletesweets" element={<ProtectedRoute><DeleteSweet /></ProtectedRoute>} />
      <Route path="/purchasesweets" element={<ProtectedRoute><PurchaseSweet /></ProtectedRoute>} />
      <Route path="/restocksweets" element={<ProtectedRoute><ReStockSweet /></ProtectedRoute>} />

    </Routes>

  )
}

export default App
