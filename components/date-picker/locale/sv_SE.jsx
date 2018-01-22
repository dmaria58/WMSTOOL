import CalendarLocale from 'rc-calendar/lib/locale/sv_SE';
import TimePickerLocale from '../../time-picker/locale/sv_SE';
const locale = {
    lang: Object.assign({ placeholder: 'Välj datum', rangePlaceholder: ['Startdatum', 'Slutdatum'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
