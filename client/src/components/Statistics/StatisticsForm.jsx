import React, { Component } from 'react'

class StatisticsForm extends Component {

  state = {
    Группа: '',
    Предмет: '',
    groupList: {},
    subjectList: {}
  }
  

  handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      this.props.filter(this.state.Группа, this.state.Предмет)
  }

  fetchGroup = () => {
    fetch(`http://localhost:3000/api/groups/`)
      .then(res => res.json())
      .then(result => this.setState({ groupList: result }))
      .catch(error => error);
  }

  fetchSubject = () => {
    fetch(`http://localhost:3000/api/subjects/`)
      .then(res => res.json())
      .then(result => this.setState({ subjectList: result }))
      .catch(error => error);
  }

  componentDidMount() {
    this.fetchGroup();
    this.fetchSubject();
  }

  render() {
    const {subjectList = []} = this.state.subjectList
    let subjects = [...new Set(subjectList.map((item) => item.Название))]

    const {groupList = []} = this.state.groupList
    let groups = [...new Set(groupList.map((item) => item.Название))]

    return (
      
      <form onSubmit={this.handleSubmit} autoComplete="off" className="form">
        <select name="Группа" value={this.state.Группа} onChange={this.handleInputChange} className="form__input">
          <option value=''>Введите группу</option>
          {groups.map((group) => 
            <option value={group}>{group}</option>
          )}
        </select> 
        <select name="Предмет" value={this.state.Предмет} onChange={this.handleInputChange} className="form__input">
          <option value=''>Введите предмет</option>
          {subjects.map((subject) => 
            <option value={subject}>{subject}</option>
          )}
        </select>
        <button className="form__submit" type="submit">Отправить</button>
      </form>
    )
  }
}

export default StatisticsForm