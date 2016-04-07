import React from 'react'
import Charity from './Charity'
import CharityList from './CharityList'

class Browse extends React.Component {
    constructor() {
        super();

        this.state = {charities: []};
        this.loadCharitiesFromServer.bind(this);
    }

    render() {
        if (this.state.charities != null && this.state.charities.length > 0) {
            return (
                <div>
                    <CharityList charities={this.state.charities}/>
                </div>
            );
        }
        return null;
    }

    componentDidMount() {
        this.loadCharitiesFromServer();
    }


    loadCharitiesFromServer() {
        var url = "/ws/charities/categories/1";
        $.ajax({
            url: url,
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
}

export default Browse;