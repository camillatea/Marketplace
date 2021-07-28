import React from 'react'
import './Navbar.css'
import UserSign from './UserSign'

import face from './images/fface.png'




const Navbar = () => {


    const activeUser = localStorage.getItem('user');


    return (
        <div className="navbar">
            <div className="nav-wrap">
                    <img src={face} alt="lol" style={{width: "60px", height: "60px"}}/>
                <div className="nav-item">
                    <h3>Zeb's Marketplace</h3>
                </div>
                <div className="nav-item">
                    <UserSign/>
                </div>

            </div>
        </div>
    )
}

export default Navbar
