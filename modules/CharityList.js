import React from 'react'
import { Link } from 'react-router'

import Charity from './Charity'

class CharityList extends React.Component {
    constructor() {
        super();

        this.state = {charities: []};
    }

    loadCharitiesFromServer() {
        var url = "api/charities";
        $.ajax({
            url: url,//this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({charities: data.charities});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadCharitiesFromServer();
    }

    render() {
        var charityNodes = this.state.charities.map(function (charity, index) {
            return (
                <Charity charity={charity} key={index}></Charity>
            );
        });

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Charity</th>
                    <th style={{textAlign: 'right'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {charityNodes}
                </tbody>
            </table>
        );
    }
}

export default CharityList;