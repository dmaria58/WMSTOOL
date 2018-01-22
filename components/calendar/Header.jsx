import * as React from 'react';
import { PREFIX_CLS } from './Constants';
import Select from '../select';
import { Group, Button } from '../radio';
const Option = Select.Option;
export default class Header extends React.Component {
    constructor() {
        super(...arguments);
        this.onYearChange = (year) => {
            const newValue = this.props.value.clone();
            newValue.year(parseInt(year, 10));
            const onValueChange = this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        this.onMonthChange = (month) => {
            const newValue = this.props.value.clone();
            newValue.month(parseInt(month, 10));
            const onValueChange = this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        this.onTypeChange = (e) => {
            const onTypeChange = this.props.onTypeChange;
            if (onTypeChange) {
                onTypeChange(e.target.value);
            }
        };
        this.getCalenderHeaderNode = (node) => {
            this.calenderHeaderNode = node;
        };
    }
    getYearSelectElement(year) {
        const { yearSelectOffset, yearSelectTotal, locale, prefixCls, fullscreen } = this.props;
        const start = year - yearSelectOffset;
        const end = start + yearSelectTotal;
        const suffix = locale.year === '年' ? '年' : '';
        const options = [];
        for (let index = start; index < end; index++) {
            options.push(<Option key={`${index}`}>{index + suffix}</Option>);
        }
        return (<Select size={fullscreen ? 'default' : 'small'} dropdownMatchSelectWidth={false} className={`${prefixCls}-year-select`} onChange={this.onYearChange} value={String(year)} getPopupContainer={() => this.calenderHeaderNode}>
        {options}
      </Select>);
    }
    getMonthsLocale(value) {
        const current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
        }
        return months;
    }
    getMonthSelectElement(month, months) {
        const props = this.props;
        const { prefixCls, fullscreen } = props;
        const options = [];
        for (let index = 0; index < 12; index++) {
            options.push(<Option key={`${index}`}>{months[index]}</Option>);
        }
        return (<Select size={fullscreen ? 'default' : 'small'} dropdownMatchSelectWidth={false} className={`${prefixCls}-month-select`} value={String(month)} onChange={this.onMonthChange} getPopupContainer={() => this.calenderHeaderNode}>
        {options}
      </Select>);
    }
    render() {
        const { type, value, prefixCls, locale, fullscreen } = this.props;
        const yearSelect = this.getYearSelectElement(value.year());
        const monthSelect = type === 'date' ?
            this.getMonthSelectElement(value.month(), this.getMonthsLocale(value)) : null;
        const size = (fullscreen ? 'default' : 'small');
        const typeSwitch = (<Group onChange={this.onTypeChange} value={type} size={size}>
        <Button value="date">{locale.month}</Button>
        <Button value="month">{locale.year}</Button>
      </Group>);
        return (<div className={`${prefixCls}-header`} ref={this.getCalenderHeaderNode}>
        {yearSelect}
        {monthSelect}
        {typeSwitch}
      </div>);
    }
}
Header.defaultProps = {
    prefixCls: `${PREFIX_CLS}-header`,
    yearSelectOffset: 10,
    yearSelectTotal: 20,
};
