import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './grid.css';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMeterID: ''
        }
    }

    render() {
        const columns = [{
            Header: 'Meter ID',
            accessor: 'Meter_ID' // String-based value accessors!
          }];

        let { data } = this.props;
        //debugger;
        return (
            <div className="Grid">
                <ReactTable columns={columns} data={data} defaultPageSize={10} showPagination = {false}
                    getTrProps={(state, rowInfo)=> {
                        if (rowInfo && rowInfo.row) {
                            return {
                              onClick: this.props.handler
                              }
                            }
                        }
                    }/>
            </div>
        );
    }
}

export default Grid;