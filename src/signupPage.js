import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import {BrowserRouter as Router, Link,Route, Switch } from 'react-router-dom';


async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
        <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h1>Sign up for X-map:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <br/>
        <br/>
          <button type="submit">sign up</button>
          <br/>
          <br/>
          <Link to={{pathname: "/loginPage" }} ><p>back to login page</p></Link>
        
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};