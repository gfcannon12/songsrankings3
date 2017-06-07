import React, {Component} from 'react';
import axios from 'axios';
const C3Chart = require("c3-react");

function lineChart (trackName, dataArray) {

    let data = [
    {
        key: trackName,
        values: dataArray
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
            x: "Date",
            y: "Rank"
        },
        onClick: function(d) {
            let categories = this.categories(); //c3 function, get categorical labels
            console.log(d);
            console.log("you clicked {" + d.name + ": " + categories[d.x] + ": " + d.value + "}");
        }
    };
    return [data, type, options];
}

export default class ChartComponent extends Component {

    constructor(){
      super();
          this.state = {
              songName: '',
              c3: []
          }
    }
    componentWillMount(){
        let that = this;
        let pathname = this.props.location.pathname;
        let song = pathname.substring(11);
        axios.get('https://songsranking-api-gfcannon.c9users.io/songs/byname/' + song)
            .then(function(result){
                console.log('result', result);
                let json = result.data;
                let i;
                let dataPoints = [];
                for (i=0;i<json.length;i++) {
                    dataPoints[i] = {label: json[i].date, value: json[i].rank};             
                }
                console.log('dataPoints', dataPoints);
                let lineChartData = lineChart(song, dataPoints);
                that.setState({c3: lineChartData});
                that.setState({songName: song});
        })
    }

    render(){
        let chartData = this.state.c3[0];
        let chartType = this.state.c3[1];
        let chartOptions = this.state.c3[2];
        let c3JSX = <C3Chart data={chartData} type={chartType} options={chartOptions}/>
        
        return(
            <div>
                <h1>{this.state.songName}</h1>
                <h2>iTunes Chart History</h2>
                {c3JSX}
            </div>
        )
    }
}