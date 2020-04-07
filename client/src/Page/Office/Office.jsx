import React, {Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';

import './Office.sass'
import Header from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'
import StudentList from '../../components/Student/StudentList'
import GroupList from '../../components/Group/GroupList'
import SkipList from '../../components/Skip/SkipList'

const links = [
  // {
  //   "name": "Профиль",
  //   "link": "/office/profile"
  // },
  {
    "name": "Студенты",
    "link": "/office/list"
  },
  {
    "name": "Группы",
    "link": "/office/group"
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
      <Route path='/office/group' component={GroupList}/>
      <Route path='/office/profile' component={Profile}/>
      <Route path='/office/skip' component={SkipList}/>
    </Switch>
  </Fragment>
)

export default Office;