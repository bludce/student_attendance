import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.sass'

const Header = (props) => (
  <header className="header">
      <nav>
        <ul className="nav">
          {props.links.map((post) =>
            <li className="nav__item" key={post.name+post.link}>
              <NavLink exact activeClassName="nav__link--active" className="nav__link" to={post.link}>
              {post.name}
            </NavLink>
            </li>
          )}
        </ul>
      </nav>   
  </header>
)

export default Header