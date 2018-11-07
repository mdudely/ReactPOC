import React, { Component } from 'react';
import Application from '../forms/index.js';
import Header from '../headers/index.js';

class AppContainer extends Component {
    constructor(props){
        super(props);
        this.state = this.getInitialState();

        this.handleClick = this.handleClick.bind(this);
    }

    getInitialState() {
        return {
            activeView: "GridAndChartsView",
            meterData: null,
            addressData: null
        }
    }

    handleClick(event) {
        //Here's the header click handler.  Happens in parent so it can propagate changes to the children.
        this.setState({activeView: event});
    }

    render() {
        //This is the root of our application.  This is where we'll do the initial data pull in this instance, since
        //it is just a text file we can read it in and process it fairly cheaply on render.
        return (
            <div className="AppContainer">
                <Header onClick={this.handleClick}/>
                <Application activeView={this.state.activeView} meterData={this.state.meterData} addressData={this.state.addressData} />
            </div>
        );
    }
}

export default AppContainer;