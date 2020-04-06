import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.sass'

const Header = () => (
  <header className="header">
    <div className="container">
      <nav>
        <ul className="nav">
          <li className="nav__item">
            <NavLink exact activeClassName="nav__link--active" className="nav__link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink activeClassName="nav__link--active" className="nav__link" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
    
  </header>
)

export default Header