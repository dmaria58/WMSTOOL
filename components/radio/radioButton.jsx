import * as React from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';
export default class RadioButton extends React.Component {
    render() {
        const radioProps = Object.assign({}, this.props);
        if (this.context.radioGroup) {
            radioProps.onChange = this.context.radioGroup.onChange;
            radioProps.checked = this.props.value === this.context.radioGroup.value;
            radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
        }
        return (<Radio {...radioProps}/>);
    }
}
RadioButton.defaultProps = {
    prefixCls: 'wmstool-radio-button',
};
RadioButton.contextTypes = {
    radioGroup: PropTypes.any,
};
