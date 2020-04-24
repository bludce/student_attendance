import React, { Component } from 'react'

class ReportForm extends Component {

  state = {
    Дата: '',
    Группа: '',
    Предмет: '',
  }
  

  handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      this.props.filter(this.state.Дата, this.state.Группа, this.state.Предмет)
  }

  render() {
    const { data= [] } = this.props.data;

    let subjectList = data.map((item) => item.Название)
    subjectList = [...new Set(subjectList)];

    let groupList = data.map((item) => item.Группа)
    groupList = [...new Set(groupList)];

    let dateList = data.map((item) => item.Дата_проведения)
    dateList = [...new Set(dateList)];

    return (
      
      <form onSubmit={this.handleSubmit} autoComplete="off" className="form">
        <select name="Дата" value={this.state.Дата} onChange={this.handleInputChange} className="form__input">
          <option value=''>Введите дату</option>
          {dateList.map((date) => 
            <option value={date}>{date.slice(0,10)}</option>
          )}
        </select>
        <select name="Группа" value={this.state.Группа} onChange={this.handleInputChange} className="form__input">
          <option value=''>Введите группу</option>
          {groupList.map((group) => 
            <option value={group}>{group}</option>
          )}
        </select>
        <select name="Предмет" value={this.state.Предмет} onChange={this.handleInputChange} className="form__input">
          <option value=''>Введите предмет</option>
          {subjectList.map((subject) => 
            <option value={subject}>{subject}</option>
          )}
        </select>
        <button className="form__submit" type="submit">Отправить</button>
      </form>
    )
  }
}

export default ReportForm