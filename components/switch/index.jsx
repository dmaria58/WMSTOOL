import * as React from 'react';
import PropTypes from 'prop-types';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';
import omit from 'omit.js';
export default class Switch extends React.Component {
    constructor() {
        super(...arguments);
        this.saveSwitch = (node) => {
            this.rcSwitch = node;
        };
    }
    focus() {
        this.rcSwitch.focus();
    }
    blur() {
        this.rcSwitch.blur();
    }
    render() {
        const { prefixCls, size, loading, className = '' } = this.props;
        const classes = classNames(className, {
            [`${prefixCls}-small`]: size === 'small',
            [`${prefixCls}-loading`]: loading,
        });
        return (<RcSwitch {...omit(this.props, ['loading'])} className={classes} ref={this.saveSwitch}/>);
    }
}
Switch.defaultProps = {
    prefixCls: 'wmstool-switch',
};
Switch.propTypes = {
    prefixCls: PropTypes.string,
    // HACK: https://github.com/wmstool-design/wmstool-design/issues/5368
    // size=default and size=large are the same
    size: PropTypes.oneOf(['small', 'default', 'large']),
    className: PropTypes.string,
};
