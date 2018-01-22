import * as React from 'react';
import classNames from 'classnames';
const Group = (props) => {
    const { prefixCls = 'wmstool-input-group', className = '' } = props;
    const cls = classNames(prefixCls, {
        [`${prefixCls}-lg`]: props.size === 'large',
        [`${prefixCls}-sm`]: props.size === 'small',
        [`${prefixCls}-compact`]: props.compact,
    }, className);
    return (<span className={cls} style={props.style}>
      {props.children}
    </span>);
};
export default Group;
