import React, { Component, Fragment } from 'react'

class LessonForm extends Component {

  state = {
    Студент: '',
  }
  

  handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      this.props.filter(this.state.Студент)
  }

  render() {


    return (
      <Fragment>
        <button className="qr">Получить QR-код</button>
        <form onSubmit={this.handleSubmit} autoComplete="off" className="form">
          <select name="Студент" value={this.state.Студент} onChange={this.handleInputChange} className="form__input">
            <option value=''>Выберите студента</option>
            {this.props.data.map(({ФИО}) => 
              <option value={ФИО}>{ФИО}</option>
            )}
          </select>
          <button className="form__submit" type="submit">Отправить</button>
        </form>
      </Fragment>
    )
  }
}

export default LessonForm