import CalendarLocale from 'rc-calendar/lib/locale/ja_JP';
import TimePickerLocale from '../../time-picker/locale/ja_JP';
const locale = {
    lang: Object.assign({ placeholder: '日付を選択', rangePlaceholder: ['開始日付', '終了日付'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
