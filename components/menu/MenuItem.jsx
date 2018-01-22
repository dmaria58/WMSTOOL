import * as React from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
class MenuItem extends React.Component {
    constructor() {
        super(...arguments);
        this.onKeyDown = (e) => {
            this.menuItem.onKeyDown(e);
        };
        this.saveMenuItem = (menuItem) => {
            this.menuItem = menuItem;
        };
    }
    render() {
        const { inlineCollapsed } = this.context;
        const props = this.props;
        return <Tooltip title={inlineCollapsed && props.level === 1 ? props.children : ''} placement="right" overlayClassName={`${props.rootPrefixCls}-inline-collapsed-tooltip`}>
      <Item {...props} ref={this.saveMenuItem}/>
    </Tooltip>;
    }
}
MenuItem.contextTypes = {
    inlineCollapsed: PropTypes.bool,
};
MenuItem.isMenuItem = 1;
export default MenuItem;
