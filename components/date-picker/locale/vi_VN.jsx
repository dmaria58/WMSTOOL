import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import TimePickerLocale from '../../time-picker/locale/en_US';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'Chọn thời điểm', rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
