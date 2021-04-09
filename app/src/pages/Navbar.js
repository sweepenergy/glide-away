import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'


function Navbar() {

    const [click, setClick] = useState(false);    
    
    const url = "location.href = 'www.google.com';";
    

    return (
        <nav className='navbar'> 
            <div className='navbar-container'>
                <ul className='nav-menu'>
                    <li className='nav-item'>
                        <Link className='nav-links' onClick={() => {window.location.href="https://sweepenergy.com"}}>
                            Sweep Energy
                        </Link> 
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-links' onClick={() => {window.location.href="https://docs.sweepapi.com"}}>
                            API
                        </Link>
                    </li>

                </ul>

            </div>

        </nav>
        
    )
}

export default Navbar
