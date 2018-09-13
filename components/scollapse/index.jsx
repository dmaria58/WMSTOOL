import * as React from 'react';
import Icon from '../icon';
export default class Scollapse extends React.Component {
    constructor(props) {
        super(props);
        this.changeClass = () => {
            this.setState({ open: !this.state.open });
        };
        this.state = {
            open: props.isopen ? props.isopen : false
        };
    }
    render() {
        var { children, addicon, closetype, borderType, iconStyle } = this.props;
        var prefixCls = 'wmstool-collapse';
        var prefixCls2 = 'wmstool-scollapse';
        var showdivlcass = `${prefixCls2}-icon-div`;
        var border = borderType ? 'bordered' : 'borderedless';
        var collapseClassName = this.state.open === true ? `${prefixCls2}-${border} ${prefixCls}-item ${prefixCls}-item-active` : `${prefixCls2}-${border} ${prefixCls}-item`;
        var icontype = this.state.open === true ? "up-circle-o" : (closetype || "search");
        var collapseClassName2 = this.state.open === true ? `${prefixCls}-content ${prefixCls}-content-active` : `${prefixCls}-content ${prefixCls}-content-inactive`;
        var csname3 = `${prefixCls}-content-box`;
        return (<div className={collapseClassName}>
        <div className={showdivlcass} style={iconStyle}><Icon type={icontype} onClick={this.changeClass}/>{addicon}</div>
        <div className={collapseClassName2}>
          <div className={csname3}>
            {children}
          </div>
        </div>
      </div>);
    }
}
Scollapse.defaultProps = {
    borderType: true,
    iconStyle: { top: -15 }
};
