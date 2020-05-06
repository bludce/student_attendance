import React, {Component} from 'react';
import './Profile.sass'

class Profile extends Component {

  state = {
    result: {},
  }

  componentDidMount() {
    this.fetchData(localStorage.getItem("code"));
  }

  fetchData = (id) => {
    fetch(`http://localhost:3000/api/profile/${id}`)
        .then(res => res.json())
        .then(result => this.setState({result: result}))
        .catch(error => error);
  }

  render() {
    const { result } = this.state;
    const { data = [] } = result
    return(
      <div className="content">
        <h2 className="content__title">Профиль</h2>
          
          <hr />
          <div>
          </div>
          <table className="table">
            <thead>
              <tr className="table__row">
                <td className="table__column">ФИО</td>
                <td className="table__column">Должность</td>
                <td className="table__column">Отдел</td>
              </tr>
            </thead>
            <tbody>
              {data.map(({ Код_пользователя, ФИО, Должность, Роль }) => 
                <tr key={Код_пользователя} className="table__row">
                  <td className="table__column">{ФИО}</td>
                  <td className="table__column">{Должность}</td>
                  <td className="table__column">{Роль}</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    )
  }
}

export default Profile