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
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';
import CheckableTag from './CheckableTag';
export default class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.close = (e) => {
            const onClose = this.props.onClose;
            if (onClose) {
                onClose(e);
            }
            if (e.defaultPrevented) {
                return;
            }
            const dom = ReactDOM.findDOMNode(this);
            dom.style.width = `${dom.getBoundingClientRect().width}px`;
            // It's Magic Code, don't know why
            dom.style.width = `${dom.getBoundingClientRect().width}px`;
            this.setState({
                closing: true,
            });
        };
        this.animationEnd = (_, existed) => {
            if (!existed && !this.state.closed) {
                this.setState({
                    closed: true,
                    closing: false,
                });
                const afterClose = this.props.afterClose;
                if (afterClose) {
                    afterClose();
                }
            }
        };
        this.state = {
            closing: false,
            closed: false,
        };
    }
    isPresetColor(color) {
        if (!color) {
            return false;
        }
        return (/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/
            .test(color));
    }
    render() {
        const _a = this.props, { prefixCls, closable, color, className, children, style } = _a, otherProps = __rest(_a, ["prefixCls", "closable", "color", "className", "children", "style"]);
        const closeIcon = closable ? <Icon type="cross" onClick={this.close}/> : '';
        const isPresetColor = this.isPresetColor(color);
        const classString = classNames(prefixCls, {
            [`${prefixCls}-${color}`]: isPresetColor,
            [`${prefixCls}-has-color`]: (color && !isPresetColor),
            [`${prefixCls}-close`]: this.state.closing,
        }, className);
        // fix https://fb.me/react-unknown-prop
        const divProps = omit(otherProps, [
            'onClose',
            'afterClose',
        ]);
        const tagStyle = Object.assign({ backgroundColor: (color && !isPresetColor) ? color : null }, style);
        const tag = this.state.closed ? null : (<div data-show={!this.state.closing} {...divProps} className={classString} style={tagStyle}>
        <span className={`${prefixCls}-text`}>{children}</span>
        {closeIcon}
      </div>);
        return (<Animate component="" showProp="data-show" transitionName={`${prefixCls}-zoom`} transitionAppear onEnd={this.animationEnd}>
        {tag}
      </Animate>);
    }
}
Tag.CheckableTag = CheckableTag;
Tag.defaultProps = {
    prefixCls: 'wmstool-tag',
    closable: false,
};
