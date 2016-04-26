/**
 * This is used for the donor's current basket.
 */
import fetch from 'isomorphic-fetch';

export const queryBasket = () => {
    return function (dispatch) {

        return fetch('/ws/basket/fetch', {})
            .then(response => response.json())
            .then((json) => {
                dispatch(resetBasketItems(json.data));
            });
    };
};

