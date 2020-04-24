import React, { Component } from 'react'

class ReportForm extends Component {

  state = {
    Дата: '',
    Группа: '',
    Предмет: '',
    groups: {},
    subjects: {},
  }

  componentDidMount() {
    this.fetchGroup();
    this.fetchSubjects();
  }

  fetchGroup = () => {
    fetch('http://localhost:3000/api/groups')
      .then(res => res.json())
      .then(result => this.setState({groups: result}))
      .catch(error => error);
  }

  fetchSubjects = () => {
    fetch('http://localhost:3000/api/subjects/')
      .then(res => res.json())
      .then(result => this.setState({subjects: result}))
      .catch(error => error);
  }


  handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      this.props.fetchReport(this.state.Дата, this.state)
  }

  render() {
    const { groups, subjects } = this.state;
    
    const {groupList = []} = groups
    console.log(groupList)
    return (
      
      <form onSubmit={this.handleSubmit} autoComplete="off" className="form">
        <input type="date" name="Дата" onChange={this.handleInputChange} value={this.state.Дата} className="form__input"/>
        <select name="Группа" value={this.state.Группа} onChange={this.handleInputChange} className="form__input">
          <option value=''></option>
          {/* {groups.map(({ Код_группы, Название }) => 
            <option value={Код_группы}>{Название}</option>
          )} */}
        </select>
        <select name="Предмет" value={this.state.Предмет} onChange={this.handleInputChange} className="form__input">
          <option value=''></option>
          {/* {subject.map(({ Код_предмета, Название }) => 
            <option value={Код_предмета}>{Название}</option>
          )} */}
        </select>
        <button className="form__submit" type="submit">Отправить</button>
      </form>
    )
  }
}

export default ReportForm