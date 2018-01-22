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
import classNames from 'classnames';
import Input from './Input';
import Icon from '../icon';
import Button from '../button';
export default class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.onSearch = () => {
            const { onSearch } = this.props;
            if (onSearch) {
                onSearch(this.input.input.value);
            }
            this.input.focus();
        };
        this.saveInput = (node) => {
            this.input = node;
        };
    }
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    render() {
        const _a = this.props, { className, prefixCls, inputPrefixCls, size, enterButton, suffix } = _a, others = __rest(_a, ["className", "prefixCls", "inputPrefixCls", "size", "enterButton", "suffix"]);
        delete others.onSearch;
        const buttonOrIcon = enterButton
            ? (<Button className={`${prefixCls}-button`} type="primary" size={size} onClick={this.onSearch} key="enterButton">
          {enterButton === true ? <Icon type="search"/> : enterButton}
        </Button>) : <Icon className={`${prefixCls}-icon`} type="search" key="searchIcon"/>;
        const searchSuffix = suffix ? [suffix, buttonOrIcon] : buttonOrIcon;
        const inputClassName = classNames(prefixCls, className, {
            [`${prefixCls}-enter-button`]: !!enterButton,
            [`${prefixCls}-${size}`]: !!size,
        });
        return (<Input onPressEnter={this.onSearch} {...others} size={size} className={inputClassName} prefixCls={inputPrefixCls} suffix={searchSuffix} ref={this.saveInput}/>);
    }
}
Search.defaultProps = {
    inputPrefixCls: 'wmstool-input',
    prefixCls: 'wmstool-input-search',
    enterButton: false,
};
