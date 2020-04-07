import React, {Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';

import './Employee.sass'
import Header from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'
import SubjectList from '../../components/Subject//SubjectList'

const links = [
  {
    "name": "Профиль",
    "link": "/employee/profile"
  },
  {
    "name": "Расписание",
    "link": "/employee/schedule"
  },
  {
    "name": "Предметы",
    "link": "/employee/subject"
  },
  {
    "name": "Аудитории",
    "link": "/employee/classroom"
  },
  {
    "name": "Сотрудники",
    "link": "/employee/list"
  },
  {
    "name": "Вид_занятия",
    "link": "/employee/type"
  }
]

const Employee = () => (
  <Fragment>
    <Header links={links} />
    <Switch>
      <Route path='/employee/subject' component={SubjectList}/>
      <Route path='/employee/profile' component={Profile}/>
    </Switch>
  </Fragment>
)

export default Employee;