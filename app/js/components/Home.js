import React from 'react'
import { Link } from 'react-router'

import TopCharitiesScroller from './TopCharitiesScroller';
import Browse from './Browse';

export default React.createClass({
    render() {
        return <div>

            <div style={{marginBottom: '20px'}}>
                <div><TopCharitiesScroller topCharitiesCategoryId="1" /></div>
                <hr/>
                <Browse/>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>
                </div>
                <div className="col-md-4">
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                        voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
                        occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi,
                        id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                        distinctio.
                    </p>
                </div>

                <div className="col-md-4" style={{background: '#f0f0f'}}>
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                        voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
                        occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi,
                        id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                        distinctio.
                    </p>

                    <h3>Powered by JustGive</h3>
                </div>
            </div>
        </div>
    }
})