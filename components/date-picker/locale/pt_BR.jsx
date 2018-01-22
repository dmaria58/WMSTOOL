import CalendarLocale from 'rc-calendar/lib/locale/pt_BR';
import TimePickerLocale from '../../time-picker/locale/pt_BR';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'Selecionar data', rangePlaceholder: ['Data de início', 'Data de fim'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
