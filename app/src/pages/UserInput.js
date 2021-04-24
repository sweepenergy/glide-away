import React from 'react'
import {useState} from 'react'
import './UserInput.css'

function UserInput() {

    const [email, setEmail] = useState(''); 

    const [password, setPassword] = useState(''); 

    const emailCredit = email + ':' + password;


    const url = 'https://api.sweepapi.com/';
    const directoryHome = 'directory/home';

    const getUserLoginToken = 'account/auth'

    let auth_key = '51a0d885-1f1d-40ee-8fcd-abcee396dd9b';
    const auth_token = 'a7b13f5d-670a-4474-921c-622464fc1cbd';
    const apiCredit = auth_key + ':' + auth_token;
    const autho = "Basic " + window.btoa(apiCredit);

    const getUserToken = 'account/auth';
    
    console.log(auth_key)
    
    fetch(url + getUserLoginToken, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : '/'
        },
        body: JSON.stringify({
            'email': email,
            'password': password,
        })
    })
    .then(response => {return response.json()})
    .then(data => {
        
        console.log(data.status)
        console.log(data.session_id)
        auth_key = data.session_id
        console.log(auth_key)

    })
  
    console.log(auth_key)
   

  


    /*
    fetch(url + directoryHome, {
        //method: 'POST',
        method: 'GET',
        headers: {
            'Authorization' : autho,
        },
    
    })
    
    
    .then(res => {return res.json()})
    .then(data => console.log(data))
*/

    return (

        <form className='userinput'>
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
            <input className='button' type='submit' value='Sign In'></input>

        </form>
        
       
        
    )
    
}

export default UserInput
