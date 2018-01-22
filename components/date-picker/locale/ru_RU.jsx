/**
 * Created by Andrey Gayvoronsky on 13/04/16.
 */
import CalendarLocale from 'rc-calendar/lib/locale/ru_RU';
import TimePickerLocale from '../../time-picker/locale/ru_RU';
const locale = {
    lang: Object.assign({ placeholder: 'Выберите дату', rangePlaceholder: ['Начальная дата', 'Конечная дата'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
