import React, { Component } from 'react';
import './header.css';

class Header extends Component {

    render() {

        const { onClick } = this.props;

        return (
            <header className="App-header">
                <div className="buttonContainer">
                    <button className="GridAndChartsView" onClick={() => onClick('GridAndChartsView')}> Grid/Chart For Meters </button>
                    <button className="MapsView" onClick={() => onClick('MapsView')}> Address Mapping </button>
                </div>
            </header>
        );
    }
}

export default Header;