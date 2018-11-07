import React, { Component } from 'react';
import './gridandchartsview.css';
import Table from './grid/index';
import Chart from './chart/index';
import jSONDataPayload from '../../data/jsonData';

class GridAndChartsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setSelectedMeterID: ''
        }

        this.setSelectedMeter = this.setSelectedMeter.bind(this);
    }

    getjSONArray() {
        return jSONDataPayload.split('\n').map(jSONRecord => {
            //Here is each record of the jSONData
            return JSON.parse(jSONRecord);
        });
    }

    getMeters(jSONArray) {
        var listOfMeters = []
        jSONArray.forEach(element => {
            if (listOfMeters.findIndex(function (meter) { return meter.Meter_ID === element.Meter_ID }) < 0)
                listOfMeters.push({ Meter_ID: element.Meter_ID });
        });
        return listOfMeters;
    }

    getMetersWithTimeAndUsageData(jSONArray) {
        //We need to get this data in a format that's easy to render in our component.

        var formattedMeters = []

        var meters = this.getMeters(jSONArray);
        meters.forEach(meter => {
            //For each meter we need to build a data set per day 
            //Each meter has 3 instances per day, for each of the 3 types.
            //Something like 
            var relevantMeterData = jSONArray.filter(function (value) {
                if (value.Meter_ID === meter.Meter_ID)
                    return true;
                else
                    return false;
            }).sort(function (left, right) {
                var leftDate = new Date(left.Date);
                var rightDate = new Date(right.Date);
                return leftDate - rightDate;
            });

            relevantMeterData.forEach(relMeter => {
                var thisMeterIndex = formattedMeters.findIndex(value => {
                    return (value.Meter_ID === relMeter.Meter_ID && value.Date === relMeter.Date);
                });

                if(thisMeterIndex > 0)
                {
                    formattedMeters[thisMeterIndex].TypeHours.push({
                        Type: relMeter.Type,
                        Hours: [relMeter[1], relMeter[2], relMeter[3], relMeter[4], relMeter[5], relMeter[6], relMeter[7], relMeter[8],
                                relMeter[9], relMeter[10], relMeter[11], relMeter[12], relMeter[13], relMeter[14], relMeter[15], relMeter[16],
                                relMeter[17], relMeter[18], relMeter[19], relMeter[20], relMeter[21], relMeter[22], relMeter[23], relMeter[24]]
                    })
                }
                else
                {
                    formattedMeters.push({
                        Meter_ID: relMeter.Meter_ID,
                        Date: relMeter.Date,
                        TypeHours: [{
                            Type: relMeter.Type,
                            Hours: [relMeter[1], relMeter[2], relMeter[3], relMeter[4], relMeter[5], relMeter[6], relMeter[7], relMeter[8],
                                relMeter[9], relMeter[10], relMeter[11], relMeter[12], relMeter[13], relMeter[14], relMeter[15], relMeter[16],
                                relMeter[17], relMeter[18], relMeter[19], relMeter[20], relMeter[21], relMeter[22], relMeter[23], relMeter[24]]
                        }]
                    });
                }
            });


        });
        return formattedMeters;
    }

    setSelectedMeter(e) {
        this.setState({ selectedMeterID: e.target.innerText });
    }

    render() {

        let jSONArray = this.getjSONArray();
        let Meters = this.getMeters(jSONArray);
        let MetersWithTimeAndUsageData = this.getMetersWithTimeAndUsageData(jSONArray);

        //We need to pull the data here.  We'll only need to pass the meters data to the Table
        //We'll need a structured array of jSON objects to pass to the chart props.
        return (
            <div className="GridAndChartsView">
                <Table data={Meters} handler={this.setSelectedMeter} selectedMeterID={this.state.selectedMeterID} />
                <Chart data={MetersWithTimeAndUsageData} handler={this.setSelectedMeter} selectedMeterID={this.state.selectedMeterID} />
            </div>
        );
    }
}

export default GridAndChartsView;