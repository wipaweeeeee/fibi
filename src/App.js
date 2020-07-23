import React from 'react';
import './App.scss';
import Hero from './assets/hero.mp4';

function App() {
  return (
    <div className="hero">
      <video autoPlay loop play src={Hero} />
    </div>
  );
}

export default App;
