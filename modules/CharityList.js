import React from 'react'
import { Link } from 'react-router'

import Charity from './Charity'

class CharityList extends React.Component {
    constructor() {
        super();

        this.charities = null;
    }

    loadCharitiesFromServer() {
        var url = "charities.json";
        $.ajax({
            url: url,//this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.charities = data;
                this.render();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        console.log("componentDidMount");

        this.loadCharitiesFromServer();
    }

    render() {
        console.log("render");

        var charityNodes = "";

        console.log(this.charities);

        if (this.charities != null) {
            charityNodes = this.charities.map(function (charity, index) {
                return (
                    <Charity name={charity.name} ein={charity.ein} key={index}>
                        Charity
                    </Charity>
                );
            });
        }
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