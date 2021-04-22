import React from 'react'
import UserInput from './UserInput';
import './login.css'
import check from './cloud.png'


function login() {

    
    const onClick = () =>{
        console.log('clicked');
    } 
    return (
        <div className= 'login'>
            
            <div className='logo'>
                <img src={check}/>

            </div>
            <div className='title'>
                <header>Glide Away </header>
                <header>Sweep API</header>
            </div>
            <UserInput /> 
            
        </div>
    )
}

export default login
