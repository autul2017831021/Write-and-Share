import React from 'react';
import '../css/Login.css';
import Cookies from 'js-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLoginSuccess = (token) => {
    const cookieExists = Cookies.get('jwt') !== undefined;
    if(cookieExists){
      Cookies.remove('jwt', token);
    }
    Cookies.set('jwt', token);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
        }),
        headers: {
          'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;
        this.handleLoginSuccess(token);
    } else {
        console.log("bal")
        // handle authentication error here
    }
  }
  
  render() {
    return (
      <div className="login-page">
        <h1 className="login-title">Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="login-label">
            Email:
            <input className="login-input" type="email" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <br />
          <label className="login-label">
            Password:
            <input className="login-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <br />
          <button className="login-button" type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
