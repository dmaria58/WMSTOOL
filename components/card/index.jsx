var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import omit from 'omit.js';
import Grid from './Grid';
import Meta from './Meta';
import Tabs from '../tabs';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
import warning from '../_util/warning';
export default class Card extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            widerPadding: false,
        };
        this.onTabChange = (key) => {
            if (this.props.onTabChange) {
                this.props.onTabChange(key);
            }
        };
        this.saveRef = (node) => {
            this.container = node;
        };
    }
    componentDidMount() {
        this.updateWiderPadding();
        this.resizeEvent = addEventListener(window, 'resize', this.updateWiderPadding);
        if ('noHovering' in this.props) {
            warning(!this.props.noHovering, '`noHovering` of Card is deperated, you can remove it safely or use `hoverable` instead.');
            warning(!!this.props.noHovering, '`noHovering={false}` of Card is deperated, use `hoverable` instead.');
        }
    }
    componentWillUnmount() {
        if (this.resizeEvent) {
            this.resizeEvent.remove();
        }
        this.updateWiderPadding.cancel();
    }
    updateWiderPadding() {
        if (!this.container) {
            return;
        }
        // 936 is a magic card width pixer number indicated by designer
        const WIDTH_BOUDARY_PX = 936;
        if (this.container.offsetWidth >= WIDTH_BOUDARY_PX && !this.state.widerPadding) {
            this.setState({ widerPadding: true }, () => {
                this.updateWiderPaddingCalled = true; // first render without css transition
            });
        }
        if (this.container.offsetWidth < WIDTH_BOUDARY_PX && this.state.widerPadding) {
            this.setState({ widerPadding: false }, () => {
                this.updateWiderPaddingCalled = true; // first render without css transition
            });
        }
    }
    isContainGrid() {
        let containGrid;
        React.Children.forEach(this.props.children, (element) => {
            if (element && element.type && element.type === Grid) {
                containGrid = true;
            }
        });
        return containGrid;
    }
    getAction(actions) {
        if (!actions || !actions.length) {
            return null;
        }
        const actionList = actions.map((action, index) => (<li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
          <span>{action}</span>
        </li>));
        return actionList;
    }
    // For 2.x compatible
    getCompatibleHoverable() {
        const { noHovering, hoverable } = this.props;
        if ('noHovering' in this.props) {
            return !noHovering || hoverable;
        }
        return !!hoverable;
    }
    render() {
        const _a = this.props, { prefixCls = 'wmstool-card', className, extra, bodyStyle, noHovering, hoverable, title, loading, bordered = true, type, cover, actions, tabList, children } = _a, others = __rest(_a, ["prefixCls", "className", "extra", "bodyStyle", "noHovering", "hoverable", "title", "loading", "bordered", "type", "cover", "actions", "tabList", "children"]);
        const classString = classNames(prefixCls, className, {
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-bordered`]: bordered,
            [`${prefixCls}-hoverable`]: this.getCompatibleHoverable(),
            [`${prefixCls}-wider-padding`]: this.state.widerPadding,
            [`${prefixCls}-padding-transition`]: this.updateWiderPaddingCalled,
            [`${prefixCls}-contain-grid`]: this.isContainGrid(),
            [`${prefixCls}-contain-tabs`]: tabList && tabList.length,
            [`${prefixCls}-type-${type}`]: !!type,
        });
        const loadingBlock = (<div className={`${prefixCls}-loading-content`}>
        <p className={`${prefixCls}-loading-block`} style={{ width: '94%' }}/>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '28%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '62%' }}/>
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '22%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '66%' }}/>
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '56%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '39%' }}/>
        </p>
        <p>
          <span className={`${prefixCls}-loading-block`} style={{ width: '21%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '15%' }}/>
          <span className={`${prefixCls}-loading-block`} style={{ width: '40%' }}/>
        </p>
      </div>);
        let head;
        const tabs = tabList && tabList.length ? (<Tabs className={`${prefixCls}-head-tabs`} size="large" onChange={this.onTabChange}>
        {tabList.map(item => <Tabs.TabPane tab={item.tab} key={item.key}/>)}
      </Tabs>) : null;
        if (title || extra || tabs) {
            head = (<div className={`${prefixCls}-head`}>
          <div className={`${prefixCls}-head-wrapper`}>
            {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
          </div>
          {tabs}
        </div>);
        }
        const coverDom = cover ? <div className={`${prefixCls}-cover`}>{cover}</div> : null;
        const body = (<div className={`${prefixCls}-body`} style={bodyStyle}>
        {loading ? loadingBlock : <div>{children}</div>}
      </div>);
        const actionDom = actions && actions.length ?
            <ul className={`${prefixCls}-actions`}>{this.getAction(actions)}</ul> : null;
        const divProps = omit(others, [
            'onTabChange',
        ]);
        return (<div {...divProps} className={classString} ref={this.saveRef}>
        {head}
        {coverDom}
        {children ? body : null}
        {actionDom}
      </div>);
    }
}
Card.Grid = Grid;
Card.Meta = Meta;
__decorate([
    throttleByAnimationFrameDecorator()
], Card.prototype, "updateWiderPadding", null);
