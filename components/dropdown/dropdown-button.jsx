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
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
import classNames from 'classnames';
const ButtonGroup = Button.Group;
export default class DropdownButton extends React.Component {
    render() {
        const _a = this.props, { type, disabled, onClick, children, prefixCls, className, overlay, trigger, align, visible, onVisibleChange, placement, getPopupContainer } = _a, restProps = __rest(_a, ["type", "disabled", "onClick", "children", "prefixCls", "className", "overlay", "trigger", "align", "visible", "onVisibleChange", "placement", "getPopupContainer"]);
        const dropdownProps = {
            align,
            overlay,
            trigger: disabled ? [] : trigger,
            onVisibleChange,
            placement,
            getPopupContainer,
        };
        if ('visible' in this.props) {
            dropdownProps.visible = visible;
        }
        return (<ButtonGroup {...restProps} className={classNames(prefixCls, className)}>
        <Button type={type} disabled={disabled} onClick={onClick}>
          {children}
        </Button>
        <Dropdown {...dropdownProps}>
          <Button type={type} disabled={disabled}>
            <Icon type="down"/>
          </Button>
        </Dropdown>
      </ButtonGroup>);
    }
}
DropdownButton.defaultProps = {
    placement: 'bottomRight',
    type: 'default',
    prefixCls: 'wmstool-dropdown-button',
};
