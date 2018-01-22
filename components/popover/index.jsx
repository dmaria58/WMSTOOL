import * as React from 'react';
import Tooltip from '../tooltip';
import warning from '../_util/warning';
export default class Popover extends React.Component {
    constructor() {
        super(...arguments);
        this.saveTooltip = (node) => {
            this.tooltip = node;
        };
    }
    getPopupDomNode() {
        return this.tooltip.getPopupDomNode();
    }
    getOverlay() {
        const { title, prefixCls, content } = this.props;
        warning(!('overlay' in this.props), 'Popover[overlay] is removed, please use Popover[content] instead, ' +
            'see: https://u.ant.design/popover-content');
        return (<div>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>
          {content}
        </div>
      </div>);
    }
    render() {
        const props = Object.assign({}, this.props);
        delete props.title;
        return (<Tooltip {...props} ref={this.saveTooltip} overlay={this.getOverlay()}/>);
    }
}
Popover.defaultProps = {
    prefixCls: 'wmstool-popover',
    placement: 'top',
    transitionName: 'zoom-big',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
};
