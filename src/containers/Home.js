import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import AppID from 'ibmcloud-appid-js';
import config from '../configurations/authconfig.json'
import '../stylesheets/Home.css'
import AuthContext from '../store/authContext'


function Home() 
{
  var history = useHistory()
  const authcontext = useContext(AuthContext)
    const appID = React.useMemo(() => {
      return new AppID()
    }, []);
    (async () => {
      try {
        await appID.init({
            clientId: "7d53d0be-4b73-4949-82ac-b6c1524832d5",
            discoveryEndpoint: "https://us-south.appid.cloud.ibm.com/oauth/v4/b7627068-8442-4f23-9876-fd6e7e6309e8/.well-known/openid-configuration",
        });
      } catch (e) {
        console.log(e)
      }
    })();
  
    const [ellipseclass, setellipseclass] = useState("App-Ellipse")
    const [ellipseburstclass, setllipseburstclass] = useState("App-Ellipse")
    const [formclass, setformclass] = useState("App-Form")
    const [username, setUserName] = useState()

    const signinhandler = async (event) => {
      event.preventDefault()
      try {
        const tokens = await appID.signin();
        let userInfo = await appID.getUserInfo(tokens.accessToken);
        console.log(tokens)
        console.log(userInfo)
        const userinfotextcontent = JSON.stringify(userInfo)
        setUserName(userinfotextcontent)
        console.log(userinfotextcontent)
        document.cookie = `atn= ${tokens.accessToken}; path= /`
        authcontext.login()
        authcontext.userinfofunc(userInfo.name)
        history.push('/dashboard')
      } catch (e) {
        console.log(e)
      }
    };

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
              <button className = 'App-btn' id='loginbtn' onClick= {signinhandler}> Submit </button>
            </form>
          </div>
        </div>
        </React.Fragment>
    );
}

export default Home