// Created by Sai Rachoor on Oct 29, 2021
// This is a working React app that takes styles from materials UI
// This is where the app is defined by various paths

import './App.css';
import {
  FriendsPage,
  SignIn,
  SignUp,
  UserAccountPage,
  OccasionsPage,
  Texts,
} from './components/';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={() => <SignIn />} />
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// const [person, setPerson] = useState([]);

// useEffect(()=>{
//   axios.get("/api/v1/spoc/profile/email=Max.Hudson@spoctexter.com")
//   .then(res => {
//     console.log(res.data)
//     setPerson(res.data)
//   }).catch(err => {
//     console.log(err)
//   });
// },[])
