import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import Search from './search';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
function noop() {
}
export default class Transfer extends React.Component {
    constructor(props) {
        super(props);
        this.moveTo = (direction) => {
            const { targetKeys = [], dataSource = [], onChange } = this.props;
            const { sourceSelectedKeys, targetSelectedKeys } = this.state;
            const moveKeys = direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;
            // filter the disabled options
            const newMoveKeys = moveKeys.filter((key) => !dataSource.some(data => !!(key === data.key && data.disabled)));
            // move items to target box
            const newTargetKeys = direction === 'right'
                ? newMoveKeys.concat(targetKeys)
                : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);
            // empty checked keys
            const oppositeDirection = direction === 'right' ? 'left' : 'right';
            this.setState({
                [this.getSelectedKeysName(oppositeDirection)]: [],
            });
            this.handleSelectChange(oppositeDirection, []);
            if (onChange) {
                onChange(newTargetKeys, direction, newMoveKeys);
            }
        };
        this.moveToLeft = () => this.moveTo('left');
        this.moveToRight = () => this.moveTo('right');
        this.handleSelectAll = (direction, filteredDataSource, checkAll) => {
            const originalSelectedKeys = this.state[this.getSelectedKeysName(direction)] || [];
            const currentKeys = filteredDataSource.map(item => item.key);
            // Only operate current keys from original selected keys
            const newKeys1 = originalSelectedKeys.filter((key) => currentKeys.indexOf(key) === -1);
            const newKeys2 = [...originalSelectedKeys];
            currentKeys.forEach((key) => {
                if (newKeys2.indexOf(key) === -1) {
                    newKeys2.push(key);
                }
            });
            const holder = checkAll ? newKeys1 : newKeys2;
            this.handleSelectChange(direction, holder);
            if (!this.props.selectedKeys) {
                this.setState({
                    [this.getSelectedKeysName(direction)]: holder,
                });
            }
        };
        this.handleLeftSelectAll = (filteredDataSource, checkAll) => (this.handleSelectAll('left', filteredDataSource, checkAll));
        this.handleRightSelectAll = (filteredDataSource, checkAll) => (this.handleSelectAll('right', filteredDataSource, checkAll));
        this.handleFilter = (direction, e) => {
            this.setState({
                // add filter
                [`${direction}Filter`]: e.target.value,
            });
            if (this.props.onSearchChange) {
                this.props.onSearchChange(direction, e);
            }
        };
        this.handleLeftFilter = (e) => this.handleFilter('left', e);
        this.handleRightFilter = (e) => this.handleFilter('right', e);
        this.handleClear = (direction) => {
            this.setState({
                [`${direction}Filter`]: '',
            });
        };
        this.handleLeftClear = () => this.handleClear('left');
        this.handleRightClear = () => this.handleClear('right');
        this.handleSelect = (direction, selectedItem, checked) => {
            const { sourceSelectedKeys, targetSelectedKeys } = this.state;
            const holder = direction === 'left' ? [...sourceSelectedKeys] : [...targetSelectedKeys];
            const index = holder.indexOf(selectedItem.key);
            if (index > -1) {
                holder.splice(index, 1);
            }
            if (checked) {
                holder.push(selectedItem.key);
            }
            this.handleSelectChange(direction, holder);
            if (!this.props.selectedKeys) {
                this.setState({
                    [this.getSelectedKeysName(direction)]: holder,
                });
            }
        };
        this.handleLeftSelect = (selectedItem, checked) => {
            return this.handleSelect('left', selectedItem, checked);
        };
        this.handleRightSelect = (selectedItem, checked) => {
            return this.handleSelect('right', selectedItem, checked);
        };
        this.handleScroll = (direction, e) => {
            const { onScroll } = this.props;
            if (onScroll) {
                onScroll(direction, e);
            }
        };
        this.handleLeftScroll = (e) => this.handleScroll('left', e);
        this.handleRightScroll = (e) => this.handleScroll('right', e);
        this.getColumns = () => {
            if (this.props.culomsList) {
                return this.props.culomsList;
            }
        };
        this.renderTransfer = (locale) => {
            const { prefixCls = 'wmstool-transfer', className, operations = [], showSearch, notFoundContent, searchPlaceholder, body, footer, listStyle, filterOption, render, culomsList, lazy, } = this.props;
            const { leftFilter, rightFilter, sourceSelectedKeys, targetSelectedKeys } = this.state;
            const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
            const leftActive = targetSelectedKeys.length > 0;
            const rightActive = sourceSelectedKeys.length > 0;
            const cls = classNames(className, prefixCls);
            const titles = this.getTitles(locale);
            return (<div className={cls}>
        <List prefixCls={`${prefixCls}-list`} titleText={titles[0]} dataSource={leftDataSource} filter={leftFilter} filterOption={filterOption} style={listStyle} checkedKeys={sourceSelectedKeys} handleFilter={this.handleLeftFilter} handleClear={this.handleLeftClear} handleSelect={this.handleLeftSelect} handleSelectAll={this.handleLeftSelectAll} render={render} showSearch={showSearch} searchPlaceholder={searchPlaceholder || locale.searchPlaceholder} notFoundContent={notFoundContent || locale.notFoundContent} itemUnit={locale.itemUnit} itemsUnit={locale.itemsUnit} body={body} footer={footer} columsheader={culomsList} lazy={lazy} onScroll={this.handleLeftScroll}/>
        <Operation className={`${prefixCls}-operation`} rightActive={rightActive} rightArrowText={operations[0]} moveToRight={this.moveToRight} leftActive={leftActive} leftArrowText={operations[1]} moveToLeft={this.moveToLeft}/>
        <List prefixCls={`${prefixCls}-list`} titleText={titles[1]} dataSource={rightDataSource} filter={rightFilter} filterOption={filterOption} style={listStyle} checkedKeys={targetSelectedKeys} handleFilter={this.handleRightFilter} handleClear={this.handleRightClear} handleSelect={this.handleRightSelect} handleSelectAll={this.handleRightSelectAll} render={render} showSearch={showSearch} searchPlaceholder={searchPlaceholder || locale.searchPlaceholder} notFoundContent={notFoundContent || locale.notFoundContent} itemUnit={locale.itemUnit} itemsUnit={locale.itemsUnit} body={body} footer={footer} columsheader={culomsList} lazy={lazy} onScroll={this.handleRightScroll}/>
      </div>);
        };
        const { selectedKeys = [], targetKeys = [] } = props;
        this.state = {
            leftFilter: '',
            rightFilter: '',
            sourceSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) === -1),
            targetSelectedKeys: selectedKeys.filter(key => targetKeys.indexOf(key) > -1),
        };
    }
    componentWillReceiveProps(nextProps) {
        const { sourceSelectedKeys, targetSelectedKeys } = this.state;
        if (nextProps.targetKeys !== this.props.targetKeys ||
            nextProps.dataSource !== this.props.dataSource) {
            // clear cached splited dataSource
            this.splitedDataSource = null;
            if (!nextProps.selectedKeys) {
                // clear key nolonger existed
                // clear checkedKeys according to targetKeys
                const { dataSource, targetKeys = [] } = nextProps;
                const newSourceSelectedKeys = [];
                const newTargetSelectedKeys = [];
                dataSource.forEach(({ key }) => {
                    if (sourceSelectedKeys.includes(key) && !targetKeys.includes(key)) {
                        newSourceSelectedKeys.push(key);
                    }
                    if (targetSelectedKeys.includes(key) && targetKeys.includes(key)) {
                        newTargetSelectedKeys.push(key);
                    }
                });
                this.setState({
                    sourceSelectedKeys: newSourceSelectedKeys,
                    targetSelectedKeys: newTargetSelectedKeys,
                });
            }
        }
        if (nextProps.selectedKeys) {
            const targetKeys = nextProps.targetKeys || [];
            this.setState({
                sourceSelectedKeys: nextProps.selectedKeys.filter(key => !targetKeys.includes(key)),
                targetSelectedKeys: nextProps.selectedKeys.filter(key => targetKeys.includes(key)),
            });
        }
    }
    splitDataSource(props) {
        if (this.splitedDataSource) {
            return this.splitedDataSource;
        }
        const { dataSource, rowKey, targetKeys = [] } = props;
        const leftDataSource = [];
        const rightDataSource = new Array(targetKeys.length);
        dataSource.forEach(record => {
            if (rowKey) {
                record.key = rowKey(record);
            }
            // rightDataSource should be ordered by targetKeys
            // leftDataSource should be ordered by dataSource
            const indexOfKey = targetKeys.indexOf(record.key);
            if (indexOfKey !== -1) {
                rightDataSource[indexOfKey] = record;
            }
            else {
                leftDataSource.push(record);
            }
        });
        this.splitedDataSource = {
            leftDataSource,
            rightDataSource,
        };
        return this.splitedDataSource;
    }
    handleSelectChange(direction, holder) {
        const { sourceSelectedKeys, targetSelectedKeys } = this.state;
        const onSelectChange = this.props.onSelectChange;
        if (!onSelectChange) {
            return;
        }
        if (direction === 'left') {
            onSelectChange(holder, targetSelectedKeys);
        }
        else {
            onSelectChange(sourceSelectedKeys, holder);
        }
    }
    getTitles(transferLocale) {
        const { props } = this;
        if (props.titles) {
            return props.titles;
        }
        return transferLocale.titles;
    }
    getSelectedKeysName(direction) {
        return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
    }
    render() {
        return (<LocaleReceiver componentName="Transfer" defaultLocale={defaultLocale.Transfer}>
        {this.renderTransfer}
      </LocaleReceiver>);
    }
}
// For high-level customized Transfer @dqaria
Transfer.List = List;
Transfer.Operation = Operation;
Transfer.Search = Search;
Transfer.defaultProps = {
    dataSource: [],
    render: noop,
    showSearch: false,
};
Transfer.propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    render: PropTypes.func,
    targetKeys: PropTypes.array,
    onChange: PropTypes.func,
    height: PropTypes.number,
    listStyle: PropTypes.object,
    className: PropTypes.string,
    titles: PropTypes.array,
    operations: PropTypes.array,
    showSearch: PropTypes.bool,
    filterOption: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    notFoundContent: PropTypes.node,
    body: PropTypes.func,
    footer: PropTypes.func,
    rowKey: PropTypes.func,
    lazy: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
