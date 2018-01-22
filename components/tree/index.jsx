import * as React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import animation from '../_util/openAnimation';
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
Tree.TreeNode = TreeNode;
Tree.defaultProps = {
    prefixCls: 'wmstool-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
};
