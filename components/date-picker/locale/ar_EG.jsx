import CalendarLocale from 'rc-calendar/lib/locale/ar_EG';
import TimePickerLocale from '../../time-picker/locale/ar_EG';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'اختيار التاريخ', rangePlaceholder: ['البداية', 'النهاية'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
