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
import RcTable from 'rc-table';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from '../pagination';
import Icon from '../icon';
import Spin from '../spin';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import warning from '../_util/warning';
import FilterDropdown from './filterDropdown';
import createStore from './createStore';
import SelectionBox from './SelectionBox';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Column from './Column';
import ColumnGroup from './ColumnGroup';
import createBodyRow from './createBodyRow';
import { flatArray, treeMap, flatFilter, normalizeColumns } from './util';
function noop() {
}
function stopPropagation(e) {
    e.stopPropagation();
    if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
    }
}
const defaultPagination = {
    onChange: noop,
    onShowSizeChange: noop,
};
/**
 * Avoid creating new object, so that parent component's shouldComponentUpdate
 * can works appropriately。
 */
const emptyObject = {};
export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.getCheckboxPropsByItem = (item, index) => {
            const { rowSelection = {} } = this.props;
            if (!rowSelection.getCheckboxProps) {
                return {};
            }
            const key = this.getRecordKey(item, index);
            // Cache checkboxProps
            if (!this.CheckboxPropsCache[key]) {
                this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item);
            }
            return this.CheckboxPropsCache[key];
        };
        this.onRow = (record, index) => {
            const { onRow, prefixCls } = this.props;
            const custom = onRow ? onRow(record, index) : {};
            return Object.assign({}, custom, { prefixCls, store: this.store, rowKey: this.getRecordKey(record, index) });
        };
        this.handleFilter = (column, nextFilters) => {
            const props = this.props;
            let pagination = Object.assign({}, this.state.pagination);
            const filters = Object.assign({}, this.state.filters, { [this.getColumnKey(column)]: nextFilters });
            // Remove filters not in current columns
            const currentColumnKeys = [];
            treeMap(this.columns, c => {
                if (!c.children) {
                    currentColumnKeys.push(this.getColumnKey(c));
                }
            });
            Object.keys(filters).forEach((columnKey) => {
                if (currentColumnKeys.indexOf(columnKey) < 0) {
                    delete filters[columnKey];
                }
            });
            if (props.pagination) {
                // Reset current prop
                pagination.current = 1;
                pagination.onChange(pagination.current);
            }
            const newState = {
                pagination,
                filters: {},
            };
            const filtersToSetState = Object.assign({}, filters);
            // Remove filters which is controlled
            this.getFilteredValueColumns().forEach((col) => {
                const columnKey = this.getColumnKey(col);
                if (columnKey) {
                    delete filtersToSetState[columnKey];
                }
            });
            if (Object.keys(filtersToSetState).length > 0) {
                newState.filters = filtersToSetState;
            }
            // Controlled current prop will not respond user interaction
            if (typeof props.pagination === 'object' && 'current' in props.pagination) {
                newState.pagination = Object.assign({}, pagination, { current: this.state.pagination.current });
            }
            this.setState(newState, () => {
                this.store.setState({
                    selectionDirty: false,
                });
                const onChange = this.props.onChange;
                if (onChange) {
                    onChange.apply(null, this.prepareParamsArguments(Object.assign({}, this.state, { selectionDirty: false, filters,
                        pagination })));
                }
            });
        };
        this.handleSelect = (record, rowIndex, e) => {
            const checked = e.target.checked;
            const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
            let selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
            let key = this.getRecordKey(record, rowIndex);
            if (checked) {
                selectedRowKeys.push(this.getRecordKey(record, rowIndex));
            }
            else {
                selectedRowKeys = selectedRowKeys.filter((i) => key !== i);
            }
            this.store.setState({
                selectionDirty: true,
            });
            this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: 'onSelect',
                record,
                checked,
            });
        };
        this.handleRadioSelect = (record, rowIndex, e) => {
            const checked = e.target.checked;
            const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
            let selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
            let key = this.getRecordKey(record, rowIndex);
            selectedRowKeys = [key];
            this.store.setState({
                selectionDirty: true,
            });
            this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: 'onSelect',
                record,
                checked,
            });
        };
        this.handleSelectRow = (selectionKey, index, onSelectFunc) => {
            const data = this.getFlatCurrentPageData();
            const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
            const selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
            const changeableRowKeys = data
                .filter((item, i) => !this.getCheckboxPropsByItem(item, i).disabled)
                .map((item, i) => this.getRecordKey(item, i));
            let changeRowKeys = [];
            let selectWay = '';
            let checked;
            // handle default selection
            switch (selectionKey) {
                case 'all':
                    changeableRowKeys.forEach(key => {
                        if (selectedRowKeys.indexOf(key) < 0) {
                            selectedRowKeys.push(key);
                            changeRowKeys.push(key);
                        }
                    });
                    selectWay = 'onSelectAll';
                    checked = true;
                    break;
                case 'removeAll':
                    changeableRowKeys.forEach(key => {
                        if (selectedRowKeys.indexOf(key) >= 0) {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                            changeRowKeys.push(key);
                        }
                    });
                    selectWay = 'onSelectAll';
                    checked = false;
                    break;
                case 'invert':
                    changeableRowKeys.forEach(key => {
                        if (selectedRowKeys.indexOf(key) < 0) {
                            selectedRowKeys.push(key);
                        }
                        else {
                            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                        }
                        changeRowKeys.push(key);
                        selectWay = 'onSelectInvert';
                    });
                    break;
                default:
                    break;
            }
            this.store.setState({
                selectionDirty: true,
            });
            // when select custom selection, callback selections[n].onSelect
            const { rowSelection } = this.props;
            let customSelectionStartIndex = 2;
            if (rowSelection && rowSelection.hideDefaultSelections) {
                customSelectionStartIndex = 0;
            }
            if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
                return onSelectFunc(changeableRowKeys);
            }
            this.setSelectedRowKeys(selectedRowKeys, {
                selectWay: selectWay,
                checked,
                changeRowKeys,
            });
        };
        this.handlePageChange = (current, ...otherArguments) => {
            const props = this.props;
            let pagination = Object.assign({}, this.state.pagination);
            if (current) {
                pagination.current = current;
            }
            else {
                pagination.current = pagination.current || 1;
            }
            pagination.onChange(pagination.current, ...otherArguments);
            const newState = {
                pagination,
            };
            // Controlled current prop will not respond user interaction
            if (props.pagination &&
                typeof props.pagination === 'object' &&
                'current' in props.pagination) {
                newState.pagination = Object.assign({}, pagination, { current: this.state.pagination.current });
            }
            this.setState(newState);
            this.store.setState({
                selectionDirty: false,
            });
            const onChange = this.props.onChange;
            if (onChange) {
                onChange.apply(null, this.prepareParamsArguments(Object.assign({}, this.state, { selectionDirty: false, pagination })));
            }
        };
        this.renderSelectionBox = (type) => {
            return (_, record, index) => {
                let rowIndex = this.getRecordKey(record, index); // 从 1 开始
                const props = this.getCheckboxPropsByItem(record, index);
                const handleChange = (e) => {
                    type === 'radio' ? this.handleRadioSelect(record, rowIndex, e) :
                        this.handleSelect(record, rowIndex, e);
                };
                return (<span onClick={stopPropagation}>
          <SelectionBox type={type} store={this.store} rowIndex={rowIndex} disabled={props.disabled} onChange={handleChange} defaultSelection={this.getDefaultSelection()}/>
        </span>);
            };
        };
        this.getRecordKey = (record, index) => {
            const rowKey = this.props.rowKey;
            const recordKey = (typeof rowKey === 'function') ?
                rowKey(record, index) : record[rowKey];
            warning(recordKey !== undefined, 'Each record in dataSource of table should have a unique `key` prop, or set `rowKey` to an unique primary key,' +
                'see https://u.ant.design/table-row-key');
            return recordKey === undefined ? index : recordKey;
        };
        this.getPopupContainer = () => {
            return ReactDOM.findDOMNode(this);
        };
        this.handleShowSizeChange = (current, pageSize) => {
            const pagination = this.state.pagination;
            pagination.onShowSizeChange(current, pageSize);
            const nextPagination = Object.assign({}, pagination, { pageSize,
                current });
            this.setState({ pagination: nextPagination });
            const onChange = this.props.onChange;
            if (onChange) {
                onChange.apply(null, this.prepareParamsArguments(Object.assign({}, this.state, { pagination: nextPagination })));
            }
        };
        this.renderTable = (contextLocale) => {
            const locale = Object.assign({}, contextLocale, this.props.locale);
            const _a = this.props, { style, className, prefixCls, showHeader } = _a, restProps = __rest(_a, ["style", "className", "prefixCls", "showHeader"]);
            const data = this.getCurrentPageData();
            const expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
            const classString = classNames({
                [`${prefixCls}-${this.props.size}`]: true,
                [`${prefixCls}-bordered`]: this.props.bordered,
                [`${prefixCls}-empty`]: !data.length,
                [`${prefixCls}-without-column-header`]: !showHeader,
            });
            let columns = this.renderRowSelection(locale);
            columns = this.renderColumnsDropdown(columns, locale);
            columns = columns.map((column, i) => {
                const newColumn = Object.assign({}, column);
                newColumn.key = this.getColumnKey(newColumn, i);
                return newColumn;
            });
            let expandIconColumnIndex = (columns[0] && columns[0].key === 'selection-column') ? 1 : 0;
            if ('expandIconColumnIndex' in restProps) {
                expandIconColumnIndex = restProps.expandIconColumnIndex;
            }
            return (<RcTable key="table" {...restProps} onRow={this.onRow} components={this.components} prefixCls={prefixCls} data={data} columns={columns} showHeader={showHeader} className={classString} expandIconColumnIndex={expandIconColumnIndex} expandIconAsCell={expandIconAsCell} emptyText={() => locale.emptyText}/>);
        };
        warning(!('columnsPageRange' in props || 'columnsPageSize' in props), '`columnsPageRange` and `columnsPageSize` are removed, please use ' +
            'fixed columns instead, see: https://u.ant.design/fixed-columns.');
        this.columns = props.columns || normalizeColumns(props.children);
        this.createComponents(props.components);
        this.state = Object.assign({}, this.getDefaultSortOrder(this.columns), { 
            // 减少状态
            filters: this.getFiltersFromColumns(), pagination: this.getDefaultPagination(props) });
        this.CheckboxPropsCache = {};
        this.store = createStore({
            selectedRowKeys: (props.rowSelection || {}).selectedRowKeys || [],
            selectionDirty: false,
        });
    }
    getDefaultSelection() {
        const { rowSelection = {} } = this.props;
        if (!rowSelection.getCheckboxProps) {
            return [];
        }
        return this.getFlatData()
            .filter((item, rowIndex) => this.getCheckboxPropsByItem(item, rowIndex).defaultChecked)
            .map((record, rowIndex) => this.getRecordKey(record, rowIndex));
    }
    getDefaultPagination(props) {
        const pagination = props.pagination || {};
        return this.hasPagination(props) ? Object.assign({}, defaultPagination, pagination, { current: pagination.defaultCurrent || pagination.current || 1, pageSize: pagination.defaultPageSize || pagination.pageSize || 10 }) : {};
    }
    componentWillReceiveProps(nextProps) {
        this.columns = nextProps.columns || normalizeColumns(nextProps.children);
        if ('pagination' in nextProps || 'pagination' in this.props) {
            this.setState(previousState => {
                const newPagination = Object.assign({}, defaultPagination, previousState.pagination, nextProps.pagination);
                newPagination.current = newPagination.current || 1;
                newPagination.pageSize = newPagination.pageSize || 10;
                return { pagination: nextProps.pagination !== false ? newPagination : emptyObject };
            });
        }
        if (nextProps.rowSelection &&
            'selectedRowKeys' in nextProps.rowSelection) {
            this.store.setState({
                selectedRowKeys: nextProps.rowSelection.selectedRowKeys || [],
            });
            const { rowSelection } = this.props;
            if (rowSelection && (nextProps.rowSelection.getCheckboxProps !== rowSelection.getCheckboxProps)) {
                this.CheckboxPropsCache = {};
            }
        }
        if ('dataSource' in nextProps &&
            nextProps.dataSource !== this.props.dataSource) {
            this.store.setState({
                selectionDirty: false,
            });
            this.CheckboxPropsCache = {};
        }
        if (this.getSortOrderColumns(this.columns).length > 0) {
            const sortState = this.getSortStateFromColumns(this.columns);
            if (sortState.sortColumn !== this.state.sortColumn ||
                sortState.sortOrder !== this.state.sortOrder) {
                this.setState(sortState);
            }
        }
        const filteredValueColumns = this.getFilteredValueColumns(this.columns);
        if (filteredValueColumns.length > 0) {
            const filtersFromColumns = this.getFiltersFromColumns(this.columns);
            const newFilters = Object.assign({}, this.state.filters);
            Object.keys(filtersFromColumns).forEach(key => {
                newFilters[key] = filtersFromColumns[key];
            });
            if (this.isFiltersChanged(newFilters)) {
                this.setState({ filters: newFilters });
            }
        }
        this.createComponents(nextProps.components, this.props.components);
    }
    setSelectedRowKeys(selectedRowKeys, { selectWay, record, checked, changeRowKeys }) {
        const { rowSelection = {} } = this.props;
        if (rowSelection && !('selectedRowKeys' in rowSelection)) {
            this.store.setState({ selectedRowKeys });
        }
        const data = this.getFlatData();
        if (!rowSelection.onChange && !rowSelection[selectWay]) {
            return;
        }
        const selectedRows = data.filter((row, i) => selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0);
        if (rowSelection.onChange) {
            rowSelection.onChange(selectedRowKeys, selectedRows);
        }
        if (selectWay === 'onSelect' && rowSelection.onSelect) {
            rowSelection.onSelect(record, checked, selectedRows);
        }
        else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
            const changeRows = data.filter((row, i) => changeRowKeys.indexOf(this.getRecordKey(row, i)) >= 0);
            rowSelection.onSelectAll(checked, selectedRows, changeRows);
        }
        else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
            rowSelection.onSelectInvert(selectedRowKeys);
        }
    }
    hasPagination(props) {
        return (props || this.props).pagination !== false;
    }
    isFiltersChanged(filters) {
        let filtersChanged = false;
        if (Object.keys(filters).length !== Object.keys(this.state.filters).length) {
            filtersChanged = true;
        }
        else {
            Object.keys(filters).forEach(columnKey => {
                if (filters[columnKey] !== this.state.filters[columnKey]) {
                    filtersChanged = true;
                }
            });
        }
        return filtersChanged;
    }
    getSortOrderColumns(columns) {
        return flatFilter(columns || this.columns || [], (column) => 'sortOrder' in column);
    }
    getFilteredValueColumns(columns) {
        return flatFilter(columns || this.columns || [], (column) => typeof column.filteredValue !== 'undefined');
    }
    getFiltersFromColumns(columns) {
        let filters = {};
        this.getFilteredValueColumns(columns).forEach((col) => {
            const colKey = this.getColumnKey(col);
            filters[colKey] = col.filteredValue;
        });
        return filters;
    }
    getDefaultSortOrder(columns) {
        const definedSortState = this.getSortStateFromColumns(columns);
        let defaultSortedColumn = flatFilter(columns || [], (column) => column.defaultSortOrder != null)[0];
        if (defaultSortedColumn && !definedSortState.sortColumn) {
            return {
                sortColumn: defaultSortedColumn,
                sortOrder: defaultSortedColumn.defaultSortOrder,
            };
        }
        return definedSortState;
    }
    getSortStateFromColumns(columns) {
        // return first column which sortOrder is not falsy
        const sortedColumn = this.getSortOrderColumns(columns).filter((col) => col.sortOrder)[0];
        if (sortedColumn) {
            return {
                sortColumn: sortedColumn,
                sortOrder: sortedColumn.sortOrder,
            };
        }
        return {
            sortColumn: null,
            sortOrder: null,
        };
    }
    getSorterFn() {
        const { sortOrder, sortColumn } = this.state;
        if (!sortOrder || !sortColumn ||
            typeof sortColumn.sorter !== 'function') {
            return;
        }
        return (a, b) => {
            const result = sortColumn.sorter(a, b);
            if (result !== 0) {
                return (sortOrder === 'descend') ? -result : result;
            }
            return 0;
        };
    }
    toggleSortOrder(order, column) {
        let { sortColumn, sortOrder } = this.state;
        // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
        let isSortColumn = this.isSortColumn(column);
        if (!isSortColumn) {
            sortOrder = order;
            sortColumn = column;
        }
        else {
            if (sortOrder === order) {
                sortOrder = '';
                sortColumn = null;
            }
            else {
                sortOrder = order;
            }
        }
        const newState = {
            sortOrder,
            sortColumn,
        };
        // Controlled
        if (this.getSortOrderColumns().length === 0) {
            this.setState(newState);
        }
        const onChange = this.props.onChange;
        if (onChange) {
            onChange.apply(null, this.prepareParamsArguments(Object.assign({}, this.state, newState)));
        }
    }
    renderRowSelection(locale) {
        const { prefixCls, rowSelection } = this.props;
        const columns = this.columns.concat();
        if (rowSelection) {
            const data = this.getFlatCurrentPageData().filter((item, index) => {
                if (rowSelection.getCheckboxProps) {
                    return !this.getCheckboxPropsByItem(item, index).disabled;
                }
                return true;
            });
            let selectionColumnClass = classNames(`${prefixCls}-selection-column`, {
                [`${prefixCls}-selection-column-custom`]: rowSelection.selections,
            });
            const selectionColumn = {
                key: 'selection-column',
                render: this.renderSelectionBox(rowSelection.type),
                className: selectionColumnClass,
                fixed: rowSelection.fixed,
            };
            if (rowSelection.type !== 'radio') {
                const checkboxAllDisabled = data.every((item, index) => this.getCheckboxPropsByItem(item, index).disabled);
                selectionColumn.title = (<SelectionCheckboxAll store={this.store} locale={locale} data={data} getCheckboxPropsByItem={this.getCheckboxPropsByItem} getRecordKey={this.getRecordKey} disabled={checkboxAllDisabled} prefixCls={prefixCls} onSelect={this.handleSelectRow} selections={rowSelection.selections} hideDefaultSelections={rowSelection.hideDefaultSelections} getPopupContainer={this.getPopupContainer}/>);
            }
            if ('fixed' in rowSelection) {
                selectionColumn.fixed = rowSelection.fixed;
            }
            else if (columns.some(column => column.fixed === 'left' || column.fixed === true)) {
                selectionColumn.fixed = 'left';
            }
            if (columns[0] && columns[0].key === 'selection-column') {
                columns[0] = selectionColumn;
            }
            else {
                columns.unshift(selectionColumn);
            }
        }
        return columns;
    }
    getColumnKey(column, index) {
        return column.key || column.dataIndex || index;
    }
    getMaxCurrent(total) {
        const { current, pageSize } = this.state.pagination;
        if ((current - 1) * pageSize >= total) {
            return Math.floor((total - 1) / pageSize) + 1;
        }
        return current;
    }
    isSortColumn(column) {
        const { sortColumn } = this.state;
        if (!column || !sortColumn) {
            return false;
        }
        return this.getColumnKey(sortColumn) === this.getColumnKey(column);
    }
    renderColumnsDropdown(columns, locale) {
        const { prefixCls, dropdownPrefixCls } = this.props;
        const { sortOrder } = this.state;
        return treeMap(columns, (originColumn, i) => {
            let column = Object.assign({}, originColumn);
            let key = this.getColumnKey(column, i);
            let filterDropdown;
            let sortButton;
            if ((column.filters && column.filters.length > 0) || column.filterDropdown) {
                let colFilters = this.state.filters[key] || [];
                filterDropdown = (<FilterDropdown locale={locale} column={column} selectedKeys={colFilters} confirmFilter={this.handleFilter} prefixCls={`${prefixCls}-filter`} dropdownPrefixCls={dropdownPrefixCls || 'wmstool-dropdown'} getPopupContainer={this.getPopupContainer}/>);
            }
            if (column.sorter) {
                let isSortColumn = this.isSortColumn(column);
                if (isSortColumn) {
                    column.className = classNames(column.className, {
                        [`${prefixCls}-column-sort`]: sortOrder,
                    });
                }
                const isAscend = isSortColumn && sortOrder === 'ascend';
                const isDescend = isSortColumn && sortOrder === 'descend';
                sortButton = (<div className={`${prefixCls}-column-sorter`}>
            <span className={`${prefixCls}-column-sorter-up ${isAscend ? 'on' : 'off'}`} title="↑" onClick={() => this.toggleSortOrder('ascend', column)}>
              <Icon type="caret-up"/>
            </span>
            <span className={`${prefixCls}-column-sorter-down ${isDescend ? 'on' : 'off'}`} title="↓" onClick={() => this.toggleSortOrder('descend', column)}>
              <Icon type="caret-down"/>
            </span>
          </div>);
            }
            column.title = (<span>
          {column.title}
          {sortButton}
          {filterDropdown}
        </span>);
            return column;
        });
    }
    renderPagination() {
        // 强制不需要分页
        if (!this.hasPagination()) {
            return null;
        }
        let size = 'default';
        const { pagination } = this.state;
        if (pagination.size) {
            size = pagination.size;
        }
        else if (this.props.size === 'middle' || this.props.size === 'small') {
            size = 'small';
        }
        let total = pagination.total || this.getLocalData().length;
        return (total > 0) ? (<Pagination key="pagination" {...pagination} className={classNames(pagination.className, `${this.props.prefixCls}-pagination`)} onChange={this.handlePageChange} total={total} size={size} current={this.getMaxCurrent(total)} onShowSizeChange={this.handleShowSizeChange}/>) : null;
    }
    // Get pagination, filters, sorter
    prepareParamsArguments(state) {
        const pagination = Object.assign({}, state.pagination);
        // remove useless handle function in Table.onChange
        delete pagination.onChange;
        delete pagination.onShowSizeChange;
        const filters = state.filters;
        const sorter = {};
        if (state.sortColumn && state.sortOrder) {
            sorter.column = state.sortColumn;
            sorter.order = state.sortOrder;
            sorter.field = state.sortColumn.dataIndex;
            sorter.columnKey = this.getColumnKey(state.sortColumn);
        }
        return [pagination, filters, sorter];
    }
    findColumn(myKey) {
        let column;
        treeMap(this.columns, c => {
            if (this.getColumnKey(c) === myKey) {
                column = c;
            }
        });
        return column;
    }
    getCurrentPageData() {
        let data = this.getLocalData();
        let current;
        let pageSize;
        let state = this.state;
        // 如果没有分页的话，默认全部展示
        if (!this.hasPagination()) {
            pageSize = Number.MAX_VALUE;
            current = 1;
        }
        else {
            pageSize = state.pagination.pageSize;
            current = this.getMaxCurrent(state.pagination.total || data.length);
        }
        // 分页
        // ---
        // 当数据量少于等于每页数量时，直接设置数据
        // 否则进行读取分页数据
        if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
            data = data.filter((_, i) => {
                return i >= (current - 1) * pageSize && i < current * pageSize;
            });
        }
        return data;
    }
    getFlatData() {
        return flatArray(this.getLocalData());
    }
    getFlatCurrentPageData() {
        return flatArray(this.getCurrentPageData());
    }
    recursiveSort(data, sorterFn) {
        const { childrenColumnName = 'children' } = this.props;
        return data.sort(sorterFn).map((item) => (item[childrenColumnName] ? Object.assign({}, item, { [childrenColumnName]: this.recursiveSort(item[childrenColumnName], sorterFn) }) : item));
    }
    getLocalData() {
        const state = this.state;
        const { dataSource } = this.props;
        let data = dataSource || [];
        // 优化本地排序
        data = data.slice(0);
        const sorterFn = this.getSorterFn();
        if (sorterFn) {
            data = this.recursiveSort(data, sorterFn);
        }
        // 筛选
        if (state.filters) {
            Object.keys(state.filters).forEach((columnKey) => {
                let col = this.findColumn(columnKey);
                if (!col) {
                    return;
                }
                let values = state.filters[columnKey] || [];
                if (values.length === 0) {
                    return;
                }
                const onFilter = col.onFilter;
                data = onFilter ? data.filter(record => {
                    return values.some(v => onFilter(v, record));
                }) : data;
            });
        }
        return data;
    }
    createComponents(components = {}, prevComponents) {
        const bodyRow = components && components.body && components.body.row;
        const preBodyRow = prevComponents && prevComponents.body && prevComponents.body.row;
        if (!this.components || bodyRow !== preBodyRow) {
            this.components = Object.assign({}, components);
            this.components.body = Object.assign({}, components.body, { row: createBodyRow(bodyRow) });
        }
    }
    render() {
        const { style, className, prefixCls } = this.props;
        const data = this.getCurrentPageData();
        const table = (<LocaleReceiver componentName="Table" defaultLocale={defaultLocale.Table}>
        {this.renderTable}
      </LocaleReceiver>);
        // if there is no pagination or no data,
        // the height of spin should decrease by half of pagination
        const paginationPatchClass = (this.hasPagination() && data && data.length !== 0)
            ? `${prefixCls}-with-pagination` : `${prefixCls}-without-pagination`;
        let loading = this.props.loading;
        if (typeof loading === 'boolean') {
            loading = {
                spinning: loading,
            };
        }
        return (<div className={classNames(`${prefixCls}-wrapper`, className)} style={style}>
        <Spin {...loading} className={loading ? `${paginationPatchClass} ${prefixCls}-spin-holder` : ''}>
          {table}
          {this.renderPagination()}
        </Spin>
      </div>);
    }
}
Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    prefixCls: PropTypes.string,
    useFixedHeader: PropTypes.bool,
    rowSelection: PropTypes.object,
    className: PropTypes.string,
    size: PropTypes.string,
    loading: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
    bordered: PropTypes.bool,
    onChange: PropTypes.func,
    locale: PropTypes.object,
    dropdownPrefixCls: PropTypes.string,
};
Table.defaultProps = {
    dataSource: [],
    prefixCls: 'wmstool-table',
    useFixedHeader: false,
    rowSelection: null,
    className: '',
    size: 'large',
    loading: false,
    bordered: false,
    indentSize: 20,
    locale: {},
    rowKey: 'key',
    showHeader: true,
};
