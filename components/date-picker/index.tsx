import * as React from 'react';
import * as moment from 'moment';
import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import WeekPicker from './WeekPicker';
import { TimePickerProps } from '../time-picker';

export interface PickerProps {
  prefixCls?: string;
  inputPrefixCls?: string;
  format?: string;
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  locale?: any;
  size?: 'large' | 'small' | 'default';
  getCalendarContainer?: (triggerNode: Element) => HTMLElement;
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  disabledDate?: (current: moment.Moment) => boolean;
  renderExtraFooter?: () => React.ReactNode;
  dateRender?: (current: moment.Moment, today: moment.Moment) => React.ReactNode;
}

export interface SinglePickerProps {
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  defaultPickerValue?: moment.Moment;
  onChange?: (date: moment.Moment, dateString: string) => void;
}

export interface DatePickerProps extends PickerProps, SinglePickerProps {
  className?: string;
  showTime?: TimePickerProps | boolean;
  showToday?: boolean;
  open?: boolean;
  disabledTime?: (current: moment.Moment) => {
    disabledHours?: () => number[],
    disabledMinutes?: () => number[],
    disabledSeconds?: () => number[],
  };
  onOpenChange?: (status: boolean) => void;
  onOk?: (selectedTime: moment.Moment) => void;
  placeholder?: string;
}
const DatePicker = wrapPicker(createPicker(RcCalendar)) as React.ClassicComponentClass<DatePickerProps>;

export interface MonthPickerProps extends PickerProps, SinglePickerProps {
  className?: string;
  placeholder?: string;
}
const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'YYYY-MM');

export interface RangePickerProps extends PickerProps {
  className?: string;
  value?: [moment.Moment, moment.Moment];
  defaultValue?: [moment.Moment, moment.Moment];
  defaultPickerValue?: [moment.Moment, moment.Moment];
  onChange?: (dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => void;
  onCalendarChange?: (dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => void;
  onOk?: (selectedTime: moment.Moment) => void;
  showTime?: TimePickerProps | boolean;
  ranges?: {
    [range: string]: moment.Moment[],
  };
  placeholder?: [string, string];
  disabledTime?: (current: moment.Moment, type: string) => {
    disabledHours?: () => number[],
    disabledMinutes?: () => number[],
    disabledSeconds?: () => number[],
  };
}

export interface WeexPickerProps extends PickerProps, SinglePickerProps {
  className?: string;
  placeholder?: string;
}

Object.assign(DatePicker, {
  RangePicker: wrapPicker(RangePicker),
  MonthPicker,
  WeekPicker: wrapPicker(WeekPicker, 'YYYY-Wo'),
});

export interface DatePickerDecorator extends React.ClassicComponentClass<DatePickerProps> {
  RangePicker: React.ClassicComponentClass<RangePickerProps>;
  MonthPicker: React.ClassicComponentClass<MonthPickerProps>;
  WeekPicker: React.ClassicComponentClass<WeexPickerProps>;
}

export default DatePicker as DatePickerDecorator;
