import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import check from './cloud.png'
import {Link} from 'react-router-dom'
import useDate from "./useDate";

function Login2() {
    const {time} = useDate();  

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 

    const [userAuth, setUserAuth] = useState({
        auth_key: "",
        auth_token: "",
        autho: "",
        authStatus: false, 
        api_key: "",
        api_key_status: false,
    });

    let healthStatus = false;

    onsubmit =(event) => {
        
        event.preventDefault();
        //console.log("userAuth status: ",userAuth.authStatus)
        getHealth();

        async function getHealth(){
            userAuth.authStatus = false;
            healthStatus = false;

            console.log("Checking Connection")

            const signinTest = await axios({
                url: 'https://api.sweepapi.com/platform/healthcheck',
                method: 'GET'

            })
                .then(response => {   
                    //console.log(response.data.status);
                    if(response.data.status == 'ok'){
                        console.log("Connection is ok")
                        healthStatus = true;
                    }
                    else{
                        console.log(response.data.status)
                    }
                })
                .catch(err => {
                    console.log("Caught error in checking connection", err)
                })

            if(healthStatus == true){
                console.log("Calling accInfo")
                accInfo();
            }
        }   
    
        async function accInfo(){
            console.log("Getting user info")
            await axios({
                method: "post",
                url: 'https://api.sweepapi.com/account/auth',
                headers: {
                    'Content-Type' : 'application/json',
                },
                data: JSON.stringify({
                    'email': email,
                    'password': password,
                }) 
            })
                .then((response) => {

                    if(response.data.status == 'ok'){
                        console.log("Account Info Data",response.data)
                        console.log("Account Session ID: ",response.data.session_id)
                        console.log("Account Session Token: ", response.data.session_token)

                        userAuth.auth_key = response.data.session_id
                        userAuth.auth_token = response.data.session_token
                        userAuth.authStatus = true
                        userAuth.autho = "Basic " + window.btoa(userAuth.auth_key + ':' + userAuth.auth_token)
                    }
                    else{
                        console.log(response.data.status)
                    }
                })
                .catch(err => {
                    console.log("Caught error in verifying user", err)
                })

                if(userAuth.authStatus == true){
                    console.log("Calling getUserAPI")
                    getUserAPI();
                }  
        }

        async function getUserAPI(){
            console.log("Getting user API")
         
            let accAPI = await axios({
                method: 'get',
                url: 'https://api.sweepapi.com/account/auth/api_key',
                headers: {
                    'Authorization': userAuth.autho,
                }
            })
                .then((response) => {
                    console.log("API Connection Status: ",response.data.status)
                    console.log("API Active Key: ",response.data.active[0].api_key)
                    userAuth.api_key = response.data.active[0].api_key
                    userAuth.api_key_status = true;
                    //console.log("API global: ", response.data.active[0].scope.global)
                });

            if(userAuth.api_key_status == true){
                //window.location.href= `http://localhost:3000/profile`
            }
        }

        
        //testDirectory();
        async function testDirectory(){
            console.log("testDirectory called")
            await axios({
                url: 'https://api.sweepapi.com/directory',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userAuth.autho,
                },
                data: JSON.stringify({
                    'name': 'bbb',
                    'top_dir': '',
                })
            }).
            then((response) => {
                console.log(response)
            });
        }
          
    };

    return (
        <div className= 'login' >
            
            <div className='login-container'>
            
                <div className='logo'>
                    <img src={check}/>
                </div>
                
                <div className='title'>
                    <header>Glide Away </header>
                    <header>Sweep API</header>
                </div>
            

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

            <footer>
                <ul className='footer-container'>
                    <li className='footer-item'>
                        <Link className='footer-links' onClick={() => {window.location.href="https://sweepenergy.com"}}>
                            Sweep Energy
                        </Link> 
                    </li>
                    <li className='footer-item'>
                        {time}
                    </li>
                    <li className='footer-item'>
                        <Link className='footer-links' onClick={() => {window.location.href="https://docs.sweepapi.com"}}>
                            API
                        </Link>
                    </li>
                    

                </ul>
            </footer>

        </div>
        
    )

}
export default Login2