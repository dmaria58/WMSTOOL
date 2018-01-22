import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createDOMForm from 'rc-form/lib/createDOMForm';
import createFormField from 'rc-form/lib/createFormField';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import omit from 'omit.js';
import warning from '../_util/warning';
import FormItem from './FormItem';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
export default class Form extends React.Component {
    constructor(props) {
        super(props);
        warning(!props.form, 'It is unnecessary to pass `form` to `Form` after antd@1.7.0.');
    }
    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }
    getChildContext() {
        const { layout } = this.props;
        return {
            vertical: layout === 'vertical',
        };
    }
    render() {
        const { prefixCls, hideRequiredMark, className = '', layout, } = this.props;
        const formClassName = classNames(prefixCls, {
            [`${prefixCls}-horizontal`]: layout === 'horizontal',
            [`${prefixCls}-vertical`]: layout === 'vertical',
            [`${prefixCls}-inline`]: layout === 'inline',
            [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
        }, className);
        const formProps = omit(this.props, [
            'prefixCls',
            'className',
            'layout',
            'form',
            'hideRequiredMark',
        ]);
        return <form {...formProps} className={formClassName}/>;
    }
}
Form.defaultProps = {
    prefixCls: 'wmstool-form',
    layout: 'horizontal',
    hideRequiredMark: false,
    onSubmit(e) {
        e.preventDefault();
    },
};
Form.propTypes = {
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
    hideRequiredMark: PropTypes.bool,
};
Form.childContextTypes = {
    vertical: PropTypes.bool,
};
Form.Item = FormItem;
Form.createFormField = createFormField;
Form.create = function (options = {}) {
    return createDOMForm(Object.assign({ fieldNameProp: 'id' }, options, { fieldMetaProp: FIELD_META_PROP, fieldDataProp: FIELD_DATA_PROP }));
};
