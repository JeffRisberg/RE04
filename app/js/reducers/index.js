import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import basketItems from './basketItems';
import categories from './categories';
import completedBasketItems from './completedBasketItems';
import currentCategory from './currentCategory';
import currentCharities from './currentCharities';
import donor from './donor';
import givingHistoryItems from './givingHistoryItems';
import localeData from './localeData';
import topCharities from './topCharities';

export default combineReducers({
    basketItems,
    categories,
    completedBasketItems,
    currentCategory,
    currentCharities,
    donor,
    givingHistoryItems,
    localeData,
    topCharities,
    routing: routerReducer
});
