import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './configurations/firebase'
import Navbar from './containers/Navbar';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import EntryForm from './containers/EntryForm';
import firebaseconfig from './configurations/firebase'
import firebase from "firebase/app";
import './stylesheets/common.css'


function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig);
 }else {
    firebase.app();
 }
  const [ellipseclass, setellipseclass] = useState("App-Ellipse")
  const [ellipseburstclass, setllipseburstclass] = useState("App-Ellipse")
  const [formclass, setformclass] = useState("App-Form")

  return (
    <BrowserRouter>
      <div className='App'>
      <Navbar />
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/dashboard' component={Dashboard} exact />
        <Route path='/dashboard/entryform' component={EntryForm} exact />
      </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
