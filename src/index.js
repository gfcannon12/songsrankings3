import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ChartComponent from './ChartComponent.js';

ReactDOM.render(
   <Router>
    <div>                            
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/songchart" component={ChartComponent} />
        </Switch>
    </div>
    </Router>,
        document.getElementById('root')
);
registerServiceWorker();
