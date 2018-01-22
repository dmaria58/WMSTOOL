import CalendarLocale from 'rc-calendar/lib/locale/de_DE';
import TimePickerLocale from '../../time-picker/locale/de_DE';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'Datum auswählen', rangePlaceholder: ['Startdatum', 'Enddatum'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/issues/424
export default locale;
