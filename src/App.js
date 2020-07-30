import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import {auth} from './Auth'
//Pages
import MainPage from './pages/index'
import NotFoundPage from './pages/404'
import Main from './pages/main'



function App() {
  return (

  <Router>
    <auth/>
    <Switch>
    <Route exact path="/" component={MainPage}/>
    <Route exact path="/404" component={NotFoundPage}/>
    <Route exact path="/main" component={Main}/>
    
    <Redirect to="/404"/>
    </Switch>
  </Router>
  )

}

export default App;
