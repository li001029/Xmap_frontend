import logo from './logo.svg';
import React,{useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import './HeroSection.css';
import HeroSection from './HeroSection-7';
import './Cards.css';
import Cards2 from './Cards2';
//import Cards3 from './Cards3';
import Cards3 from './Cards3';
import Cards4 from './Cards4';
import Footer from './Footer';
import Header from './Header';
import detailPage from './detailPage';


function App() {

  return (
    <>
    <div>
    <img   src='https://static.onecms.io/wp-content/uploads/sites/28/2020/07/10/yosemite-national-park-falls-trail-CALIHIKES0720.jpg'/>
    <Header />
    <HeroSection />
    {/* <Cards3/> */}
    <Footer />
    </div>
  </>
  );
}

export default App;