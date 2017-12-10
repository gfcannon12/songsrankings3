import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

const c3css = require("c3/c3.css");
const d3js = require("d3/d3.min.js");
const c3js = require("c3/c3.min.js");
const moment = require('moment');

class App extends Component {
    
    constructor(){
      super();
          this.state = {
              songData: []
          }
    }

    componentWillMount(){
      let that = this;
      let requestedDate = moment().format('MM-DD-YY');
      requestedDate = moment().format('MM-DD-YY');
      axios.get('https://songs-rankings-api.herokuapp.com/songs/' + requestedDate)
        .then(function(result){
          console.log('result', result);
          that.setState({songData: result.data})
        })
    }


  render() {
    this.songsList = this.state.songData.map((songData, index) => {
      return <tr key={index} >
                <td>{index + 1}</td>
                <td><NavLink to={"/songchart/" + songData.songName}> {songData.songName}</NavLink></td>
                <td>{songData.artist}</td>
                <td>{songData.genre}</td>
              </tr>
    });
    
    return (

      <div className="App">
        <div>
          <link href={c3css} rel="stylesheet"></link>
          <script src={d3js} charSet="utf-8"></script>
          <script src={c3js}></script>
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Dat Straight Fire</h2>
        </div>
        <p className="App-intro">
          Today's Top Tracks
        </p>
        <table>
          <thead>
            <tr>
              <td>Rank</td>Song<td>Artist</td><td>Genre</td>
            </tr>
          </thead>
          <tbody>
            {this.songsList} 
          </tbody>         
        </table>
      </div>
    );
  }
}

export default App;