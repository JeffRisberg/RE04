import React from 'react'
import { Link } from 'react-router'

import Charity from './Charity'

class CharityList extends React.Component {
    constructor() {
        super();

        this.state = {charities: []};
    }

    componentDidMount() {
        this.setState({charities: this.props.charities});
        console.log(this.props.charities);
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