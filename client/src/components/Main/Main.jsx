import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../Page/Home/Home';
import Login from '../../Page/Login/Login';
import Employee from '../../Page/Employee/Employee';
import Office from '../../Page/Office/Office'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/employee' component={Employee}/>
      <Route path='/office' component={Office}/>
    </Switch>
  </main>
)

export default Main;