import { createStore, combineReducers } from 'redux';

const charity = (state, action) => {
    switch (action.type) {
        case 'ADD_CHARITY':
            return {
                id: action.id,
                text: action.text,
                description: "description",
                value: 1,
                completed: false
            };
        default:
            return state;
    }
};

const charities = (state = [], action = {}) => {
    switch (action.type) {
        case 'ADD_CHARITY':
            return [
                ...state,
                charity(undefined, action)
            ];
        case 'RECEIVE_CHARITIES':
            return action.charities;
        default:
            return state;
    }
};

const transaction = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return {
                id: action.id,
                text: action.text,
                description: "description",
                time: action.time,
                completed: false
            };
        default:
            return state;
    }
};

const transactions = (state = [], action = {}) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return [
                ...state,
                transaction(undefined, action)
            ];
        case 'RECEIVE_TRANSACTIONS':
            return action.transactions;
        default:
            return state;
    }
};


const session = (state = [], action = {}) => {
    switch (action.type) {
        case 'LOGIN':
            return action.session;
        case 'LOGOUT':
            return action.session;
        default:
            return state;
    }
};

const mainReducer = combineReducers({
    charities,
    transactions,
    session
});

var initialContent = {
    charities: [],
    transactions: [],
    session: []
};

export default createStore(mainReducer, initialContent)