import React, {Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'
import Lesson from '../../components/Lesson/Lesson'


const links = [
  {
    "name": "Профиль",
    "link": "/teacher/profile"
  },
  {
    "name": "Занятие",
    "link": "/teacher/lesson"
  },
]

const Teacher = () => (
  <Fragment>
    <Header links={links} />
    <Switch>
      <Route path='/teacher/profile' component={Profile}/>
      <Route path='/teacher/lesson' component={Lesson}/>
    </Switch>
  </Fragment>
)

export default Teacher;