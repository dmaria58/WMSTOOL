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
import Animate from 'rc-animate';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';
import omit from 'omit.js';
export default class Spin extends React.Component {
    constructor(props) {
        super(props);
        const spinning = props.spinning;
        this.state = {
            spinning,
        };
    }
    isNestedPattern() {
        return !!(this.props && this.props.children);
    }
    componentDidMount() {
        if (!isCssAnimationSupported()) {
            // Show text in IE9
            this.setState({
                notCssAnimationSupported: true,
            });
        }
    }
    componentWillUnmount() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    }
    componentWillReceiveProps(nextProps) {
        const currentSpinning = this.props.spinning;
        const spinning = nextProps.spinning;
        const { delay } = this.props;
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        if (currentSpinning && !spinning) {
            this.debounceTimeout = window.setTimeout(() => this.setState({ spinning }), 200);
            if (this.delayTimeout) {
                clearTimeout(this.delayTimeout);
            }
        }
        else {
            if (spinning && delay && !isNaN(Number(delay))) {
                if (this.delayTimeout) {
                    clearTimeout(this.delayTimeout);
                }
                this.delayTimeout = window.setTimeout(() => this.setState({ spinning }), delay);
            }
            else {
                this.setState({ spinning });
            }
        }
    }
    render() {
        const _a = this.props, { className, size, prefixCls, tip, wrapperClassName, indicator } = _a, restProps = __rest(_a, ["className", "size", "prefixCls", "tip", "wrapperClassName", "indicator"]);
        const { spinning, notCssAnimationSupported } = this.state;
        const spinClassName = classNames(prefixCls, {
            [`${prefixCls}-sm`]: size === 'small',
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-spinning`]: spinning,
            [`${prefixCls}-show-text`]: !!tip || notCssAnimationSupported,
        }, className);
        // fix https://fb.me/react-unknown-prop
        const divProps = omit(restProps, [
            'spinning',
            'delay',
        ]);
        const spinIndicator = indicator ? indicator : (<span className={`${prefixCls}-dot`}>
        <i />
        <i />
        <i />
        <i />
      </span>);
        const spinElement = (<div {...divProps} className={spinClassName}>
        {spinIndicator}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>);
        if (this.isNestedPattern()) {
            let animateClassName = prefixCls + '-nested-loading';
            if (wrapperClassName) {
                animateClassName += ' ' + wrapperClassName;
            }
            const containerClassName = classNames({
                [`${prefixCls}-container`]: true,
                [`${prefixCls}-blur`]: spinning,
            });
            return (<Animate {...divProps} component="div" className={animateClassName} style={null} transitionName="fade">
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {this.props.children}
          </div>
        </Animate>);
        }
        return spinElement;
    }
}
Spin.defaultProps = {
    prefixCls: 'wmstool-spin',
    spinning: true,
    size: 'default',
    wrapperClassName: '',
};
Spin.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    wrapperClassName: PropTypes.string,
    indicator: PropTypes.node,
};
