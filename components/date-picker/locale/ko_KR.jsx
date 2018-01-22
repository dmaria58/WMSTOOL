import CalendarLocale from 'rc-calendar/lib/locale/ko_KR';
import TimePickerLocale from '../../time-picker/locale/ko_KR';
// Merge into a locale object
const locale = {
    lang: Object.assign({ placeholder: '날짜 선택', rangePlaceholder: ['시작일', '종료일'] }, CalendarLocale),
    timePickerLocale: Object.assign({}, TimePickerLocale),
};
// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json
export default locale;
