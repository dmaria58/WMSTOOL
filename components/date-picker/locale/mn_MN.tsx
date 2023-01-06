import CalendarLocale from 'rc-calendar/lib/locale/mn_MN';
import TimePickerLocale from '../../time-picker/locale/mn_MN';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Огноо сонгох',
    rangePlaceholder: ['Эхлэх огноо', 'Дуусах огноо'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/wmstool-design/wmstool-design/blob/master/components/date-picker/locale/example.json

export default locale;
