import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchProjects, fetchEvents } from '../actions';
import moment from 'moment';

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import ChartHelper from './chartHelper';

const brandInfo = getStyle('--info')

const randomColors = [];
for (let i = 0; i< 100; i++) {
  randomColors.push('#' + Math.random().toString(16).slice(2, 8));
}

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const eventHoursPerDayChartOptions = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

const eventHoursPerProjectChartOptions = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};



class Analytics extends Component {
  componentDidMount() {
    this.props.handleProjectsFetch()
    this.props.handleEventsFetch()
  }

  render() {
    const eventHoursChat = {
      labels: this.props.events.map(e => moment(e.start).format('D/M/YYYY')),
      datasets: [
        {
          label: 'Hours per day',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: this.props.events.map(e =>  e.minutes ),
        }
      ]
    }
    const hoursForDayPerProjectData = ChartHelper.makeHoursForDayPerProject(this.props.events, randomColors);
    const hoursForProjectPerDay = ChartHelper.makeHoursForProjectPerDay(this.props.events, randomColors);

    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Total hours per day</CardTitle>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                  </Col>
                </Row>
                <div className="chart-wrapper mt-4">
                  <Line data={eventHoursChat} options={eventHoursPerDayChartOptions} height={300} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle className="mb-0">Date stack hours per project</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper mt-4">
                  <Bar data={hoursForDayPerProjectData} options={eventHoursPerProjectChartOptions} height={400} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle className="mb-0">Project stack hours per date</CardTitle>
                  </Col>
                </Row>
                <div className="chart-wrapper mt-4">
                  <Bar data={hoursForProjectPerDay} options={eventHoursPerProjectChartOptions} height={400} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.tracker.events,
    projects: state.tracker.projects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleProjectsFetch: bindActionCreators(fetchProjects, dispatch),
    handleEventsFetch: bindActionCreators(fetchEvents, dispatch),
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Analytics);
