import { SET_COMPLETED_BASKET_ITEMS } from '../constants/ActionTypes'

const completedBasketItems = (state = [], action = {}) => {
    switch (action.type) {
        case SET_COMPLETED_BASKET_ITEMS: // clear prior completed basket Items
        {
            return action.data;
        }
        default:
            return state;
    }
};

export default completedBasketItems;
