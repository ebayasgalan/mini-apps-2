import React, { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      day: []
    }
  }

  componentDidMount() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-02-01&end=2021-02-20')
      .then(result => {
        let data = [];
        let day = [];
        const entry = Object.entries(result.data.bpi);
        entry.forEach(([key, value], i) => {
          const val = Math.floor(value);
          data.push(val);
          day.push(i);
        })
        this.setState({
          data,
          day
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <Line
          data={{
            labels: this.state.day,
            datasets: [{
              label: 'February',
              borderColor: "#3e95cd",
              data: this.state.data
            }]
          }}
          width={1200}
          height={300}
          options={{
            maintainAspectRatio: false, title: {
              display: true,
              text: 'BitCoin Price'
            }
          }}
        />
      </>
    )
  }
}

export default App;