import React from 'react'
import { Link } from 'react-router'

import Charity from './Charity'

class CharityList extends React.Component {
    constructor() {
        super();

        this.state = {charities: []};
    }

    loadCharitiesFromServer() {
        var url = "charities.json";
        $.ajax({
            url: url,//this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({charities: data});
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
                <Charity charity={charity} key={index}>
                    Charity
                </Charity>
            );
        });

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>EIN</th>
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