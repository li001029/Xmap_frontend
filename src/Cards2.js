import React, { useState } from 'react';
import './Cards.css';
import * as atlas from 'azure-maps-control';
import WeatherAPI from './componenets/weatherAPI'

function Cards2() {

  return (
    <div className='cards2'>
      <h2>Search weather information for a location:</h2>
     <WeatherAPI/>
    </div>
  );
}

export default Cards2;
