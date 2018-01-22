import CalendarLocale from 'rc-calendar/lib/locale/zh_TW';
import TimePickerLocale from '../../time-picker/locale/zh_TW';
const locale = {
    lang: Object.assign({ placeholder: '請選擇日期', rangePlaceholder: ['開始日期', '結束日期'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
locale.lang.ok = '確 定';
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
