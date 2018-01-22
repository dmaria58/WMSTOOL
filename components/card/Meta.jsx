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
export default (props) => {
    const { prefixCls = 'wmstool-card', className, avatar, title, description } = props, others = __rest(props, ["prefixCls", "className", "avatar", "title", "description"]);
    const classString = classNames(`${prefixCls}-meta`, className);
    const avatarDom = avatar ? <div className={`${prefixCls}-meta-avatar`}>{avatar}</div> : null;
    const titleDom = title ? <div className={`${prefixCls}-meta-title`}>{title}</div> : null;
    const descriptionDom = description ?
        <div className={`${prefixCls}-meta-description`}>{description}</div> : null;
    const MetaDetail = titleDom || descriptionDom ?
        <div className={`${prefixCls}-meta-detail`}>
      {titleDom}
      {descriptionDom}
    </div> : null;
    return (<div {...others} className={classString}>
      {avatarDom}
      {MetaDetail}
    </div>);
};
