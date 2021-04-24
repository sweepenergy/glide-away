import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import useDate from "./useDate";


function Navbar() {

    const [click, setClick] = useState(false);    
    
    const url = "location.href = 'www.google.com';";
    
    const {time} = useDate();

    

    

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
                    <li className='nav-item'>
                        {time}
                    </li>

                </ul>

            </div>

        </nav>
        
    )
}

export default Navbar
