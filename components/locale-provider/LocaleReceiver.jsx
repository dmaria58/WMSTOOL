import * as React from 'react';
import PropTypes from 'prop-types';
export default class LocaleReceiver extends React.Component {
    getLocale() {
        const { componentName, defaultLocale } = this.props;
        const { antLocale } = this.context;
        const localeFromContext = antLocale && antLocale[componentName];
        return Object.assign({}, (typeof defaultLocale === 'function' ? defaultLocale() : defaultLocale), (localeFromContext || {}));
    }
    getLocaleCode() {
        const { antLocale } = this.context;
        const localeCode = antLocale && antLocale.locale;
        // Had use LocaleProvide but didn't set locale
        if (antLocale && antLocale.exist && !localeCode) {
            return 'en-us';
        }
        return localeCode;
    }
    render() {
        return this.props.children(this.getLocale(), this.getLocaleCode());
    }
}
LocaleReceiver.contextTypes = {
    antLocale: PropTypes.object,
};
