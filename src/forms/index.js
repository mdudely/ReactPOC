import React, { Component } from 'react';
import './application.css';
import GridAndChartsView from './gridandchartview';
import MapsView from './mapsview';

class Application extends Component {

    render() {
        //This is the root of our application.  This is where we'll do the initial data pull in this instance, since
        //it is just a text file we can read it in and process it fairly cheaply on render.
        const { activeView } = this.props;
        //debugger;
        if(activeView === "GridAndChartsView")
            return (
                <div className="Application">
                    <GridAndChartsView />
                </div>
            );
        else if(activeView === "MapsView")
            return (
                <div className="Application">
                    <MapsView />
                </div>
            );
        else
            //This shouldn't happen because we set an initial state, but
            //react doesn't like it if there's a logical possibility of no return from render
            //so we're just returning an empty div.
            return (
                <div className="Application">
                </div>
            );
    }
}

export default Application;