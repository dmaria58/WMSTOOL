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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import Spin from '../spin';
import Pagination from '../pagination';
import { Row } from '../grid';
import Item from './Item';
export default class List extends React.Component {
    constructor() {
        super(...arguments);
        this.keys = {};
        this.renderItem = (item, index) => {
            const { dataSource, renderItem, rowKey } = this.props;
            let key;
            if (typeof rowKey === 'function') {
                key = rowKey(dataSource[index]);
            }
            else if (typeof rowKey === 'string') {
                key = dataSource[rowKey];
            }
            else {
                key = dataSource.key;
            }
            if (!key) {
                key = `list-item-${index}`;
            }
            this.keys[index] = key;
            return renderItem(item, index);
        };
        this.renderEmpty = (contextLocale) => {
            const locale = Object.assign({}, contextLocale, this.props.locale);
            return <div className={`${this.props.prefixCls}-empty-text`}>{locale.emptyText}</div>;
        };
    }
    getChildContext() {
        return {
            grid: this.props.grid,
        };
    }
    isSomethingAfterLastTtem() {
        const { loadMore, pagination, footer } = this.props;
        return !!(loadMore || pagination || footer);
    }
    render() {
        const _a = this.props, { bordered, split, className, children, loading, itemLayout, loadMore, pagination, prefixCls, grid, dataSource, size, rowKey, renderItem, header, footer } = _a, rest = __rest(_a, ["bordered", "split", "className", "children", "loading", "itemLayout", "loadMore", "pagination", "prefixCls", "grid", "dataSource", "size", "rowKey", "renderItem", "header", "footer"]);
        // large => lg
        // small => sm
        let sizeCls = '';
        switch (size) {
            case 'large':
                sizeCls = 'lg';
                break;
            case 'small':
                sizeCls = 'sm';
            default:
                break;
        }
        const classString = classNames(prefixCls, className, {
            [`${prefixCls}-vertical`]: itemLayout === 'vertical',
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-split`]: split,
            [`${prefixCls}-bordered`]: bordered,
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-grid`]: grid,
            [`${prefixCls}-something-after-last-item`]: this.isSomethingAfterLastTtem(),
        });
        const paginationContent = (<div className={`${prefixCls}-pagination`}>
        <Pagination {...pagination}/>
      </div>);
        let childrenContent;
        if (dataSource.length > 0) {
            const items = dataSource.map((item, index) => this.renderItem(item, index));
            const childrenList = React.Children.map(items, (child, index) => React.cloneElement(child, {
                key: this.keys[index],
            }));
            childrenContent = grid ? (<Row gutter={grid.gutter}>{childrenList}</Row>) : childrenList;
        }
        else if (!children) {
            childrenContent = (<LocaleReceiver componentName="Table" defaultLocale={defaultLocale.Table}>
          {this.renderEmpty}
        </LocaleReceiver>);
        }
        const content = (<div>
        <Spin spinning={loading}>{childrenContent}</Spin>
        {loadMore}
        {(!loadMore && pagination) ? paginationContent : null}
      </div>);
        return (<div className={classString} {...rest}>
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        {content}
        {children}
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
      </div>);
    }
}
List.Item = Item;
List.childContextTypes = {
    grid: PropTypes.any,
};
List.defaultProps = {
    dataSource: [],
    prefixCls: 'wmstool-list',
    bordered: false,
    split: true,
    loading: false,
    pagination: false,
};
