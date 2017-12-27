import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';

import Spin from '../spin';
import Pagination from '../pagination';
import { Row } from '../grid';

import Item from './Item';

export { ListItemProps, ListItemMetaProps } from './Item';

export type ColumnCount = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ListGridType {
  gutter?: number;
  column?: ColumnCount;
  xs?: ColumnCount;
  sm?: ColumnCount;
  md?: ColumnCount;
  lg?: ColumnCount;
  xl?: ColumnCount;
}

export type ListSize = 'small' | 'default' | 'large';

export interface ListProps {
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
  dataSource: any;
  extra?: React.ReactNode;
  grid?: ListGridType;
  id?: string;
  itemLayout?: string;
  loading?: boolean;
  loadMore?: React.ReactNode;
  pagination?: any;
  prefixCls?: string;
  rowKey?: any;
  renderItem: any;
  size?: ListSize;
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  locale?: Object;
}

export interface ListLocale {
  emptyText: string;
}

export default class List extends React.Component<ListProps> {
  static Item: typeof Item = Item;

  static childContextTypes = {
    grid: PropTypes.any,
  };

  static defaultProps = {
    dataSource: [],
    prefixCls: 'ant-list',
    bordered: false,
    split: true,
    loading: false,
    pagination: false,
  };

  private keys: {[key: string]: string} = {};

  getChildContext() {
    return {
      grid: this.props.grid,
    };
  }

  renderItem = (item: React.ReactElement<any>, index: number) => {
    const { dataSource, renderItem, rowKey } = this.props;
    let key;

    if (typeof rowKey === 'function') {
      key = rowKey(dataSource[index]);
    } else if (typeof rowKey === 'string') {
      key = dataSource[rowKey];
    } else {
      key = dataSource.key;
    }

    if (!key) {
      key = `list-item-${index}`;
    }

    this.keys[index] = key;

    return renderItem(item, index);
  }

  isSomethingAfterLastTtem() {
    const { loadMore, pagination, footer } = this.props;
    return !!(loadMore || pagination || footer);
  }

  renderEmpty = (contextLocale: ListLocale) => {
    const locale = { ...contextLocale, ...this.props.locale };
    return <div className={`${this.props.prefixCls}-empty-text`}>{locale.emptyText}</div>;
  }

  render() {
    const {
      bordered,
      split,
      className,
      children,
      loading,
      itemLayout,
      loadMore,
      pagination,
      prefixCls,
      grid,
      dataSource,
      size,
      rowKey,
      renderItem,
      header,
      footer,
      ...rest,
    } = this.props;

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

    const paginationContent = (
      <div className={`${prefixCls}-pagination`}>
        <Pagination {...pagination} />
      </div>
    );

    let childrenContent;
    if (dataSource.length > 0) {
      const items = dataSource.map((item: any, index: number) => this.renderItem(item, index));
      const childrenList = React.Children.map(items, (child: any, index) => React.cloneElement(child, {
          key: this.keys[index],
        }),
      );

      childrenContent = grid ? (
        <Row gutter={grid.gutter}>{childrenList}</Row>
      ) : childrenList;
    } else if (!children) {
      childrenContent = (
        <LocaleReceiver
          componentName="Table"
          defaultLocale={defaultLocale.Table}
        >
          {this.renderEmpty}
        </LocaleReceiver>
      );
    }

    const content = (
      <div>
        <Spin spinning={loading}>{childrenContent}</Spin>
        {loadMore}
        {(!loadMore && pagination) ? paginationContent : null}
      </div>
    );

    return (
      <div className={classString} {...rest}>
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        {content}
        {children}
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
      </div>
    );
  }
}
