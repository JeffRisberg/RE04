import {handleActions} from "redux-actions";
import {types} from "../types";
import i18n from '../i18n';

const initialState = {
  locale: 'en',
  messages: i18n.en,
  defaultLocale: 'en',
};

export default handleActions({
    [types.UPDATE_LOCALE]: (state, action, _i18n = i18n) => {
        const enContent = _i18n.en;

        const localMessages = _i18n[action.locale];

        return Object.assign({}, state, {
            locale: action.locale,
            messages: Object.assign({}, enContent, localMessages),
        });
    },
}, initialState);
