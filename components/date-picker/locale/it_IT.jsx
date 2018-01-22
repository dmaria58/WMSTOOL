import CalendarLocale from 'rc-calendar/lib/locale/it_IT';
import TimePickerLocale from '../../time-picker/locale/it_IT';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'Selezionare la data', rangePlaceholder: ['Data d\'inizio', 'Data di fine'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/issues/424
export default locale;
