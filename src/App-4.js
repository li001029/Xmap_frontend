import React from 'react';
import { BrowserRouter as Router, Route, Switch , Link  } from 'react-router-dom';
import './App.css';

import Login from './Login';  
import Reg from './Reg';  
import detailPage from './detailPage-2';
import home from './home';
import entrance from './entrance';
import ReviewsPage from './reviewsPage';


function App() {

    // const token = localStorage.getItem('accessToken');

    // if(!token) {
    //     console.log("here here");
    //   return <Signin />
    // }

    //
    // "@material-ui/core": "^4.12.4",
    // "@material-ui/icons": "^4.11.3",
    // "@testing-library/jest-dom": "^5.11.9",
    // "@testing-library/react": "^11.2.5",
    // "@testing-library/user-event": "^12.6.3",
  return (
    <>
    <Router >

        <Switch>
        <Route exact path='/Login' component={Login} />    
          <Route path='/Signup' component={Reg} />  
          <Route exact path='/detailPage' component={detailPage} />
          <Route exact path='/reviewsPage' component={ReviewsPage} />
          <Route exact path='/home' component={home} />
          <Route exact path='/' component={entrance} />
          </Switch>
        
    </Router>
  </>
  );
}

export default App;