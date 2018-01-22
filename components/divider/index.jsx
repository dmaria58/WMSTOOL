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
export default function Divider(_a) {
    var { prefixCls = 'ant', type = 'horizontal', className, children, dashed } = _a, restProps = __rest(_a, ["prefixCls", "type", "className", "children", "dashed"]);
    const classString = classNames(className, `${prefixCls}-divider`, `${prefixCls}-divider-${type}`, {
        [`${prefixCls}-divider-with-text`]: children,
        [`${prefixCls}-divider-dashed`]: !!dashed,
    });
    return (<div className={classString} {...restProps}>
      {children && <span className={`${prefixCls}-divider-inner-text`}>{children}</span>}
    </div>);
}
