import React, {Component} from 'react';
import './Statistics.sass'
import StatisticsForm from './StatisticsForm'

import {Line, Pie} from 'react-chartjs-2';

class Statistics extends Component {

  state = {
    result: {}
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll = () => {
    fetch(`http://localhost:3000/api/statistics`)
      .then(res => res.json())
      .then(result => this.setState({ result: result.result }))
      .catch(error => error);
  }

  filter = (group, subject) => {

    if (group !== '' && subject !== '' ) {
      fetch('http://localhost:3000/api/statistics/all' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Предмет: subject,
          Группа: group,
        }) 
      })
      .then(res => res.json())
      .then(result => this.setState({
        result: result.result,
      }))
      .catch(error => error);
    } else

    if (group !== '' && subject === '') {
      fetch('http://localhost:3000/api/statistics/group' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Группа: group})
      })
      .then(res => res.json())
      .then(result => this.setState({
        result: result.result,
      }))
      .catch(error => error);
    } else
    
    if (group === '' && subject !== '') {
      fetch('http://localhost:3000/api/statistics/subject' ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Предмет: subject})
      })
      .then(res => res.json())
      .then(result => this.setState({
        result: result.result,
      }))
      .catch(error => error);
    } else {
      this.fetchAll();
    }

    

  }
 
  render() {
    const { valid = [], notValid = [] } = this.state.result

    let countValid = valid.reduce((sum, {Количество}) => {
      return sum += Количество 
    }, 0)

    let countNotValid = notValid.reduce((sum, {Количество}) => {
      return sum += Количество 
    }, 0)

    let lineDataChart = {
      labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
      datasets: [
        {
          label: 'Количество пропусков в месяц',
          lineTension: 0.5,
          fill: true,
          backgroundColor: 'rgba(114, 122, 252, 0.3)',
          borderColor: '#727afc',
          borderWidth: 2,
          spanGaps: true,
          data: []
        },
        {
          label: 'Количество уважительных пропусков в месяц',
          lineTension: 0.5,
          fill: true,
          backgroundColor: 'rgba(252, 86, 127, 0.3)',
          borderColor: '#fc567f',
          borderWidth: 2,
          spanGaps: true,
          data: []
        }
      ] 
      
    };

    let PieDataChart = {
      labels: [
        "Количество без уважительных причин",
        "Количество с уважительными причинами",
      ],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          ],
          data: [countValid, countNotValid]
        }
      ]
      
    };
    valid.map(({Месяц,Количество}) => {
      lineDataChart.datasets[0].data[Месяц - 1] = Количество
    })

    notValid.map(({Месяц,Количество}) => {
      lineDataChart.datasets[1].data[Месяц - 1] = Количество
    })

    const option = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
            var total = meta.total;
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue/total*100).toFixed(1));
            return currentValue + ' (' + percentage + '%)';
          },
          title: function(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }
      },
      title:{
        display:true,
        text:'Круговая диаграмма',
        fontSize:20
      },
      legend:{
        display:true,
        position:'right'
      }
    }

      return(
        <div className="report">
          <div className="report-form">
            <StatisticsForm filter={this.filter}/>
          </div>
          <div className="report-content">
            <Line 
              data={lineDataChart} 
              width={900}
              height={500}
              options={{
                title:{
                  display:true,
                  text:'График посещаемости',
                  fontSize:20
                },
              }}
           /> 
           <Pie 
              data={PieDataChart} 
              width={900}
              height={500}
              options={option}
           /> 
          </div>
        </div>
      )
  }
}

export default Statistics