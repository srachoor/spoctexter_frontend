// Created by Sai Rachoor on Oct 29, 2021
// This is a working React app that takes styles from materials UI
// This is where the app is defined by various paths

import './App.css';
import {
  FriendsPage,
  Home,
  SignIn,
  SignUp,
  UserAccountPage,
  OccasionsPage,
  Texts,
  UpdateProfile,
  PasswordChange,
} from './components/';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import TestModal from './components/TestModal';

function App() {
  return (
    <div className='App'>
      <TestModal></TestModal>
      <Router>
        <Switch>
          <Route path='/' exact component={() => <Home />} />
          <Route path='/signin' exact component={() => <SignIn />} />
          <Route path='/signup' exact component={() => <SignUp />} />
          <Route
            path='/account/overview'
            exact
            component={() => <UserAccountPage />}
          />
          <Route
            path='/account/friends'
            exact
            component={() => <FriendsPage />}
          />
          <Route
            path='/account/occasions'
            exact
            component={() => <OccasionsPage />}
          />
          <Route path='/account/texts' exact component={() => <Texts />} />
          <Route
            path='/account/update'
            exact
            component={() => <UpdateProfile />}
          />
          <Route
            path='/account/pwchange'
            exact
            component={() => <PasswordChange />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
