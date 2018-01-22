import CalendarLocale from 'rc-calendar/lib/locale/ca_ES';
import TimePickerLocale from '../../time-picker/locale/ca_ES';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'Seleccionar data', rangePlaceholder: ['Data inicial', 'Data final'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
