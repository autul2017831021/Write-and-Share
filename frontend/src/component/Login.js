import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import Cookies from 'js-cookie';

function Login() {   
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const navigate = useNavigate();
    
    const handleLoginSuccess = (token) => {
        const cookieExists = Cookies.get('jwt') !== undefined;
        if(cookieExists){
          Cookies.remove('jwt');
        }
        Cookies.set('jwt', token);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const api = 'http://192.168.0.105:8080/api/login'
        const response = await fetch(api, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          const data = await response.json();
          if(data.status.success){
              const token = data.token;
              handleLoginSuccess(token);
              //navigate('/');
          }
          else{
             //navigate('/login');;
          }
          window.location.reload();
      } 
      else {
          navigate('/login');
      }
    }
    
    return (
      <div className="login-page">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="login-label" htmlFor='email'> Email: </label>
          <input className="login-input" name="email" id="email" type="email" value={email} onChange={(event)=>setEmail(event.target.value)} required/>
          <br />
          <label className="login-label" htmlFor='password'> Password: </label>
          <input className="login-input" name="password" id="password" type="password" value={password} onChange={(event)=>setPass(event.target.value)} required/>
          <br />
          <button className="login-button" type="submit">Log In</button>
        </form>
      </div>
   );
  
}

export default Login;
