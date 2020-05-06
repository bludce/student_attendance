import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../Page/Home/Home';
import Login from '../../Page/Login/Login';
import Employee from '../../Page/Employee/Employee';
import Office from '../../Page/Office/Office'
import Profile from '../../components/Profile/Profile'
import Teacher from '../../Page/Teacher/Teacher'

const Main = () => (
  <main className="container">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/employee' component={Employee}/>
      <Route path='/office' component={Office}/>
      <Route path='/teacher' component={Teacher}/>
      <Route path='/employee/profile' component={Profile}/>
      <Route path='/office/profile' component={Profile}/>
      <Route path='/teacher/profile' component={Profile}/>
    </Switch>
  </main>
)

export default Main;