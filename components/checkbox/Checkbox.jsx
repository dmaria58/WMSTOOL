var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import shallowEqual from 'shallowequal';
export default class Checkbox extends React.Component {
    constructor() {
        super(...arguments);
        this.saveCheckbox = (node) => {
            this.rcCheckbox = node;
        };
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState) ||
            !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
    }
    focus() {
        this.rcCheckbox.focus();
    }
    blur() {
        this.rcCheckbox.blur();
    }
    render() {
        const { props, context } = this;
        const { prefixCls, className, children, indeterminate, style, onMouseEnter, onMouseLeave } = props, restProps = __rest(props, ["prefixCls", "className", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave"]);
        const { checkboxGroup } = context;
        let checkboxProps = Object.assign({}, restProps);
        if (checkboxGroup) {
            checkboxProps.onChange = () => checkboxGroup.toggleOption({ label: children, value: props.value });
            checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
            checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
        }
        const classString = classNames(className, {
            [`${prefixCls}-wrapper`]: true,
        });
        const checkboxClass = classNames({
            [`${prefixCls}-indeterminate`]: indeterminate,
        });
        return (<label className={classString} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <RcCheckbox {...checkboxProps} prefixCls={prefixCls} className={checkboxClass} ref={this.saveCheckbox}/>
        {children !== undefined ? <span>{children}</span> : null}
      </label>);
    }
}
Checkbox.defaultProps = {
    prefixCls: 'wmstool-checkbox',
    indeterminate: false,
};
Checkbox.contextTypes = {
    checkboxGroup: PropTypes.any,
};
