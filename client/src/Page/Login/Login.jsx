import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import './Login.sass'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      redirectToReferrer: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      redirectToReferrer: true
    })
    const { email, password } = this.state;
    const user = {
      "Логин": email,
      "Пароль": password
    }

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        if (data.insert.length === 0) {
          alert("Введите корректные логин и пароль")
        } else {
          localStorage.setItem('code', data.insert[0].Код_пользователя);  
          localStorage.setItem('role', data.insert[0].Роль);  
        }
        
      })
 
    
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true && localStorage.getItem('role') === 'Учебный отдел') {
          return <Redirect to="/employee/profile" />
        }
        if (redirectToReferrer === true && localStorage.getItem('role') === 'Студенческий офис') {
          return <Redirect to="/office/profile" />
        }
        if (redirectToReferrer === true && localStorage.getItem('role') === 'Преподаватель') {
          return <Redirect to="/teacher/profile" />
        }
    return (
      <div className="login">
        <h2 className="login__title">Авторизация</h2>
      
        <form onSubmit={this.handleSubmit} className="login__form">
        
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            className="login__input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            className="login__input"
          />

          <button className="login__submit" type="submit">Войти</button>
        </form>
      </div>
    );
  }
}