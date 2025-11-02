import React from "react";
import './Navbar.css'


function Navbar(){
    const name = localStorage.getItem('username')

    return(
        <div className="navbar">
            <h1>Sweet Shop</h1>
            {name ? (<span>Hello , {name} </span>):(<div></div>)}
        </div>
    ) 
}


export default Navbar