import CalendarLocale from 'rc-calendar/lib/locale/cs_CZ';
import TimePickerLocale from '../../time-picker/locale/cs_CZ';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'Vybrat datum', rangePlaceholder: ['Od', 'Do'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
