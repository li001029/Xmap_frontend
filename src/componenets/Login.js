import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { BrowserRouter as Router,Link,Route, Switch} from 'react-router-dom';
// import './header.css';
// import './Footer.css';


//127.0.0.1:5001/api/login
//http://localhost:5001
async function loginUser(credentials) {
 return fetch('/api/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    const token2=JSON.stringify(token);
    console.log("token got is "+token2);
    setToken(token2);
  }

  return(
      
    <div className="login-wrapper">
        <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h1>Log in for X-map:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <br/>
        <br/>
          <button type="submit">login</button>
          <br/>
          <br/>
          <Link to={{pathname: "/signupPage" }} ><p>Sign up here</p></Link>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};