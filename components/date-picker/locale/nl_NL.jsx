import CalendarLocale from 'rc-calendar/lib/locale/nl_NL';
import TimePickerLocale from '../../time-picker/locale/nl_NL';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'Selecteer datum', rangePlaceholder: ['Begin datum', 'Eind datum'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/issues/424
export default locale;
