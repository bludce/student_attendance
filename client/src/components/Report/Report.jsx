import React, {Component} from 'react';
import './Report.sass'
import ReportForm from './ReportForm'

class Report extends Component {

  state = {
    result: {},
  }

  fetchReport = (date, groupID) => {
    if (date !== '' && groupID === '') {
      fetch(`http://localhost:3000/api/reports/date/${date}`)
        .then(res => res.json())
        .then(result => this.setState({ result }))
        .catch(error => error);
    } else if (date === '' && groupID !== '') {
      console.log(groupID)
      fetch(`http://localhost:3000/api/reports/group/${groupID}`)
        .then(res => res.json())
        .then(result => this.setState({ result }))
        .catch(error => error);
    } else {
      fetch(`http://localhost:3000/api/reports/all/${date}/${groupID}`)
        .then(res => res.json())
        .then(result => this.setState({ result }))
        .catch(error => error);
    }
    
  }

  render() {
    const { result } = this.state;
    const { data = [] } = result

    if (data.length === 0) {
      return (
        <div className="report">
          <div className="report-form">
            <ReportForm fetchReport={this.fetchReport}/>
          </div>
          <div className="report-content">
        
          </div>
        </div>
      )
    } else {
      return(
        <div className="report">
          <div className="report-form">
            <ReportForm fetchReport={this.fetchReport}/>
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
                    {data.map(({ Название, Время_проведение, ФИО, Уважительно }) => 
                      <tr className="table__row">
                        <td className="table__column">{Название}</td>
                        <td className="table__column">{Время_проведение}</td>
                        <td className="table__column">{ФИО}</td>
                        <td className="table__column">{Уважительно === 0 ? '-' : '+'}</td>
                      </tr>
                    )}
                  </tbody>
                </table>

          </div>
        </div>
      )
    }
  }
}

export default Report