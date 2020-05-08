import React, { Component, Fragment } from 'react'
import Modal from "../Modal/Modal";

class LessonForm extends Component {

  state = {
    Студент: '',
    show: false,
    qr: '',
  }
  
  showModal = result => {
    this.setState({
      show: !this.state.show,
      qr: !this.state.show ? result : ''
    });
  };

  handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e) => {
      e.preventDefault()
      this.props.filter(this.state.Студент)
  }

  qrcode = () => {
    const data = this.props.lesson[0].Предмет;
    fetch('http://localhost:3000/api/qr/create' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text:data})
      })
        .then(res => res.json())
        .then(result => {
          this.showModal(result);
        })
        .catch(error => error);
  }

  render() {

    return (
      <Fragment>
        <button className="qr" onClick={this.qrcode}>Получить QR-код</button>

        <Modal onClose={this.showModal} show={this.state.show}>
          <img src={this.state.qr} width="500px"></img>
        </Modal>
        
        <form onSubmit={this.handleSubmit} autoComplete="off" className="form">
          <select name="Студент" value={this.state.Студент} onChange={this.handleInputChange} className="form__input">
            <option value=''>Выберите студента</option>
            {this.props.students.map(({ФИО}) => 
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