import React from 'react'
import { Link } from 'react-router'

import TopCharitiesScroller from './TopCharitiesScroller';
import Browse from './Browse';

export default React.createClass({
    render() {
        return <div>
            <div>
                <img src="http://placehold.it/1150x250"/>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <h3>Top Charities</h3>

                    <p>
                        Redeem your rewards, donate to a top charity.
                    </p>

                    <p>
                        <a>View List</a>
                    </p>
                </div>
                <div className="col-md-4">
                    <h3>Support a Cause</h3>

                    <p>Browse a list of popular charites by Cause</p>

                    <p><a>View Causes</a></p>
                </div>

                <div className="col-md-4" style={{background: '#f0f0f'}}>
                    <h3>Find a charity</h3>

                    <p>Search for any charity by name or location</p>

                    <p>
                        <a>Search Now</a>
                    </p>
                </div>
            </div>
            <div style={{marginBottom: '20px'}}>
                <div><TopCharitiesScroller topCharitiesCategoryId="1"/></div>
                <Browse/>
            </div>
        </div>
    }
})