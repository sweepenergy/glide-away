import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import check from './cloud.png'
import { useHistory } from 'react-router';


function Login() {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 

    
    const url = 'https://api.sweepapi.com/';
    const healthUrl = 'https://api.sweepapi.com/platform/healthcheck';
    

    const email2 = 'nfukaya@ucmerced.edu';
    const password2 = 'boyleMerced10-17';

    //const axios = require('axios').default;

   
    

    onsubmit =(event) => {
        
        event.preventDefault();
        
        
        console.log("onsubmit called")
        ///* 

        async function getHealth(){

        
        const signinTest = await axios({
            url: 'https://api.sweepapi.com/platform/healthcheck',
            method: 'GET'

        })
          
            .then(response => {
                   
                console.log(response.data);
    
                if(response.data.status == 'ok'){
                    console.log("status was ok")
                    
                    //window.location.href= `http://localhost:3000/profile`
                }
    
            });
        }
    
        //*/

        //getHealth();
        getStatus();
        

        
    };

    async function getStatus(){

        console.log("function called")

///*        
        console.log("before axios")
        await axios({
            method: 'POST',
            url: 'https://api.sweepapi.com/account/auth',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : '*/*',
                },
            body: JSON.stringify({
                'email': email2,
                'password': password2,
            })
        }) 
            .then(response => {
                console.log("response received")
                //console.log(response.data)
                if(response.data.status == 'ok'){
                    console.log("status was ok")
                       
                    //window.location.href= `http://localhost:3000/profile`
                }
                
            })
            .then(console.log("after fr"));
            
//*/

        console.log("end of function")
    }
    

    return (
        <div className= 'login' >
            
            <div className='logo'>
                <img src={check}/>

            </div>
            <div className='title'>
                <header>Glide Away </header>
                <header>Sweep API</header>
            </div>
            {email}
            {password}

            <form className='userinput'  >
            <div className='input-control'>
                
                <div className='email-input'>
                <label>Email</label>
                    <input 
                        type ='email' 
                        label='example@email.com' 
                        value ={email}
                        onChange = {(e) => setEmail(e.target.value)}
                        required

                        /*
                        error
                        id="standard-error-helper-text"
                        label="Error"
                        defaultValue="Hello World"
                        helperText="Incorrect entry."
                        */
                    
                    />
                </div>
                <div className='password-input'>
                <label>Password</label>
                    <input 
                        type ='password' 
                        label='*******'
                        value ={password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button onClick={() => onsubmit} type = 'submit' className="button">Sign in</button>

        </form>
            
        </div>
    )
}

export default Login
