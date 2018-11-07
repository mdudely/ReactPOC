import React, { Component } from 'react';
//import Highcharts from 'highcharts/highstock';
import ReactHighcharts from 'react-highcharts';
import { DateRange } from 'react-date-range';
import './chart.css';
var moment = require('moment');

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(2018, 2, 26, 0, 0, 0),
            endDate: new Date(2018, 3, 26, 0, 0, 0)
        }

        this.dateRangeChanged = this.dateRangeChanged.bind(this);
    }


    getDateRange() {
        var Dates = [];


        var maxDate = new moment(this.state.endDate);

        for(var minDate = new moment(this.state.startDate).add(1, 'hours'); minDate < maxDate; minDate = minDate.add(1, 'hours'))
        {
            Dates.push(minDate.toDate());
        }
       // debugger;
        return Dates;
    }

    dateRangeChanged(dates) {
        console.log("Date Rate Changed!");
        //debugger;
        if(dates.startDate.hours(0, 0, 0, 0) === dates.endDate.hours(0, 0, 0, 0))
            return;

        this.setState({
            startDate: dates.startDate.hours(0, 0, 0, 0),
            endDate: dates.endDate.hours(0, 0, 0, 0)
        });
        //debugger;
    }


    getHoursArray(recordType, records) {
        var RecordMappings = records.filter(value => {
            //debugger;
            if(value.TypeHours.findIndex(findTSL => {
                if(findTSL.Type === recordType)
                    return true;
                else
                    return false;
            }) >= 0)
                return true;
            else
                return false;
        });
        //debugger;
        return [].concat.apply([], RecordMappings.map(value => {
            //debugger;
            return value.TypeHours.find(findTSL => {
                if(findTSL.Type === recordType)
                    return true;
                else
                    return false;
            }).Hours;
        }));
    }

    render() {

        //Depending upon the selected Meter we'll populate these 3 arrays with the data for each Type.
        //We're going to aggregate each day since the whole data set requires


        let { data } = this.props;

        
        let MeterString = this.props.selectedMeterID;
        let MeterDisplay = "";
        let sDate = new Date(this.state.startDate);
        let eDate = new Date(this.state.endDate);

        //debugger;
        let dataInDateRange = data.filter(function (value) {
            if (value.Meter_ID === MeterString) {
                var recordDate = new Date(Date.parse(value.Date));
                //recordDate = recordDate.hours(0, 0, 0, 0);
                if (recordDate > sDate && recordDate <= eDate) {
                    return true;
                }
                return false;
            }
            else
                return false;
        });

        let TSLData = this.getHoursArray("TSL", dataInDateRange);
        let BaseLoadData = this.getHoursArray("BaseLoad", dataInDateRange);
        let WSLData = this.getHoursArray("WSL", dataInDateRange);
        var selectedDateRange = this.getDateRange();


        if(MeterString !== undefined)
            MeterDisplay = "Meter " + MeterString + " usage data: "+ (sDate.getMonth() + 1) + '/' + sDate.getDate() + '/' + sDate.getFullYear() + " - " +
                (eDate.getMonth() + 1) + '/' + eDate.getDate() + '/' + eDate.getFullYear()

        let config =  {
            chart: {
                type: 'area'
            },
            title: {
                text: MeterDisplay
            },
            subtitle: {
                text: 'Source: Disagg.json'
            },
            xAxis: {
                type: 'datetime',
                categories: selectedDateRange,
                tickmarkPlacement: 'on',
                tickInterval: 3600 * 1000,
                labels: {
                    format: '{value:%Y-%m-%d}'
                },
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'kWh'
                }
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'BaseLoad',
                data: BaseLoadData
            }, {
                name: 'WSL',
                data: WSLData
            }, {
                name: 'TSL',
                data: TSLData
            }]
        };


        return (
            <div className="Chart">
                <DateRange startDate={new moment(new Date(2018, 2, 26, 0, 0, 0))} endDate = {new moment(new Date(2018, 3, 26, 0, 0, 0))}
                    minDate={new moment(new Date(2018, 2, 26, 0, 0, 0))} maxDate = {new moment(new Date(2018, 3, 26, 0, 0, 0))} onChange={this.dateRangeChanged}
                    calendars = {1}/>

                <ReactHighcharts config={config}/>
            </div>
        );
    }
}

export default Chart;