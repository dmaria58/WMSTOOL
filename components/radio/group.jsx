import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Radio from './radio';
function getCheckedValue(children) {
    let value = null;
    let matched = false;
    React.Children.forEach(children, (radio) => {
        if (radio && radio.props && radio.props.checked) {
            value = radio.props.value;
            matched = true;
        }
    });
    return matched ? { value } : undefined;
}
export default class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onRadioChange = (ev) => {
            const lastValue = this.state.value;
            const { value } = ev.target;
            if (!('value' in this.props)) {
                this.setState({
                    value,
                });
            }
            const onChange = this.props.onChange;
            if (onChange && value !== lastValue) {
                onChange(ev);
            }
        };
        let value;
        if ('value' in props) {
            value = props.value;
        }
        else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        else {
            const checkedValue = getCheckedValue(props.children);
            value = checkedValue && checkedValue.value;
        }
        this.state = {
            value,
        };
    }
    getChildContext() {
        return {
            radioGroup: {
                onChange: this.onRadioChange,
                value: this.state.value,
                disabled: this.props.disabled,
                name: this.props.name,
            },
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value,
            });
        }
        else {
            const checkedValue = getCheckedValue(nextProps.children);
            if (checkedValue) {
                this.setState({
                    value: checkedValue.value,
                });
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState);
    }
    render() {
        const props = this.props;
        const { prefixCls = 'wmstool-radio-group', className = '', options } = props;
        const classString = classNames(prefixCls, {
            [`${prefixCls}-${props.size}`]: props.size,
        }, className);
        let children = props.children;
        // 如果存在 options, 优先使用
        if (options && options.length > 0) {
            children = options.map((option, index) => {
                if (typeof option === 'string') {
                    return (<Radio key={index} disabled={this.props.disabled} value={option} onChange={this.onRadioChange} checked={this.state.value === option}>
              {option}
            </Radio>);
                }
                else {
                    return (<Radio key={index} disabled={option.disabled || this.props.disabled} value={option.value} onChange={this.onRadioChange} checked={this.state.value === option.value}>
              {option.label}
            </Radio>);
                }
            });
        }
        return (<div className={classString} style={props.style} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} id={props.id}>
        {children}
      </div>);
    }
}
RadioGroup.defaultProps = {
    disabled: false,
};
RadioGroup.childContextTypes = {
    radioGroup: PropTypes.any,
};
