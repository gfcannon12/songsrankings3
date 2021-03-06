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

    let type = "line" // {"line","bar","pie", "multiBar","lineBar"}

    let options = {
        padding: {
            top: 20,
            bottom: 50,
            left: 40,
            right: 10
        },
        size: {
            height: 550
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
        axios.get('https://songs-rankings-api.herokuapp.com/songs/byname/' + song)
            .then(function(result){
                console.log('result', result);
                let json = result.data;
                let i;
                const dataPoints = [];
                for (i=0;i<json.length;i++) {
                    if (json[i-1] && json[i].date === json[i - 1].date ) {
                        console.log(`Appeared on the chart twice on ${json[i].date}`);
                    } else {
                        const dateArr = json[i].date.split('-');
                        dateArr[2] = '20' + dateArr[2];
                        const dateObj = new Date(parseInt(dateArr[2], 10), parseInt(dateArr[0], 10) - 1, parseInt(dateArr[1], 10));
                        dataPoints[i] = {label: json[i].date, value: json[i].rank, date: dateObj};
                    }             
                }
                dataPoints.sort(function(a,b){
                    return a.date - b.date;
                })
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
                <h2>&nbsp;&nbsp;{this.state.songName}</h2>
                <h3>&nbsp;&nbsp;&nbsp;iTunes Chart History</h3>
                {c3JSX}
            </div>
        )
    }
}