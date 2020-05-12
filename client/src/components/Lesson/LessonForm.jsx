import React, { Component, Fragment } from 'react'
import Modal from "../Modal/Modal";
import io from "socket.io-client";

class LessonForm extends Component {

  state = {
    Студент: '',
    show: false,
    qr: '',
  }
  
  componentDidMount = () => {
    this.socket.on('connect', ()=>{
      console.log('connected');
    });
    
    this.socket.on('ROOM:SET_USERS', (roomId) => {
      fetch(`http://localhost:3000/rooms/${roomId}`)
      .then(res => res.json())
      .then(result => this.props.filter(result))
    });
    
  }

  socket = io('localhost:3000');
  
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

  handleSubmit = async (e) => {
      e.preventDefault()
      const data = this.props.lesson[0].Предмет;  
      this.props.addStudent(data,this.state.Студент)
      // const obj = {
      //   roomId: `${data}`,
      //   userName: `${this.state.Студент}`,
      // };

      // await fetch('http://192.168.1.74:3000/rooms' ,{
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(obj)
      // })

      // this.socket.emit('ROOM:JOIN', obj)
  }

  qrcode = async () => {
    
    const data = this.props.lesson[0].Предмет;    
    
    await fetch('http://192.168.1.74:3000/rooms' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({roomId: data, userName: "Teacher"})
      })

    this.socket.emit('ROOM:JOIN', {roomId: data, userName: "Teacher"})
    fetch('http://localhost:3000/api/qr/create' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text:data})
      })
        .then(res => res.json())
        .then(result => {
          this.showModal(result)

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