import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Register() {   
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiPrefix = process.env.REACT_APP_API_PREFIX !== null ? process.env.REACT_APP_API_PREFIX : 'http://192.168.0.103:8080';
        const apiPostfix = process.env.REACT_APP_API_REGISTER !== null ? process.env.REACT_APP_API_REGISTER : '/api/register';
        const api = apiPrefix + apiPostfix;

        const response = await fetch(api, {
            method: 'POST',
            body: JSON.stringify({
                name :    name,
                email:    email,
                username: username,
                password: password
            }),
            headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          const data = await response.json();
          if(data.status.success){
              navigate('/login');
          }
          else{
              navigate('');
          }
          window.location.reload();
      } 
      else {
          navigate('/');
      }
    }
    
    return (
      <div className="login-page">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
            <label className="login-label" htmlFor='name'> Name: </label>
            <input className="login-input" name="name" id="name" type="text" value={name} onChange={(event)=>setName(event.target.value)} required/>
            <br />
            <label className="login-label" htmlFor='username'> Username: </label>
            <input className="login-input" name="username" id="username" type="text" value={username} onChange={(event)=>setUsername(event.target.value)} required/>
            <br />
            <label className="login-label" htmlFor='email'> Email: </label>
            <input className="login-input" name="email" id="email" type="email" value={email} onChange={(event)=>setEmail(event.target.value)} required/>
            <br />
            <label className="login-label" htmlFor='password'> Password: </label>
            <input className="login-input" name="password" id="password" type="password" value={password} onChange={(event)=>setPassword(event.target.value)} required/>
            <br />
            <button className="login-button" type="submit">Register</button>
        </form>
      </div>
   );
  
}

export default Register;
