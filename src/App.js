import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [ellipseclass, setellipseclass] = useState("App-Ellipse")
  const [ellipseburstclass, setllipseburstclass] = useState("App-Ellipse")

  return (
    <div className='App'>
      <div className='App-container'>
        <p className='App-title'>
          Catsh
        </p>
        <h1 className="text-1 jokerman-regular-normal-white-40px">Welcome to Catsh, An Interactive diary writer</h1>
        <h1 className="text-1 jokerman-regular-normal-white-40px">If you&#39;re too cool to write a dairy like a normie,<br />
        this application is for you
        </h1>
      </div>
      <div className = "App-bottom">
        <div className="App-cat" alt ="Cute Smiling Catsh">

        </div>
        <div className= {ellipseclass} onClick = {() => {setellipseclass("App-Ellipse Spinning")}} onAnimationStart = {() => {setllipseburstclass("App-Ellipse Burst")}} onAnimationEnd = {() => {setellipseclass("App-Ellipse Hidden")}}>
          <p className="App-Ellipse-Disc">
            Get Started
          </p>
        </div>
        <div className= {ellipseburstclass} onAnimationEnd = {() => {setllipseburstclass("App-Ellipse Hidden")}}>
          <p className="App-Ellipse-Disc second">
            Created By: <br/>
            Saphilous
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
