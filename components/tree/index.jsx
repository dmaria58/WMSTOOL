import * as React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import animation from '../_util/openAnimation';
import classNames from 'classnames';
export default class Tree extends React.Component {
    render() {
        const props = this.props;
        const { prefixCls, className } = props;
        let checkable = props.checkable;
        return (<RcTree {...props} className={className} checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}>
        {this.props.children}
      </RcTree>);
    }
}
TreeNode.prototype.renderCheckbox = function renderCheckbox(props) {
    var _checkboxCls;

    var prefixCls = props.prefixCls;
    var checkboxCls = (_checkboxCls = {}, _checkboxCls[prefixCls + '-checkbox'] = true, _checkboxCls);
    if (props.checked) {
        checkboxCls[prefixCls + '-checkbox-checked'] = true;
    } else if (props.halfChecked) {
        checkboxCls[prefixCls + '-checkbox-checked'] = true;
    }
    var customEle = null;
    if (typeof props.checkable !== 'boolean') {
        customEle = props.checkable;
    }
    if (props.disabled || props.disableCheckbox) {
        checkboxCls[prefixCls + '-checkbox-disabled'] = true;
        return React.createElement(
        'span',
        { className: classNames(checkboxCls) },
        customEle
        );
    }
    return React.createElement(
        'span',
        {
        className: classNames(checkboxCls),
        onClick: this.onCheck
        },
        customEle
    );
};
Tree.TreeNode = TreeNode;
Tree.defaultProps = {
    prefixCls: 'wmstool-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
};
