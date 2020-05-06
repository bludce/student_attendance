import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';


import './Header.sass'

const Header = (props) => {
  const logout = () => {
    localStorage.setItem('role', '')
    localStorage.setItem('code', '')
  }
  return (
    <header className="header">
        <nav className="flex">
          <ul className="nav">
            {props.links.map((post) =>
              <li className="nav__item" key={post.name+post.link}>
                <NavLink exact activeClassName="nav__link--active" className="nav__link" to={post.link}>
                {post.name}
              </NavLink>
              </li>
            )}
            <li className="nav__item" key="logout">
              <NavLink exact  className="nav__link" to="/login" onClick={logout}>
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>    
    </header>
)}

export default Header