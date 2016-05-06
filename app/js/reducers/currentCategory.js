import { SET_CURRENT_CATEGORY } from '../constants/ActionTypes'

const currentCategory = (state = [], action = {}) => {
    switch (action.type) {
        case SET_CURRENT_CATEGORY: //
        {
            const currentCategory = action.category;
            return currentCategory;
        }
        default:
            return state;
    }
};

export default currentCategory;