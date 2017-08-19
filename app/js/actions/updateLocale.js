import { ActionTypes as types } from 'constants';

export default (countryCode) => (dispatch) => {
  let locale = 'en';

  // We are defaulting to en-au because that has the most generic set of international
  // validation logic in our components.
  switch (countryCode) {
    case 'US':
      locale = 'en-us';
      break;
    case 'GB':
      locale = 'en';
      break;
    case 'UK':
      locale = 'en';
      break;
    default:
      locale = 'en-au';
  }

  dispatch({
    type: types.UPDATE_ADDRESS_FORM_LOCALE,
    locale,
  });
};
