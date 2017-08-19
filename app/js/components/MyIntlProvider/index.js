import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  locale: state.localeData.locale,
  messages: state.localeData.messages,
  defaultLocale: state.localeData.defaultLocale,
});

export default connect(mapStateToProps)(IntlProvider);
