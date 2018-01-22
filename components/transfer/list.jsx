import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import Animate from 'rc-animate';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Checkbox from '../checkbox';
import Search from './search';
import Item from './item';
import triggerEvent from '../_util/triggerEvent';
function noop() {
}
function isRenderResultPlainObject(result) {
    return result && !React.isValidElement(result) &&
        Object.prototype.toString.call(result) === '[object Object]';
}
export default class TransferList extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = (selectedItem) => {
            const { checkedKeys } = this.props;
            const result = checkedKeys.some((key) => key === selectedItem.key);
            this.props.handleSelect(selectedItem, !result);
        };
        this.handleFilter = (e) => {
            this.props.handleFilter(e);
            if (!e.target.value) {
                return;
            }
            // Manually trigger scroll event for lazy search bug
            // https://github.com/wmstool-design/wmstool-design/issues/5631
            this.triggerScrollTimer = window.setTimeout(() => {
                const listNode = ReactDOM.findDOMNode(this).querySelectorAll('.wmstool-transfer-list-content')[0];
                if (listNode) {
                    triggerEvent(listNode, 'scroll');
                }
            }, 0);
        };
        this.handleClear = () => {
            this.props.handleClear();
        };
        this.matchFilter = (text, item) => {
            const { filter, filterOption } = this.props;
            if (filterOption) {
                return filterOption(filter, item);
            }
            return text.indexOf(filter) >= 0;
        };
        this.renderItem = (item) => {
            const { render = noop } = this.props;
            const renderResult = render(item);
            const isRenderResultPlain = isRenderResultPlainObject(renderResult);
            return {
                renderedText: isRenderResultPlain ? renderResult.value : renderResult,
                renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
            };
        };
        this.state = {
            mounted: false,
        };
    }
    componentDidMount() {
        this.timer = window.setTimeout(() => {
            this.setState({
                mounted: true,
            });
        }, 0);
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.triggerScrollTimer);
    }
    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }
    getCheckStatus(filteredDataSource) {
        const { checkedKeys } = this.props;
        if (checkedKeys.length === 0) {
            return 'none';
        }
        else if (filteredDataSource.every(item => checkedKeys.indexOf(item.key) >= 0)) {
            return 'all';
        }
        return 'part';
    }
    render() {
        const { prefixCls, dataSource, titleText, checkedKeys, lazy, body = noop, footer = noop, showSearch, style, filter, searchPlaceholder, notFoundContent, itemUnit, itemsUnit, onScroll, } = this.props;
        // Custom Layout
        const footerDom = footer(Object.assign({}, this.props));
        const bodyDom = body(Object.assign({}, this.props));
        const listCls = classNames(prefixCls, {
            [`${prefixCls}-with-footer`]: !!footerDom,
        });
        const filteredDataSource = [];
        const totalDataSource = [];
        const showItems = dataSource.map((item) => {
            const { renderedText, renderedEl } = this.renderItem(item);
            if (filter && filter.trim() && !this.matchFilter(renderedText, item)) {
                return null;
            }
            // all show items
            totalDataSource.push(item);
            if (!item.disabled) {
                // response to checkAll items
                filteredDataSource.push(item);
            }
            const checked = checkedKeys.indexOf(item.key) >= 0;
            return (<Item key={item.key} item={item} lazy={lazy} renderedText={renderedText} renderedEl={renderedEl} checked={checked} prefixCls={prefixCls} onClick={this.handleSelect}/>);
        });
        const unit = dataSource.length > 1 ? itemsUnit : itemUnit;
        const search = showSearch ? (<div className={`${prefixCls}-body-search-wrapper`}>
        <Search prefixCls={`${prefixCls}-search`} onChange={this.handleFilter} handleClear={this.handleClear} placeholder={searchPlaceholder} value={filter}/>
      </div>) : null;
        const listBody = bodyDom || (<div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
        {search}
        <Animate component="ul" componentProps={{ onScroll }} className={`${prefixCls}-content`} transitionName={this.state.mounted ? `${prefixCls}-content-item-highlight` : ''} transitionLeave={false}>
          {showItems}
        </Animate>
        <div className={`${prefixCls}-body-not-found`}>
          {notFoundContent}
        </div>
      </div>);
        const listFooter = footerDom ? (<div className={`${prefixCls}-footer`}>
        {footerDom}
      </div>) : null;
        const checkStatus = this.getCheckStatus(filteredDataSource);
        const checkedAll = checkStatus === 'all';
        const checkAllCheckbox = (<Checkbox ref="checkbox" checked={checkedAll} indeterminate={checkStatus === 'part'} onChange={() => this.props.handleSelectAll(filteredDataSource, checkedAll)}/>);
        return (<div className={listCls} style={style}>
        <div className={`${prefixCls}-header`}>
          {checkAllCheckbox}
          <span className={`${prefixCls}-header-selected`}>
            <span>
              {(checkedKeys.length > 0 ? `${checkedKeys.length}/` : '') + totalDataSource.length} {unit}
            </span>
            <span className={`${prefixCls}-header-title`}>
              {titleText}
            </span>
          </span>
        </div>
        {listBody}
        {listFooter}
      </div>);
    }
}
TransferList.defaultProps = {
    dataSource: [],
    titleText: '',
    showSearch: false,
    render: noop,
    lazy: {},
};
