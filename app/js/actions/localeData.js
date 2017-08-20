import { types } from '../types'

export const changeLocale = (locale) => {
    return function (dispatch) {

        dispatch(dispatch({
            type: types.UPDATE_LOCALE,
            locale,
        }));
    };
};
