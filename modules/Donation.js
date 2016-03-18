import React from 'react'
import { Link } from 'react-router'

class Donation extends React.Component {
    constructor() {
        super();
        this.state = {loading: true, charity: null};
    }

    loadCharityFromServer() {
        let { charityId } = this.props.params;

        var url = "charities.json";
        $.ajax({
            url: url + "/" + charityId,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({loading: false, charity: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadCharityFromServer();
    }

    render() {
        let { charityId } = this.props.params;

        if (this.state.loading == false) {
            return (
                <form>
                    You are donating to: {this.state.charity.name}
                    <br/>
                    Description: {this.state.charity.description}
                    <br/>
                    Enter amount:
                    <input type="text" ref="amount"/>
                </form>
            );
        }
        else {
            return null;
        }
    }
}

export default Donation;