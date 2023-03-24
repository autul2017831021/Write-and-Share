import React from 'react';
import '../css/Login.css';
import Cookies from 'js-cookie';

class Logout extends React.Component {
  
  handleLogout = () => {
    const cookieExists = Cookies.get('jwt') !== undefined;
    if(cookieExists){
      Cookies.remove('jwt');
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.handleLogout();
  }
  
  render() {
    return (
      <div className="login-page">
        <h1 className="login-title">Log Out</h1>
        <button className="login-button" type="submit" onClick={this.handleSubmit}>Log Out</button>
      </div>
    );
  }
}

export default Logout;
