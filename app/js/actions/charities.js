/**
 * This is used for charity fetches, including charitylists.
 */
import fetch from 'isomorphic-fetch';

export const queryCharities = () => {
    return function (dispatch) {

        return fetch('/ws/charities', {})
            .then(response => response.json())
            .then((json) => {
                dispatch(receiveCharities(json.data));
            });
    };
};

export const receiveCharities = (charities) => {
    return {
        type: 'RESET_CHARITIES',
        charities
    };
};

export const addCharity = (text) => {
    fetch("/ws/charities", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            charity: {
                text: text,
                value: 12,
                completed: false
            }
        })
    }).then(response => {
        console.log(response);
    });

    return {
        type: 'ADD_CHARITY',
        id: nextCharityId++,
        text
    };
};
