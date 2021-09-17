import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Enroll from './pages/Enroll';
import Attendance from './pages/Attendance';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestRoute from './components/GuestRoute';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <Router>
      <Switch>
        <GuestRoute exact path="/signin">
            <Login />  
        </GuestRoute>
        <GuestRoute exact path="/signup">
            <Register />  
        </GuestRoute>
        <AuthRoute exact path="/home">
            <Home />
        </AuthRoute>
        <AuthRoute exact path="/enroll">
            <Enroll />
        </AuthRoute>
        <AuthRoute exact path="/attendance">
            <Attendance />
        </AuthRoute>
    </Switch>
    </Router >
  );
}

export default App;
