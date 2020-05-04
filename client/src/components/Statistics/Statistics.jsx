import React, {Component} from 'react';
import './Statistics.sass'
import StatisticsForm from './StatisticsForm'

import {Line, Pie} from 'react-chartjs-2';

class Statistics extends Component {

  state = {
    notValid: {},
    valid: {}
  }

  componentDidMount() {
    this.fetchNotValid();
    this.fetchValid();
  }

  fetchNotValid = () => {
    fetch(`http://localhost:3000/api/statistics/notvalid`)
      .then(res => res.json())
      .then(result => this.setState({ notValid: result }))
      .catch(error => error);
  }

  fetchValid = () => {
    fetch(`http://localhost:3000/api/statistics/valid`)
      .then(res => res.json())
      .then(result => this.setState({ valid: result }))
      .catch(error => error);
  }
 
  render() {
    const { valid = [] } = this.state.valid
    const { notValid = [] } = this.state.notValid

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
          data: []
        },
        {
          label: 'Количество уважительных пропусков в месяц',
          lineTension: 0.5,
          fill: true,
          backgroundColor: 'rgba(252, 86, 127, 0.3)',
          borderColor: '#fc567f',
          borderWidth: 2,
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
            <StatisticsForm data={this.state.result} filter={this.filter}/>
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