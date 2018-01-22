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
import RcTreeSelect, { TreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import warning from '../_util/warning';
export default class TreeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.saveTreeSelect = (node) => {
            this.rcTreeSelect = node;
        };
        this.renderTreeSelect = (locale) => {
            const _a = this.props, { prefixCls, className, size, notFoundContent, dropdownStyle } = _a, restProps = __rest(_a, ["prefixCls", "className", "size", "notFoundContent", "dropdownStyle"]);
            const cls = classNames({
                [`${prefixCls}-lg`]: size === 'large',
                [`${prefixCls}-sm`]: size === 'small',
            }, className);
            let checkable = restProps.treeCheckable;
            if (checkable) {
                checkable = <span className={`${prefixCls}-tree-checkbox-inner`}/>;
            }
            return (<RcTreeSelect {...restProps} prefixCls={prefixCls} className={cls} dropdownStyle={Object.assign({ maxHeight: '100vh', overflow: 'auto' }, dropdownStyle)} treeCheckable={checkable} notFoundContent={notFoundContent || locale.notFoundContent} ref={this.saveTreeSelect}/>);
        };
        warning(props.multiple !== false || !props.treeCheckable, '`multiple` will alway be `true` when `treeCheckable` is true');
    }
    focus() {
        this.rcTreeSelect.focus();
    }
    blur() {
        this.rcTreeSelect.blur();
    }
    render() {
        return (<LocaleReceiver componentName="Select" defaultLocale={{}}>
        {this.renderTreeSelect}
      </LocaleReceiver>);
    }
}
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
TreeSelect.defaultProps = {
    prefixCls: 'wmstool-select',
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false,
    dropdownClassName: 'wmstool-select-tree-dropdown',
};
