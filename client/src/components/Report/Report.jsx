import React, {Component} from 'react';
import './Report.sass'
import ReportForm from './ReportForm'

class Report extends Component {

  state = {
    result: {},
    filterResult: {},
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`http://localhost:3000/api/reports/`)
      .then(res => res.json())
      .then(result => this.setState({ result }))
      .catch(error => error);
  }

  filter = (date, group, subject) => {
    
    const { result } = this.state;
    const { data = [] } = result
    let arr;

    if (group !== '' && subject === '' && date === '') {
      arr = data.filter((item) => item.Группа === group)
    }

    if (group === '' && subject !== '' && date === '') {
      arr = data.filter((item) => item.Название === subject)
    }

    if (group === '' && subject === '' && date !== '') {
      arr = data.filter((item) => item.Дата_проведения === date)
    }

    if (group !== '' && subject !== '' && date === '') {
      arr = data.filter((item) => item.Название === subject && item.Группа === group)
    }

    if (group !== '' && subject === '' && date !== '') {
      arr = data.filter((item) => item.Группа === group && item.Дата_проведения === date)
    }

    if (group === '' && subject !== '' && date !== '') {
      arr = data.filter((item) => item.Название === subject && item.Дата_проведения === date)
    }

    if (group !== '' && subject !== '' && date !== '') {
      arr = data.filter((item) => item.Название === subject && item.Группа === group && item.Дата_проведения === date)
    }
    

    this.setState({
      filterResult: {newResult: arr},
    })
  }


  render() {
    const { newResult = []} = this.state.filterResult
    const { data = [] } = this.state.result
    let count = 0;
    let valid = 0
   
    if (data.length === 0) {
      return (
        <div className="report">
          <div className="report-form">
            <ReportForm data={this.state.result} filter={this.filter}/>
          </div>
          <div className="report-content">
        
          </div>
        </div>
      )
    } else {
      return(
        <div className="report">
          <div className="report-form">
            <ReportForm data={this.state.result} filter={this.filter}/>
          </div>
          <div className="report-content">
              <table className="table">
                  <thead>
                    <tr className="table__row">
                      <td className="table__column">Название</td>
                      <td className="table__column">Время проведения</td>
                      <td className="table__column">ФИО</td>
                      <td className="table__column">Уважительно</td>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {newResult.map(({ Название, Время_проведение, ФИО, Уважительно }) => {
                      count++
                      Уважительно === 1 ? valid ++ : valid
                      return (<tr className="table__row">
                        <td className="table__column">{Название}</td>
                        <td className="table__column">{Время_проведение}</td>
                        <td className="table__column">{ФИО}</td>
                        <td className="table__column">{Уважительно === 0 ? '-' : '+'}</td>
                      </tr>
                      )
                    }
                    )}
                    <tr className="table__row">
                        <td className="table__column">Итого</td>
                        <td className="table__column">{count}</td>
                        <td className="table__column"></td>
                        <td className="table__column"></td>
                    </tr>
                    <tr className="table__row">
                        <td className="table__column">Уважительно</td>
                        <td className="table__column">{valid}</td>
                        <td className="table__column"></td>
                        <td className="table__column"></td>
                    </tr>
                  </tbody>
                </table>

          </div>
        </div>
      )
    }
  }
}

export default Report