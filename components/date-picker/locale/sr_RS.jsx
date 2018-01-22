import CalendarLocale from 'rc-calendar/lib/locale/sr_RS';
import TimePickerLocale from '../../time-picker/locale/sr_RS';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: 'Izaberite datum', rangePlaceholder: ['Početni datum', 'Krajnji datum'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
