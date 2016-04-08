import React from 'react'

import {EventEmitter} from 'fbemitter';

class GivingHistoryStore {
    constructor() {
        //this.login = null;
        //this.token = null;

        this.emitter = new EventEmitter();
        this.addListener = this.addListener.bind(this);
    }

    addListener(eventType: string, fn: Function) {
        this.emitter.addListener(eventType, fn);
    }


    loadGivingHistoryFromServer() {
        let { ch } = this.props.params;

        var url = "api/donors/givingHistory";
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                //this.setState({loading: false, charity: data.charity});
                // notify
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
}

export default new GivingHistoryStore();
