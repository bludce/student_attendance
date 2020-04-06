import React from 'react';
import { NavLink } from 'react-router-dom';

import './Btn.sass'

const Btn = (props) => (
  <NavLink exact className="btn" to="/login">
    {props.name}
  </NavLink>
)

export default Btn;