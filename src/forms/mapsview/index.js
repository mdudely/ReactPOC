import React, { Component } from 'react';
import './mapsview.css';

class MapsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        this.fetchAll = this.fetchAll.bind(this);
    }

    fetchAll(url) {
        fetch(url).then(response => response.json()).then(json => this.setState((previousState) => ({
            data: [...this.state.data, json]
        })));
    }


    async componentDidMount() {
            var Addresses = `SW SCHOLLS FERRY RD,# 102, 97007
                15112,SW CANYON WREN WAY, 97007
                15114,SW CANYON WREN WAY,97007
                15116,SW CANYON WREN WAY,97007
                15118,SW CANYON WREN WAY,97007
                15120,SW CANYON WREN WAY,97007
                14932,SW SCHOLLS FERRY RD,# 301,97007
                14754,SW SCHOLLS FERRY RD,# 1017,97007
                14339,SW BARROWS RD,97007
                45.4336087,14932,SW SCHOLLS FERRY RD,# 201,97007
                11950,SW HORIZON BLVD,97007`;

            var AddressArray = Addresses.split('\n');

            var formattedAddresses = AddressArray.map(value => {
                return 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDtVbli-DqEY984NnMwLOyl2zh0ZaQZBRQ&address=' + value.trim()
            });

            Promise.all(formattedAddresses.map(this.fetchAll)).then(() => {
                alert('All promises resolved!');
            });
    }

    render() {
        //This is the root component for displayin the jSON output.
        //Due to the nature of react it will appear that the promises are all resolved before anything is displayed
        //but what's happening is the promises are resolving so fast that react continually rerenders 
        //faster than the eye can see, and thus it appears that resolution happens before all the services return.
        var displayFromState = <h1>Loading...</h1>
        var thisState = this.state;
        if(thisState !== undefined && thisState.data !== undefined && thisState.data.length > 0)
        {
            displayFromState = JSON.stringify(thisState.data.map(value => {
                var latitude = value.results[0].geometry.location.lat;
                var longitude = value.results[0].geometry.location.lng;
                var address = value.results[0].formatted_address;

                return {
                    'address': address,
                    'latitude': latitude.toString(),
                    'longitude': longitude.toString(),
                }
            }));
        }
        return (
                <div>
                    {
                        displayFromState
                    }
                </div>
        );
    }
}

export default MapsView;