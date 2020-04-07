import React, {Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';

import './Employee.sass'
import Header from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'
import SubjectList from '../../components/Subject//SubjectList'
import ClassroomList from '../../components/Classroom/ClassroomList'
import TypeList from '../../components/Type/TypeList'
import ScheduleList from '../../components/Schedule/ScheduleList'
import EmployeeList from '../../components/Employee/EmployeeList'

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
    "name": "Вид_занятия",
    "link": "/employee/type"
  },
  {
    "name": "Сотрудники",
    "link": "/employee/list"
  }
]

const Employee = () => (
  <Fragment>
    <Header links={links} />
    <Switch>
      <Route path='/employee/subject' component={SubjectList}/>
      <Route path='/employee/classroom' component={ClassroomList}/>
      <Route path='/employee/type' component={TypeList}/>
      <Route path='/employee/profile' component={Profile}/>
      <Route path='/employee/schedule' component={ScheduleList}/>
      <Route path='/employee/list' component={EmployeeList}/>
    </Switch>
  </Fragment>
)

export default Employee;