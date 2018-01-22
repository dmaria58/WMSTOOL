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
import * as ReactDOM from 'react-dom';
import Icon from '../icon';
import classNames from 'classnames';
export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.setScale = () => {
            const childrenNode = this.avatarChildren;
            if (childrenNode) {
                const childrenWidth = childrenNode.offsetWidth;
                const avatarWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
                // add 4px gap for each side to get better performance
                if (avatarWidth - 8 < childrenWidth) {
                    this.setState({
                        scale: (avatarWidth - 8) / childrenWidth,
                    });
                }
                else {
                    this.setState({
                        scale: 1,
                    });
                }
            }
        };
        this.handleImgLoadError = () => this.setState({ isImgExist: false });
        this.state = {
            scale: 1,
            isImgExist: true,
        };
    }
    componentDidMount() {
        this.setScale();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.children !== this.props.children
            || (prevState.scale !== this.state.scale && this.state.scale === 1)) {
            this.setScale();
        }
    }
    render() {
        const _a = this.props, { prefixCls, shape, size, src, icon, className } = _a, others = __rest(_a, ["prefixCls", "shape", "size", "src", "icon", "className"]);
        const sizeCls = classNames({
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
        });
        const classString = classNames(prefixCls, className, sizeCls, {
            [`${prefixCls}-${shape}`]: shape,
            [`${prefixCls}-image`]: src,
            [`${prefixCls}-icon`]: icon,
        });
        let children = this.props.children;
        if (src && this.state.isImgExist) {
            children = (<img src={src} onError={this.handleImgLoadError}/>);
        }
        else if (icon) {
            children = <Icon type={icon}/>;
        }
        else {
            const childrenNode = this.avatarChildren;
            if (childrenNode || this.state.scale !== 1) {
                const childrenStyle = {
                    msTransform: `scale(${this.state.scale})`,
                    WebkitTransform: `scale(${this.state.scale})`,
                    transform: `scale(${this.state.scale})`,
                    position: 'absolute',
                    display: 'inline-block',
                    left: `calc(50% - ${Math.round(childrenNode.offsetWidth / 2)}px)`,
                };
                children = (<span className={`${prefixCls}-string`} ref={span => this.avatarChildren = span} style={childrenStyle}>
            {children}
          </span>);
            }
            else {
                children = (<span className={`${prefixCls}-string`} ref={span => this.avatarChildren = span}>
            {children}
          </span>);
            }
        }
        return (<span {...others} className={classString}>
        {children}
      </span>);
    }
}
Avatar.defaultProps = {
    prefixCls: 'wmstool-avatar',
    shape: 'circle',
    size: 'default',
};
