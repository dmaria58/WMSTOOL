import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import WeekPicker from './WeekPicker';
const DatePicker = wrapPicker(createPicker(RcCalendar));
const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'YYYY-MM');
Object.assign(DatePicker, {
    RangePicker: wrapPicker(RangePicker),
    MonthPicker,
    WeekPicker: wrapPicker(WeekPicker, 'YYYY-Wo'),
});
export default DatePicker;
