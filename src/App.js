import logo from './logo.svg';
import React,{useState} from 'react';
import './App.css';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import './HeroSection.css';
import HeroSection from './HeroSection';
import './Cards.css';
import APIcall from './APIcall';
import Cards2 from './Cards2';
//import Cards3 from './Cards3';
import Cards3 from './Cards3';
import Cards4 from './Cards4';
import Footer from './Footer';

////////////////////////////////Azure Map imports

///////////////////////////////Azure Map component

//////////////////////////////
function App() {

//   const [data, setData] = useState('');
  
// const parentToChild = () => {
//   setData("This is data from Parent Component to the Child Component.");
// }
  return (
    <>
    <div className='hero-container' >
      <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
      <h1>Find your trail with Xmap today!</h1>
    </div>
  
    <div className='cards2'>
      <p>Search results:</p>

     <APIcall />
    </div>
  
    {/* <Cards4/> */}
    <Cards2/>
    {/* <MarkersExample /> */}
    <Cards3/>
    <Footer />
  </>
  );
}

export default App;
///////////////////////////////////////////////////
//////////////////////////////////////////////////

