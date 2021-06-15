import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './configurations/firebase'
import Navbar from './containers/Navbar';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import EntryForm from './containers/EntryForm';
import Entry from './containers/Entry'
import firebaseconfig from './configurations/firebase'
import firebase from "firebase/app";
import authHoc from "./HOC/authhoc";
import './stylesheets/common.css'


function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig);
 }else {
    firebase.app();
 }

  return (
    <BrowserRouter>
      <div className='App'>
      <Navbar />
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/dashboard/' component={authHoc(Dashboard)} exact />
        <Route path='/dashboard/entryform' component={authHoc(EntryForm)} exact />
        <Route path='/dashboard/entry' component={authHoc(Entry)} exact />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
