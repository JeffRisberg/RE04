import React from 'react'

import {EventEmitter} from 'fbemitter';

class GivingHistoryStore {
    constructor() {
        //this.login = null;
        //this.token = null;

        this.emitter = new EventEmitter();
        this.addListener = this.addListener.bind(this);
    }

    loadCharityFromServer() {
        let { charityId } = this.props.params;

        var url = "api/charities";
        $.ajax({
            url: url + "/" + charityId,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({loading: false, charity: data.charity});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
}

export default new GivingHistoryStore();
