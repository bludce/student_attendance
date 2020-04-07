import React, {Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';

import './Office.sass'
import Header from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'
import StudentList from '../../components/Student/StudentList'


const links = [
  {
    "name": "Профиль",
    "link": "/office/profile"
  },
  {
    "name": "Студенты",
    "link": "/office/list"
  },
  {
    "name": "Группы",
    "link": "/office/groups"
  },
  {
    "name": "Пропуски",
    "link": "/office/skip"
  }
]

const Office = () => (
  <Fragment>
    <Header links={links} />
    <Switch>
      <Route path='/office/list' component={StudentList}/>
      <Route path='/office/profile' component={Profile}/>
    </Switch>
  </Fragment>
)

export default Office;