import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const C3Chart = require("c3-react");

let data = [
  {
    key: "dataSource1",
    values: [
      {label: "A", value: 3},
      {label: "B", value: 4}
    ]
  },
  {
    key: "dataSource2",
    values: [
      {label: "X", value: 7},
      {label: "Y", value: 8}
    ]
  }
];

let type = "bar" // {"line","bar","pie", "multiBar","lineBar"}

let options = {
  padding: {
    top: 20,
    bottom: 20,
    left: 40,
    right: 10
  },
  size: {
    width: 800,
    height: 600
  },
  labels: true,
  axisLabel: {
    x: "product",
    y: "quantity"
  },
  onClick: function(d) {
    let categories = this.categories(); //c3 function, get categorical labels
    console.log(d);
    console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
  }
};

class App extends Component {
  render() {
    return (

      <div className="App">
        <div>
          <link href="../../node_modules/c3/src/c3.css" rel="stylesheet"></link>
          <script src="../../node_modules/d3/src/d3.min.js" charset="utf-8"></script>
          <script src="../../node_modules/c3/src/c3.min.js"></script>
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <C3Chart data={data} type={type} options={options}/>
      </div>
    );
  }
}

export default App;