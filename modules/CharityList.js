import React from 'react'
import { Link } from 'react-router'

import Charity from './Charity'

class CharityList extends React.Component {
        render() {
            var charityNodes = this.props.data.map(function (charity, index) {
                return (
                    <Charity name={charity.author} ein={charity.ein} key={index}>
                        {comment.text}
                    </Charity>
                );
            });
            return (
                <div className="charityList">
                    {charityNodes}
                </div>
            );
        }
}

export default CharityList;