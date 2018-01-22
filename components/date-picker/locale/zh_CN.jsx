import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import TimePickerLocale from '../../time-picker/locale/zh_CN';
const locale = {
    lang: Object.assign({ placeholder: '请选择日期', rangePlaceholder: ['开始日期', '结束日期'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// should add whitespace between char in Button
locale.lang.ok = '确 定';
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
