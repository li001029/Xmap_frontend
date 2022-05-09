import React, { useState } from 'react';
import './Cards.css';
import APIcall from './APIcall';

function Cards4() {

  return (
    <div className='cards2'>
      <p>Search results:</p>
     <APIcall/>
    </div>
  );
}

export default Cards4;
