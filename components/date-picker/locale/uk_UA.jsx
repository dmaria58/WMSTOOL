import CalendarLocale from 'rc-calendar/lib/locale/uk_UA';
import TimePickerLocale from '../../time-picker/locale/uk_UA';
const locale = {
    lang: Object.assign({ placeholder: 'Оберіть дату', rangePlaceholder: ['Початкова дата', 'Кінцева дата'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
