import React,{useState} from 'react';
import './App.css';
import './Login.css';
import './button.css';
import { Link } from 'react-router-dom';

function Entrance() {

    return (
      <>
        <div className="login-wrapper">   
        <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/> 
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h1>Welcome to X-map!</h1>
        <nav className="navbar navbar-expand-lg navheader">    
          <div className="App" >    
            {/* <ul className="navbar-nav mr-auto">     */}
              {/* <li className="nav-item">     */}
                <Link to={'/Login'} className="nav-link"><button type="submit" class="button button4">Login</button></Link>    
              {/* </li>     */}
              {/* <li className="nav-item">     */}
              <br/>
                <Link to={'/Signup'} className="nav-link"><button type="submit" class="button button4">Sign Up</button></Link>    
              {/* </li>    
            </ul>     */}
          </div>    
        </nav> <br />
        </div> 
    </>
    );
  }
  
  export default Entrance;