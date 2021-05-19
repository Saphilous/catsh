import React, { useState, useEffect } from 'react';
import AppID from 'ibmcloud-appid-js'
import '../stylesheets/Home.css'

function Home() 
{
    const [ellipseclass, setellipseclass] = useState("App-Ellipse")
    const [ellipseburstclass, setllipseburstclass] = useState("App-Ellipse")
    const [formclass, setformclass] = useState("App-Form")
    const [appID, setappID] = useState()

    useEffect(() => {
      //const appID = new AppID();
      //appID.init({
        //clientId: '2152d541-0b00-4e61-9b45-de488f70112f',
        //discoveryEndpoint: 'https://us-south.appid.cloud.ibm.com/oauth/v4/b7627068-8442-4f23-9876-fd6e7e6309e8/.well-known/openid-configuration'
      //});
      //setappID(appID)
    })
    const signinhandler = (event) => {
      event.preventDefault()
      const tokens = appID.signin();
    }

    return (
        <React.Fragment>
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
          <div className= {ellipseclass} onClick = {() => {setellipseclass("App-Ellipse Spinning")}}
          onAnimationStart = {() => {setllipseburstclass("App-Ellipse Burst")}}
          onAnimationEnd = {() => {setellipseclass("App-Ellipse Hidden"); setformclass("App-Form Visible")}}>
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
          <div className = {formclass}>
            <form>
              <label className ="App-label">
                Username:
              </label>
              <input type = 'text' placeholder = 'Please Enter Your name'/> <br />
              <label className ="App-label">
                Password:
              </label>
              <input type = 'password' placeholder = 'Enter your password' />
              <button className = 'App-btn' onClick={signinhandler}> Submit </button>
            </form>
          </div>
        </div>
        </React.Fragment>
    );
}

export default Home