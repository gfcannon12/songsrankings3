import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
const moment = require('moment');

class App extends Component {
    
    constructor(){
      super();
          this.state = {
              songs: []
          }
    }

    componentWillMount(){
      let that = this;
      let requestedDate = moment().format('MM-DD-YY');
      requestedDate = moment().format('MM-DD-YY');
      axios.get('https://songsranking-api-gfcannon.c9users.io/songs/' + requestedDate)
        .then(function(result){
          console.log('result', result);
          let json = result.data;
          let i;
          let songNames = [];
          for (i=0;i<json.length;i++) {
            songNames.push(json[i].songName);
          }
          console.log(songNames);
          that.setState({songs:songNames});
        })
    }


  render() {
    this.songsList = this.state.songs.map((songs, index) => {
        return <li key={index} ><NavLink to={"/songchart/" + songs}> {songs}  </NavLink></li> })
    
    return (

      <div className="App">
        <div>
          <link href="../../node_modules/c3/src/c3.css" rel="stylesheet"></link>
          <script src="../../node_modules/d3/src/d3.min.js" charset="utf-8"></script>
          <script src="../../node_modules/c3/src/c3.min.js"></script>
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Dat Straight Fire</h2>
        </div>
        <p className="App-intro">
          Today's Top Tracks
        </p>
        <ol>
            {this.songsList}
        </ol>
      </div>
    );
  }
}

export default App;