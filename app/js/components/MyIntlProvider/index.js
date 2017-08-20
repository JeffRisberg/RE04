import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { addLocaleData } from 'react-intl';

import fr from 'react-intl/locale-data/fr';
import de from 'react-intl/locale-data/de';

addLocaleData([...fr, ...de]);

const mapStateToProps = (state) => ({
  locale: state.localeData.locale,
  messages: state.localeData.messages,
  defaultLocale: state.localeData.defaultLocale,
});

export default connect(mapStateToProps)(IntlProvider);
