import React, { Component } from 'react'

class SubjectForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
      if (this.props.currentIndex == -1)
        return {
          Код_предмета: '',
          Название: '',
          Описание: ''
        }
      else {
        for (var key in this.props.list) {
          if (this.props.currentIndex === this.props.list[key].Код_предмета ) {
            return {
              Код_предмета: this.props.list[key].Код_предмета,
              Название: this.props.list[key].Название ,
              Описание: this.props.list[key].Описание 
            }
          }
        }
      }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex != this.props.currentIndex || prevProps.list != this.props.list) {
            this.setState({ ...this.returnStateObject() })
            // console.log(prevProps, this.props)
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onAddOrEdit(this.state)
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input name="Код_предмета" placeholder="Код_предмета" onChange={this.handleInputChange} value={this.state.Код_предмета} /><br />
          < input name="Название" placeholder="Название" onChange={this.handleInputChange} value={this.state.Название} /><br />
          < input name="Описание" placeholder="Описание" onChange={this.handleInputChange} value={this.state.Описание} /><br />
          <button type="submit">Submit</button>
        </form>
      )
    }
}

export default SubjectForm